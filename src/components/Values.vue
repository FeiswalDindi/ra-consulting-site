<script setup>
const values = [
    {
        icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path fill-rule="evenodd" d="M12.516 2.17a.75.75 0 00-1.032 0 11.209 11.209 0 01-7.877 3.08.75.75 0 00-.722.515A12.74 12.74 0 002.25 9.75c0 5.942 4.064 10.933 9.563 12.348a.749.749 0 00.374 0c5.499-1.415 9.563-6.406 9.563-12.348 0-1.352-.272-2.636-.759-3.807a.75.75 0 00-.722-.516l-.143.001c-2.996 0-5.717-1.17-7.734-3.08zm3.094 8.016a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clip-rule="evenodd" /></svg>',
        title: "Integrity",
        description: "We conduct all our work with honesty, transparency, and unyielding ethical responsibility."
    },
    {
        icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" /></svg>',
        title: "Innovation",
        description: "We embrace creativity, data science, and forward-thinking approaches to solve modern problems."
    },
    {
        icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm11.378-3.917c-.89-.777-2.366-.777-3.255 0a.75.75 0 01-.988-1.129c1.454-1.272 3.776-1.272 5.23 0 1.539 1.345 1.539 3.794 0 5.14-.89.777-2.366.777-3.255 0a.75.75 0 10.988 1.129c1.454 1.272 3.776 1.272 5.23 0 1.539-1.346 1.539-3.795 0-5.14z" clip-rule="evenodd" /></svg>',
        title: "Impact",
        description: "Our work is purpose-driven, focusing on solutions that create measurable and sustainable value."
    },
    {
        icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path fill-rule="evenodd" d="M12.516 2.17a.75.75 0 00-1.032 0 11.209 11.209 0 01-7.877 3.08.75.75 0 00-.722.515A12.74 12.74 0 002.25 9.75c0 5.942 4.064 10.933 9.563 12.348a.749.749 0 00.374 0c5.499-1.415 9.563-6.406 9.563-12.348 0-1.352-.272-2.636-.759-3.807a.75.75 0 00-.722-.516l-.143.001c-2.996 0-5.717-1.17-7.734-3.08zm3.094 8.016a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clip-rule="evenodd" /></svg>',
        title: "Collaboration",
        description: "We believe the best solutions are co-created with clients and stakeholders for lasting success."
    }
];
</script>

<template>
  <section class="py-5" id="values">
    <div class="container py-lg-4">
      
      <div class="row justify-content-center mb-5" v-scroll-reveal>
        <div class="col-lg-8 text-center">
          <h6 class="text-primary fw-bold text-uppercase ls-2">Our Principles</h6>
          <h2 class="fw-bold display-5 mb-3">Core Values</h2>
          <p class="lead text-muted">The guiding principles that define our work and culture.</p>
        </div>
      </div>

      <div class="row g-4">
        <div 
          class="col-md-6 col-lg-3" 
          v-for="(val, index) in values" 
          :key="index"
          v-scroll-reveal 
          :class="`delay-${(index + 1) * 100}`"
        >
          <div class="value-card h-100 p-4 text-center rounded-4 bg-white">
            <div class="icon-wrapper mx-auto mb-4">
                <div v-html="val.icon" class="svg-icon"></div>
            </div>
            
            <h4 class="fw-bold mb-3">{{ val.title }}</h4>
            <p class="text-muted mb-0 small">{{ val.description }}</p>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<style scoped>
.ls-2 { letter-spacing: 2px; }

/* --- CARD STYLES --- */
.value-card {
  box-shadow: 0 10px 30px -5px rgba(0, 0, 0, 0.06);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  border: 1px solid transparent;
}

.value-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px -5px rgba(26, 43, 73, 0.12);
  border-color: rgba(26, 43, 73, 0.05);
}

/* --- ICON STYLES --- */
.icon-wrapper {
  width: 70px;
  height: 70px;
  background: rgba(26, 43, 73, 0.05);
  color: #1a2b49;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.value-card:hover .icon-wrapper {
    background: #1a2b49;
    color: white;
    transform: scale(1.1);
}

:deep(.svg-icon svg) {
    width: 32px;
    height: 32px;
}
</style>