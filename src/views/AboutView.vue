<script setup>
import { store } from '../store'; 
import OrgStructure from '../components/OrgStructure.vue';
import Clients from '../components/Clients.vue';
// 1. IMPORT THE VALUES COMPONENT
import Values from '../components/Values.vue';
</script>

<template>
  <main class="about-page">
    
    <section class="page-header py-5 bg-navy text-white">
      <div class="container py-5 text-center">
        <h1 class="display-3 fw-bold mb-3" v-scroll-reveal>About RA Consulting</h1>
        <p class="lead text-white-50 mx-auto" style="max-width: 700px;" v-scroll-reveal="{ delay: 200 }">
          A multidisciplinary advisory firm offering comprehensive solutions in strategy development, research, policy analysis, and ICT systems.
        </p>
      </div>
    </section>

    <section class="py-5">
      <div class="container py-5">
        <div class="row align-items-center">
          <div class="col-lg-6 mb-4 mb-lg-0">
             <h6 class="text-uppercase text-sky ls-2 mb-3">Who We Are</h6>
             
             <h2 class="display-5 fw-bold mb-4 text-navy">{{ store.content.about.title }}</h2>
             
             <p class="text-muted mb-3" style="white-space: pre-line;">
               {{ store.content.about.text }}
             </p>
             
          </div>
          <div class="col-lg-6">
             <div class="bg-light rounded-4 p-5 text-center border d-flex align-items-center justify-content-center position-relative overflow-hidden" style="min-height: 350px;">
                <div class="text-muted z-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="#0ea5e9" class="mb-3 opacity-50" viewBox="0 0 16 16">
                      <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM5.216 14A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216z"/>
                      <path d="M4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z"/>
                    </svg>
                    <span class="d-block small fw-bold text-navy text-uppercase ls-2">Institutional Excellence</span>
                </div>
                <div class="position-absolute top-0 start-0 w-100 h-100 opacity-05 bg-grid"></div>
             </div>
          </div>
        </div>
      </div>
    </section>

    <Values />

    <OrgStructure />

    <Clients />

  </main>
</template>

<style scoped>
.bg-navy { background-color: #1a2b49 !important; }
.text-navy { color: #1a2b49 !important; }
.text-sky { color: #0ea5e9 !important; }
.ls-2 { letter-spacing: 2px; font-weight: 700; font-size: 0.85rem; }

.bg-grid {
    background-image: radial-gradient(#1a2b49 1px, transparent 1px);
    background-size: 20px 20px;
}
.opacity-05 { opacity: 0.05; }
</style>