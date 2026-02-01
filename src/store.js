import { reactive } from 'vue';

// --- CONFIGURATION ---
const APP_VERSION = 'v2.3'; 
const CONTENT_KEY = 'ra_site_content';
const USER_KEY = 'ra_user_session'; // New key for user session

// 1. Helper: Load Content
const loadContent = () => {
    try {
        const saved = localStorage.getItem(CONTENT_KEY);
        if (!saved) return null;
        const parsed = JSON.parse(saved);
        if (parsed.version !== APP_VERSION) return null;
        return parsed.data;
    } catch (e) { return null; }
};

// 2. Helper: Load User (The Fix!)
const loadUser = () => {
    try {
        const saved = localStorage.getItem(USER_KEY);
        if (!saved) return null;
        return JSON.parse(saved);
    } catch (e) { return null; }
};

export const store = reactive({
  // --- STATE ---
  // Initialize user from local storage so we don't lose them on refresh
  user: loadUser(),         
  isLoginModalOpen: false,
  isLogoutModalOpen: false,
  isAdmin: loadUser()?.role === 'admin', // Auto-set admin status

  // --- CONTENT ---
  content: loadContent() || {
    heroSlides: [
      { id: 1, image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80', title: 'Strategic Insights.', subtitle: 'Empowering institutions with data-driven advisory.' },
      { id: 2, image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80', title: 'Digital Transformation.', subtitle: 'Modernizing governance through advanced ICT systems.' },
      { id: 3, image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80', title: 'Research & Policy.', subtitle: 'Evidence-based studies for the Eastern Africa region.' }
    ],
    hero: { buttonText: 'Explore Our Services' },
    about: { title: 'Who We Are', text: 'RA Strategic & Analytics Consulting Ltd is a multidisciplinary advisory firm...' },
    socialUpdates: [
        { id: 1, platform: 'LinkedIn', date: new Date().toISOString(), text: 'We are thrilled to announce our partnership with Africa Nazarene University.', link: '#' },
        { id: 2, platform: 'Twitter (X)', date: new Date().toISOString(), text: 'New Report Alert: The 2026 Digital Transformation Outlook is live.', link: '#' }
    ]
  },

  // --- ACTIONS ---
  openModal() { this.isLoginModalOpen = true; },
  closeModal() { this.isLoginModalOpen = false; },
  
  saveContent() {
    const payload = { version: APP_VERSION, data: this.content };
    localStorage.setItem(CONTENT_KEY, JSON.stringify(payload));
  },

  // --- LOGIN LOGIC ---
  login(email, password) {
    let loggedInUser = null;

    // 1. ADMIN
    if (email === 'feisaldindi4@gmail.com' && (password === 'admin123' || password === 'Admin123')) {
        loggedInUser = {
            displayName: 'Feisal Dindi',
            email: email,
            role: 'admin',
            avatar: 'https://ui-avatars.com/api/?name=Feisal+Dindi&background=1a2b49&color=fff' 
        };
        this.isAdmin = true;
    }
    
    // 2. CLIENT
    else if (email === 'client@demo.com' && password === 'client123') {
        loggedInUser = {
            displayName: 'Demo Client',
            email: email,
            role: 'client',
            avatar: 'https://ui-avatars.com/api/?name=Demo+Client&background=2ecc71&color=fff' 
        };
        this.isAdmin = false;
    }

    // 3. IF SUCCESS, SAVE SESSION
    if (loggedInUser) {
        this.user = loggedInUser;
        localStorage.setItem(USER_KEY, JSON.stringify(loggedInUser)); // Persist to storage
        return true;
    }
    
    return false;
  },
  
logout() {
    // 1. Wipe the reactive state
    this.user = null;
    this.currentUser = null; // Sync both aliases
    this.isAdmin = false;

    // 2. Wipe the browser memory
    localStorage.removeItem('ra_user_session'); 
    
    // 3. (Optional) Wipe content cache if you want a total reset
    // localStorage.removeItem('ra_site_content');

    console.log("Store: User session cleared.");
}
  
});