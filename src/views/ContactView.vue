<script setup>
import Contact from '../components/Contact.vue';
</script>

<template>
  <main class="contact-page">
    
    <section class="py-5 bg-dark text-white text-center">
      <div class="container py-5">
        <h1 class="display-3 fw-bold">Contact Us</h1>
        <p class="lead text-white-50">We are ready to start your project. Reach out to us today.</p>
      </div>
    </section>

    <Contact />

  </main>
</template>

<style scoped>
.bg-dark { background-color: #1a2b49 !important; }
</style>