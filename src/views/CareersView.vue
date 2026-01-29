<script setup>
// Simple script
</script>

<template>
  <main class="careers-page">
    
    <section class="page-header py-5 bg-dark text-white text-center">
      <div class="container py-5">
        <h6 class="text-uppercase text-info ls-2 mb-2">Grow With Us</h6>
        <h1 class="display-3 fw-bold mb-3">Work With Us</h1>
        <p class="lead text-white-50 mx-auto" style="max-width: 700px;">
          Join a team of innovators, analysts, and strategists dedicated to transforming institutions across Eastern Africa.
        </p>
      </div>
    </section>

    <section class="py-5">
      <div class="container">
        <div class="row g-5">
            
            <div class="col-lg-6">
                <div class="p-5 border rounded-3 h-100 bg-light">
                    <span class="display-4 mb-3 d-block">🚀</span>
                    <h3 class="fw-bold text-primary">Careers & Internships</h3>
                    <p class="text-muted mb-4">
                        We are always looking for talented Policy Analysts, Data Scientists, and Strategy Consultants.
                    </p>
                    <ul class="list-unstyled text-muted mb-4">
                        <li class="mb-2">✔ Competitive Remuneration</li>
                        <li class="mb-2">✔ Professional Development</li>
                        <li class="mb-2">✔ Impact-Driven Projects</li>
                    </ul>
                    <a href="mailto:careers@rastrategicanalytics.com" class="btn btn-primary rounded-pill px-4">
                        Send Your CV
                    </a>
                </div>
            </div>

            <div class="col-lg-6">
                <div class="p-5 border rounded-3 h-100 bg-white shadow-sm">
                    <span class="display-4 mb-3 d-block">🤝</span>
                    <h3 class="fw-bold text-primary">Partner With Us</h3>
                    <p class="text-muted mb-4">
                        Are you a specialized consultant or a technology firm? Let's collaborate to deliver superior value to our clients.
                    </p>
                    <p class="text-muted mb-4">
                        We actively partner with NGOs, Academic Institutions, and Tech Providers.
                    </p>
                    <router-link to="/contact" class="btn btn-outline-primary rounded-pill px-4">
                        Contact Partnership Team
                    </router-link>
                </div>
            </div>

        </div>
      </div>
    </section>

  </main>
</template>

<style scoped>
.bg-dark { background-color: #1a2b49 !important; }
.text-primary { color: #1a2b49 !important; }
.text-info { color: #0d6efd !important; }
</style>