import { reactive } from 'vue';
import { db } from './firebase'; // Import the database
import { doc, setDoc, onSnapshot } from 'firebase/firestore'; 

const USER_KEY = 'ra_user_session'; 

// 1. Helper: Load User (Keep this local for security)
const loadUser = () => {
    try {
        const saved = localStorage.getItem(USER_KEY);
        if (!saved) return null;
        return JSON.parse(saved);
    } catch (e) { return null; }
};

export const store = reactive({
  // --- STATE ---
  user: loadUser(),         
  isLoginModalOpen: false,
  isLogoutModalOpen: false,
  isAdmin: loadUser()?.role === 'admin', 

  // --- CONTENT (Syncs with Cloud) ---
  // Default data serves as a placeholder until Cloud loads
  content: {
    heroSlides: [
      { id: 1, image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80', title: 'Strategic Insights.', subtitle: 'Empowering institutions with data-driven advisory.' },
      { id: 2, image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80', title: 'Digital Transformation.', subtitle: 'Modernizing governance through advanced ICT systems.' }
    ],
    hero: { buttonText: 'Explore Our Services' },
    about: { title: 'Who We Are', text: 'RA Strategic & Analytics Consulting Ltd is a multidisciplinary advisory firm...' },
    socialUpdates: [
        { id: 1, platform: 'LinkedIn', date: new Date().toISOString(), text: 'We are thrilled to announce our partnership with Africa Nazarene University.', link: '#' }
    ],
    resources: [
        { id: 1, title: '2026 Strategy Guidelines', fileName: 'Strategic_Guidelines.pdf', type: 'PDF', size: '2.4 MB', status: 'Available' }
    ]
  },

  // --- ACTIONS ---
  openModal() { this.isLoginModalOpen = true; },
  closeModal() { this.isLoginModalOpen = false; },
  
  // [NEW] Save to Cloud Database
  async saveContent() {
    try {
        const docRef = doc(db, "global_content", "main_data");
        // We use JSON.parse/stringify to remove any Vue proxies before sending
        await setDoc(docRef, JSON.parse(JSON.stringify(this.content)));
        console.log("Saved to Cloud!");
    } catch (e) {
        console.error("Cloud Save Failed:", e);
        alert("Error saving to cloud. Check console.");
    }
  },

  // File Manager Logic
  addResource(fileData) {
      if (!this.content.resources) this.content.resources = [];
      this.content.resources.unshift(fileData);
      this.saveContent(); // Pushes to Cloud
  },

  deleteResource(index) {
      this.content.resources.splice(index, 1);
      this.saveContent(); // Pushes to Cloud
  },

  // --- LOGIN LOGIC (Keeps User Logged In) ---
  login(email, password) {
    let loggedInUser = null;

    if (email === 'feisaldindi4@gmail.com' && (password === 'admin123' || password === 'Admin123')) {
        loggedInUser = { displayName: 'Feisal Dindi', email: email, role: 'admin', avatar: 'https://ui-avatars.com/api/?name=Feisal+Dindi&background=1a2b49&color=fff' };
        this.isAdmin = true;
    }
    else if (email === 'client@demo.com' && password === 'client123') {
        loggedInUser = { displayName: 'Demo Client', email: email, role: 'client', avatar: 'https://ui-avatars.com/api/?name=Demo+Client&background=2ecc71&color=fff' };
        this.isAdmin = false;
    }

    if (loggedInUser) {
        this.user = loggedInUser;
        localStorage.setItem(USER_KEY, JSON.stringify(loggedInUser));
        return true;
    }
    return false;
  },
  
  logout() {
      this.user = null;
      this.isAdmin = false;
      localStorage.removeItem(USER_KEY); 
  }
});

// --- [NEW] REALTIME CLOUD LISTENER ---
// This connects the app to the cloud immediately.
// If Admin updates content, this runs automatically for ALL users.
try {
    const docRef = doc(db, "global_content", "main_data");
    onSnapshot(docRef, (docSnap) => {
        if (docSnap.exists()) {
            console.log("Cloud Update Received!");
            store.content = docSnap.data();
        } else {
            // First time running? Create the doc with defaults
            store.saveContent();
        }
    });
} catch (e) {
    console.error("Database connection failed:", e);
}