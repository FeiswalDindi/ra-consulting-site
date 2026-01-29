<script setup>
import { computed } from 'vue';
import { store } from '../store'; // Global store for auth status

// Placeholder Data
const resources = [
    {
        id: 1,
        category: 'Economic Research',
        title: 'Eastern Africa Economic Outlook 2026',
        summary: 'A comprehensive analysis of fiscal policies, GDP forecasts, and investment trends across the EAC bloc. This report includes breakdown by country, sector performance metrics, and 5-year predictive modeling for foreign direct investment flows.',
        date: 'Jan 15, 2026',
        icon: '📈'
    },
    {
        id: 2,
        category: 'Digital Transformation',
        title: ' The State of Digital Governance',
        summary: 'How public sector institutions are leveraging AI and Big Data to improve service delivery. Includes case studies on e-citizen platforms, data sovereignty laws, and the impact of cloud infrastructure on government efficiency.',
        date: 'Dec 10, 2025',
        icon: '🤖'
    },
    {
        id: 3,
        category: 'NGO & Policy',
        title: 'Impact Assessment Framework Guide',
        summary: 'A practical toolkit for NGOs to measure, monitor, and report sustainable impact effectively. Features templates for Logic Models, Theory of Change diagrams, and donor reporting standards compliant with USAID and EU guidelines.',
        date: 'Nov 22, 2025',
        icon: '🌍'
    },
    {
        id: 4,
        category: 'Corporate Advisory',
        title: 'Risk Management in Volatile Markets',
        summary: 'Strategies for corporate boards to navigate currency fluctuation and regulatory changes. We analyze recent Central Bank directives and offer hedging strategies for import-dependent industries.',
        date: 'Oct 05, 2025',
        icon: '🛡️'
    }
];

// Computed property to check login status
const isLoggedIn = computed(() => !!store.user);

// Action: Handle Click
const handleAccess = (title) => {
    if (isLoggedIn.value) {
        // User is logged in -> Allow Download
        alert(`Starting download for: "${title}"...`);
    } else {
        // User is logged out -> Open Login Modal
        store.openModal();
    }
};
</script>

<template>
  <main class="insights-page">
    
    <section class="page-header py-5 bg-dark text-white text-center">
      <div class="container py-5">
        <h6 class="text-uppercase text-info ls-2 mb-2">Thought Leadership</h6>
        <h1 class="display-3 fw-bold mb-3">Insights & Resources</h1>
        <p class="lead text-white-50 mx-auto" style="max-width: 700px;" v-scroll-reveal>
          In-depth analysis, policy briefs, and strategic reports from our expert team.
        </p>
      </div>
    </section>

    <section class="py-5 bg-light">
      <div class="container">
        
        <div class="row g-4">
            <div class="col-lg-6" v-for="(item, index) in resources" :key="item.id" v-scroll-reveal="{ delay: index * 100 }">
                <div class="resource-card bg-white p-4 rounded-3 shadow-sm h-100 d-flex flex-column">
                    
                    <div class="card-header-area mb-3">
                        <div class="d-flex justify-content-between align-items-start mb-3">
                            <span class="badge bg-light text-primary border border-primary px-3 py-2 rounded-pill">
                                {{ item.category }}
                            </span>
                            <span class="text-muted small">{{ item.date }}</span>
                        </div>

                        <div class="d-flex align-items-center gap-3">
                            <span class="display-4">{{ item.icon }}</span>
                            <h3 class="fw-bold text-dark lh-sm mb-0">{{ item.title }}</h3>
                        </div>
                    </div>

                    <div class="content-wrapper flex-grow-1">
                        <p class="text-muted mb-4" :class="{ 'gated-text': !isLoggedIn }">
                            {{ item.summary }}
                        </p>
                    </div>

                    <div class="mt-auto">
                        
                        <button 
                            v-if="!isLoggedIn" 
                            @click="handleAccess(item.title)" 
                            class="btn btn-outline-primary rounded-pill px-4 fw-bold"
                        >
                            Read More
                        </button>

                        <button 
                            v-else 
                            @click="handleAccess(item.title)" 
                            class="btn btn-primary w-100 fw-bold d-flex align-items-center justify-content-center gap-2"
                        >
                            <span>Download PDF</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/><path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 0 0-.708.708l3 3z"/></svg>
                        </button>

                    </div>

                </div>
            </div>
        </div>

        <div class="text-center mt-5 pt-4">
            <p class="text-muted">Looking for specific data?</p>
            <router-link to="/contact" class="fw-bold text-primary text-decoration-none">Request Custom Research ➝</router-link>
        </div>

      </div>
    </section>

  </main>
</template>

<style scoped>
.bg-dark { background-color: #1a2b49 !important; }
.text-primary { color: #1a2b49 !important; }
.text-info { color: #0d6efd !important; }
.btn-primary { background-color: #1a2b49; border-color: #1a2b49; }
.btn-outline-primary { color: #1a2b49; border-color: #1a2b49; }
.btn-outline-primary:hover { background-color: #1a2b49; color: white; }

.resource-card {
    transition: transform 0.3s ease;
    border: 1px solid rgba(0,0,0,0.05);
}

.resource-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 30px rgba(0,0,0,0.1) !important;
}

/* --- THE GATED TEXT EFFECT --- */
.gated-text {
    /* Limit to 3 lines */
    display: -webkit-box;
    -webkit-line-clamp: 3;
    line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    
    /* Create a fade-out effect at the bottom of the text */
    mask-image: linear-gradient(to bottom, black 60%, transparent 100%);
    -webkit-mask-image: linear-gradient(to bottom, black 60%, transparent 100%);
    
    margin-bottom: 1.5rem !important;
}
</style>