<script setup>
// 1. We define our data here. This is an Array of Objects.
const services = [
    {
        title: "Research & Policy Advisory",
        description: "Baseline studies, market research, socio-economic assessments, and policy analysis.",
        icon: "📊" 
    },
    {
        title: "ICT & Data Analytics",
        description: "Business intelligence, dashboard development, predictive modeling, and digital transformation.",
        icon: "💻" 
    },
    {
        title: "Strategic Corporate Advisory",
        description: "Strategic planning, organizational restructuring, risk management, and governance advisory.",
        icon: "♟️" 
    }
];
</script>

<template>
  <section class="py-5 bg-light" id="services">
    <div class="container">
      <div class="text-center mb-5">
        <h2 class="fw-bold text-primary">Our Services</h2>
        <p class="text-muted">Comprehensive solutions for sustainable growth</p>
      </div>

      <div class="row g-4">
        <div v-for="(service, index) in services" :key="index" class="col-md-4">
          <div class="card h-100 border-0 shadow-sm text-center py-4">
            <div class="card-body">
              <div class="display-4 mb-3">{{ service.icon }}</div>
              <h5 class="card-title fw-bold text-primary">{{ service.title }}</h5>
              <p class="card-text text-muted">{{ service.description }}</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<style scoped>
.card {
    transition: transform 0.3s;
}
.card:hover {
    transform: translateY(-10px);
}
</style>