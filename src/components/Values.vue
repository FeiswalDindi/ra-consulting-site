<script setup>
const values = [
    {
        title: "Integrity",
        text: "We conduct all our work with honesty, transparency, and ethical responsibility.",
        icon: "💎"
    },
    {
        title: "Innovation",
        text: "We embrace creativity, technology, data science, and forward-thinking approaches.",
        icon: "🚀"
    },
    {
        title: "Impact",
        text: "Our work is purpose-driven, focusing on solutions that create measurable value.",
        icon: "🎯"
    },
    {
        title: "Collaboration",
        text: "We believe the best solutions are co-created with clients and stakeholders.",
        icon: "🤝"
    }
];
</script>

<template>
  <section class="py-5 bg-light">
    <div class="container">
      <div class="text-center mb-5">
        <h2 class="fw-bold text-primary">Our Core Values</h2>
        <p class="text-muted">The principles that guide our work</p>
      </div>

      <div class="row g-4">
        <div v-for="(value, index) in values" :key="index" class="col-md-6 col-lg-3">
            <div class="card h-100 border-primary border-2 text-center p-4 bg-white">
                <div class="display-5 mb-3">{{ value.icon }}</div>
                <h4 class="fw-bold text-primary mb-3">{{ value.title }}</h4>
                <p class="text-muted small mb-0">{{ value.text }}</p>
            </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* No extra styles needed! We rely on our global Navy Blue theme. */
</style>