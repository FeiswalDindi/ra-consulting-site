<script setup>
import { store } from '../store';
import { auth } from '../firebase';

const handleContactSubmit = () => {
  if (!auth.currentUser) {
    store.openModal();
  } else {
    alert(`Message Sent!`);
  }
};

const openWhatsApp = () => {
    // Replace with your actual number
    window.open('https://wa.me/254790583820', '_blank');
};
</script>

<template>
  <section id="contact" class="contact-section py-5 bg-white">
    <div class="container">
      
      <div class="row g-5">
        
        <div class="col-lg-7">
             <div class="bg-light p-5 rounded-3 shadow-sm h-100 border border-top-primary">
                <h4 class="fw-bold text-primary mb-4">📩 Send a Direct Message</h4>
                
                <form @submit.prevent="handleContactSubmit">
                    <div class="row mb-3">
                        <div class="col-md-6">
                            <label class="form-label small fw-bold text-uppercase text-muted">Your Name</label>
                            <input type="text" class="form-control bg-white" placeholder="Full Name" required>
                        </div>
                        <div class="col-md-6">
                            <label class="form-label small fw-bold text-uppercase text-muted">Subject</label>
                            <input type="text" class="form-control bg-white" placeholder="Inquiry Title">
                        </div>
                    </div>
                    <div class="mb-4">
                        <label class="form-label small fw-bold text-uppercase text-muted">Message</label>
                        <textarea class="form-control bg-white" rows="5" placeholder="How can we help?" required></textarea>
                    </div>
                    <button type="submit" class="btn btn-primary w-100 fw-bold py-3">
                        Send Message
                    </button>
                </form>
             </div>
        </div>

        <div class="col-lg-5">
            <div class="d-flex flex-column gap-4 h-100">
                
                <div class="whatsapp-card bg-success text-white p-4 rounded-3 shadow text-center position-relative overflow-hidden">
                    <div class="position-relative z-1">
                        <div class="mb-3 fs-1">💬</div>
                        <h4 class="fw-bold mb-2">Chat on WhatsApp</h4>
                        <p class="text-white-50 mb-4">Need a quick response? Reach our team directly on WhatsApp.</p>
                        <button @click="openWhatsApp" class="btn btn-light text-success fw-bold w-100 py-3 rounded-pill">
                            Open WhatsApp
                        </button>
                    </div>
                </div>

                <div class="info-card bg-white p-4 rounded-3 border flex-grow-1 shadow-sm">
                    <h5 class="fw-bold text-primary mb-4">Contact Details</h5>
                    
                    <div class="d-flex align-items-center gap-3 mb-4">
                        <div class="icon-circle bg-light text-primary">📍</div>
                        <div>
                            <span class="fw-bold d-block text-dark">Nairobi, Kenya</span>
                        </div>
                    </div>

                    <div class="d-flex align-items-center gap-3 mb-4">
                        <div class="icon-circle bg-light text-primary">📧</div>
                        <div>
                            <a href="mailto:info@rastrategicanalytics.com" class="text-dark text-decoration-none fw-bold">info@rastrategicanalytics.com</a>
                        </div>
                    </div>

                    <div class="d-flex align-items-center gap-3">
                        <div class="icon-circle bg-light text-primary">📞</div>
                        <div>
                            <span class="fw-bold d-block text-dark">+254-790-583-820</span>
                        </div>
                    </div>
                </div>

            </div>
        </div>

      </div>
    </div>
  </section>
</template>

<style scoped>
.text-primary { color: #1a2b49 !important; }
.bg-primary { background-color: #1a2b49 !important; }
.border-top-primary { border-top: 5px solid #1a2b49 !important; }

.icon-circle {
    width: 40px; height: 40px;
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-size: 1.2rem;
}
</style>