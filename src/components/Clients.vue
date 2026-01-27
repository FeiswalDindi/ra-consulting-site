<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

// Using placeholders. Ideally, replace these with real logo images from your assets
const clients = [
    { name: "KCA University", logo: "https://via.placeholder.com/150x60?text=KCA+Uni" },
    { name: "Safaricom", logo: "https://via.placeholder.com/150x60?text=Safaricom" },
    { name: "Equity Bank", logo: "https://via.placeholder.com/150x60?text=Equity" },
    { name: "Direct Aid", logo: "https://via.placeholder.com/150x60?text=Direct+Aid" },
    { name: "Kenya Govt", logo: "https://via.placeholder.com/150x60?text=GoK" },
    { name: "UN Habitat", logo: "https://via.placeholder.com/150x60?text=UN+Habitat" },
    { name: "Britam", logo: "https://via.placeholder.com/150x60?text=Britam" }
];

// Duplicate the list to create the infinite loop effect
const scrollClients = [...clients, ...clients];

const track = ref(null);
const isPaused = ref(false);

// Manual Navigation Logic
const scrollLeft = () => {
  if (track.value) {
    track.value.scrollBy({ left: -200, behavior: 'smooth' });
  }
};

const scrollRight = () => {
  if (track.value) {
    track.value.scrollBy({ left: 200, behavior: 'smooth' });
  }
};
</script>

<template>
  <section class="py-5 bg-white border-top border-bottom" id="clients">
    <div class="container">
      
      <div class="row text-center mb-4" v-scroll-reveal>
        <div class="col-12">
          <h6 class="text-uppercase text-muted fw-bold ls-2 small mb-2">Trusted By Industry Leaders</h6>
        </div>
      </div>

      <div class="marquee-wrapper position-relative">
        
        <button @click="scrollLeft" class="nav-arrow left-arrow shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
        </button>

        <div 
            class="marquee-track-container" 
            ref="track"
            @mouseenter="isPaused = true"
            @mouseleave="isPaused = false"
        >
            <div class="marquee-track" :class="{ 'paused': isPaused }">
                <div 
                    v-for="(client, index) in scrollClients" 
                    :key="index" 
                    class="client-item"
                >
                    <img :src="client.logo" :alt="client.name" class="client-logo grayscale">
                </div>
            </div>
        </div>

        <button @click="scrollRight" class="nav-arrow right-arrow shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
        </button>

      </div>

    </div>
  </section>
</template>

<style scoped>
.ls-2 { letter-spacing: 2px; }

.marquee-wrapper {
    display: flex;
    align-items: center;
    position: relative;
    max-width: 1000px;
    margin: 0 auto;
}

/* --- THE TRACK (Container that hides overflow) --- */
.marquee-track-container {
    overflow: hidden; /* Hide anything outside the box */
    width: 100%;
    position: relative;
    padding: 20px 0;
    /* Fade out edges for smoothness */
    mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
    -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
}

/* --- THE ANIMATION --- */
.marquee-track {
    display: flex;
    gap: 60px; /* Space between logos */
    width: max-content; /* Ensure it stretches */
    animation: scroll 30s linear infinite; /* The Magic: Infinite Scroll */
}

/* Pause animation on hover or click */
.marquee-track.paused {
    animation-play-state: paused;
}

@keyframes scroll {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); } /* Move half-way (since we duplicated the list) */
}

/* --- LOGO STYLES --- */
.client-logo {
    height: 40px; /* Uniform height */
    width: auto;
    opacity: 0.5; /* Start dim */
    filter: grayscale(100%); /* Start Black & White */
    transition: all 0.3s ease;
    object-fit: contain;
}

.client-item:hover .client-logo {
    opacity: 1;
    filter: grayscale(0%); /* Color on hover */
    transform: scale(1.1);
}

/* --- ARROW BUTTONS --- */
.nav-arrow {
    background: white;
    border: 1px solid #eee;
    width: 40px; height: 40px;
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    cursor: pointer;
    z-index: 2;
    color: #1a2b49;
    transition: all 0.2s;
    /* Keep them tight to the slider */
    flex-shrink: 0;
}

.nav-arrow:hover {
    background: #1a2b49;
    color: white;
    transform: scale(1.1);
}

.left-arrow { margin-right: 15px; }
.right-arrow { margin-left: 15px; }

/* Responsive adjustments */
@media (max-width: 768px) {
    .nav-arrow { display: none; } /* Hide arrows on mobile, just let it scroll */
    .marquee-track { gap: 40px; animation-duration: 20s; }
}
</style>