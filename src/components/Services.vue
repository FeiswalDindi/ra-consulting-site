<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();

const services = [
    {
        title: 'Strategic Advisory',
        description: 'Governance frameworks, board evaluations, and strategic planning.',
        path: '/services/strategy',
        // SVG: Compass/Strategy
        icon: '<path d="M8 16.016a7.5 7.5 0 0 0 1.962-14.74A1 1 0 0 0 9 0H7a1 1 0 0 0-.962 1.276A7.5 7.5 0 0 0 8 16.016zm6.5-7.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z"/><path d="m6.94 7.44 4.95-2.83-2.83 4.95-4.949 2.83 2.828-4.95z"/>'
    },
    {
        title: 'Research & Policy',
        description: 'Baseline surveys, socio-economic assessments, and impact evaluation.',
        path: '/services/research',
        // SVG: Document/Search
        icon: '<path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5v2z"/><path d="M3 12.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5z"/>'
    },
    {
        title: 'Data & ICT',
        description: 'Digital transformation, software development, and big data analytics.',
        path: '/services/ict',
        // SVG: Laptop/Code
        icon: '<path d="M13.5 3a.5.5 0 0 1 .5.5V11H2V3.5a.5.5 0 0 1 .5-.5h11zm-11-1A1.5 1.5 0 0 0 1 3.5V12h14V3.5A1.5 1.5 0 0 0 13.5 2h-11zM0 12.5h16a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 12.5z"/>'
    },
    {
        title: 'Training & Capacity',
        description: 'Workshops on governance, data literacy, and leadership.',
        path: '/services/training',
        // SVG: Easel/Presentation
        icon: '<path d="M8 1.12c2.27 0 4.436.567 5.727 1.488.583.417.864.87.973 1.4.11.53-.02 1.135-.386 1.765-.365.626-.95 1.233-1.688 1.77C11.162 8.52 9.61 9 8 9c-1.61 0-3.162-.48-4.626-1.457-.738-.537-1.323-1.144-1.688-1.77-.367-.63-.496-1.235-.386-1.765.109-.53.39-.983.973-1.4C3.564 1.687 5.73 1.12 8 1.12z"/>'
    }
];

const navigateTo = (path) => {
    router.push(path);
}
</script>

<template>
  <section class="py-5 bg-white" id="services">
    <div class="container py-4">
      
      <div class="row justify-content-center text-center mb-5" v-scroll-reveal>
        <div class="col-lg-8">
            <h6 class="text-uppercase text-gold ls-2 fw-bold mb-2">What We Do</h6>
            <h2 class="display-5 fw-bold text-navy">Our Services</h2>
            <div class="divider mx-auto mt-4 bg-gold"></div>
            <p class="text-muted mt-3">Comprehensive solutions tailored to your institutional needs.</p>
        </div>
      </div>

      <div class="row g-4" v-scroll-reveal="{ delay: 200 }">
          <div class="col-md-6 col-lg-3" v-for="(service, index) in services" :key="index">
              <div class="service-card p-4 h-100 rounded-3 text-center bg-light-navy position-relative border" @click="navigateTo(service.path)">
                  
                  <div class="icon-box mx-auto mb-4 bg-navy text-white shadow-sm">
                      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" viewBox="0 0 16 16" v-html="service.icon">
                      </svg>
                  </div>

                  <h5 class="fw-bold text-navy mb-3">{{ service.title }}</h5>
                  <p class="text-muted small mb-0">{{ service.description }}</p>
                  
                  <div class="hover-arrow text-gold mt-3 opacity-0 transition-all">
                      ➝
                  </div>
              </div>
          </div>
      </div>

    </div>
  </section>
</template>

<style scoped>
/* COLORS */
.text-navy { color: #1a2b49; }
.bg-navy { background-color: #1a2b49; }
.text-gold { color: #c5a059; }
.bg-gold { background-color: #c5a059; }
.bg-light-navy { background-color: #f8f9fa; }

.divider { width: 60px; height: 3px; }
.ls-2 { letter-spacing: 2px; font-size: 0.8rem; }

/* CARD STYLING */
.service-card {
    transition: all 0.3s ease;
    cursor: pointer;
}

.service-card:hover {
    transform: translateY(-8px);
    background-color: #fff; /* Light up on hover */
    box-shadow: 0 15px 30px rgba(26, 43, 73, 0.1);
    border-color: #1a2b49 !important;
}

.service-card:hover .hover-arrow {
    opacity: 1 !important;
    transform: translateX(5px);
}

/* ICON BOX */
.icon-box {
    width: 60px; height: 60px;
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    border: 3px solid #fff;
    box-shadow: 0 4px 10px rgba(26, 43, 73, 0.1);
}
/* Fix for mobile menu overlap */
@media (max-width: 991px) {
    .sticky-top {
        position: static !important; /* Disable sticky on mobile */
        z-index: 1; /* Ensure it's below the navbar */
    }
}
</style>