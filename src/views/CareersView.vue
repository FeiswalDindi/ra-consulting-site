<script setup>
// No script needed
</script>

<template>
  <main class="careers-page">
    
    <section class="py-5 bg-dark text-white text-center">
      <div class="container py-5">
        <h1 class="display-3 fw-bold">Work With Us</h1>
        <p class="lead text-white-50">Join a team of innovators, analysts, and strategists dedicated to transforming institutions.</p>
      </div>
    </section>

    <section class="py-5">
      <div class="container py-4">
        <div class="row g-4">
          
          <div class="col-md-6">
            <div class="card h-100 shadow-sm border-0 p-5 text-center hover-card">
              <div class="icon-circle mx-auto mb-4 bg-navy text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M6.5 1A1.5 1.5 0 0 0 5 2.5V3H1.5A1.5 1.5 0 0 0 0 4.5v8A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-8A1.5 1.5 0 0 0 14.5 3H11v-.5A1.5 1.5 0 0 0 9.5 1h-3zm0 1h3a.5.5 0 0 1 .5.5V3H6v-.5a.5.5 0 0 1 .5-.5zm1.886 6.914L15 7.151V12.5a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5V7.15l6.614 1.764a1.5 1.5 0 0 0 .772 0z"/>
                  </svg>
              </div>
              <h3 class="fw-bold text-navy mb-3">Careers & Internships</h3>
              <p class="text-muted mb-4">
                We are always looking for talented Policy Analysts, Data Scientists, and Strategy Consultants.
              </p>
              <button class="btn btn-outline-primary rounded-pill px-4 fw-bold">View Openings</button>
            </div>
          </div>

          <div class="col-md-6">
             <div class="card h-100 shadow-sm border-0 p-5 text-center hover-card">
              <div class="icon-circle mx-auto mb-4 bg-navy text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M9.828 4a2 2 0 0 1 2.828 0l2.829 2.829a2 2 0 1 1-2.828 2.829L9.828 6.828a2 2 0 0 1 0-2.828zM3.465 1.162l-.707.707 9.899 9.899.707-.707L3.465 1.162z"/>
                    <path fill-rule="evenodd" d="M9.972 2.508a.5.5 0 0 0-.16-.556l-.178-.129a5.009 5.009 0 0 0-2.076-.783C6.215.862 4.504 1.229 2.84 3.133H1.786a.5.5 0 0 0-.354.147L.146 4.567a.5.5 0 0 0 0 .706l2.571 2.579a.5.5 0 0 0 .708 0l1.286-1.29a.5.5 0 0 0 .146-.353V5.57l8.387 8.873A.5.5 0 0 0 14 14.5l1.5-1.5a.5.5 0 0 0 .017-.689l-9.129-8.63c.747-.456 1.772-.839 3.112-.839a.5.5 0 0 0 .472-.334z"/>
                  </svg>
              </div>
              <h3 class="fw-bold text-navy mb-3">Partner With Us</h3>
              <p class="text-muted mb-4">
                Are you a specialized consultant or technology firm? Let's collaborate to deliver superior value.
              </p>
              <button class="btn btn-outline-primary rounded-pill px-4 fw-bold">Collaboration Form</button>
            </div>
          </div>

        </div>
      </div>
    </section>

  </main>
</template>

<style scoped>
.bg-dark { background-color: #1a2b49 !important; }
.text-navy { color: #1a2b49; }
.bg-navy { background-color: #1a2b49; }

.hover-card { transition: transform 0.3s ease; }
.hover-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 1rem 3rem rgba(0,0,0,0.1) !important;
}

.icon-circle {
    width: 80px; height: 80px;
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    border: 4px solid #fff;
    box-shadow: 0 5px 15px rgba(26, 43, 73, 0.15);
}
</style>