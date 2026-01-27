<script setup>
  import Navbar from './components/Navbar.vue';
  import LoginModal from './components/LoginModal.vue'; // <--- Import it
</script>

<template>
  <LoginModal /> <router-view></router-view>
</template>