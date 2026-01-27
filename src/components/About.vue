<script setup>
import { ref } from 'vue';
import { store } from '../store'; // Global store for popup
import { auth } from '../firebase'; // Auth check

const isExpanded = ref(false);

const handleReadMore = () => {
  // 1. Security Check
  if (!auth.currentUser) {
    store.openModal(); // Open popup if not logged in
  } else {
    isExpanded.value = true; // Reveal text if logged in
  }
};
</script>

<template>
  <section class="py-5" id="about">
    <div class="container">
      <div class="row align-items-center">
        
        <div class="col-lg-5 mb-4 mb-lg-0">
          <h2 class="fw-bold text-primary display-5">About Us</h2>
          <div class="line-accent mb-4"></div>
          <p class="lead text-muted">
            RA Strategic & Analytics Consulting Ltd is a multidisciplinary advisory firm offering comprehensive solutions.
          </p>
        </div>

        <div class="col-lg-7">
          <div class="content-wrapper" :class="{ 'expanded': isExpanded }">
            
            <div class="text-content">
              <p>
                We support organizations across Eastern Africa to enhance performance, strengthen governance, and achieve sustainable growth. Our approach blends analytical rigor with practical implementation to ensure measurable impact.
              </p>
              <p>
                Our team consists of industry veterans and data scientists dedicated to solving complex business challenges. We believe in evidence-based decision making, utilizing advanced analytics to uncover hidden opportunities for our clients.
              </p>
              <p>
                From strategic planning to digital transformation, we partner with you every step of the way. We don't just provide reports; we provide roadmaps for success in an increasingly competitive landscape. Our core philosophy is built on integrity, innovation, and long-term partnership.
              </p>
              <p>
                <strong>Why Choose Us?</strong> We combine local market knowledge with global best practices. Our solutions are tailored, not templated. We understand the nuances of the East African market and are committed to driving real, tangible value for your stakeholders.
              </p>
            </div>

            <div class="blur-overlay" v-if="!isExpanded"></div>
          
          </div>

          <button 
            v-if="!isExpanded" 
            @click="handleReadMore" 
            class="btn btn-outline-primary mt-3 px-4 rounded-pill fw-bold"
          >
            Read More
          </button>
        </div>

      </div>
    </div>
  </section>
</template>

<style scoped>
.line-accent {
  width: 60px;
  height: 4px;
  background-color: #1a2b49;
  border-radius: 2px;
}

/* --- THE GATED LOGIC --- */

.content-wrapper {
  position: relative;
  /* Default State: Collapsed */
  max-height: 180px; 
  overflow: hidden; 
  transition: max-height 0.8s ease-in-out; /* Smooth slide open */
}

/* Expanded State: No limit */
.content-wrapper.expanded {
  max-height: 1000px; /* Big enough number to fit all text */
}

/* The Fade Out Effect */
.blur-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100px;
  /* Gradient from transparent to white */
  background: linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1));
  pointer-events: none; /* Let clicks pass through if needed */
}
</style>