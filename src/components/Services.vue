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
        icon: '<path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5v2z"/><path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>'
    },
    {
        title: 'ICT & Analytics',
        description: 'System audits, software development, and big data intelligence.',
        path: '/services/ict',
        // SVG: Code/Cloud
        icon: '<path d="M10.478 1.647a.5.5 0 1 0-.956-.294l-4 13a.5.5 0 1 0 .956.294l4-13zM4.854 4.146a.5.5 0 0 1 0 .708L1.707 8l3.147 3.146a.5.5 0 0 1-.708.708l-3.5-3.5a.5.5 0 0 1 0-.708l3.5-3.5a.5.5 0 0 1 .708 0zm6.292 0a.5.5 0 0 0 0 .708L14.293 8l-3.147 3.146a.5.5 0 0 0 .708.708l3.5-3.5a.5.5 0 0 0 0-.708l-3.5-3.5a.5.5 0 0 0-.708 0z"/>'
    },
    {
        title: 'Training',
        description: 'Capacity building, professional workshops, and technical training.',
        path: '/services',
        // SVG: Book/Open
        icon: '<path d="M1 2.828c.885-.37 2.154-.769 3.388-.893 1.33-.134 2.458.063 3.112.752v9.746c-.933-.53-2.12-.603-3.213-.493-1.18.12-2.37.461-3.287.811V2.828zm7.5.752c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492V3.58zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.81 8.985.936 8 1.783z"/>'
    }
];
</script>

<template>
  <section class="services-section py-5 bg-light-navy">
    <div class="container py-4">
      
      <div class="row justify-content-center text-center mb-5" v-scroll-reveal>
        <div class="col-lg-8">
            <h6 class="text-uppercase text-sky ls-2 fw-bold mb-2">Our Solutions</h6>
            <h2 class="display-5 fw-bold text-navy">Specialized Services</h2>
            <div class="divider mx-auto mt-4 bg-sky"></div>
        </div>
      </div>

      <div class="row g-4">
          <div class="col-md-6 col-lg-3" v-for="(service, index) in services" :key="index" v-scroll-reveal="{ delay: index * 100 }">
              <div class="service-card h-100 p-4 bg-white border rounded-4 shadow-sm text-center d-flex flex-column align-items-center"
                   @click="router.push(service.path)">
                  
                  <div class="icon-circle bg-navy text-sky mb-4 transition-all">
                      <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" viewBox="0 0 16 16" v-html="service.icon">
                      </svg>
                  </div>

                  <h5 class="fw-bold text-navy mb-3">{{ service.title }}</h5>
                  <p class="text-muted small mb-0 flex-grow-1">{{ service.description }}</p>
                  
                  <div class="hover-arrow text-sky mt-4 opacity-0 transition-all">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
                      </svg>
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
.text-sky { color: #0ea5e9 !important; } /* Sky Blue Accent */
.bg-sky { background-color: #0ea5e9; }
.bg-light-navy { background-color: #F8FAFC; } /* Soft business background */

.divider { width: 60px; height: 3px; }
.ls-2 { letter-spacing: 2px; font-size: 0.8rem; }

/* CARD STYLING */
.service-card {
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    cursor: pointer;
    border: 1px solid rgba(26, 43, 73, 0.05) !important;
}

.service-card:hover {
    transform: translateY(-12px);
    background-color: #fff;
    box-shadow: 0 20px 40px rgba(14, 165, 233, 0.12);
    border-color: #0ea5e9 !important;
}

/* ICON CIRCLE */
.icon-circle {
    width: 70px;
    height: 70px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
    border: 4px solid transparent;
}

.service-card:hover .icon-circle {
    background-color: #0ea5e9 !important;
    color: #fff !important;
    transform: rotate(10deg);
}

.service-card:hover .hover-arrow {
    opacity: 1;
    transform: translateX(5px);
}

.transition-all { transition: all 0.3s ease; }
</style>