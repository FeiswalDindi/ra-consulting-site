<script setup>
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

// --- DATA: The 3 Pillars from your Company Profile ---
const services = [
    {
        id: 'research',
        title: 'Research & Policy Advisory',
        icon: '📊',
        summary: 'Evidence-based studies, policy analysis, and impact assessments.',
        description: 'We conduct baseline, midline, and end-line studies to inform strategic decisions. Our policy analysis and regulatory reviews ensure compliance and foresight in a changing market.',
        points: [
            'Baseline, midline, and end-line studies',
            'Sectoral and market research',
            'Socio-economic assessments',
            'Policy analysis and regulatory reviews',
            'Monitoring and evaluation (M&E)',
            'Stakeholder and institutional assessments',
            'Impact assessments'
        ]
    },
    {
        id: 'ict',
        title: 'ICT & Data Analytics',
        icon: '💻',
        summary: 'Digital transformation, BI dashboards, and predictive modeling.',
        description: 'Leveraging data to drive performance. We build custom dashboards, implement predictive models, and guide institutions through complete digital transformation.',
        points: [
            'Business intelligence and dashboard development',
            'Data analytics and predictive modeling',
            'ICT systems assessment and digital transformation planning',
            'Management information systems (MIS) development',
            'Data governance, privacy, and security advisory',
            'ICT strategy development',
            'Automation and process optimization'
        ]
    },
    {
        id: 'strategy',
        title: 'Strategic Corporate Advisory',
        icon: '♟️',
        summary: 'Governance, restructuring, and risk management frameworks.',
        description: 'Strengthening institutions from the top down. We assist boards and executives with restructuring, governance frameworks, and long-term strategic planning.',
        points: [
            'Strategic plan development',
            'Organizational restructuring',
            'Governance and board advisory',
            'Business model development',
            'Risk management frameworks',
            'Performance management systems',
            'Financial and operational diagnostics',
            'Change management and capacity-building'
        ]
    }
];

// --- LOGIC ---
const activeServiceId = computed(() => route.params.serviceId);
const activeService = computed(() => services.find(s => s.id === activeServiceId.value));

const navigateTo = (id) => {
    router.push(`/services/${id}`);
};
</script>

<template>
  <main class="services-page">
    
    <section class="page-header py-5 bg-dark text-white">
      <div class="container py-5 text-center">
        <h6 class="text-uppercase ls-2 text-info mb-2">Our Expertise</h6>
        <h1 class="display-3 fw-bold mb-3">
            {{ activeService ? activeService.title : 'Our Services' }}
        </h1>
        <p class="lead text-white-50 mx-auto" style="max-width: 700px;" v-scroll-reveal>
            {{ activeService ? activeService.summary : 'Comprehensive solutions in strategy, research, and technology.' }}
        </p>
      </div>
    </section>

    <section class="py-5">
      <div class="container">
        <div class="row">
            
            <div class="col-lg-4 mb-5 mb-lg-0">
                <div class="sidebar sticky-top" style="top: 100px; z-index: 1;">
                    <div class="card border-0 shadow-sm rounded-3 overflow-hidden">
                        <div class="card-header bg-white p-4 border-bottom">
                            <h5 class="fw-bold mb-0 text-primary">Service Sectors</h5>
                        </div>
                        <div class="list-group list-group-flush">
                            <button 
                                @click="router.push('/services')"
                                class="list-group-item list-group-item-action p-3 d-flex align-items-center justify-content-between"
                                :class="{ 'active': !activeServiceId }"
                            >
                                <span class="fw-bold">Overview</span>
                                <span>➝</span>
                            </button>

                            <button 
                                v-for="service in services" 
                                :key="service.id"
                                @click="navigateTo(service.id)"
                                class="list-group-item list-group-item-action p-3 d-flex align-items-center justify-content-between"
                                :class="{ 'active': activeServiceId === service.id }"
                            >
                                <span>{{ service.title }}</span>
                                <span v-if="activeServiceId === service.id">●</span>
                            </button>
                        </div>
                        
                        <div class="p-4 bg-light text-center">
                            <h6 class="fw-bold text-primary mb-2">Need a custom plan?</h6>
                            <p class="small text-muted mb-3">Let's discuss your specific requirements.</p>
                            <router-link to="/contact" class="btn btn-outline-primary btn-sm rounded-pill w-100 fw-bold">Contact Us</router-link>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-lg-8 ps-lg-5">
                
                <div v-if="activeService" class="service-detail" v-scroll-reveal>
                    <div class="mb-4">
                        <span class="display-1 text-muted opacity-25">{{ activeService.icon }}</span>
                    </div>
                    <h2 class="fw-bold mb-4 text-primary">{{ activeService.title }}</h2>
                    <p class="lead text-dark mb-5">{{ activeService.description }}</p>
                    
                    <h5 class="fw-bold mb-3 border-bottom pb-2">Key Capabilities</h5>
                    <ul class="row g-3 list-unstyled">
                        <li v-for="(point, index) in activeService.points" :key="index" class="col-md-6 d-flex align-items-start gap-2">
                            <span class="text-success mt-1">✔</span>
                            <span class="text-muted">{{ point }}</span>
                        </li>
                    </ul>
                </div>

                <div v-else class="service-overview">
                    <p class="lead mb-5">Select a service category from the menu to view detailed capabilities, or browse our core pillars below.</p>
                    
                    <div class="row g-4">
                        <div v-for="service in services" :key="service.id" class="col-md-12">
                            <div class="card h-100 border-0 shadow-sm hover-card" @click="navigateTo(service.id)">
                                <div class="card-body p-4 d-flex align-items-center gap-4">
                                    <div class="icon-box display-6">{{ service.icon }}</div>
                                    <div>
                                        <h4 class="fw-bold text-primary mb-1">{{ service.title }}</h4>
                                        <p class="text-muted mb-0 small">{{ service.summary }}</p>
                                    </div>
                                    <div class="ms-auto">
                                        <button class="btn btn-light rounded-circle">➝</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </div>
      </div>
    </section>

  </main>
</template>

<style scoped>
.text-primary { color: #1a2b49 !important; }
.bg-dark { background-color: #1a2b49 !important; }
.text-info { color: #0d6efd !important; }

/* Sidebar Active State */
.list-group-item.active {
    background-color: #1a2b49;
    border-color: #1a2b49;
    color: white;
}

.list-group-item {
    font-size: 0.95rem;
    transition: all 0.2s;
    border-left: 3px solid transparent;
}

.list-group-item:hover:not(.active) {
    background-color: #f8f9fa;
    border-left-color: #1a2b49;
    padding-left: 1.2rem;
}

.hover-card {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    cursor: pointer;
    border: 1px solid rgba(0,0,0,0.05);
}

.hover-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0,0,0,0.1);
    border-color: #1a2b49;
}
</style>