<script setup>
import Navbar from '../components/Navbar.vue'; // Import Navbar so it shows on this page
import ContactFooter from '../components/Contact.vue'; // Import Footer
import { store } from '../store';
import { auth } from '../firebase';

// The Gatekeeper Logic
const handleContactSubmit = () => {
  if (!auth.currentUser) {
    store.openModal(); // Open Glassy Modal if logged out
  } else {
    alert(`Message Sent! Thank you, ${auth.currentUser.email || auth.currentUser.displayName}`);
  }
};
</script>

<template>
  <Navbar />
  
  <div class="contact-page-container">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-lg-8">
          <div class="bg-white p-5 rounded shadow-lg form-wrapper">
            <h2 class="fw-bold text-primary text-center mb-3">Contact Our Team</h2>
            <p class="text-muted text-center mb-5">
               Please log in to send us a direct message. We look forward to hearing from you.
            </p>

            <form @submit.prevent="handleContactSubmit">
              <div class="row mb-3">
                <div class="col-md-6">
                  <label class="form-label fw-bold text-secondary">Your Name</label>
                  <input type="text" class="form-control bg-light" placeholder="John Doe">
                </div>
                <div class="col-md-6">
                   <label class="form-label fw-bold text-secondary">Subject</label>
                   <input type="text" class="form-control bg-light" placeholder="Project Inquiry">
                </div>
              </div>
              <div class="mb-4">
                  <label class="form-label fw-bold text-secondary">Your Message</label>
                  <textarea class="form-control bg-light" rows="5" placeholder="How can we help?" required></textarea>
              </div>
              <button type="submit" class="btn btn-primary w-100 fw-bold py-3 fs-5">
                  Send Message
              </button>
            </form>

          </div>
        </div>
      </div>
    </div>
  </div>

  <ContactFooter />
</template>

<style scoped>
.contact-page-container {
  padding-top: 120px; /* Space for fixed navbar */
  padding-bottom: 80px;
  background-color: #f8f9fa; /* Light gray background */
  min-height: 60vh;
}

.form-wrapper {
  border-top: 5px solid #1a2b49;
}

/* Better focus state for inputs */
.form-control:focus {
    border-color: #1a2b49;
    box-shadow: 0 0 0 0.2rem rgba(26, 43, 73, 0.25);
    background-color: white;
}
</style>