<script setup>
import { ref, computed, onMounted } from 'vue';
import { store } from '../store'; 
import { useRouter } from 'vue-router';

const router = useRouter();
const user = computed(() => store.user);

// --- NEWS FEED LOGIC ---
const news = ref([]);
const newsLoading = ref(true);

const fetchIndustryNews = async () => {
    try {
        // Fetching business/tech news relevant to Consulting
        const res = await fetch(`https://gnews.io/api/v4/top-headlines?category=business&lang=en&apikey=YOUR_GNEWS_API_KEY`);
        const data = await res.json();
        news.value = data.articles?.slice(0, 3) || [];
    } catch (err) {
        console.error("News Load Error:", err);
    } finally {
        newsLoading.value = false;
    }
};

// --- FUNCTIONALITY: DOWNLOAD SIMULATOR ---
const downloadFile = (fileName) => {
    // 1. Construct the path to your public/files folder
    // Note: Use the exact filename including extension as saved in your folder
    const fileUrl = `/files/${fileName}`;

    // 2. Create a hidden 'a' tag
    const link = document.createElement('a');
    link.href = fileUrl;
    
    // 3. This 'download' attribute forces the browser to download instead of open
    link.setAttribute('download', fileName);
    
    // 4. Append, trigger, and remove
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};
onMounted(() => {
    if (!store.user) {
        router.push('/');
    } else {
        fetchIndustryNews();
    }
});

const handleLogout = () => {
    store.logout();
    router.push('/');
};

// --- DATA: REALISTIC CLIENT RESOURCES ---
const resources = ref([
    { 
        id: 1, 
        title: '2026 Eastern Africa Strategy Guidelines', 
        fileName: 'Strategic_Guidelines.pdf', // EXACT name in public/files/
        type: 'PDF', 
        size: '2.4 MB', 
        status: 'Available' 
    },
    { 
        id: 2, 
        title: 'Institutional ICT Audit Checklist', 
        fileName: 'ICT_Checklist.xlsx', 
        type: 'XLSX', 
        size: '1.1 MB', 
        status: 'Available' 
    }
]);

const openBooking = () => {
    // Replace with your actual Calendly link
    window.open('https://calendly.com/your-profile/30min', '_blank');
};
</script>

<template>
  <main class="dashboard-page bg-light min-vh-100 py-5 mt-5">
    
    <div class="container py-4" v-if="user">
      
      <div class="d-flex flex-column flex-md-row justify-content-between align-items-center mb-5 gap-3">
      <div>
      <div class="d-flex align-items-center gap-2 mb-1">
          <span class="status-pulse"></span>
          <h6 class="text-uppercase text-muted ls-2 small fw-bold mb-0">Active Session</h6>
      </div>
      <h2 class="fw-bold text-navy">Client: {{ user.displayName }}</h2>
  </div>

        
        <div class="d-flex align-items-center gap-3">
             <div class="user-pill bg-white px-3 py-2 rounded-pill shadow-sm d-flex align-items-center gap-2">
                 <img :src="user.avatar" class="rounded-circle border" width="32" height="32">
                 <div class="d-none d-sm-block">
                    <span class="small fw-bold text-navy d-block">{{ user.email }}</span>
                 </div>
             </div>
             <button @click="handleLogout" class="btn btn-navy-outline btn-sm rounded-pill px-4 fw-bold">
                 Sign Out
             </button>
        </div>
      </div>

      <div class="row g-4 mb-5">
          <div class="col-md-4" v-for="i in 3" :key="i">
              <div class="card border-0 shadow-sm p-4 h-100 dashboard-card">
                  <div class="d-flex align-items-center gap-3">
                      <div class="svg-icon-box bg-light-navy rounded-circle">
                          <svg v-if="i==1" width="24" height="24" fill="currentColor" viewBox="0 0 16 16"><path d="M11 1a2 2 0 0 0-2 2v4a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h5V3a3 3 0 0 1 6 0v4a.5.5 0 0 1-1 0V3a2 2 0 0 0-2-2z"/></svg>
                          <svg v-if="i==2" width="24" height="24" fill="currentColor" viewBox="0 0 16 16"><path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/></svg>
                          <svg v-if="i==3" width="24" height="24" fill="currentColor" viewBox="0 0 16 16"><path d="M11.251.068a.5.5 0 0 1 .227.58L9.677 6.5H13a.5.5 0 0 1 .364.843l-8 8.5a.5.5 0 0 1-.842-.49L6.323 9.5H3a.5.5 0 0 1-.364-.843l8-8.5a.5.5 0 0 1 .615-.09z"/></svg>
                      </div>
                      <div>
                          <h6 class="text-muted mb-0 small">{{ ['Account Type', 'Files Access', 'Session Status'][i-1] }}</h6>
                          <h5 class="fw-bold mb-0 text-navy">{{ ['Premium Client', '2 Documents', 'Encrypted'][i-1] }}</h5>
                      </div>
                  </div>
              </div>
          </div>
      </div>

      <div class="row g-4 mb-5">
          <div class="col-lg-8">
              <div class="card border-0 shadow-sm rounded-4 overflow-hidden h-100">
                  <div class="card-header bg-white p-4 border-bottom d-flex justify-content-between align-items-center">
                      <h5 class="fw-bold m-0 text-navy">Resource Vault</h5>
                      <span class="badge bg-navy text-white px-3">Sync Active</span>
                  </div>
                  <div class="list-group list-group-flush">
                      <div v-for="file in resources" :key="file.id" class="list-group-item p-4 d-flex align-items-center justify-content-between resource-item">
                          <div class="d-flex align-items-center gap-3">
                              <div class="file-type-icon bg-light text-navy fw-bold small rounded-3 px-2 py-1">
                                  {{ file.type }}
                              </div>
                              <div>
                                <span class="fw-bold text-navy d-block">{{ file.title }}</span>
                                <small class="text-muted">{{ file.size }} • Last Updated Today</small>
                              </div>
                          </div>
                        <button 
  v-if="file.status === 'Available'" 
  @click="downloadFile(file.fileName)"
  class="btn btn-sm btn-navy rounded-pill px-3 fw-bold d-flex align-items-center gap-2"
>
  <svg width="14" height="14" fill="currentColor" viewBox="0 0 16 16">
    <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5zM7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
  </svg>
  Download
</button>
                          <span v-else class="text-muted small fst-italic">
                              <svg width="14" height="14" fill="currentColor" viewBox="0 0 16 16" class="me-1"><path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"/></svg>
                              Request Access
                          </span>
                      </div>
                  </div>
              </div>
          </div>

          <div class="col-lg-4">
              <div class="card border-0 shadow-sm rounded-4 p-4 bg-navy text-white h-100">
                  <h5 class="fw-bold mb-3">Professional Support</h5>
                  <p class="text-white-50 mb-4 small">
                    As a verified partner, you have 24/7 access to our policy advisory desk. 
                  </p>
                  <div class="support-pill bg-white-10 p-3 rounded-3 mb-4">
                      <div class="small fw-bold mb-1">Assigned Consultant:</div>
                      <div class="d-flex align-items-center gap-2">
                          <img src="https://ui-avatars.com/api/?name=Feisal+Dindi&background=c5a059&color=fff" class="rounded-circle" width="24">
                          <span>Feisal Dindi</span>
                      </div>
                  </div>
                  <router-link to="/contact" class="btn btn-gold w-100 fw-bold py-3 mt-auto">
                  <a 
  href="mailto:info@rastrategicanalytics.com?subject=Consultation Request: {{ user.displayName }}&body=Hello Feisal, I would like to schedule a consultation regarding..."
  class="btn btn-gold w-100 fw-bold py-3 mt-auto"
>
  Initiate Consultation
</a>
                  </router-link>
              </div>
              <button 
  @click="openBooking"
  class="btn btn-gold w-100 fw-bold py-3 mt-auto"
>
  Schedule Meeting
</button>
          </div>
      </div>

      <section class="news-feed-dashboard py-4 border-top">
          <div class="d-flex justify-content-between align-items-center mb-4">
              <h5 class="fw-bold text-navy m-0">Industry Intelligence</h5>
              <router-link to="/insights" class="text-navy small fw-bold text-decoration-none">View All Insights ➝</router-link>
          </div>
          
          <div v-if="newsLoading" class="text-center py-5">
              <div class="spinner-border text-navy spinner-border-sm"></div>
          </div>

          <div v-else class="row g-3">
              <div v-for="(article, index) in news" :key="index" class="col-md-4">
                  <a :href="article.url" target="_blank" class="news-card-mini bg-white p-3 rounded-3 shadow-sm d-block text-decoration-none">
                      <div class="small text-gold mb-2 fw-bold text-uppercase">{{ article.source.name }}</div>
                      <h6 class="text-navy fw-bold mb-0 line-clamp-2">{{ article.title }}</h6>
                  </a>
              </div>
          </div>
      </section>

    </div>
  </main>
</template>

<style scoped>
.text-navy { color: #1a2b49; }
.bg-navy { background-color: #1a2b49; }
.bg-light-navy { background-color: #f0f4f8; }
.bg-white-10 { background-color: rgba(255,255,255,0.1); }
.text-gold { color: #c5a059; }
.btn-gold { background-color: #c5a059; color: white; border: none; }
.btn-gold:hover { background-color: #b38f4d; color: white; }

.btn-navy { background-color: #1a2b49; color: white; border: none; }
.btn-navy-outline { border: 1.5px solid #1a2b49; color: #1a2b49; background: transparent; }
.btn-navy-outline:hover { background: #1a2b49; color: white; }

.ls-2 { letter-spacing: 2px; }
.svg-icon-box { width: 48px; height: 48px; display: flex; align-items: center; justify-content: center; color: #1a2b49; }

.news-card-mini { transition: all 0.3s ease; border-left: 4px solid transparent; }
.news-card-mini:hover { border-left-color: #c5a059; transform: translateX(5px); }

.line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.resource-item { transition: background 0.2s; }
.resource-item:hover { background-color: #fafafa; }
/* LIVE PULSE ANIMATION */
.status-pulse {
    width: 10px;
    height: 10px;
    background-color: #2ecc71;
    border-radius: 50%;
    display: inline-block;
    position: relative;
    box-shadow: 0 0 0 0 rgba(46, 204, 113, 0.7);
    animation: pulse-green 2s infinite;
}

@keyframes pulse-green {
    0% {
        transform: scale(0.95);
        box-shadow: 0 0 0 0 rgba(46, 204, 113, 0.7);
    }
    70% {
        transform: scale(1);
        box-shadow: 0 0 10px 10px rgba(46, 204, 113, 0);
    }
    100% {
        transform: scale(0.95);
        box-shadow: 0 0 0 0 rgba(46, 204, 113, 0);
    }
}
</style>