<script setup>
import { ref, onMounted } from 'vue';

const showConsent = ref(false);

onMounted(() => {
  const accepted = localStorage.getItem('cookiesAccepted');
  if (!accepted) {
    showConsent.value = true;
  }
});

const accept = () => {
  localStorage.setItem('cookiesAccepted', 'true');
  showConsent.value = false;
};
</script>

<template>
  <transition name="slide-up">
    <div v-if="showConsent" class="cookie-banner">
      <div class="container d-flex flex-column flex-md-row align-items-center justify-content-between gap-3">
        <p class="mb-0 text-white small">
          We use cookies to improve your experience. By continuing, you agree to our use of cookies.
        </p>
        <div class="d-flex gap-2">
          <button @click="accept" class="btn btn-sm btn-light fw-bold px-4 rounded-pill">Accept</button>
          <button @click="showConsent = false" class="btn btn-sm btn-outline-light rounded-pill">Close</button>
        </div>
      </div>
    </div>
  </transition>
</template>

<style scoped>
.cookie-banner {
  position: fixed; bottom: 20px; left: 50%; transform: translateX(-50%);
  width: 90%; max-width: 900px;
  background: rgba(26, 43, 73, 0.95);
  backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px);
  padding: 15px 20px; border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.3); z-index: 9999;
  border: 1px solid rgba(255, 255, 255, 0.1);
}
.slide-up-enter-active, .slide-up-leave-active { transition: all 0.5s ease; }
.slide-up-enter-from, .slide-up-leave-to { transform: translate(-50%, 100px); opacity: 0; }
</style>