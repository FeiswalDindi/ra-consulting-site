<script setup>
import { computed } from 'vue';
import { store } from '../store'; // <--- THIS WAS LIKELY MISSING

const currentYear = computed(() => new Date().getFullYear());
</script>

<template>
  <footer class="bg-dark text-white pt-5 pb-3 mt-auto">
    <div class="container">
      <div class="row">
        
        <div class="col-md-4 mb-4">
          <h5 class="fw-bold text-uppercase mb-3">RA Consulting</h5>
          <p class="text-white-50 small">
            Empowering institutions with strategic and data-driven solutions.
          </p>
        </div>

        <div class="col-md-4 mb-4">
          <h5 class="fw-bold text-uppercase mb-3">Quick Links</h5>
          <ul class="list-unstyled">
            <li><router-link to="/" class="text-white-50 text-decoration-none">Home</router-link></li>
            <li><router-link to="/about" class="text-white-50 text-decoration-none">About Us</router-link></li>
            <li><router-link to="/services" class="text-white-50 text-decoration-none">Services</router-link></li>
            <li><router-link to="/contact" class="text-white-50 text-decoration-none">Contact Us</router-link></li>
            
            <li>
                <a href="#" @click.prevent="store.openModal()" class="text-white-50 text-decoration-none small opacity-50">
                    Administration
                </a>
            </li>
          </ul>
        </div>

        <div class="col-md-4 mb-4">
          <h5 class="fw-bold text-uppercase mb-3">Connect With Us</h5>
          <p class="text-white-50 small mb-1">
            <a href="mailto:info@rastrategicanalytics.com" class="text-white-50 text-decoration-none">info@rastrategicanalytics.com</a>
          </p>
          <p class="text-white-50 small">
            +254-790-583-820
          </p>
          
          <div class="d-flex gap-3 mt-3">
             <a href="#" class="text-white fs-5"><i class="bi bi-linkedin"></i></a>
             <a href="#" class="text-white fs-5"><i class="bi bi-twitter-x"></i></a>
             <a href="#" class="text-white fs-5"><i class="bi bi-facebook"></i></a>
             <a href="#" class="text-white fs-5"><i class="bi bi-instagram"></i></a>
          </div>
        </div>

      </div>

      <hr class="border-secondary my-4">

      <div class="row align-items-center">
        <div class="col-md-6 text-center text-md-start">
             <a href="#" class="text-white-50 text-decoration-none small me-3">Privacy Policy</a>
             <a href="#" class="text-white-50 text-decoration-none small">Terms of Service</a>
        </div>
        <div class="col-md-6 text-center text-md-end">
            <p class="text-white-50 small mb-0">
                &copy; {{ currentYear }} RA Strategic & Analytics Consulting Ltd. All Rights Reserved.
            </p>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.bg-dark { background-color: #1a2b49 !important; }
</style>