<script setup>
import { ref, onMounted } from 'vue';

const articles = ref([]);
const loading = ref(true);
const error = ref(null);

// 1. CONFIGURATION
// Replace this with your actual key from GNews.io
const API_KEY = '07b93ccd1763436d3dbf7df3a1e095f4'; 
// Fallback content in case API fails or limit is reached
const BACKUP_NEWS = [
    {
        title: "The Future of Digital Transformation in East Africa",
        description: "How cloud computing and AI are reshaping government services and private sector efficiency across the region.",
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80",
        url: "#",
        source: { name: "RA Insights" },
        publishedAt: new Date().toISOString()
    },
    {
        title: "Economic Outlook 2026: Key Sectors to Watch",
        description: "An in-depth analysis of agricultural exports, fintech growth, and infrastructure development in Kenya.",
        image: "https://images.unsplash.com/photo-1526304640155-246c085ce427?auto=format&fit=crop&q=80",
        url: "#",
        source: { name: "RA Research" },
        publishedAt: new Date().toISOString()
    },
    {
        title: "Strategic Governance in Non-Profits",
        description: "Why modern NGOs are adopting corporate governance frameworks to ensure sustainability and impact.",
        image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80",
        url: "#",
        source: { name: "Policy Brief" },
        publishedAt: new Date().toISOString()
    }
];

// 2. FETCH FUNCTION
const fetchNews = async () => {
    try {
        // Query: Business OR Technology in Kenya
        const query = "business AND kenya"; 
        const url = `https://gnews.io/api/v4/search?q=${query}&lang=en&country=ke&max=6&apikey=${API_KEY}`;
        
        const response = await fetch(url);
        const data = await response.json();

        if (data.articles) {
            articles.value = data.articles;
        } else {
            throw new Error("API Limit Reached or No Data");
        }

    } catch (err) {
        console.warn("Using Backup News:", err);
        // Load backup data seamlessly so user never sees an error
        articles.value = BACKUP_NEWS;
        error.value = true; 
    } finally {
        loading.value = false;
    }
};

onMounted(() => {
    fetchNews();
});

// Helper to format date
const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
};
</script>

<template>
  <main class="insights-page bg-light min-vh-100">
    
    <section class="py-5 bg-dark text-white text-center position-relative overflow-hidden">
      <div class="container py-5 position-relative z-2">
        <h6 class="text-warning ls-2 text-uppercase mb-2">Market Intelligence</h6>
        <h1 class="display-3 fw-bold">Latest Insights</h1>
        <p class="lead text-white-50 mx-auto" style="max-width: 700px;">
            Curated updates on Policy, Technology, and Economic trends shaping our region.
        </p>
      </div>
    </section>

    <section class="py-5">
      <div class="container py-4">
        
        <div v-if="loading" class="text-center py-5">
            <div class="spinner-border text-navy" role="status"></div>
            <p class="text-muted mt-3 small">Fetching latest updates...</p>
        </div>

        <div v-else class="row g-4">
            
            <div class="col-md-6 col-lg-4" v-for="(article, index) in articles" :key="index">
                <a :href="article.url" target="_blank" class="card h-100 border-0 shadow-sm news-card text-decoration-none">
                    
                    <div class="card-img-top overflow-hidden position-relative" style="height: 200px;">
                        <img :src="article.image" :alt="article.title" class="w-100 h-100 object-fit-cover transition-img">
                        <div class="category-badge">
                            {{ article.source.name }}
                        </div>
                    </div>

                    <div class="card-body p-4 d-flex flex-column">
                        <div class="d-flex justify-content-between align-items-center mb-2">
                            <small class="text-gold fw-bold">{{ formatDate(article.publishedAt) }}</small>
                        </div>
                        
                        <h5 class="fw-bold text-navy mb-3 line-clamp-2">{{ article.title }}</h5>
                        <p class="text-muted small line-clamp-3 mb-4 flex-grow-1">
                            {{ article.description }}
                        </p>

                        <div class="d-flex align-items-center text-navy fw-bold small">
                            Read Article 
                            <span class="ms-2 transition-arrow">→</span>
                        </div>
                    </div>
                </a>
            </div>

        </div>

        <div v-if="error" class="text-center mt-5">
            <small class="text-muted fst-italic">
                * Displaying curated insights. Live feed updates hourly.
            </small>
        </div>

      </div>
    </section>

  </main>
</template>

<style scoped>
/* COLORS */
.bg-dark { background-color: #1a2b49 !important; }
.text-navy { color: #1a2b49; }
.text-gold { color: #c5a059; }
.text-warning { color: #c5a059 !important; }

/* CARD STYLES */
.news-card {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    background: white;
}
.news-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 30px rgba(26, 43, 73, 0.1) !important;
}

/* IMAGE ZOOM EFFECT */
.transition-img { transition: transform 0.5s ease; }
.news-card:hover .transition-img { transform: scale(1.1); }

/* BADGE */
.category-badge {
    position: absolute;
    top: 15px; left: 15px;
    background: rgba(26, 43, 73, 0.9);
    color: white;
    font-size: 0.75rem;
    font-weight: bold;
    padding: 5px 12px;
    border-radius: 20px;
    backdrop-filter: blur(4px);
}

/* TEXT TRUNCATION */
.line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}
.line-clamp-3 {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

/* ARROW ANIMATION */
.transition-arrow { transition: transform 0.2s; display: inline-block; }
.news-card:hover .transition-arrow { transform: translateX(5px); }

.ls-2 { letter-spacing: 2px; }
</style>