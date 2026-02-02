<script setup>
import { ref } from 'vue';

// INDUSTRIAL DATA STRUCTURE
// Easy to manage, clean, and 100% SVG based.
const values = ref([
    {
        title: "Integrity",
        text: "We conduct all our work with honesty, transparency, and ethical responsibility.",
        // SVG PATH: Handshake/Shield concept
        path: "M5.338 1.59a61.44 61.44 0 0 0-2.837.856.481.481 0 0 0-.328.39c-.554 4.157.726 7.19 2.253 9.188a10.725 10.725 0 0 0 2.287 2.233c.346.244.652.42.893.533.12.057.218.095.293.118a.55.55 0 0 0 .101.025.615.615 0 0 0 .1-.025c.076-.023.174-.061.294-.118.24-.113.547-.29.893-.533a10.726 10.726 0 0 0 2.287-2.233c1.527-1.997 2.807-5.031 2.253-9.188a.48.48 0 0 0-.328-.39c-.651-.213-1.75-.56-2.837-.855C9.552 1.29 8.531 1.067 8 1.067c-.53 0-1.552.223-2.662.524zM5.072.56C6.157.265 7.31 0 8 0s1.843.265 2.928.56c1.11.3 2.229.655 2.887.87a1.54 1.54 0 0 1 1.044 1.262c.596 4.477-.787 7.795-2.465 9.99a11.775 11.775 0 0 1-2.517 2.453 7.159 7.159 0 0 1-1.048.625c-.28.132-.581.24-.829.24s-.548-.108-.829-.24a7.158 7.158 0 0 1-1.048-.625 11.777 11.777 0 0 1-2.517-2.453C1.928 10.487.545 7.169 1.141 2.692A1.54 1.54 0 0 1 2.185 1.43 62.456 62.456 0 0 1 5.072.56z"
    },
    {
        title: "Innovation",
        text: "We embrace creativity, technology, and data science to solve emerging challenges.",
        // SVG PATH: Lightbulb/Spark
        path: "M2 6a6 6 0 1 1 10.174 4.31c-.203.196-.359.4-.453.619l-.762 1.769A.5.5 0 0 1 10.5 13a.5.5 0 0 1 0 1 .5.5 0 0 1 0 1l.224.447a1 1 0 0 1 .894.553l.224.447a1 1 0 0 1-.894 1.553h-6a1 1 0 0 1-.894-1.553l.224-.447a1 1 0 0 1 .894-.553L6.5 14a.5.5 0 0 1 0-1 .5.5 0 0 1 0-1 .5.5 0 0 1-.453-1.09l-.762-1.769C5.082 10.05 4.926 9.846 4.723 9.65A5.996 5.996 0 0 1 2 6zm2.5 0a3.5 3.5 0 1 0 7 0c0 1.059-.475 2.016-1.229 2.65-.297.249-.523.585-.644.962L9.224 11H6.776l-.403-1.388c-.121-.377-.347-.713-.644-.962A3.496 3.496 0 0 0 4.5 6z"
    },
    {
        title: "Impact",
        text: "Our work is purpose-driven, focusing on solutions that create measurable value.",
        // SVG PATH: Graph/Growth
        path: "M1 11a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1v-3zm5-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7zm5-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1V2z"
    },
    {
        title: "Collaboration",
        text: "We believe the best solutions are co-created with clients and stakeholders.",
        // SVG PATH: Team/Group
        path: "M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM5.216 14A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216zM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z"
    }
]);
</script>

<template>
  <section class="py-5 bg-white">
    <div class="container">
      
      <div class="row justify-content-center text-center mb-5" v-scroll-reveal>
        <div class="col-lg-8">
          <h6 class="text-uppercase text-sky ls-2 fw-bold mb-2">Our Ethos</h6>
          <h2 class="fw-bold text-navy">Our Core Values</h2>
          <div class="divider mx-auto mt-4 bg-sky"></div>
        </div>
      </div>
      
      <div class="row g-4" v-scroll-reveal="{ delay: 200 }">
        <div class="col-md-6 col-lg-3" v-for="(item, index) in values" :key="index">
          <div class="value-card h-100 p-4 bg-light shadow-sm rounded-3 text-center border-0">
            
            <div class="icon-box mx-auto mb-4 bg-navy text-white">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" viewBox="0 0 16 16">
                    <path :d="item.path" />
                </svg>
            </div>

            <h4 class="fw-bold mb-3 text-navy">{{ item.title }}</h4>
            <p class="small text-muted mb-0">{{ item.text }}</p>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<style scoped>
/* COLORS */
.text-navy { color: #1a2b49; }
.bg-navy { background-color: #1a2b49; }
.text-sky { color: #0ea5e9 !important; } /* Sky Blue Accent */
.bg-sky { background-color: #0ea5e9; }

/* LAYOUT */
.divider { width: 60px; height: 3px; }
.ls-2 { letter-spacing: 2px; font-size: 0.8rem; }

/* CARD & HOVER EFFECTS */
.value-card {
  transition: all 0.3s ease;
  border-bottom: 4px solid transparent !important;
}

.value-card:hover {
  transform: translateY(-8px);
  background: white !important;
  box-shadow: 0 10px 30px rgba(14, 165, 233, 0.15) !important; /* Sky blue shadow */
  border-bottom: 4px solid #0ea5e9 !important; /* Sky blue highlight */
}

.icon-box {
    width: 60px; height: 60px;
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    border: 3px solid #fff;
    box-shadow: 0 4px 10px rgba(26, 43, 73, 0.15);
    transition: all 0.3s ease;
}

/* Hover: Icon turns Sky Blue */
.value-card:hover .icon-box {
    background-color: #0ea5e9 !important;
    transform: scale(1.1);
}
</style>