<script setup>
import { ref, onMounted, onUnmounted, computed, watch } from 'vue';
import { store } from '../store';

// 1. Accept optional "previewData" prop (For Admin Preview)
const props = defineProps({
  previewData: {
    type: Array,
    default: null
  }
});

// 2. Decide which data to use (Prop vs. Store)
const slides = computed(() => {
  return props.previewData || store.content.heroSlides;
});

// Slide Logic
const currentSlide = ref(0);
let slideInterval;

const nextSlide = () => {
  if (slides.value.length > 0) {
    currentSlide.value = (currentSlide.value + 1) % slides.value.length;
  }
};

// Reset slide if data changes (important for previewing)
watch(slides, () => {
    currentSlide.value = 0;
}, { deep: true });

// Auto-play slides every 5 seconds
onMounted(() => {
  slideInterval = setInterval(nextSlide, 5000);
});

onUnmounted(() => {
  clearInterval(slideInterval);
});
</script>

<template>
  <header class="hero-section text-white d-flex align-items-center position-relative overflow-hidden">
    
    <div 
      v-for="(slide, index) in slides" 
      :key="index"
      class="hero-bg"
      :style="{ backgroundImage: `url(${slide.image})` }"
      :class="{ 'active': currentSlide === index }"
    ></div>

    <div class="overlay"></div>

    <div class="container position-relative z-2 text-center">
        <div class="row justify-content-center">
            <div class="col-lg-10">
                
                <transition name="fade" mode="out-in">
                  <div :key="currentSlide" v-if="slides[currentSlide]">
                    <h1 class="display-3 fw-bold mb-4 animate-title">
                        {{ slides[currentSlide].title }}
                    </h1>
                    <p class="lead mb-5 opacity-75 fs-4 animate-subtitle">
                        {{ slides[currentSlide].subtitle }}
                    </p>
                  </div>
                </transition>
                
                  <div class="d-flex flex-column flex-md-row justify-content-center gap-3 animate-buttons w-100 px-4 px-md-0">
    
    <router-link to="/services" class="btn btn-light btn-lg px-5 py-3 rounded-pill fw-bold text-primary shadow-lg w-sm-100">
        {{ store.content.hero.buttonText }}
    </router-link>
    
    <router-link to="/contact" class="btn btn-outline-light btn-lg px-5 py-3 rounded-pill fw-bold w-sm-100">
        Partner With Us
    </router-link>

</div>

                

                <div class="d-flex justify-content-center gap-2 mt-5">
                  <span 
                    v-for="(slide, index) in slides" 
                    :key="index"
                    class="dot"
                    :class="{ 'active': currentSlide === index }"
                    @click="currentSlide = index"
                  ></span>
                </div>

            </div>
        </div>
    </div>
  </header>
</template>

<style scoped>
.hero-section {
    height: 100vh;
    min-height: 600px;
    background-color: #1a2b49; 
    position: relative;
}

/* Background Slide Styling */
.hero-bg {
    position: absolute;
    top: 0; left: 0; width: 100%; height: 100%;
    background-size: cover;
    background-position: center;
    opacity: 0;
    transition: opacity 1.5s ease-in-out, transform 6s ease;
    transform: scale(1);
    z-index: 0;
}

.hero-bg.active {
    opacity: 1;
    transform: scale(1.05); 
}

.overlay {
    position: absolute; top: 0; left: 0; width: 100%; height: 100%;
    background: linear-gradient(135deg, rgba(26, 43, 73, 0.9), rgba(26, 43, 73, 0.7));
    z-index: 1;
}

/* Transitions */
.fade-enter-active, .fade-leave-active { transition: opacity 0.5s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

.dot {
  width: 12px; height: 12px;
  background: rgba(255,255,255,0.3);
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s;
}
.dot.active { background: white; transform: scale(1.2); }

.chat-toggle {
    height: 60px;
    min-width: 60px;
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    background-color: #1a2b49;
    border: 2px solid white;
    overflow: hidden;
}

.chat-toggle.expanded {
    width: auto; /* Allow it to grow */
    padding-left: 15px;
    padding-right: 15px;
}
</style>