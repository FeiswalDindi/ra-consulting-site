<script setup>
const services = [
    {
        icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6"><path fill-rule="evenodd" d="M9.315 7.584C12.195 3.883 16.695 1.5 21.75 1.5a.75.75 0 01.75.75c0 5.056-2.383 9.555-6.084 12.436h.004l-1.222 1.222a.75.75 0 01-1.06 0l-5.25-5.25a.75.75 0 010-1.06l1.222-1.222v.004zM4.5 21.75l-2.25-2.25a.75.75 0 010-1.06l5.25-5.25a.75.75 0 011.06 0l2.25 2.25a.75.75 0 010 1.06l-5.25 5.25a.75.75 0 01-1.06 0z" clip-rule="evenodd" /></svg>',
        title: "Strategic Planning",
        description: "Developing actionable roadmaps to achieve long-term organizational goals and sustainable growth."
    },
    {
        icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6"><path d="M5.625 1.5c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.035.84 1.875 1.875 1.875h12.75c1.035 0 1.875-.84 1.875-1.875V12.75A3.75 3.75 0 0016.5 9h-1.875a1.875 1.875 0 01-1.875-1.875V5.25A3.75 3.75 0 009 1.5H5.625z" /><path d="M12.971 1.816A5.23 5.23 0 0114.25 5.25v1.875c0 .207.168.375.375.375H16.5a5.23 5.23 0 013.434 1.279 9.768 9.768 0 00-6.963-6.963z" /></svg>',
        title: "Research & Policy Advisory",
        description: "Evidence-based insights and policy analysis to inform decision-making in complex environments."
    },
    {
        icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6"><path fill-rule="evenodd" d="M2.25 13.5a8.25 8.25 0 018.25-8.25.75.75 0 01.75.75v6.75H18a.75.75 0 01.75.75 8.25 8.25 0 01-16.5 0zm1.5 0a6.75 6.75 0 006.75 6.75v-6.75H3.75z" clip-rule="evenodd" /><path d="M12 10.5V3a8.25 8.25 0 018.25 8.25H12z" /></svg>',
        title: "Data Analytics & Visualization",
        description: "Turning raw data into clear, interactive visual stories that drive business intelligence."
    },
    {
        icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6"><path d="M4.5 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM14.25 8.625a3.375 3.375 0 116.75 0 3.375 3.375 0 01-6.75 0zM1.5 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM17.25 19.125a7.125 7.125 0 01-7.125 7.125v.003l.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM17.25 19.125c0 1.207.335 2.337.916 3.303a15.752 15.752 0 004.334-2.46.75.75 0 00.167-.78A6.749 6.749 0 0021 15.75a6.75 6.75 0 00-3.75 3.375z" /></svg>',
        title: "Training & Capacity Building",
        description: "Empowering your teams with the skills and knowledge needed to excel in a data-driven world."
    }
];
</script>

<template>
  <section class="py-5 bg-light-subtle section-diagonal" id="services">
    <div class="container py-lg-5">
      
      <div class="row justify-content-center mb-5" v-scroll-reveal>
        <div class="col-lg-8 text-center">
          <h6 class="text-primary fw-bold text-uppercase ls-2">Our Expertise</h6>
          <h2 class="fw-bold display-5 mb-3">What We Offer</h2>
          <p class="lead text-muted">We provide comprehensive solutions tailored to complex challenges.</p>
        </div>
      </div>

      <div class="row g-4">
        <div 
          class="col-md-6 col-lg-3" 
          v-for="(service, index) in services" 
          :key="index"
          v-scroll-reveal 
          :class="`delay-${(index + 1) * 100}`" 
        >
          <div class="service-card h-100 p-4 p-lg-5 text-center rounded-4 bg-white">
            <div class="icon-wrapper mx-auto mb-4">
                <div v-html="service.icon" class="svg-icon"></div>
            </div>
            <h4 class="fw-bold mb-3">{{ service.title }}</h4>
            <p class="text-muted mb-0">{{ service.description }}</p>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<style scoped>
.bg-light-subtle { background-color: #f8f9fa; }
.ls-2 { letter-spacing: 2px; }

/* --- PROFESSIONAL CARD STYLES --- */
.service-card {
  /* No Border, just shadow */
  box-shadow: 0 10px 30px -5px rgba(0, 0, 0, 0.06);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  border: 1px solid transparent; /* Placeholder for smooth transition */
}

/* Hover State: Lift up and enhance shadow */
.service-card:hover {
  transform: translateY(-12px);
  box-shadow: 0 20px 40px -5px rgba(26, 43, 73, 0.12);
  border-color: rgba(26, 43, 73, 0.05); /* Very subtle border on hover */
}

/* --- NEW ICON STYLES --- */
.icon-wrapper {
  width: 80px;
  height: 80px;
  /* Subtle primary color background circle */
  background: rgba(26, 43, 73, 0.08);
  color: #1a2b49; /* Primary color for the icon itself */
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.service-card:hover .icon-wrapper {
    background: #1a2b49; /* Turn background solid on hover */
    color: white; /* Turn icon white on hover */
    transform: scale(1.1); /* Slight grow effect */
}

/* Ensure SVGs size correctly */
:deep(.svg-icon svg) {
    width: 36px;
    height: 36px;
}
</style>