<script setup>
// We list the exact filenames you have in your public/logo folder
const clients = [
    { name: 'Africa Nazarene University', logo: '/logo/Africa-Nazarene-University.png' },
    { name: 'Farsight Africa Group', logo: '/logo/Farsight-Africa-Group.png' },
    { name: 'Fortress Engineering', logo: '/logo/Fortress-Engineering-Ltd.jpg' },
    { name: 'Kenya Export Promotion', logo: '/logo/Kenya-Export-Promotion.jpg' },
    { name: 'KCAU Welfare', logo: '/logo/KCAU-Welfare.png' },
    { name: 'Green World', logo: '/logo/Green-World.png' },
    { name: 'Ebullient Agencies', logo: '/logo/Ebullient-Agencies-Ltd.png' },
    { name: 'Pivot Assets', logo: '/logo/Pivot-Assets.jpg' },
    { name: 'Digital Storytelling Africa', logo: '/logo/Digital-Storytelling-Africa.png' },
    { name: 'ThinkLab', logo: '/logo/ThinkLab_SVG.svg' },
    { name: 'Global Strategic Pillars', logo: '/logo/Global-Strategic-Pillars.jpg' },
    { name: 'All In Store', logo: '/logo/All-in_Store.png' }
];
</script>

<template>
  <section class="clients-section py-5 bg-white border-top border-bottom">
    <div class="container-fluid overflow-hidden">
      
      <div class="row justify-content-center text-center mb-4">
          <div class="col-lg-8">
              <h6 class="text-uppercase text-muted ls-2 small fw-bold">Trusted Partners & Clients</h6>
          </div>
      </div>

      <div class="marquee-wrapper">
        <div class="marquee-track">
            
            <div v-for="(client, index) in clients" :key="index" class="client-logo mx-4">
                <img :src="client.logo" :alt="client.name" class="img-fluid">
            </div>

            <div v-for="(client, index) in clients" :key="'dup-'+index" class="client-logo mx-4">
                 <img :src="client.logo" :alt="client.name" class="img-fluid">
            </div>

        </div>
      </div>

    </div>
  </section>
</template>

<style scoped>
.clients-section { background: #fcfcfc; }
.ls-2 { letter-spacing: 2px; }

.marquee-wrapper {
    width: 100%;
    overflow: hidden;
    position: relative;
    /* Fade edges for smooth look */
    mask-image: linear-gradient(to right, transparent, black 5%, black 95%, transparent);
    -webkit-mask-image: linear-gradient(to right, transparent, black 5%, black 95%, transparent);
}

.marquee-track {
    display: flex;
    align-items: center;
    width: max-content;
    /* Slower animation for better visibility (increased to 50s) */
    animation: scroll 50s linear infinite; 
}

.client-logo {
    width: 140px; /* Slightly larger to see details better */
    height: 90px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.client-logo img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
    /* Grayscale filter removed here so they are always colored */
    transition: transform 0.3s ease;
}

.client-logo img:hover {
    /* Just a slight zoom on hover now */
    transform: scale(1.1);
}

/* The Continuous Scroll Animation */
@keyframes scroll {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); } 
}
</style>