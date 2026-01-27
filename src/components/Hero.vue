<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

// Image URLs for the slideshow (Professional/Consulting themed)
const images = [
  'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1920&q=80', // Team Meeting
  'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1920&q=80', // Strategy Board
  'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1920&q=80', // Skyscrapers
  'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1920&q=80'  // Data Analytics
];

const currentIndex = ref(0);
let intervalId;

// Change image every 4 seconds
const startSlideshow = () => {
  intervalId = setInterval(() => {
    currentIndex.value = (currentIndex.value + 1) % images.length;
  }, 4000);
};

onMounted(() => {
  startSlideshow();
});

onUnmounted(() => {
  clearInterval(intervalId);
});
</script>

<template>
  <div class="hero-section">
    
    <div class="slideshow-container">
      <div 
        v-for="(img, index) in images" 
        :key="index"
        class="slide-image"
        :class="{ 'active': index === currentIndex }"
        :style="{ backgroundImage: `url(${img})` }"
      ></div>
      <div class="hero-overlay"></div>
    </div>

    <div class="container position-relative z-2 text-center text-white hero-content">
      <div class="mb-4 fade-in-up">
        <span class="badge bg-warning text-dark px-3 py-2 rounded-pill fw-bold text-uppercase tracking-wider">
          Trusted by Industry Leaders
        </span>
      </div>

      <h1 class="display-3 fw-bold mb-4 fade-in-up delay-1">
        Strategic Insights.<br>
        <span class="text-warning">Sustainable Impact.</span>
      </h1>
      
      <p class="lead mb-5 mx-auto fade-in-up delay-2" style="max-width: 700px; opacity: 0.9;">
        We empower institutions across East Africa with data-driven research, 
        governance advisory, and strategic planning solutions.
      </p>
      
      <div class="d-grid gap-3 d-sm-flex justify-content-sm-center fade-in-up delay-3">
        <a href="#services" class="btn btn-primary btn-lg px-5 py-3 fw-bold rounded-pill shadow-lg hover-lift">
          Explore Services
        </a>
        <router-link to="/contact" class="btn btn-outline-light btn-lg px-5 py-3 fw-bold rounded-pill hover-lift">
          Contact Us
        </router-link>
      </div>
    </div>

    <div class="custom-shape-divider-bottom">
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" class="shape-fill"></path>
        </svg>
    </div>

  </div>
</template>

<style scoped>
.hero-section {
  position: relative;
  height: 100vh; /* Full Screen Height */
  min-height: 600px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background-color: #1a2b49;
}

/* --- SLIDESHOW STYLES --- */
.slideshow-container {
  position: absolute;
  top: 0; left: 0; width: 100%; height: 100%;
  z-index: 0;
}

.slide-image {
  position: absolute;
  top: 0; left: 0; width: 100%; height: 100%;
  background-size: cover;
  background-position: center;
  opacity: 0;
  transition: opacity 1.5s ease-in-out, transform 6s ease; /* Smooth Fade & Zoom */
  transform: scale(1);
}

.slide-image.active {
  opacity: 1;
  transform: scale(1.05); /* Slow Zoom Effect */
}

.hero-overlay {
  position: absolute;
  top: 0; left: 0; width: 100%; height: 100%;
  background: linear-gradient(to bottom, rgba(26, 43, 73, 0.8), rgba(26, 43, 73, 0.6));
  z-index: 1;
}

/* --- CONTENT ANIMATIONS --- */
.hero-content {
  z-index: 2;
}

.fade-in-up {
  opacity: 0;
  transform: translateY(20px);
  animation: fadeInUp 0.8s forwards;
}

.delay-1 { animation-delay: 0.2s; }
.delay-2 { animation-delay: 0.4s; }
.delay-3 { animation-delay: 0.6s; }

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.hover-lift { transition: transform 0.2s; }
.hover-lift:hover { transform: translateY(-3px); }

.tracking-wider { letter-spacing: 2px; }

/* --- WAVE SHAPE --- */
.custom-shape-divider-bottom {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    overflow: hidden;
    line-height: 0;
    z-index: 2;
}

.custom-shape-divider-bottom svg {
    position: relative;
    display: block;
    width: calc(100% + 1.3px);
    height: 100px;
}

.custom-shape-divider-bottom .shape-fill {
    fill: #FFFFFF;
}
</style>