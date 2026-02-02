<script setup>
import { ref, nextTick, onMounted, onUnmounted } from 'vue';

// --- CONFIGURATION ---
const API_KEY = 'AIzaSyB8v0M21HyVYCkUMTQ_1yRLfkIWfj7oVIM';

const SYSTEM_PROMPT = `
You are the "RA Smart Assistant", a professional AI consultant for 'RA Strategic & Analytics Consulting Ltd'.
Your tone is: Professional, insightful, concise, and helpful.
Your goal is to help clients understand our services (Research, ICT, Strategy) and encourage them to book a consultation.
`;

// --- STATE ---
const isOpen = ref(false);
const isExpanded = ref(true); 
const isTyping = ref(false);
const isStreaming = ref(false); // New state to track the typing effect
const userMessage = ref('');
const messages = ref([
    { 
        id: 1, 
        sender: 'bot', 
        text: 'Hello! I am the RA Smart Assistant. I can help you with our services, expertise, or finding the right strategy for your institution. How can I help you today?' 
    }
]);
const messagesContainer = ref(null);

// --- TYPEWRITER LOGIC (ChatGPT Effect) ---
const typeMessage = async (fullText) => {
    isStreaming.ref = true;
    let displayedText = "";
    const newMessageObj = { id: Date.now(), sender: 'bot', text: "" };
    messages.value.push(newMessageObj);

    // Split by characters for a smooth flow
    const characters = fullText.split("");
    
    for (let i = 0; i < characters.length; i++) {
        displayedText += characters[i];
        // Find the message we just pushed and update its text
        const index = messages.value.findIndex(m => m.id === newMessageObj.id);
        if (index !== -1) {
            messages.value[index].text = displayedText;
        }
        
        scrollToBottom();
        
        // Speed control: 15ms per character (adjust for faster/slower typing)
        await new Promise(resolve => setTimeout(resolve, 15));
    }
    isStreaming.value = false;
};

const parseMessage = (rawText) => {
    if (!rawText) return '';
    let html = rawText.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/^\* /gm, '• ');
    html = html.replace(/\n/g, '<br>');
    return html;
};

const scrollToBottom = () => {
    nextTick(() => {
        if (messagesContainer.value) {
            messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
        }
    });
};

const handleScroll = () => { isExpanded.value = window.scrollY < 100; };
onMounted(() => { window.addEventListener('scroll', handleScroll); });
onUnmounted(() => { window.removeEventListener('scroll', handleScroll); });

const getValidModel = async () => {
    try {
        const listResponse = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${API_KEY}`);
        const listData = await listResponse.json();
        const validModel = listData.models?.find(m => m.supportedGenerationMethods?.includes('generateContent') && (m.name.includes('gemini') || m.name.includes('flash')));
        return validModel ? validModel.name : 'models/gemini-pro'; 
    } catch (e) { return 'models/gemini-pro'; }
};

const sendMessage = async () => {
    if (!userMessage.value.trim() || isStreaming.value) return;
    
    const input = userMessage.value;
    messages.value.push({ id: Date.now(), sender: 'user', text: input });
    userMessage.value = '';
    scrollToBottom();
    isTyping.value = true;

    try {
        const modelName = await getValidModel();
        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/${modelName}:generateContent?key=${API_KEY}`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: SYSTEM_PROMPT + "\n\nUser: " + input }] }]
                })
            }
        );
        const data = await response.json();
        const botReply = data.candidates?.[0]?.content?.parts?.[0]?.text;
        
        isTyping.value = false; // Hide "thinking"
        
        if (botReply) {
            await typeMessage(botReply); // Start the "ChatGPT" typing effect
        } else {
            messages.value.push({ id: Date.now(), sender: 'bot', text: "I'm sorry, I couldn't process that. Try again?" });
        }
    } catch (error) {
        isTyping.value = false;
        messages.value.push({ id: Date.now(), sender: 'bot', text: "Connection issues. Please try again." });
    } finally {
        scrollToBottom();
    }
};
</script>

<template>
  <div class="chatbot-wrapper">
    
    <transition name="slide-up">
        <div v-if="isOpen" class="chat-window shadow-lg">
            
            <div class="chat-header bg-navy text-white d-flex justify-content-between align-items-center p-3">
                <div class="d-flex align-items-center gap-2">
                    <div class="bot-avatar bg-sky text-white fw-bold rounded-circle d-flex align-items-center justify-content-center">RA</div>
                    <div>
                        <h6 class="mb-0 fw-bold">RA Assistant</h6>
                        <div class="d-flex align-items-center gap-1">
                             <span class="status-dot"></span>
                             <small class="text-white-50" style="font-size: 0.75rem;">Online</small>
                        </div>
                    </div>
                </div>
                <button @click="isOpen = false" class="btn btn-sm text-white-50 hover-white border-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                    </svg>
                </button>
            </div>

            <div class="chat-body p-3 bg-light" ref="messagesContainer">
                <div v-for="msg in messages" :key="msg.id" class="d-flex mb-3" :class="msg.sender === 'user' ? 'justify-content-end' : 'justify-content-start'">
                    <div 
                        class="message-bubble p-3 shadow-sm" 
                        :class="msg.sender === 'user' ? 'bg-navy text-white rounded-user' : 'bg-white text-dark rounded-bot border-start-sky'"
                        v-html="parseMessage(msg.text)"
                    ></div>
                </div>
                <div v-if="isTyping" class="d-flex align-items-center gap-2 ms-2 mb-3">
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                </div>
            </div>

            <div class="chat-footer p-3 bg-white border-top">
                <form @submit.prevent="sendMessage" class="d-flex gap-2 align-items-center">
                    <input v-model="userMessage" type="text" class="form-control form-control-sm rounded-pill px-3" placeholder="How can we help?" :disabled="isStreaming">
                    <button type="submit" class="btn btn-navy p-0 rounded-circle d-flex align-items-center justify-content-center" style="width: 36px; height: 36px;" :disabled="isStreaming">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="#0ea5e9" viewBox="0 0 16 16">
                            <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z"/>
                        </svg>
                    </button>
                </form>
            </div>

        </div>
    </transition>

    <button @click="isOpen = !isOpen" class="chat-toggle btn btn-navy shadow-lg rounded-pill d-flex align-items-center justify-content-center gap-2" :class="{ 'expanded': isExpanded && !isOpen }">
        <div v-if="!isOpen" class="d-flex align-items-center justify-content-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="#0ea5e9" viewBox="0 0 16 16">
                <path d="M16 8c0 3.866-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.584.296-1.925.864-4.181 1.234-.2.032-.352-.176-.273-.362.354-.836.674-1.95.77-2.966C.744 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7zM5 8a1 1 0 1 0-2 0 1 1 0 0 0 2 0zm4 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0zm3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
            </svg>
        </div>
        <div v-else>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
            </svg>
        </div>
        <span v-if="isExpanded && !isOpen" class="fw-bold pe-2 text-white">Ask AI Assistant</span>
    </button>

  </div>
</template>

<style scoped>
.bg-navy { background-color: #1a2b49; }
.text-sky { color: #0ea5e9; }
.bg-sky { background-color: #0ea5e9; }
.btn-navy { background-color: #1a2b49; color: white; border: none; }
.chatbot-wrapper { position: fixed; bottom: 30px; right: 30px; z-index: 1050; display: flex; flex-direction: column; align-items: flex-end; }
.chat-window { width: 340px; height: 450px; background: white; border-radius: 16px; overflow: hidden; margin-bottom: 20px; display: flex; flex-direction: column; border: 1px solid rgba(0,0,0,0.1); }
.chat-body { flex: 1; overflow-y: auto; font-size: 0.9rem; scroll-behavior: smooth; }
.message-bubble { max-width: 85%; line-height: 1.5; word-wrap: break-word; }
.rounded-bot { border-radius: 12px 12px 12px 2px; }
.rounded-user { border-radius: 12px 12px 2px 12px; }
.border-start-sky { border-left: 3px solid #0ea5e9 !important; }
.bot-avatar { width: 35px; height: 35px; font-size: 0.8rem; }
.status-dot { width: 8px; height: 8px; background-color: #2ecc71; border-radius: 50%; display: inline-block; }
.chat-toggle { height: 60px; min-width: 60px; border: 2px solid white; transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
.chat-toggle.expanded { width: auto; padding-left: 15px; padding-right: 15px; }

/* Typing Animation Dots */
.typing-dot { width: 6px; height: 6px; background: #0ea5e9; border-radius: 50%; animation: blink 1.4s infinite both; }
.typing-dot:nth-child(2) { animation-delay: 0.2s; }
.typing-dot:nth-child(3) { animation-delay: 0.4s; }
@keyframes blink { 0%, 80%, 100% { opacity: 0; } 40% { opacity: 1; } }

.slide-up-enter-active, .slide-up-leave-active { transition: all 0.3s ease; }
.slide-up-enter-from, .slide-up-leave-to { opacity: 0; transform: translateY(20px); }

.chat-body::-webkit-scrollbar { width: 5px; }
.chat-body::-webkit-scrollbar-thumb { background: #dee2e6; border-radius: 10px; }
</style>