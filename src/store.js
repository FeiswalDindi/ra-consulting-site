import { reactive } from 'vue';

// 1. Load saved content from LocalStorage (if any)
const savedContent = JSON.parse(localStorage.getItem('siteContent'));

export const store = reactive({
  // --- USER STATE ---
  user: null,         // Used by Navbar
  currentUser: null,  // Alias for compatibility
  isLoginModalOpen: false,
  isAdmin: false, 

  // --- EDITABLE WEBSITE CONTENT ---
  // If we have saved content, use it. Otherwise, use these defaults.
  content: savedContent || {
    
    // 1. HERO SLIDER
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

    // 2. HERO BUTTONS
    hero: {
      buttonText: 'Explore Our Services'
    },

    // 3. ABOUT TEXT
    about: {
      title: 'Who We Are',
      text: 'RA Strategic & Analytics Consulting Ltd is a multidisciplinary advisory firm offering comprehensive solutions in strategy, research, and technology.'
    },

    // 4. SOCIAL MEDIA UPDATES (The New Superpower!)
    socialUpdates: [
        {
            id: 1,
            platform: 'LinkedIn',
            date: '2 Days Ago',
            text: 'We are thrilled to announce our partnership with Africa Nazarene University.',
            link: '#'
        },
        {
            id: 2,
            platform: 'Twitter (X)',
            date: '5 Days Ago',
            text: 'New Report Alert: The 2026 Digital Transformation Outlook is live.',
            link: '#'
        },
        {
            id: 3,
            platform: 'Facebook',
            date: '1 Week Ago',
            text: 'Highlights from our team building and community outreach event in Nairobi.',
            link: '#'
        }
    ]
  },

  // --- ACTIONS ---
  openModal() {
    this.isLoginModalOpen = true;
  },
  closeModal() {
    this.isLoginModalOpen = false;
  },
  
  // Save changes to browser memory
  saveContent() {
    localStorage.setItem('siteContent', JSON.stringify(this.content));
    // Also update the alias
    if(this.user) this.currentUser = this.user;
  },

  // Admin Login Logic
  loginAdmin() {
    this.isAdmin = true;
    this.user = {
      displayName: 'System Administrator',
      email: 'feisaldindi4@gmail.com',
      photoURL: null 
    };
    this.currentUser = this.user; // Sync alias
  }
});

// --- SAFETY PATCH ---
// This runs immediately. If the user has old data saved in their browser
// that is missing the 'socialUpdates' array, we add it now so the site doesn't crash.
if (store.content && !store.content.socialUpdates) {
    store.content.socialUpdates = [
        {
            id: 1,
            platform: 'LinkedIn',
            date: '2 Days Ago',
            text: 'Welcome to our new website! Follow us for updates.',
            link: '#'
        },
        {
            id: 2,
            platform: 'Twitter (X)',
            date: 'Just Now',
            text: 'RA Consulting is now live. Check out our latest insights.',
            link: '#'
        },
        {
            id: 3,
            platform: 'Facebook',
            date: '1 Week Ago',
            text: 'Empowering institutions across Eastern Africa.',
            link: '#'
        }
    ];
}