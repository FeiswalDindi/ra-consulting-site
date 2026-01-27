<script setup>
const currentYear = new Date().getFullYear();
</script>

<template>
  <footer class="bg-primary text-white pt-5 pb-3" id="contact">
    <div class="container">
      
      <div class="row mb-5 justify-content-center text-center">
         <div class="col-lg-8">
            <h3 class="fw-bold mb-3">Ready to start your project?</h3>
            <p class="text-white-50 mb-4">Click below to go to our dedicated contact page and send us a message.</p>
            <router-link to="/contact" class="btn btn-light btn-lg px-5 fw-bold rounded-pill">
                Send Us a Message!
            </router-link>
         </div>
       </div>
       <hr class="border-white-50 my-5">

      <div class="row">
        <div class="col-md-4 mb-4">
          <h5 class="fw-bold text-uppercase mb-3">RA Consulting</h5>
          <p class="small text-white-50">
            Empowering institutions with strategic and data-driven solutions.
          </p>
        </div>

        <div class="col-md-4 mb-4">
          <h5 class="fw-bold text-uppercase mb-3">Quick Links</h5>
          <ul class="list-unstyled">
            <li><router-link to="/" class="text-white-50 text-decoration-none">Home</router-link></li>
            <li><a href="/#about" class="text-white-50 text-decoration-none">About Us</a></li>
            <li><a href="/#services" class="text-white-50 text-decoration-none">Services</a></li>
            <li><a href="#contact" class="text-white-50 text-decoration-none">Contact Us</a></li>
          </ul>
        </div>

<div class="col-md-4 mb-4">
          <h5 class="fw-bold text-uppercase mb-3">Connect With Us</h5>
          <ul class="list-unstyled mb-4">
            <li class="mb-2"><a href="mailto:info@rastrategicanalytics.com" class="text-white">info@rastrategicanalytics.com</a></li>
            <li class="mb-2"><span class="text-white">+254-790-583-820</span></li>
          </ul>

          <h6 class="fw-bold text-uppercase small text-white-50 mb-3">Follow Us</h6>
          <div class="d-flex gap-3 social-icons">
            <a href="#" class="social-link">
               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
            </a>
            <a href="#" class="social-link">
               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </a>
            <a href="#" class="social-link">
               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>
            </a>
            <a href="#" class="social-link">
               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
            </a>
          </div>
        </div>
      </div>

      <div class="text-center small text-white-50 mt-4">
        &copy; {{ currentYear }} RA Strategic & Analytics Consulting Ltd. All Rights Reserved.
      </div>
    </div>
  </footer>
</template>

<style scoped>
a:hover { color: white !important; text-decoration: underline !important; }
.social-link {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 50%;
    color: white;
    transition: all 0.3s;
}

.social-link:hover {
    background: white;
    color: #1a2b49; /* Primary Blue */
    transform: translateY(-3px);
}
</style>