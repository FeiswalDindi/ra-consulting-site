<script setup>
import { ref, onMounted } from 'vue';

const articles = ref([]);
const loading = ref(true);
const error = ref(null);

// --- 1. CONFIGURATION ---
// 🔴 IMPORTANT: Replace with your actual key from https://newsdata.io/
const API_KEY = 'pub_2c579651e55e434ca7118343e55a9720'; 

const BACKUP_NEWS = [
    {
        title: "Kenya's Digital Economy Expected to Grow by 5.2% in 2026",
        description: "New reports indicate a massive surge in fintech adoption and cloud infrastructure across Nairobi.",
        image_url: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80",
        link: "#",
        source_id: "RA Insights",
        pubDate: new Date().toISOString()
    },
    {
        title: "Nairobi Securities Exchange Adopts AI for Market Analysis",
        description: "The NSE has partnered with global tech firms to integrate predictive analytics for better trading outcomes.",
        image_url: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&q=80",
        link: "#",
        source_id: "Business Daily",
        pubDate: new Date().toISOString()
    },
    {
        title: "Government Launches New Policy for Sustainable Manufacturing",
        description: "The Ministry of Trade announces tax incentives for companies adopting green energy solutions.",
        image_url: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80",
        link: "#",
        source_id: "Policy Brief",
        pubDate: new Date().toISOString()
    }
];

// --- 2. FETCH LOGIC (NewsData.io) ---
const fetchNews = async () => {
    try {
        // Query: Kenya (country=ke), Category: Business/Tech/Politics
        // Note: Free tier might be limited to 'en' language
        const url = `https://newsdata.io/api/1/news?apikey=${API_KEY}&country=ke&category=business,technology&language=en`;
        
        const response = await fetch(url);
        const data = await response.json();

        if (data.status === 'success' && data.results.length > 0) {
            articles.value = data.results;
        } else {
            throw new Error("API Limit Reached or No Data");
        }

    } catch (err) {
        console.warn("Using Backup News:", err);
        articles.value = BACKUP_NEWS;
        error.value = true; 
    } finally {
        loading.value = false;
    }
};

onMounted(() => {
    fetchNews();
});

// Helper: Format Date
const formatDate = (dateString) => {
    if(!dateString) return 'Recent';
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
};

// Helper: Fallback Image if API returns null
const getimage = (img) => {
    return img ? img : 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80';
};
</script>

<template>
  <main class="insights-page bg-light min-vh-100">
    
    <section class="py-5 bg-navy text-white text-center position-relative overflow-hidden">
      <div class="container py-5 position-relative z-2">
        <h6 class="text-sky ls-2 text-uppercase mb-2 fw-bold">Market Intelligence</h6>
        <h1 class="display-3 fw-bold">Latest Insights</h1>
        <p class="lead text-white-50 mx-auto" style="max-width: 700px;">
            Curated updates on Policy, Technology, and Economic trends shaping our region.
        </p>
      </div>
    </section>

    <section class="py-5">
      <div class="container py-4">
        
        <div v-if="loading" class="text-center py-5">
            <div class="spinner-border text-sky" role="status"></div>
            <p class="text-muted mt-3 small">Fetching latest market data...</p>
        </div>

        <div v-else class="row g-4">
            
            <div class="col-md-6 col-lg-4" v-for="(article, index) in articles" :key="index">
                <a :href="article.link" target="_blank" class="card h-100 border-0 shadow-sm news-card text-decoration-none">
                    
                    <div class="card-img-top overflow-hidden position-relative" style="height: 200px;">
                        <img :src="getimage(article.image_url)" class="w-100 h-100 object-fit-cover transition-img">
                        <div class="category-badge">
                            {{ article.source_id }}
                        </div>
                    </div>

                    <div class="card-body p-4 d-flex flex-column">
                        <div class="d-flex justify-content-between align-items-center mb-2">
                            <small class="text-sky fw-bold">{{ formatDate(article.pubDate) }}</small>
                        </div>
                        
                        <h5 class="fw-bold text-navy mb-3 line-clamp-2">{{ article.title }}</h5>
                        <p class="text-muted small line-clamp-3 mb-4 flex-grow-1">
                            {{ article.description || "Click to read the full story and detailed analysis on the source website." }}
                        </p>

                        <div class="d-flex align-items-center text-navy fw-bold small">
                            Read Article 
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="ms-2 transition-arrow" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
                            </svg>
                        </div>
                    </div>
                </a>
            </div>

        </div>

        <div v-if="error" class="text-center mt-5">
            <small class="text-muted fst-italic">
                * Live API limit reached. Showing curated archive data.
            </small>
        </div>

      </div>
    </section>

  </main>
</template>

<style scoped>
/* COLORS */
.bg-navy { background-color: #1a2b49 !important; }
.text-navy { color: #1a2b49; }
.text-sky { color: #0dcaf0; } /* Bootstrap Info / Sky Blue */
.bg-sky { background-color: #0dcaf0; }

/* CARD STYLES */
.news-card {
    transition: transform 0.3s ease, box-shadow 0.3s ease, border 0.3s ease;
    background: white;
    border-top: 4px solid transparent !important; /* Invisible top border default */
}
.news-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 30px rgba(26, 43, 73, 0.1) !important;
    border-top: 4px solid #0dcaf0 !important; /* Sky blue top border on hover */
}

/* IMAGE ZOOM EFFECT */
.transition-img { transition: transform 0.5s ease; }
.news-card:hover .transition-img { transform: scale(1.1); }

/* BADGE */
.category-badge {
    position: absolute;
    top: 15px; left: 15px;
    background: rgba(26, 43, 73, 0.95); /* Navy background */
    color: #0dcaf0; /* Sky blue text */
    font-size: 0.7rem;
    font-weight: bold;
    text-transform: uppercase;
    padding: 6px 14px;
    border-radius: 4px;
    letter-spacing: 1px;
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
.transition-arrow { transition: transform 0.2s; }
.news-card:hover .transition-arrow { transform: translateX(5px); }

.ls-2 { letter-spacing: 2px; }
</style>