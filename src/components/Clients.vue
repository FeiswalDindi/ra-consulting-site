<script setup>
const clients = [
    "Africa Nazarene University",
    "Kenya Export Promotion Agency",
    "Farsight Africa Group",
    "Fortress Engineering Ltd",
    "Global Strategic Pillars",
    "Digital Storytelling Africa",
    "Think Lab Analytics",
    "Green World",
    "All-in Store"
];
</script>

<template>
  <section class="py-5 bg-white" id="clients">
    <div class="container text-center">
      
      <h2 class="fw-bold text-primary mb-4">Our Trusted Clients</h2>
      <p class="text-muted mb-5">We are proud to work with leading institutions across sectors.</p>

      <div class="row justify-content-center g-4">
        <div v-for="(client, index) in clients" :key="index" class="col-6 col-md-4 col-lg-3">
          <div class="client-box border rounded p-3 d-flex align-items-center justify-content-center">
            <h6 class="mb-0 fw-bold text-secondary">{{ client }}</h6>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<style scoped>
/* Makes the boxes look like placeholders for logos */
.client-box {
    height: 100px;
    background-color: #f8f9fa; /* Light grey background */
    transition: all 0.3s ease;
}

.client-box:hover {
    background-color: #1a2b49; /* Turns Navy Blue on hover */
    color: white !important;   /* Text turns white */
    transform: scale(1.05);    /* Grows slightly */
    border-color: #1a2b49 !important;
}

/* This targets the h6 text inside the box when we hover over the box */
.client-box:hover h6 {
    color: white !important;
}
</style>