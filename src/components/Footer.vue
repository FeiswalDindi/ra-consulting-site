<script setup>
import { computed } from 'vue';
import { store } from '../store'; // Import the store
import { useRouter } from 'vue-router';

const router = useRouter();
const currentYear = computed(() => new Date().getFullYear());

// SMART ADMIN LOGIC
const handleAdminClick = () => {
  if (store.isAdmin) {
    // If already logged in as admin, go to dashboard
    router.push('/admin');
  } else {
    // If not, open the login popup so they CAN log in
    store.openModal();
  }
};
</script>

<template>
  <footer class="bg-navy text-white pt-5 pb-3 mt-auto position-relative" style="z-index: 100;">
    <div class="container">
      <div class="row g-4">
        
        <div class="col-lg-4 col-md-6">
          <h5 class="fw-bold mb-3 d-flex align-items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#c5a059" viewBox="0 0 16 16">
               <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zm.995-14.901a1 1 0 1 0-1.99 0A5.002 5.002 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901z"/>
            </svg>
            <span class="text-white">RA Consulting</span>
          </h5>
          <p class="text-white-50 small mb-4 pe-lg-4">
            Empowering institutions across Eastern Africa with data-driven insights, strategic policy advisory, and cutting-edge ICT solutions.
          </p>
          
          <div class="d-flex gap-3">
            <a href="#" class="social-icon" aria-label="LinkedIn">
               <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"/>
               </svg>
            </a>
            <a href="#" class="social-icon" aria-label="Twitter X">
               <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865l8.875 11.633Z"/>
               </svg>
            </a>
            <a href="#" class="social-icon" aria-label="Facebook">
               <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"/>
               </svg>
            </a>
          </div>
        </div>

        <div class="col-lg-2 col-md-6">
          <h6 class="fw-bold text-gold mb-3">Quick Links</h6>
          <ul class="list-unstyled d-flex flex-column gap-2 small">
            <li><router-link to="/" class="footer-link">Home</router-link></li>
            <li><router-link to="/about" class="footer-link">About Us</router-link></li>
            <li><router-link to="/services" class="footer-link">Services</router-link></li>
            <li><router-link to="/careers" class="footer-link">Work With Us</router-link></li>
            <li><router-link to="/insights" class="footer-link">Insights</router-link></li>
            
            <li>
                <a href="#" @click.prevent="handleAdminClick" class="footer-link text-white-50">
                    Administration
                </a>
            </li>
          </ul>
        </div>

        <div class="col-lg-3 col-md-6">
           <h6 class="fw-bold text-gold mb-3">Expertise</h6>
           <ul class="list-unstyled d-flex flex-column gap-2 small text-white-50">
             <li><router-link to="/services/research" class="footer-link">Research & Policy Advisory</router-link></li>
             <li><router-link to="/services/ict" class="footer-link">ICT & Data Analytics</router-link></li>
             <li><router-link to="/services/strategy" class="footer-link">Strategic Corporate Advisory</router-link></li>
             <li><router-link to="/services" class="footer-link">Training & Capacity Building</router-link></li>
           </ul>
        </div>

        <div class="col-lg-3 col-md-6">
           <h6 class="fw-bold text-gold mb-3">Contact</h6>
           <ul class="list-unstyled d-flex flex-column gap-2 small text-white-50">
             <li>Nairobi, Kenya</li>
             <li>info@rastrategicanalytics.com</li>
             <li>+254-790-583-820</li>
           </ul>
        </div>

      </div>
      <hr class="border-secondary my-4">
      <div class="text-center small text-white-50">
        &copy; {{ currentYear }} RA Strategic & Analytics Consulting Ltd. All Rights Reserved.
      </div>
    </div>
  </footer>
</template>

<style scoped>
.bg-navy { background-color: #1a2b49; }
.text-gold { color: #c5a059; }

.social-icon {
  width: 36px; height: 36px;
  background-color: rgba(255, 255, 255, 0.1);
  color: white;
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.1);
}
.social-icon:hover {
  background-color: #c5a059;
  color: #1a2b49;
  transform: translateY(-3px);
  border-color: #c5a059;
}

.footer-link {
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  transition: color 0.2s;
  cursor: pointer;
}
.footer-link:hover { color: #c5a059; padding-left: 5px; }
</style>