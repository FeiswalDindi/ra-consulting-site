<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';

// 1. Accept the ID from the Router (e.g., 'research', 'ict')
const props = defineProps(['serviceId']);
const router = useRouter();

// 2. The Full Database of Services (Content + Icons)
const servicesData = [
    {
        id: 'research',
        title: 'Research & Policy Advisory',
        desc: 'Evidence-based studies, policy analysis, and impact assessments.',
        details: 'We provide comprehensive research services designed to inform policy and drive decision-making. Our team specializes in baseline surveys, socio-economic assessments, and rigorous impact evaluations.',
        features: ['Baseline & Endline Surveys', 'Policy Impact Assessment', 'Data Collection & Feasibility Studies'],
        icon: '<path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5v2z"/><path d="M4.176 9.032a.5.5 0 0 0-.656.327l-.5 1.7a.5.5 0 0 0 .294.605l4.5 1.8a.5.5 0 0 0 .372 0l4.5-1.8a.5.5 0 0 0 .294-.605l-.5-1.7a.5.5 0 0 0-.656-.327L8 10.466 4.176 9.032Z"/>'
    },
    {
        id: 'ict',
        title: 'ICT Systems & Data Analytics',
        desc: 'Custom software, system audits, and business intelligence.',
        details: 'Our ICT division helps organizations leverage technology for efficiency. From full-scale software development to security audits and data visualization, we ensure your tech infrastructure is robust.',
        features: ['Software & Web Development', 'Information Systems Audit', 'Cloud Infrastructure Setup'],
        icon: '<path d="M10.478 1.647a.5.5 0 1 0-.956-.294l-4 13a.5.5 0 1 0 .956.294l4-13zM4.854 4.146a.5.5 0 0 1 0 .708L1.707 8l3.147 3.146a.5.5 0 0 1-.708.708l-3.5-3.5a.5.5 0 0 1 0-.708l3.5-3.5a.5.5 0 0 1 .708 0zm6.292 0a.5.5 0 0 0 0 .708L14.293 8l-3.147 3.146a.5.5 0 0 0 .708.708l3.5-3.5a.5.5 0 0 0 .708.708l3.5-3.5a.5.5 0 0 0 0-.708l-3.5-3.5a.5.5 0 0 0-.708 0z"/>'
    },
    {
        id: 'strategy',
        title: 'Strategic Corporate Advisory',
        desc: 'Organizational strategy, governance, and business transformation.',
        details: 'We work with boards and executive teams to refine their vision and execution. We provide governance audits, strategic planning, and change management advisory.',
        features: ['Strategic Planning', 'Board Evaluation', 'Organizational Restructuring'],
        icon: '<path d="M8 16.016a7.5 7.5 0 0 0 1.962-14.74A1 1 0 0 0 9 0H7a1 1 0 0 0-.962 1.276A7.5 7.5 0 0 0 8 16.016zm6.5-7.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z"/><path d="m6.94 7.44 4.95-2.83-2.83 4.95-4.949 2.83 2.828-4.95z"/>'
    }
];

// Find the right service based on the URL parameter
const activeService = computed(() => {
    return servicesData.find(s => s.id === props.serviceId) || servicesData[0];
});

// Navigate helper
const navigateTo = (id) => {
    router.push(`/services/${id}`);
};
</script>

<template>
  <main class="services-detail-page bg-light min-vh-100 pb-5">
    
    <header class="py-5 bg-navy text-white text-center mb-5 mt-5">
        <div class="container py-4">
            <h6 class="text-sky text-uppercase ls-2 fw-bold mb-2">Our Solutions</h6>
            <h1 class="display-4 fw-bold">{{ activeService.title }}</h1>
        </div>
    </header>

    <div class="container">
        <div class="row g-5">
            
            <div class="col-lg-4">
                <div class="sidebar-wrapper sticky-top">
                    <div class="list-group shadow-sm border-0 rounded-4 overflow-hidden">
                        <div class="list-group-item bg-white p-4 border-bottom">
                            <h5 class="fw-bold mb-0 text-navy">All Expertise</h5>
                        </div>
                        <button v-for="s in servicesData" :key="s.id" 
                                @click="navigateTo(s.id)"
                                class="list-group-item list-group-item-action p-3 border-0 d-flex justify-content-between align-items-center fw-semibold"
                                :class="{'active-sidebar': s.id === props.serviceId}">
                            {{ s.title }}
                            <svg v-if="s.id === props.serviceId" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
                            </svg>
                        </button>
                    </div>

                    <div class="card mt-4 border-0 bg-navy text-white rounded-4 p-4 shadow-sm">
                        <h5 class="fw-bold mb-3">Request a Quote</h5>
                        <p class="small text-white-50 mb-4">Ready to start your project? Let's discuss your requirements.</p>
                        <router-link to="/contact" class="btn btn-sky w-100 fw-bold py-3 rounded-pill transition-all">
                            Get Started
                        </router-link>
                    </div>
                </div>
            </div>

            <div class="col-lg-8">
                <div class="content-body bg-white p-5 rounded-4 shadow-sm border">
                    <div class="icon-circle bg-light-sky text-sky mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" viewBox="0 0 16 16" v-html="activeService.icon">
                        </svg>
                    </div>

                    <h2 class="fw-bold text-navy mb-4">Service Overview</h2>
                    <p class="lead text-muted mb-5" style="line-height: 1.8;">{{ activeService.details }}</p>

                    <h4 class="fw-bold text-navy mb-4">Specialized Features</h4>
                    <div class="row g-4 mb-5">
                        <div v-for="feature in activeService.features" :key="feature" class="col-md-6">
                            <div class="d-flex align-items-center gap-3 p-3 rounded-3 bg-light border-start border-4 border-sky h-100">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#0ea5e9" viewBox="0 0 16 16">
                                    <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/>
                                </svg>
                                <span class="fw-bold text-navy small">{{ feature }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
  </main>
</template>

<style scoped>
/* COLORS */
.bg-navy { background-color: #1a2b49 !important; }
.text-navy { color: #1a2b49 !important; }
.text-sky { color: #0ea5e9 !important; }
.bg-sky { background-color: #0ea5e9 !important; }
.bg-light-sky { background-color: rgba(14, 165, 233, 0.1); }
.border-sky { border-color: #0ea5e9 !important; }
.ls-2 { letter-spacing: 2px; }

/* STICKY SIDEBAR LOGIC */
.sidebar-wrapper {
    top: 100px; /* Adjust based on your header height to prevent overlapping */
}

/* SIDEBAR THEME */
.active-sidebar {
    background-color: #0ea5e9 !important;
    color: white !important;
    border-color: #0ea5e9 !important;
}

.list-group-item {
    transition: all 0.2s ease;
    border: none;
    border-bottom: 1px solid rgba(0,0,0,0.05);
}

.list-group-item-action:hover:not(.active-sidebar) {
    background-color: #f8f9fa;
    color: #0ea5e9;
    padding-left: 2rem;
}

/* BUTTONS */
.btn-sky {
    background-color: #0ea5e9;
    color: white;
    border: none;
}
.btn-sky:hover {
    background-color: #0284c7;
    transform: translateY(-2px);
}

.icon-circle {
    width: 80px; height: 80px;
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
}

.transition-all { transition: all 0.3s ease; }

/* Responsive adjustments to stop sidebar overlap */
@media (max-width: 991px) {
    .sidebar-wrapper {
        position: static;
        margin-bottom: 3rem;
    }
}
</style>