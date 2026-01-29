<script setup>
import { ref, nextTick } from 'vue';
import { useRouter } from 'vue-router';
// import { store } from '../store'; // Optional: If you want to use store data later

const router = useRouter();
const isOpen = ref(false);
const isTyping = ref(false);
const userMessage = ref('');
const messages = ref([
    { 
        id: 1, 
        sender: 'bot', 
        text: 'Hello! I am the RA Smart Assistant, powered by AI. I can answer complex questions about our strategies, services, and reports. What would you like to know?' 
    }
]);

// --- 1. CONFIGURATION ---
// ⚠️ IMPORTANT: In a real production app, use a backend to hide this key.
// For this "Serverless" prototype, replace 'YOUR_API_KEY_HERE' with your actual key from Google AI Studio.
const API_KEY = 'AIzaSyCWUgddG3q_QryWg5f-HwCg0CIfnhdBjjk'; 

// --- 2. THE SYSTEM CONTEXT (This is what makes the AI "know" your company) ---
const SYSTEM_PROMPT = `
You are the "RA Assistant", a professional AI consultant for "RA Strategic & Analytics Consulting Ltd".
Your tone is: Professional, insightful, concise, and polite.
You only answer questions related to RA Consultancy services, business strategy, research, and ICT.
If asked about general topics (like sports or weather), politely decline and steer back to business.

COMPANY PROFILE CONTEXT:
- Name: RA Strategic & Analytics Consulting Ltd.
- Mission: Empowering institutions in Eastern Africa with data-driven advisory.
- 3 Pillars: 
  1. Research & Policy Advisory (Baseline studies, Socio-economic assessments).
  2. ICT & Data Analytics (Digital transformation, BI Dashboards, Predictive modeling).
  3. Strategic Corporate Advisory (Governance, Restructuring, Risk Management).
- Locations: Nairobi, Kenya.
- Contact: info@rastrategicanalytics.com | +254-790-583-820.
- Key Clients: NGOs, Government, Private Sector, Banking.
- Values: Integrity, Innovation, Impact, Collaboration.

INSTRUCTIONS:
- Keep answers under 3 sentences unless asked for detail.
- If the user asks to book a meeting, tell them to visit the Contact page.
- If the user asks for careers, refer them to the Careers page.
`;

// --- 3. SEND TO API ---
const sendMessage = async () => {
    if (!userMessage.value.trim()) return;

    const input = userMessage.value;
    messages.value.push({ id: Date.now(), sender: 'user', text: input });
    userMessage.value = '';
    scrollToBottom();

    isTyping.value = true;

    try {
        // FIXED URL: Using 'v1beta' (Required for Gemini 1.5 Flash on free tier)
        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [
                        {
                            parts: [
                                { text: SYSTEM_PROMPT + "\n\nUser Question: " + input }
                            ]
                        }
                    ]
                })
            }
        );

        const data = await response.json();

        // 1. Error Handling (Check for Google Errors)
        if (data.error) {
            console.error("Google API Error:", data.error);
            throw new Error(`Google says: ${data.error.message}`);
        }

        // 2. Extract Response
        const botReply = data.candidates?.[0]?.content?.parts?.[0]?.text;

        if (!botReply) {
             console.error("Empty Response:", data);
            throw new Error("I received an empty response. Please try again.");
        }

        messages.value.push({
            id: Date.now() + 1,
            sender: 'bot',
            text: botReply
        });

    } catch (error) {
        console.error("AI Logic Error:", error);
        messages.value.push({
            id: Date.now() + 1,
            sender: 'bot',
            text: `Connection Issue: ${error.message}`
        });
    } finally {
        isTyping.value = false;
        scrollToBottom();
    }
};


const scrollToBottom = () => {
    nextTick(() => {
        const container = document.getElementById('chat-container');
        if (container) container.scrollTop = container.scrollHeight;
    });
};
</script>

<template>
  <div class="chatbot-wrapper">
    
    <button @click="isOpen = !isOpen" class="chat-toggle btn btn-primary shadow-lg rounded-circle d-flex align-items-center justify-content-center">
        <span v-if="!isOpen" class="fs-2">✨</span>
        <span v-else class="fs-2">×</span>
    </button>

    <transition name="slide-up">
        <div v-if="isOpen" class="chat-window bg-white shadow-lg rounded-3 overflow-hidden d-flex flex-column">
            
            <div class="chat-header bg-dark text-white p-3 d-flex align-items-center gap-2">
                <div class="bot-avatar bg-white text-primary rounded-circle d-flex align-items-center justify-content-center fw-bold">
                    AI
                </div>
                <div>
                    <h6 class="mb-0 fw-bold">RA AI Assistant</h6>
                    <small class="text-success"><span class="status-dot"></span> Powered by Gemini</small>
                </div>
            </div>

            <div id="chat-container" class="chat-body p-3 flex-grow-1">
                <div v-for="msg in messages" :key="msg.id" class="d-flex mb-3" :class="msg.sender === 'user' ? 'justify-content-end' : 'justify-content-start'">
                    <div class="message-bubble p-3 shadow-sm" :class="msg.sender === 'user' ? 'bg-primary text-white user-bubble' : 'bg-light text-dark bot-bubble'">
                        {{ msg.text }}
                    </div>
                </div>

                <div v-if="isTyping" class="text-muted small ms-2 d-flex align-items-center gap-1">
                    <span>Thinking</span>
                    <span class="dot-anim">.</span><span class="dot-anim">.</span><span class="dot-anim">.</span>
                </div>
            </div>

            <div class="chat-footer p-3 border-top bg-light">
                <form @submit.prevent="sendMessage" class="d-flex gap-2">
                    <input v-model="userMessage" type="text" class="form-control" placeholder="Ask about strategy, ICT..." required>
                    <button type="submit" class="btn btn-primary">➤</button>
                </form>
            </div>

        </div>
    </transition>

  </div>
</template>

<style scoped>
/* (Same styles as before, just kept neat) */
.chatbot-wrapper {
    position: fixed;
    bottom: 30px; right: 30px;
    z-index: 1050;
    font-family: 'Segoe UI', sans-serif;
}
.chat-toggle {
    width: 60px; height: 60px;
    background-color: #1a2b49;
    border: 2px solid white;
    transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
.chat-toggle:hover { transform: scale(1.1); }
.chat-window {
    position: absolute; bottom: 80px; right: 0;
    width: 360px; height: 500px; /* Made slightly taller */
    border: 1px solid rgba(0,0,0,0.1);
}
.bg-dark { background-color: #1a2b49 !important; }
.bot-avatar { width: 35px; height: 35px; font-size: 0.8rem; }
.status-dot {
    display: inline-block; width: 8px; height: 8px; 
    background-color: #2ecc71; border-radius: 50%; margin-right: 3px;
}
.chat-body {
    overflow-y: auto;
    background-color: #f8f9fa;
    scrollbar-width: thin;
}
.message-bubble {
    max-width: 85%;
    font-size: 0.9rem;
    line-height: 1.5;
}
.bot-bubble {
    border-radius: 15px 15px 15px 0;
    border: 1px solid #e9ecef;
}
.user-bubble {
    background-color: #1a2b49 !important;
    border-radius: 15px 15px 0 15px;
}
.slide-up-enter-active, .slide-up-leave-active { transition: all 0.3s ease; }
.slide-up-enter-from, .slide-up-leave-to { opacity: 0; transform: translateY(20px); }

/* Simple dot animation for "Thinking..." */
.dot-anim { animation: blink 1.4s infinite both; }
.dot-anim:nth-child(2) { animation-delay: 0.2s; }
.dot-anim:nth-child(3) { animation-delay: 0.4s; }
@keyframes blink { 0% { opacity: 0.2; } 20% { opacity: 1; } 100% { opacity: 0.2; } }
</style>