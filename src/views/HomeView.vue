<script setup>
import Hero from '../components/Hero.vue';
import MissionVision from '../components/MissionVision.vue';
import Industries from '../components/Industries.vue';
import CaseStudies from '../components/CaseStudies.vue'; // <--- 1. Import it
import OrgStructure from '../components/OrgStructure.vue';
import Clients from '../components/Clients.vue';
import Services from '../components/Services.vue';
import About from '../components/About.vue';
</script>

<template>
  <main>
    <Hero />
    <MissionVision />
    <Industries />
    
    <CaseStudies /> 
    
    <OrgStructure />
    <Clients />
    <About /> <Services />
  </main>
</template>