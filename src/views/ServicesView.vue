<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();

// Professional SVGs replacing the emojis
const services = [
    {
        id: 'research',
        title: 'Research & Policy Advisory',
        desc: 'Evidence-based studies, policy analysis, and impact assessments.',
        path: '/services/research',
        // SVG: Chart/Document
        icon: '<path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5v2z"/><path d="M3 12.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5z"/>'
    },
    {
        id: 'ict',
        title: 'ICT & Data Analytics',
        desc: 'Digital transformation, BI dashboards, and predictive modeling.',
        path: '/services/ict',
        // SVG: Laptop
        icon: '<path d="M13.5 3a.5.5 0 0 1 .5.5V11H2V3.5a.5.5 0 0 1 .5-.5h11zm-11-1A1.5 1.5 0 0 0 1 3.5V12h14V3.5A1.5 1.5 0 0 0 13.5 2h-11zM0 12.5h16a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 12.5z"/>'
    },
    {
        id: 'strategy',
        title: 'Strategic Corporate Advisory',
        desc: 'Governance, restructuring, and risk management frameworks.',
        path: '/services/strategy',
        // SVG: Chess/Strategy
        icon: '<path d="M8 16.016a7.5 7.5 0 0 0 1.962-14.74A1 1 0 0 0 9 0H7a1 1 0 0 0-.962 1.276A7.5 7.5 0 0 0 8 16.016zm6.5-7.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z"/><path d="m6.94 7.44 4.95-2.83-2.83 4.95-4.949 2.83 2.828-4.95z"/>'
    }
];

const navigateTo = (path) => {
    router.push(path);
};
</script>

<template>
  <main class="services-page py-5 bg-light mt-5">
    <div class="container py-4">
      <div class="row g-5">
        
        <div class="col-lg-3">
            <div class="sticky-top" style="top: 100px;">
                <h5 class="fw-bold text-navy mb-3 px-3">Service Sectors</h5>
                <div class="list-group shadow-sm border-0 rounded-3 overflow-hidden">
                    <router-link to="/services" class="list-group-item list-group-item-action active-sidebar py-3 fw-bold">
                        Overview
                    </router-link>
                    <router-link to="/services/research" class="list-group-item list-group-item-action py-3">
                        Research & Policy Advisory
                    </router-link>
                    <router-link to="/services/ict" class="list-group-item list-group-item-action py-3">
                        ICT & Data Analytics
                    </router-link>
                    <router-link to="/services/strategy" class="list-group-item list-group-item-action py-3">
                        Strategic Corporate Advisory
                    </router-link>
                </div>

                <div class="mt-4 p-4 bg-white rounded-3 shadow-sm text-center border">
                    <h6 class="fw-bold text-navy">Need a custom plan?</h6>
                    <p class="small text-muted mb-3">Let's discuss your specific requirements.</p>
                    <router-link to="/contact" class="btn btn-outline-navy btn-sm rounded-pill w-100 fw-bold">Contact Us</router-link>
                </div>
            </div>
        </div>

        <div class="col-lg-9">
            
            <div class="mb-5">
                <p class="lead text-muted">
                    Select a service category from the menu to view detailed capabilities, or browse our core pillars below.
                </p>
            </div>

            <div class="d-flex flex-column gap-3">
                
                <div 
                    v-for="(service, index) in services" 
                    :key="index"
                    class="card border-0 shadow-sm p-4 d-flex flex-row align-items-center gap-4 hover-card"
                    @click="navigateTo(service.path)"
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
  </main>
</template>

<style scoped>
/* COLORS */
.text-navy { color: #1a2b49; }
.bg-light-navy { background-color: #f0f4f8; }
.text-primary { color: #1a2b49 !important; }
.btn-outline-navy { color: #1a2b49; border: 1px solid #1a2b49; }
.btn-outline-navy:hover { background: #1a2b49; color: white; }

/* SIDEBAR STYLES */
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
    padding-left: 1.5rem; /* Slide effect */
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

/* ICON SQUARE */
.icon-square {
    width: 60px; height: 60px;
    border-radius: 12px;
    display: flex; align-items: center; justify-content: center;
}

.arrow-btn { transition: all 0.2s; font-size: 1.2rem; }
</style>