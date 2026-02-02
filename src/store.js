import { reactive } from 'vue';
import { db } from './firebase'; 
import { doc, setDoc, onSnapshot, collection, addDoc, serverTimestamp } from 'firebase/firestore'; 

const USER_KEY = 'ra_user_session'; 
const CONTENT_KEY = 'ra_site_content';
const APP_VERSION = 'v2.8'; 

// Helpers
const loadUser = () => {
    try {
        const saved = localStorage.getItem(USER_KEY);
        if (!saved) return null;
        return JSON.parse(saved);
    } catch (e) { return null; }
};

const loadContent = () => {
    try {
        const saved = localStorage.getItem(CONTENT_KEY);
        if (!saved) return null;
        return JSON.parse(saved).data;
    } catch (e) { return null; }
};

const savedUser = loadUser();

export const store = reactive({
  // --- STATE ---
  user: savedUser,         
  isLoginModalOpen: false,
  isLogoutModalOpen: false,
  isAdmin: savedUser?.role === 'admin', 

  // --- CONTENT ---
  content: loadContent() || {
    // ... (Your existing default content stays here, shortened for brevity)
    heroSlides: [], 
    hero: { buttonText: 'Explore Our Services' },
    about: { title: 'Who We Are', text: 'RA Strategic & Analytics Consulting Ltd is a multidisciplinary advisory firm...' },
    socialUpdates: [],
    resources: []
  },

  // --- ACTIONS ---
  openModal() { this.isLoginModalOpen = true; },
  closeModal() { this.isLoginModalOpen = false; },
  
  // 1. CLOUD SAVE (Content)
  async saveContent() {
    try {
        const docRef = doc(db, "global_content", "main_data");
        await setDoc(docRef, JSON.parse(JSON.stringify(this.content)));
    } catch (e) { console.error("Save failed", e); }
  },

  // 2. [NEW] USER TRACKING SYSTEM
  async trackActivity(actionType, details = "") {
      if (!this.user) return; // Can only track logged-in users

      try {
          // Creates a new entry in a "user_logs" collection in Firestore
          await addDoc(collection(db, "user_logs"), {
              userEmail: this.user.email,
              userName: this.user.displayName,
              action: actionType, // e.g., "Login", "Downloaded File"
              details: details,
              timestamp: serverTimestamp() // Uses server time
          });
          console.log(`Activity Tracked: ${actionType}`);
      } catch (e) {
          console.error("Tracking Error:", e);
      }
  },

  addResource(fileData) {
      if (!this.content.resources) this.content.resources = [];
      this.content.resources.unshift(fileData);
      this.saveContent();
  },

  deleteResource(index) {
      this.content.resources.splice(index, 1);
      this.saveContent();
  },

  // --- LOGIN ---
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
        
        // [NEW] Track the Login immediately
        this.trackActivity("Login", "User logged in via Email/Password");
        
        return true;
    }
    return false;
  },
  
  logout() {
      // [NEW] Track Logout before clearing data
      this.trackActivity("Logout", "User signed out");
      
      this.user = null;
      this.isAdmin = false;
      localStorage.removeItem(USER_KEY); 
  }
});

// CLOUD LISTENER
try {
    const docRef = doc(db, "global_content", "main_data");
    onSnapshot(docRef, (docSnap) => {
        if (docSnap.exists()) {
            store.content = docSnap.data();
        }
    });
} catch (e) {}