import { reactive } from 'vue';

// Load saved content from LocalStorage (if any), otherwise use defaults
const savedContent = JSON.parse(localStorage.getItem('siteContent'));

export const store = reactive({
  // 1. User State
  user: null,
  isLoginModalOpen: false,
  
  // 2. Admin State
  isAdmin: false, 

  // 3. EDITABLE WEBSITE CONTENT (The "Superpower")
// ... imports and user state ...

  // 3. EDITABLE WEBSITE CONTENT
  content: savedContent || {
    // HERO CAROUSEL DATA (New)
    heroSlides: [
      {
        id: 1,
        image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80',
        title: 'Strategic Insights, Sustainable Impact.',
        subtitle: 'Empowering institutions with data-driven advisory.'
      },
      {
        id: 2,
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80',
        title: 'Digital Transformation.',
        subtitle: 'Modernizing governance through advanced ICT systems.'
      },
      {
        id: 3,
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80',
        title: 'Research & Policy.',
        subtitle: 'Evidence-based studies for the Eastern Africa region.'
      }
    ],
    // Default Hero Text (Fallback)
    hero: {
      buttonText: 'Explore Our Services'
    },
    about: {
      title: 'Who We Are',
      text: 'RA Strategic & Analytics Consulting Ltd is a multidisciplinary advisory firm...'
    }
  },

  // ... (keep actions, saveContent, loginAdmin logic the same)

  // Actions
  openModal() {
    this.isLoginModalOpen = true;
  },
  closeModal() {
    this.isLoginModalOpen = false;
  },
  
  // Save changes to browser memory (Simulating a database)
  saveContent() {
    localStorage.setItem('siteContent', JSON.stringify(this.content));
    alert('Website content updated successfully!');
  },

  // Admin Login Logic
  loginAdmin() {
    this.isAdmin = true;
    // We create a fake "User" object so the Navbar treats us as logged in
    this.user = {
      displayName: 'System Administrator',
      email: 'feisaldindi4@gmail.com',
      photoURL: null // No photo for super admin
    };
  }
});