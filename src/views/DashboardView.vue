<script setup>
import { computed } from 'vue';
import { store } from '../store';
import { useRouter } from 'vue-router';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';

const router = useRouter();
// Get the current user from our global store
const user = computed(() => store.user);

// Logout Logic
const handleLogout = async () => {
    try {
        await signOut(auth);
        // After logout, redirect to home
        router.push('/');
    } catch (error) {
        console.error("Logout failed:", error);
    }
};

// Placeholder Data: Resources the client might "have access to"
const recentDocs = [
    { title: 'Eastern Africa Economic Outlook 2026', type: 'Report', date: 'Jan 15', status: 'Available' },
    { title: 'Strategic Planning Template v4.0', type: 'Tool', date: 'Nov 22', status: 'Available' },
    { title: 'ICT Systems Audit Framework', type: 'Guide', date: 'Oct 10', status: 'Locked' }
];
</script>

<template>
  <main class="dashboard-page bg-light min-vh-100 py-5 mt-5">
    
    <div class="container py-5" v-if="user">
      
      <div class="row align-items-center mb-5" v-scroll-reveal>
        <div class="col-md-8">
            <h6 class="text-uppercase text-muted ls-2">Client Portal</h6>
            <h2 class="fw-bold text-primary">Welcome back, {{ user.displayName || 'Partner' }}!</h2>
            <p class="text-muted">Here is an overview of your account and accessed resources.</p>
        </div>
        <div class="col-md-4 text-md-end">
             <button @click="handleLogout" class="btn btn-outline-danger rounded-pill px-4">Log Out</button>
        </div>
      </div>

      <div class="row g-4 mb-5" v-scroll-reveal="{ delay: 100 }">
          <div class="col-md-4">
              <div class="card border-0 shadow-sm p-4 h-100">
                  <div class="d-flex align-items-center gap-3">
                      <div class="icon-box bg-light text-primary rounded-circle p-3 fs-4">🔓</div>
                      <div>
                          <h6 class="text-muted mb-1">Access Level</h6>
                          <h4 class="fw-bold mb-0">Standard Member</h4>
                      </div>
                  </div>
              </div>
          </div>
          <div class="col-md-4">
              <div class="card border-0 shadow-sm p-4 h-100">
                  <div class="d-flex align-items-center gap-3">
                      <div class="icon-box bg-light text-success rounded-circle p-3 fs-4">📥</div>
                      <div>
                          <h6 class="text-muted mb-1">Downloads</h6>
                          <h4 class="fw-bold mb-0">2 Reports</h4>
                      </div>
                  </div>
              </div>
          </div>
          <div class="col-md-4">
              <div class="card border-0 shadow-sm p-4 h-100">
                  <div class="d-flex align-items-center gap-3">
                      <div class="icon-box bg-light text-warning rounded-circle p-3 fs-4">⚡</div>
                      <div>
                          <h6 class="text-muted mb-1">Account Status</h6>
                          <h4 class="fw-bold mb-0 text-success">Active</h4>
                      </div>
                  </div>
              </div>
          </div>
      </div>

      <div class="row" v-scroll-reveal="{ delay: 200 }">
          
          <div class="col-lg-8">
              <div class="card border-0 shadow-sm rounded-3 overflow-hidden mb-4">
                  <div class="card-header bg-white p-4 border-bottom d-flex justify-content-between align-items-center">
                      <h5 class="fw-bold m-0 text-primary">Your Resources</h5>
                      <router-link to="/insights" class="small text-decoration-none fw-bold">Browse Library ➝</router-link>
                  </div>
                  <div class="list-group list-group-flush">
                      <div v-for="(item, i) in recentDocs" :key="i" class="list-group-item p-4 d-flex align-items-center justify-content-between">
                          <div class="d-flex align-items-center gap-3">
                              <span class="badge bg-light text-dark border">{{ item.type }}</span>
                              <div>
                                <span class="fw-bold text-secondary d-block">{{ item.title }}</span>
                                <small class="text-muted">Added: {{ item.date }}</small>
                              </div>
                          </div>
                          
                          <button v-if="item.status === 'Available'" class="btn btn-sm btn-outline-primary rounded-pill px-3">
                              Download
                          </button>
                          <button v-else class="btn btn-sm btn-light text-muted rounded-pill px-3" disabled>
                              🔒 Locked
                          </button>
                      </div>
                  </div>
              </div>
          </div>

          <div class="col-lg-4">
              <div class="card border-0 shadow-sm rounded-3 p-4 bg-primary text-white h-100">
                  <h5 class="fw-bold mb-3">Need Assistance?</h5>
                  <p class="text-white-50 mb-4">
                    Contact your dedicated account manager for custom research requests or account upgrades.
                  </p>
                  <router-link to="/contact" class="btn btn-light text-primary w-100 fw-bold">
                    Contact Support
                  </router-link>
              </div>
          </div>
      </div>

    </div>
    
    <div class="container text-center py-5 mt-5" v-else>
        <h3 class="text-muted mb-3">Please Log In</h3>
        <p class="text-muted small">You must be logged in to view your dashboard.</p>
        <router-link to="/" class="btn btn-primary rounded-pill px-4">Return Home</router-link>
    </div>

  </main>
</template>

<style scoped>
.text-primary { color: #1a2b49 !important; }
.bg-primary { background-color: #1a2b49 !important; }
.ls-2 { letter-spacing: 2px; font-size: 0.8rem; }

.icon-box {
    width: 60px; height: 60px;
    display: flex; align-items: center; justify-content: center;
}
</style>