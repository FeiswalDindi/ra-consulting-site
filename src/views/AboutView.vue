<script setup>
import { store } from '../store'; // <--- 1. IMPORT THE STORE
import OrgStructure from '../components/OrgStructure.vue';
import Clients from '../components/Clients.vue';
</script>

<template>
  <main class="about-page">
    
    <section class="page-header py-5 bg-dark text-white">
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
             <h6 class="text-uppercase text-primary ls-2 mb-3">Who We Are</h6>
             
             <h2 class="display-5 fw-bold mb-4">{{ store.content.about.title }}</h2>
             
             <p class="text-muted mb-3" style="white-space: pre-line;">
               {{ store.content.about.text }}
             </p>
             
          </div>
          <div class="col-lg-6">
             <div class="bg-light rounded-3 p-5 text-center border d-flex align-items-center justify-content-center" style="min-height: 300px;">
                <div class="text-muted">
                    <span class="display-4 d-block mb-2">🏢</span>
                    <small>Team / Office Image Placeholder</small>
                </div>
             </div>
          </div>
        </div>
      </div>
    </section>

    <section class="py-5 bg-light">
      <div class="container">
        <div class="row justify-content-center text-center mb-5">
          <div class="col-lg-8">
            <h6 class="text-uppercase text-primary ls-2">Our Ethos</h6>
            <h2 class="fw-bold">Our Core Values</h2>
          </div>
        </div>
        
        <div class="row g-4">
          <div class="col-md-6 col-lg-3">
            <div class="value-card h-100 p-4 bg-white shadow-sm rounded-3">
              <div class="icon mb-3 fs-1">🤝</div>
              <h4 class="fw-bold mb-3">Integrity</h4>
              <p class="small text-muted mb-0">We conduct all our work with honesty, transparency, and ethical responsibility.</p>
            </div>
          </div>
          <div class="col-md-6 col-lg-3">
            <div class="value-card h-100 p-4 bg-white shadow-sm rounded-3">
              <div class="icon mb-3 fs-1">💡</div>
              <h4 class="fw-bold mb-3">Innovation</h4>
              <p class="small text-muted mb-0">We embrace creativity, technology, and data science to solve emerging challenges.</p>
            </div>
          </div>
          <div class="col-md-6 col-lg-3">
            <div class="value-card h-100 p-4 bg-white shadow-sm rounded-3">
              <div class="icon mb-3 fs-1">🚀</div>
              <h4 class="fw-bold mb-3">Impact</h4>
              <p class="small text-muted mb-0">Our work is purpose-driven, focusing on solutions that create measurable value.</p>
            </div>
          </div>
          <div class="col-md-6 col-lg-3">
            <div class="value-card h-100 p-4 bg-white shadow-sm rounded-3">
              <div class="icon mb-3 fs-1">🌍</div>
              <h4 class="fw-bold mb-3">Collaboration</h4>
              <p class="small text-muted mb-0">We believe the best solutions are co-created with clients and stakeholders.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <OrgStructure />

    <Clients />

  </main>
</template>

<style scoped>
.text-primary { color: #1a2b49 !important; }
.bg-dark { background-color: #1a2b49 !important; }
.ls-2 { letter-spacing: 2px; font-weight: 700; font-size: 0.85rem; }

.value-card {
  transition: transform 0.3s ease;
  border-top: 4px solid transparent;
}
.value-card:hover {
  transform: translateY(-10px);
  border-color: #1a2b49;
}
</style>