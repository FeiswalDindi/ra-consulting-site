<script setup>
// No script logic needed, just static display
</script>

<template>
  <section class="py-5 bg-light">
    <div class="container">
      <div class="row justify-content-center text-center mb-5" v-scroll-reveal>
        <div class="col-lg-8">
          <h6 class="text-uppercase text-primary ls-2">Industries We Serve</h6>
          <h2 class="fw-bold">Specialized Expertise</h2>
          <div class="divider mx-auto mt-3"></div>
        </div>
      </div>

      <div class="row g-4" v-scroll-reveal="{ delay: 200 }">
          <div class="col-md-6 col-lg-3">
              <div class="sector-card text-center p-4 bg-white rounded-3 shadow-sm h-100">
                  <div class="icon mb-3">🏛️</div>
                  <h5 class="fw-bold text-primary">Public & Private Sector</h5>
                  [cite_start]<p class="small text-muted mb-0">Enhancing governance and operational efficiency[cite: 88].</p>
              </div>
          </div>

          <div class="col-md-6 col-lg-3">
              <div class="sector-card text-center p-4 bg-white rounded-3 shadow-sm h-100">
                  <div class="icon mb-3">🎓</div>
                  <h5 class="fw-bold text-primary">NGOs & Academia</h5>
                  [cite_start]<p class="small text-muted mb-0">Driving research impact and sustainable development[cite: 90].</p>
              </div>
          </div>

          <div class="col-md-6 col-lg-3">
              <div class="sector-card text-center p-4 bg-white rounded-3 shadow-sm h-100">
                  <div class="icon mb-3">💰</div>
                  <h5 class="fw-bold text-primary">Banking & Finance</h5>
                  [cite_start]<p class="small text-muted mb-0">Risk management and financial diagnostics[cite: 95].</p>
              </div>
          </div>

          <div class="col-md-6 col-lg-3">
              <div class="sector-card text-center p-4 bg-white rounded-3 shadow-sm h-100">
                  <div class="icon mb-3">📡</div>
                  <h5 class="fw-bold text-primary">Telco & Media</h5>
                  [cite_start]<p class="small text-muted mb-0">Digital transformation and data analytics[cite: 96].</p>
              </div>
          </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.text-primary { color: #1a2b49 !important; }
.ls-2 { letter-spacing: 2px; font-size: 0.85rem; font-weight: 700; }
.divider { width: 60px; height: 3px; background: #1a2b49; }
.icon { font-size: 2.5rem; }

.sector-card {
    transition: transform 0.3s ease, border-color 0.3s ease;
    border-top: 4px solid transparent;
}

.sector-card:hover {
    transform: translateY(-10px);
    border-top: 4px solid #1a2b49; /* Industrial Navy accent on hover */
}
</style>