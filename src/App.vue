<script setup>
  // Import the components
  import Navbar from './components/Navbar.vue';
  import LoginModal from './components/LoginModal.vue';
  import CookieBanner from './components/CookieBanner.vue';
  import GoogleOneTap from './components/GoogleOneTap.vue';
</script>

<template>
  <Navbar />
  <router-view></router-view>

  <LoginModal />
  <CookieBanner />
  <GoogleOneTap />
</template>