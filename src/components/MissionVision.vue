<script setup>
// Static content
</script>

<template>
  <section class="strategic-section py-5">
    <div class="container">
      <div class="row align-items-center">
        
        <div class="col-lg-6 mb-5 mb-lg-0 pe-lg-5" v-scroll-reveal>
          <h6 class="text-uppercase ls-2 text-primary mb-2">Who We Are</h6>
          <h2 class="display-5 fw-bold mb-4">Strategic Insights, Sustainable Impact.</h2>
          <p class="lead text-muted mb-4">
            RA Strategic & Analytics Consulting Ltd is a multidisciplinary advisory firm offering comprehensive solutions in strategy development, research, policy analysis, and ICT systems.
          </p>
          <p class="text-muted mb-4">
            We support organizations across Eastern Africa to enhance performance, strengthen governance, and achieve sustainable growth. Our approach blends analytical rigor with practical implementation [cite: 24-26].
          </p>
          <router-link to="/about" class="btn btn-primary rounded-pill px-4 py-2 fw-bold">
            Read Our Full Story
          </router-link>
        </div>

        <div class="col-lg-6">
            <div class="row g-4">
                
                <div class="col-12" v-scroll-reveal="{ delay: 100 }">
                    <div class="mv-card mission-card">
                        <div class="icon-wrapper">
                             <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></svg>
                        </div>
                        <div class="text-wrapper">
                            <h4 class="fw-bold text-white mb-2">Our Mission</h4>
                            <p class="text-white-50 mb-0 small">
                                To empower institutions with strategic and data-driven solutions that deliver sustainable impact[cite: 42].
                            </p>
                        </div>
                    </div>
                </div>

                <div class="col-12" v-scroll-reveal="{ delay: 200 }">
                    <div class="mv-card vision-card">
                        <div class="icon-wrapper text-primary">
                             <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.03 3.56a16.82 16.82 0 0 0-14.06 0"/><path d="M2.05 13.05a16.82 16.82 0 0 0 19.9 0"/><path d="M20.97 18.25a16.82 16.82 0 0 0-17.94 0"/></svg>
                        </div>
                        <div class="text-wrapper">
                            <h4 class="fw-bold text-primary mb-2">Our Vision</h4>
                            <p class="text-muted mb-0 small">
                                To provide innovative, evidence-based advisory services that strengthen performance and drive long-term value[cite: 44].
                            </p>
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
.strategic-section {
    background-color: #fff;
    /* Flicker Fix: Stabilize rendering */
    backface-visibility: hidden; 
    transform: translateZ(0); 
}

.ls-2 { letter-spacing: 2px; font-size: 0.8rem; }
.text-primary { color: #1a2b49 !important; }
.btn-primary { background-color: #1a2b49; border: none; }
.btn-primary:hover { background-color: #0d6efd; }

/* --- CARDS --- */
.mv-card {
    padding: 2rem;
    border-radius: 12px;
    display: flex;
    align-items: flex-start;
    gap: 1.5rem;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    /* Flicker Fix */
    will-change: transform;
}

.mv-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 30px rgba(0,0,0,0.1);
}

.mission-card {
    background: #1a2b49;
    border-left: 5px solid #0d6efd;
}

.vision-card {
    background: #f8f9fa;
    border: 1px solid #e9ecef;
    border-left: 5px solid #1a2b49;
}

.icon-wrapper {
    background: rgba(255,255,255,0.1);
    padding: 10px;
    border-radius: 8px;
    flex-shrink: 0;
}

.vision-card .icon-wrapper {
    background: rgba(26, 43, 73, 0.1);
}
</style>