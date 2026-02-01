<script setup>
// No script needed
</script>

<template>
  <main class="contact-page">
    
    <section class="py-5 bg-dark text-white text-center">
      <div class="container py-5">
        <h1 class="display-3 fw-bold">Contact Us</h1>
        <p class="lead text-white-50">We are ready to start your project. Reach out to us today.</p>
      </div>
    </section>

    <section class="py-5 bg-light mb-5" id="contact">
      <div class="container pb-5">
        <div class="row g-4">
          
          <div class="col-lg-7">
            <div class="bg-white p-5 rounded-3 shadow-sm h-100 border-top border-5 border-primary">
              
              <div class="d-flex align-items-center mb-4">
                 <div class="icon-circle bg-light text-primary me-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z"/>
                    </svg>
                 </div>
                 <h3 class="fw-bold text-navy m-0">Send a Direct Message</h3>
              </div>

              <form>
                  <div class="row mb-3">
                      <div class="col-md-6">
                          <label class="form-label small fw-bold text-muted">YOUR NAME</label>
                          <input type="text" class="form-control bg-light border-0 py-2" placeholder="Full Name">
                      </div>
                      <div class="col-md-6">
                          <label class="form-label small fw-bold text-muted">SUBJECT</label>
                           <input type="text" class="form-control bg-light border-0 py-2" placeholder="Inquiry Title">
                      </div>
                  </div>
                  <div class="mb-4">
                      <label class="form-label small fw-bold text-muted">YOUR MESSAGE</label>
                      <textarea class="form-control bg-light border-0" rows="5" placeholder="How can we help?"></textarea>
                  </div>
                  <button class="btn btn-primary w-100 fw-bold py-3">Send Message</button>
              </form>

            </div>
          </div>

          <div class="col-lg-5 d-flex flex-column gap-4">
             
             <div class="bg-success p-5 rounded-3 shadow-sm text-white text-center d-flex flex-column justify-content-center align-items-center position-relative overflow-hidden">
                <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" fill="currentColor" class="mb-3" viewBox="0 0 16 16">
                  <path d="M8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6-.097 1.016-.417 2.13-.771 2.966-.079.186.074.394.273.362 2.256-.37 3.597-.938 4.18-1.234A9.06 9.06 0 0 0 8 15z"/>
                </svg>

                <h3 class="fw-bold">Chat on WhatsApp</h3>
                <p class="mb-4 text-white-50">Need a quick response? Reach our team directly on WhatsApp.</p>
                
                <a href="https://wa.me/254790583820" target="_blank" class="btn btn-white text-success fw-bold px-5 py-3 rounded-pill shadow-lg">
                   Open WhatsApp
                </a>
             </div>
             
             <div class="bg-white p-4 rounded-3 shadow-sm border text-start">
                 <h6 class="fw-bold text-navy mb-3">Contact Details</h6>
                 <div class="d-flex align-items-center mb-2 text-muted small">
                     <span class="me-3 fs-5">📍</span> 
                     <span>Nairobi, Kenya</span>
                 </div>
                 <div class="d-flex align-items-center mb-2 text-muted small">
                     <span class="me-3 fs-5">📧</span> 
                     <span>info@rastrategicanalytics.com</span>
                 </div>
                 <div class="d-flex align-items-center text-muted small">
                     <span class="me-3 fs-5">📞</span> 
                     <span>+254-790-583-820</span>
                 </div>
             </div>

          </div>

        </div>
      </div>
    </section>

  </main>
</template>

<style scoped>
.bg-dark { background-color: #1a2b49 !important; }
.text-navy { color: #1a2b49; }
.border-primary { border-color: #1a2b49 !important; }
.btn-primary { background-color: #1a2b49; border: none; transition: all 0.2s; }
.btn-primary:hover { background-color: #0f1a2e; transform: translateY(-2px); }
.btn-white { background-color: white; color: #198754; border: none; }
.btn-white:hover { background-color: #f8f9fa; }

.icon-circle {
    width: 50px; height: 50px;
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
}
</style>