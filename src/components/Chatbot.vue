<script setup>
import { ref, nextTick, onMounted, onUnmounted } from 'vue';

// --- CONFIGURATION ---
const API_KEY = 'AIzaSyB8v0M21HyVYCkUMTQ_1yRLfkIWfj7oVIM'; // Your Key

// The Brain: System Instructions
const SYSTEM_PROMPT = `
You are the "RA Smart Assistant", a professional AI consultant for 'RA Strategic & Analytics Consulting Ltd'.
Your tone is: Professional, insightful, concise, and helpful.
Your goal is to help clients understand our services (Research, ICT, Strategy) and encourage them to book a consultation.
If you don't know an answer, say: "That is a specific detail I would love to connect you with our team about. Please use the Contact Us page."
Do not answer questions unrelated to business, consulting, or technology.
`;

// --- STATE ---
const isOpen = ref(false);
const isExpanded = ref(true); 
const isTyping = ref(false);
const userMessage = ref('');
const messages = ref([
    { 
        id: 1, 
        sender: 'bot', 
        text: 'Hello! I am the RA Smart Assistant. I can help you with our services, expertise, or finding the right strategy for your institution. How can I help you today?' 
    }
]);
const messagesContainer = ref(null);

// --- HELPER: FORMAT TEXT (The Asterisk Fix) ---
const parseMessage = (rawText) => {
    if (!rawText) return '';

    // 1. Convert **Bold** (Double asterisks)
    let html = rawText.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

    // 2. Convert * Bullet Points (Asterisk at start of line)
    html = html.replace(/^\* /gm, '• ');

    // 3. Convert New Lines to <br> so text doesn't squish
    html = html.replace(/\n/g, '<br>');

    return html;
};

// --- SCROLL LOGIC ---
const scrollToBottom = () => {
    nextTick(() => {
        if (messagesContainer.value) {
            messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
        }
    });
};

const handleScroll = () => {
    isExpanded.value = window.scrollY < 100;
};

onMounted(() => {
    window.addEventListener('scroll', handleScroll);
});
onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll);
});

// --- HELPER: FIND WORKING MODEL ---
const getValidModel = async () => {
    try {
        const listResponse = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${API_KEY}`);
        const listData = await listResponse.json();
        
        const validModel = listData.models?.find(m => 
            m.supportedGenerationMethods && 
            m.supportedGenerationMethods.includes('generateContent') &&
            (m.name.includes('gemini') || m.name.includes('flash'))
        );

        if (validModel) return validModel.name;
        return 'models/gemini-pro'; 
    } catch (e) {
        return 'models/gemini-pro';
    }
};

// --- AI LOGIC ---
const sendMessage = async () => {
    if (!userMessage.value.trim()) return;

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
                    contents: [{ parts: [{ text: SYSTEM_PROMPT + "\n\nUser Question: " + input }] }]
                })
            }
        );

        const data = await response.json();

        if (data.error) throw new Error(data.error.message || "API Connection Failed");

        const botReply = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (!botReply) throw new Error("No response content found.");

        messages.value.push({ id: Date.now() + 1, sender: 'bot', text: botReply });

    } catch (error) {
        console.error("Chat Error:", error);
        messages.value.push({
            id: Date.now() + 1,
            sender: 'bot',
            text: "I'm having trouble connecting to the server. Please try again later."
        });
    } finally {
        isTyping.value = false;
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
                    <div class="bot-avatar bg-white text-navy fw-bold rounded-circle d-flex align-items-center justify-content-center">RA</div>
                    <div>
                        <h6 class="mb-0 fw-bold">RA Assistant</h6>
                        <div class="d-flex align-items-center gap-1">
                             <span style="color: #2ecc71; font-size: 0.8rem;">●</span>
                             <small class="text-white-50" style="font-size: 0.75rem;">Online</small>
                        </div>
                    </div>
                </div>
                <button @click="isOpen = false" class="btn btn-sm text-white fs-5">×</button>
            </div>

            <div class="chat-body p-3 bg-light" ref="messagesContainer">
                <div v-for="msg in messages" :key="msg.id" class="d-flex mb-3" :class="msg.sender === 'user' ? 'justify-content-end' : 'justify-content-start'">
                    
                    <div 
                        class="message-bubble p-3 shadow-sm" 
                        :class="msg.sender === 'user' ? 'bg-navy text-white rounded-user' : 'bg-white text-dark rounded-bot'"
                        v-html="parseMessage(msg.text)"
                    ></div>
                
                </div>
                <div v-if="isTyping" class="text-muted small ms-2 fst-italic">RA Assistant is typing...</div>
            </div>

            <div class="chat-footer p-3 bg-white border-top">
                <form @submit.prevent="sendMessage" class="d-flex gap-2">
                    <input v-model="userMessage" type="text" class="form-control form-control-sm rounded-pill" placeholder="Ask about our services...">
                    <button type="submit" class="btn btn-navy btn-sm rounded-circle d-flex align-items-center justify-content-center" style="width: 32px; height: 32px;">➤</button>
                </form>
            </div>

        </div>
    </transition>

    <button @click="isOpen = !isOpen" class="chat-toggle btn btn-navy shadow-lg rounded-pill d-flex align-items-center justify-content-center gap-2" :class="{ 'expanded': isExpanded && !isOpen }">
        <span v-if="!isOpen" class="fs-4">✨</span>
        <span v-else class="fs-4">×</span>
        <span v-if="isExpanded && !isOpen" class="fw-bold pe-2">Start a Chat</span>
    </button>

  </div>
</template>

<style scoped>
.bg-navy { background-color: #1a2b49; }
.text-navy { color: #1a2b49; }
.btn-navy { background-color: #1a2b49; color: white; border: none; }
.btn-navy:hover { background-color: #0f1a2e; }
.chatbot-wrapper { position: fixed; bottom: 30px; right: 30px; z-index: 1050; display: flex; flex-direction: column; align-items: flex-end; }
.chat-window { width: 340px; height: 450px; background: white; border-radius: 16px; overflow: hidden; margin-bottom: 20px; display: flex; flex-direction: column; border: 1px solid rgba(0,0,0,0.1); }
.chat-body { flex: 1; overflow-y: auto; font-size: 0.9rem; }
.message-bubble { max-width: 80%; line-height: 1.4; }
.rounded-bot { border-radius: 12px 12px 12px 2px; }
.rounded-user { border-radius: 12px 12px 2px 12px; }
.bot-avatar { width: 35px; height: 35px; }
.chat-toggle { height: 60px; min-width: 60px; border: 2px solid white; transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); overflow: hidden; }
.chat-toggle.expanded { width: auto; padding-left: 20px; padding-right: 20px; }
.slide-up-enter-active, .slide-up-leave-active { transition: all 0.3s ease; }
.slide-up-enter-from, .slide-up-leave-to { opacity: 0; transform: translateY(20px); }
</style>