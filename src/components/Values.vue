<script setup>
// No script needed
</script>

<template>
  <section class="py-5 bg-white">
    <div class="container">
      
      <div class="row justify-content-center text-center mb-5" v-scroll-reveal>
        <div class="col-lg-8">
          <h6 class="text-uppercase text-gold ls-2 fw-bold mb-2">Our Ethos</h6>
          <h2 class="fw-bold text-navy">Our Core Values</h2>
          <div class="divider mx-auto mt-4 bg-gold"></div>
        </div>
      </div>
      
      <div class="row g-4" v-scroll-reveal="{ delay: 200 }">
        
        <div class="col-md-6 col-lg-3">
          <div class="value-card h-100 p-4 bg-light shadow-sm rounded-3 text-center border-0">
            <div class="icon-box mx-auto mb-4 bg-navy text-white">
               <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M5.338 1.59a61.44 61.44 0 0 0-2.837.856.481.481 0 0 0-.328.39c-.554 4.157.726 7.19 2.253 9.188a10.725 10.725 0 0 0 2.287 2.233c.346.244.652.42.893.533.12.057.218.095.293.118a.55.55 0 0 0 .101.025.615.615 0 0 0 .1-.025c.076-.023.174-.061.294-.118.24-.113.547-.29.893-.533a10.726 10.726 0 0 0 2.287-2.233c1.527-1.997 2.807-5.031 2.253-9.188a.48.48 0 0 0-.328-.39c-.651-.213-1.75-.56-2.837-.855C9.552 1.29 8.531 1.067 8 1.067c-.53 0-1.552.223-2.662.524zM5.072.56C6.157.265 7.31 0 8 0s1.843.265 2.928.56c1.11.3 2.229.655 2.887.87a1.54 1.54 0 0 1 1.044 1.262c.596 4.477-.787 7.795-2.465 9.99a11.775 11.775 0 0 1-2.517 2.453 7.159 7.159 0 0 1-1.048.625c-.28.132-.581.24-.829.24s-.548-.108-.829-.24a7.158 7.158 0 0 1-1.048-.625 11.777 11.777 0 0 1-2.517-2.453C1.928 10.487.545 7.169 1.141 2.692A1.54 1.54 0 0 1 2.185 1.43 62.456 62.456 0 0 1 5.072.56z"/>
                  <path d="M10.854 5.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 7.793l2.646-2.647a.5.5 0 0 1 .708 0z"/>
                </svg>
            </div>
            <h4 class="fw-bold mb-3 text-navy">Integrity</h4>
            <p class="small text-muted mb-0">We conduct all our work with honesty, transparency, and ethical responsibility.</p>
          </div>
        </div>

        <div class="col-md-6 col-lg-3">
          <div class="value-card h-100 p-4 bg-light shadow-sm rounded-3 text-center border-0">
            <div class="icon-box mx-auto mb-4 bg-navy text-white">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M2 6a6 6 0 1 1 10.174 4.31c-.203.196-.359.4-.453.619l-.762 1.769A.5.5 0 0 1 10.5 13a.5.5 0 0 1 0 1 .5.5 0 0 1 0 1l.224.447a1 1 0 0 1 .894.553l.224.447a1 1 0 0 1-.894 1.553h-6a1 1 0 0 1-.894-1.553l.224-.447a1 1 0 0 1 .894-.553L6.5 14a.5.5 0 0 1 0-1 .5.5 0 0 1 0-1 .5.5 0 0 1-.453-1.09l-.762-1.769C5.082 10.05 4.926 9.846 4.723 9.65A5.996 5.996 0 0 1 2 6zm2.5 0a3.5 3.5 0 1 0 7 0c0 1.059-.475 2.016-1.229 2.65-.297.249-.523.585-.644.962L9.224 11H6.776l-.403-1.388c-.121-.377-.347-.713-.644-.962A3.496 3.496 0 0 0 4.5 6z"/>
                </svg>
            </div>
            <h4 class="fw-bold mb-3 text-navy">Innovation</h4>
            <p class="small text-muted mb-0">We embrace creativity, technology, and data science to solve emerging challenges.</p>
          </div>
        </div>

        <div class="col-md-6 col-lg-3">
          <div class="value-card h-100 p-4 bg-light shadow-sm rounded-3 text-center border-0">
            <div class="icon-box mx-auto mb-4 bg-navy text-white">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M1 11a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1v-3zm5-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7zm5-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1V2z"/>
                </svg>
            </div>
            <h4 class="fw-bold mb-3 text-navy">Impact</h4>
            <p class="small text-muted mb-0">Our work is purpose-driven, focusing on solutions that create measurable value.</p>
          </div>
        </div>

        <div class="col-md-6 col-lg-3">
          <div class="value-card h-100 p-4 bg-light shadow-sm rounded-3 text-center border-0">
            <div class="icon-box mx-auto mb-4 bg-navy text-white">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zM2.04 4.326c.325 1.329 2.532 2.54 6.354 2.919V5.256c-4.42-1.379-6.13-2.18-6.354-.93zM8 6.64v3.879c4.425 1.258 6.265 2.658 6.36 3.634.08.834-.528 2.103-2.26 2.298C12.02 16.27 8.92 12.5 8 6.64zm-1.354.918c-4.42 1.379-6.13 2.18-6.354.93-.08-.834.528-2.103 2.26-2.298 3.52 1.353 4.094 1.369 4.094 1.369z"/>
                </svg>
            </div>
            <h4 class="fw-bold mb-3 text-navy">Collaboration</h4>
            <p class="small text-muted mb-0">We believe the best solutions are co-created with clients and stakeholders.</p>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<style scoped>
.text-navy { color: #1a2b49; }
.bg-navy { background-color: #1a2b49; }
.text-gold { color: #c5a059; }
.bg-gold { background-color: #c5a059; }

.divider { width: 60px; height: 3px; }

.value-card {
  transition: transform 0.3s ease;
}
.value-card:hover {
  transform: translateY(-8px);
}

.icon-box {
    width: 60px; height: 60px;
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    border: 3px solid #fff;
    box-shadow: 0 4px 10px rgba(26, 43, 73, 0.15);
}

.ls-2 { letter-spacing: 2px; font-size: 0.8rem; }
</style>