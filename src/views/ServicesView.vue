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
        // Detailed Content for the sub-page
        details: 'We provide comprehensive research services designed to inform policy and drive decision-making. Our team specializes in baseline surveys, socio-economic assessments, and rigorous impact evaluations.',
        features: ['Baseline & Endline Surveys', 'Policy Impact Assessment', 'Data Collection & Feasibility Studies'],
        icon: '<path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5v2z"/><path d="M3 12.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5z"/>'
    },
    {
        id: 'ict',
        title: 'ICT & Data Analytics',
        desc: 'Digital transformation, BI dashboards, and predictive modeling.',
        details: 'Modernize your operations with our cutting-edge ICT solutions. From custom software development to advanced big data analytics, we help you unlock the value of your information assets.',
        features: ['Custom Software Development', 'Business Intelligence (BI) Dashboards', 'Cloud Infrastructure Migration'],
        icon: '<path d="M13.5 3a.5.5 0 0 1 .5.5V11H2V3.5a.5.5 0 0 1 .5-.5h11zm-11-1A1.5 1.5 0 0 0 1 3.5V12h14V3.5A1.5 1.5 0 0 0 13.5 2h-11zM0 12.5h16a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 12.5z"/>'
    },
    {
        id: 'strategy',
        title: 'Strategic Corporate Advisory',
        desc: 'Governance, restructuring, and risk management frameworks.',
        details: 'Navigate complex business landscapes with confidence. Our strategic advisory arm helps boards and executives optimize governance structures, manage risks, and plan for sustainable growth.',
        features: ['Governance & Board Evaluation', 'Corporate Restructuring', 'Strategic Plan Development (5-10 Years)'],
        icon: '<path d="M8 16.016a7.5 7.5 0 0 0 1.962-14.74A1 1 0 0 0 9 0H7a1 1 0 0 0-.962 1.276A7.5 7.5 0 0 0 8 16.016zm6.5-7.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z"/><path d="m6.94 7.44 4.95-2.83-2.83 4.95-4.949 2.83 2.828-4.95z"/>'
    }
];

// 3. Logic: Are we viewing a list, or a specific detail page?
const activeService = computed(() => {
    if (!props.serviceId) return null; // No ID? Show List.
    return servicesData.find(s => s.id === props.serviceId);
});

const navigateTo = (id) => {
    router.push(`/services/${id}`);
};
</script>

<template>
  <main class="services-page bg-light min-vh-100" style="padding-top: 120px; padding-bottom: 80px;">
    <div class="container">
      <div class="row g-5">
        
        <div class="col-lg-3">
            <div class="sidebar-wrapper">
                <h5 class="fw-bold text-navy mb-3 px-2">Service Sectors</h5>
                <div class="list-group shadow-sm border-0 rounded-3 overflow-hidden">
                    <router-link to="/services" class="list-group-item list-group-item-action py-3 fw-bold" :class="{ 'active-sidebar': !activeService }">
                        Overview
                    </router-link>
                    <router-link 
                        v-for="s in servicesData" 
                        :key="s.id"
                        :to="'/services/' + s.id" 
                        class="list-group-item list-group-item-action py-3"
                        :class="{ 'active-sidebar': activeService?.id === s.id }"
                    >
                        {{ s.title }}
                    </router-link>
                </div>

                <div class="mt-4 p-4 bg-white rounded-3 shadow-sm text-center border d-none d-lg-block">
                    <h6 class="fw-bold text-navy">Need a custom plan?</h6>
                    <p class="small text-muted mb-3">Let's discuss your specific requirements.</p>
                    <router-link to="/contact" class="btn btn-outline-navy btn-sm rounded-pill w-100 fw-bold">Contact Us</router-link>
                </div>
            </div>
        </div>

        <div class="col-lg-9">
            
            <div v-if="activeService" class="detail-view fade-in">
                <div class="mb-4">
                    <router-link to="/services" class="text-decoration-none text-muted small fw-bold">← Back to Overview</router-link>
                </div>
                
                <div class="bg-white p-5 rounded-4 shadow-sm border-top border-4 border-navy">
                    <div class="icon-circle mb-4 bg-light-navy text-primary">
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" viewBox="0 0 16 16" v-html="activeService.icon"></svg>
                    </div>
                    <h2 class="fw-bold text-navy mb-4">{{ activeService.title }}</h2>
                    <p class="lead text-muted mb-5">{{ activeService.details }}</p>
                    
                    <h5 class="fw-bold text-navy mb-3">Key Capabilities</h5>
                    <ul class="list-group list-group-flush mb-4">
                        <li v-for="feat in activeService.features" :key="feat" class="list-group-item px-0 border-0 d-flex align-items-center gap-2">
                            <span class="text-success">✔</span> {{ feat }}
                        </li>
                    </ul>

                    <router-link to="/contact" class="btn btn-navy fw-bold px-4 py-2 rounded-pill mt-3">Request Proposal</router-link>
                </div>
            </div>

            <div v-else class="list-view fade-in">
                <div class="mb-5">
                    <h2 class="fw-bold text-navy">Our Expertise</h2>
                    <p class="lead text-muted">
                        Select a service category from the menu to view detailed capabilities, or browse our core pillars below.
                    </p>
                </div>

                <div class="d-flex flex-column gap-3">
                    <div 
                        v-for="(service, index) in servicesData" 
                        :key="index"
                        class="card border-0 shadow-sm p-4 d-flex flex-row align-items-center gap-4 hover-card bg-white"
                        @click="navigateTo(service.id)"
                    >
                        <div class="icon-square bg-light-navy text-primary flex-shrink-0">
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 16 16" v-html="service.icon"></svg>
                        </div>

                        <div class="flex-grow-1">
                            <h4 class="fw-bold text-navy mb-1">{{ service.title }}</h4>
                            <p class="text-muted mb-0 small">{{ service.desc }}</p>
                        </div>

                        <div class="arrow-btn text-muted">
                            ➝
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
.text-navy { color: #1a2b49; }
.bg-light-navy { background-color: #f0f4f8; }
.text-primary { color: #1a2b49 !important; }
.btn-outline-navy { color: #1a2b49; border: 1px solid #1a2b49; }
.btn-outline-navy:hover { background: #1a2b49; color: white; }
.btn-navy { background-color: #1a2b49; color: white; border: none; }
.btn-navy:hover { background-color: #0d1726; }
.border-navy { border-color: #1a2b49 !important; }

/* SIDEBAR */
.sidebar-wrapper {
    position: sticky;
    top: 120px; /* Aligns perfectly under the fixed navbar */
}

/* On mobile, disable sticky to prevent overlapping */
@media (max-width: 991px) {
    .sidebar-wrapper {
        position: static;
        margin-bottom: 40px;
    }
}

.active-sidebar {
    background-color: #1a2b49 !important;
    color: white !important;
    border-color: #1a2b49 !important;
}
.list-group-item {
    border: none;
    border-bottom: 1px solid rgba(0,0,0,0.05);
    color: #555;
    transition: all 0.2s;
}
.list-group-item:hover {
    background-color: #f8f9fa;
    color: #1a2b49;
    padding-left: 1.5rem;
}

/* CARD STYLES */
.hover-card {
    cursor: pointer;
    transition: transform 0.2s, box-shadow 0.2s;
}
.hover-card:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(0,0,0,0.05) !important;
}
.hover-card:hover .arrow-btn {
    transform: translateX(5px);
    color: #1a2b49;
}

/* ICONS */
.icon-square {
    width: 60px; height: 60px;
    border-radius: 12px;
    display: flex; align-items: center; justify-content: center;
}
.icon-circle {
    width: 70px; height: 70px;
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
}

.arrow-btn { transition: all 0.2s; font-size: 1.2rem; }

/* ANIMATION */
.fade-in {
    animation: fadeIn 0.4s ease-in-out;
}
@keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
}
</style>