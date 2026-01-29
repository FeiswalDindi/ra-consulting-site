<script setup>
// Placeholder data - UPDATE THIS with real project details later!
const cases = [
    {
        client: 'Africa Nazarene University',
        category: 'Strategy & Governance',
        title: 'Institutional Strategic Planning',
        result: '5-Year Strategic Roadmap',
        summary: 'Developed a comprehensive strategic plan to enhance operational efficiency and academic growth.',
        icon: '🎓' 
    },
    {
        client: 'Farsight Africa Group',
        category: 'Research & Policy',
        title: 'Socio-Economic Impact Assessment',
        result: 'Data-Driven Policy Shift',
        summary: 'Conducted baseline and end-line studies to measure the impact of development programs in the region.',
        icon: '📊'
    },
    {
        client: 'Fortress Engineering Ltd',
        category: 'Corporate Advisory',
        title: 'Operational Restructuring',
        result: '30% Efficiency Increase',
        summary: 'Streamlined internal processes and implemented a new performance management system.',
        icon: '🏗️'
    }
];
</script>

<template>
  <section class="case-studies-section py-5">
    <div class="container">
      
      <div class="row justify-content-center text-center mb-5" v-scroll-reveal>
        <div class="col-lg-8">
            <h6 class="text-uppercase text-primary ls-2">Our Impact</h6>
            <h2 class="display-6 fw-bold">Recent Case Studies</h2>
            <div class="divider mx-auto mt-3"></div>
            <p class="text-muted mt-3">
                See how we deliver measurable value to our partners[cite: 66].
            </p>
        </div>
      </div>

      <div class="row g-4">
        <div class="col-lg-4 col-md-6" v-for="(item, index) in cases" :key="index" v-scroll-reveal="{ delay: index * 100 }">
            <div class="case-card h-100 bg-white p-4 rounded-3 shadow-sm position-relative overflow-hidden">
                
                <span class="badge bg-light text-primary mb-3 px-3 py-2 rounded-pill small fw-bold">
                    {{ item.category }}
                </span>

                <h4 class="fw-bold mb-2">{{ item.title }}</h4>
                <h6 class="text-muted text-uppercase small mb-3 border-bottom pb-3">
                    Client: {{ item.client }}
                </h6>

                <p class="text-muted mb-4">{{ item.summary }}</p>

                <div class="result-box bg-primary text-white p-3 rounded-3 text-center">
                    <small class="text-white-50 text-uppercase ls-2 d-block mb-1">Key Result</small>
                    <span class="fw-bold fs-5">{{ item.result }}</span>
                </div>

                <div class="hover-icon">{{ item.icon }}</div>
            </div>
        </div>
      </div>

      <div class="text-center mt-5">
        <router-link to="/services" class="btn btn-outline-primary rounded-pill px-5 fw-bold">
            View All Services
        </router-link>
      </div>

    </div>
  </section>
</template>

<style scoped>
.case-studies-section {
    background-color: #fff;
}

.text-primary { color: #1a2b49 !important; }
.bg-primary { background-color: #1a2b49 !important; }
.ls-2 { letter-spacing: 2px; font-size: 0.75rem; font-weight: 700; }
.divider { width: 60px; height: 3px; background: #1a2b49; }

.case-card {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    border: 1px solid #e9ecef;
    z-index: 1;
}

.case-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 30px rgba(0,0,0,0.1);
    border-color: #1a2b49;
}

/* Background Icon Effect */
.hover-icon {
    position: absolute;
    bottom: -20px;
    right: -20px;
    font-size: 8rem;
    opacity: 0.03;
    transform: rotate(-15deg);
    transition: transform 0.5s ease;
    z-index: -1;
}

.case-card:hover .hover-icon {
    transform: rotate(0deg) scale(1.1);
    opacity: 0.08;
}
</style>