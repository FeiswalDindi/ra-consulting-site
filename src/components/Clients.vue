<script setup>
// The exact client list from your Company Profile
const clients = [
    { name: 'Africa Nazarene University', industry: 'Education' },
    { name: 'Fortress Engineering Ltd', industry: 'Engineering' },
    { name: 'Green World', industry: 'Sustainability' },
    { name: 'Global Strategic Pillars', industry: 'Consultancy' },
    { name: 'Ebullient Agencies Ltd', industry: 'Professional Services' },
    { name: 'Digital Storytelling Africa', industry: 'Media' },
    { name: 'Farsight Africa Group', industry: 'Research' },
    { name: 'All-in Store', industry: 'Retail' },
    { name: 'Kenya Export Promotion', industry: 'Government Agency' },
    { name: 'KAU Welfare', industry: 'Community' },
    { name: 'Think Lab Analytics', industry: 'Data Science' },
    { name: 'Pivot Assets', industry: 'Finance' }
];
</script>

<template>
  <section id="clients" class="py-5 bg-white overflow-hidden">
    <div class="container mb-4">
      <div class="row justify-content-center text-center" v-scroll-reveal>
        <div class="col-lg-8">
          <h6 class="text-uppercase ls-2 text-muted mb-2">Our Partners</h6>
          <h2 class="display-6 fw-bold text-primary">Trusted by Industry Leaders</h2>
          <div class="divider mx-auto mt-3"></div>
        </div>
      </div>
    </div>

    <div class="marquee-wrapper">
      <div class="marquee-track">
        
        <div 
            v-for="(client, index) in [...clients, ...clients]" 
            :key="index" 
            class="client-item"
        >
          <div class="client-card">
            <span class="client-name">{{ client.name }}</span>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<style scoped>
.text-primary { color: #1a2b49 !important; }
.divider { width: 60px; height: 3px; background: #1a2b49; }

/* --- MARQUEE CONTAINER --- */
.marquee-wrapper {
    position: relative;
    width: 100%;
    overflow: hidden;
    padding: 20px 0;
    /* Fade edges to smooth entrance/exit */
    mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
    -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
}

.marquee-track {
    display: flex;
    gap: 2rem; /* Space between cards */
    width: max-content;
    animation: scroll 40s linear infinite; /* Smooth continuous scroll */
}

/* Pause scrolling when user hovers to read */
.marquee-track:hover {
    animation-play-state: paused;
}

@keyframes scroll {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); } /* Move exactly half the width */
}

/* --- CLIENT CARD (Industrial Tile Look) --- */
.client-item {
    flex-shrink: 0;
    display: flex;
    align-items: center;
}

.client-card {
    height: 80px;
    padding: 0 30px;
    background: #f8f9fa; /* Light industrial grey */
    border: 1px solid #dee2e6;
    border-left: 4px solid #1a2b49; /* Navy accent */
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    transition: all 0.3s ease;
    cursor: pointer;
    min-width: 200px;
}

.client-name {
    font-weight: 700;
    color: #495057;
    font-size: 0.95rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    white-space: nowrap;
}

/* Hover Effect: Pop up and turn Navy */
.client-card:hover {
    transform: translateY(-5px);
    background: #1a2b49;
    box-shadow: 0 10px 20px rgba(26, 43, 73, 0.15);
    border-color: #1a2b49;
}

.client-card:hover .client-name {
    color: white;
}
</style>