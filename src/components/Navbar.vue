<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { store } from '../store'; // The Brain
import { auth } from '../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useRouter } from 'vue-router'; 

import logoImg from '../assets/logo.png'; 

const router = useRouter();
const isScrolled = ref(false);
const isMenuOpen = ref(false);
const navbarRef = ref(null); 

// --- THE FIX: LISTEN TO STORE (Single Source of Truth) ---
// This ensures the Navbar updates whether it's an Admin OR a Google User
const userData = computed(() => store.user);
const isLoggedIn = computed(() => !!store.user);

const userInitial = computed(() => {
    if (userData.value?.email) {
        return userData.value.email.charAt(0).toUpperCase();
    }
    return 'U';
});

// --- SYNC GOOGLE LOGIN TO STORE ---
// We keep this listener to capture Firebase logins and save them to the store
onAuthStateChanged(auth, (user) => {
  if (user) {
      store.user = {
          displayName: user.displayName || user.email.split('@')[0],
          email: user.email,
          photoURL: user.photoURL,
          role: 'client' 
      };
  }
});

const handleAuthClick = async () => {
  if (isLoggedIn.value) {
    // If logged in, show the Logout Confirmation
    store.isLogoutModalOpen = true; 
  } else {
    // If NOT logged in, show the Login Modal
    store.openModal();
  }
  closeMenu();
};

// --- SCROLL & MENU LOGIC ---
const handleScroll = () => {
  isScrolled.value = window.scrollY > 20;
};

const handleClickOutside = (event) => {
  if (isMenuOpen.value && navbarRef.value && !navbarRef.value.contains(event.target)) {
    closeMenu();
  }
};

const toggleMenu = () => { isMenuOpen.value = !isMenuOpen.value; };
const closeMenu = () => { isMenuOpen.value = false; };

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
  document.removeEventListener('click', handleClickOutside);
});
</script>

<template>
  <nav 
    ref="navbarRef"
    class="navbar navbar-expand-lg navbar-dark fixed-top transition-navbar"
    :class="{ 'glass-nav': isScrolled, 'bg-solid': !isScrolled }"
  >
    <div class="container position-relative">
      
      <router-link class="navbar-brand fw-bold brand-container" to="/" @click="closeMenu">
        <span class="brand-text" :class="isScrolled ? 'text-navy' : 'text-white'">RA Consulting</span>
        <img 
            :src="logoImg" 
            alt="RA Logo" 
            class="brand-logo" 
            :class="{ 'show-logo': isScrolled }"
        >
      </router-link>

      <button 
        class="navbar-toggler border-0" 
        type="button" 
        @click="toggleMenu"
        :aria-expanded="isMenuOpen"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div 
        class="collapse navbar-collapse custom-mobile-menu" 
        :class="{ 'show': isMenuOpen }"
        id="navbarNav"
      >
        <ul class="navbar-nav ms-auto align-items-center gap-3">
          
          <li class="nav-item">
            <router-link class="nav-link" :class="isScrolled ? 'text-navy' : 'text-white'" to="/" @click="closeMenu">Home</router-link>
          </li>
          
          <li class="nav-item">
            <router-link class="nav-link" :class="isScrolled ? 'text-navy' : 'text-white'" to="/about" @click="closeMenu">About Us</router-link>
          </li>

          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" :class="isScrolled ? 'text-navy' : 'text-white'" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Services
            </a>
            <ul class="dropdown-menu border-0 shadow-lg p-3 rounded-3">
              <li><router-link class="dropdown-item" to="/services/research" @click="closeMenu">Research & Policy</router-link></li>
              <li><router-link class="dropdown-item" to="/services/ict" @click="closeMenu">ICT & Data Analytics</router-link></li>
              <li><router-link class="dropdown-item" to="/services/strategy" @click="closeMenu">Strategic Advisory</router-link></li>
              <li><hr class="dropdown-divider"></li>
              <li><router-link class="dropdown-item fw-bold text-primary" to="/services" @click="closeMenu">View All Services</router-link></li>
            </ul>
          </li>

          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" :class="isScrolled ? 'text-navy' : 'text-white'" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Work With Us
            </a>
            <ul class="dropdown-menu border-0 shadow-lg p-3 rounded-3">
              <li><router-link class="dropdown-item" to="/careers" @click="closeMenu">Careers & Internships</router-link></li>
              <li><router-link class="dropdown-item" to="/partners" @click="closeMenu">Become a Partner</router-link></li>
            </ul>
          </li>

          <li class="nav-item">
            <router-link class="nav-link" :class="isScrolled ? 'text-navy' : 'text-white'" to="/insights" @click="closeMenu">Insights</router-link>
          </li>

          <li class="nav-item">
            <router-link class="nav-link" :class="isScrolled ? 'text-navy' : 'text-white'" to="/contact" @click="closeMenu">Contact Us</router-link>
          </li>
          
          <li class="nav-item dropdown auth-item" v-if="isLoggedIn && userData">
            <a 
              class="nav-link dropdown-toggle d-flex align-items-center gap-2" 
              :class="isScrolled ? 'text-navy' : 'text-white'"
              href="#" 
              role="button" 
              data-bs-toggle="dropdown" 
              aria-expanded="false"
            >
              <div class="user-avatar-small" :class="isScrolled ? 'border-navy' : 'border-white'">
                 <img v-if="userData.avatar || userData.photoURL" :src="userData.avatar || userData.photoURL" alt="User">
                 <span v-else class="initial-small">{{ userInitial }}</span>
              </div>
              <span class="d-none d-lg-block fw-bold small">
                  {{ userData.displayName || 'User' }}
              </span>
            </a>

            <ul class="dropdown-menu dropdown-menu-end border-0 shadow-lg p-3 rounded-3 mt-2">
              <li class="px-2 pb-2 border-bottom mb-2">
                  <span class="d-block fw-bold text-dark">{{ userData.displayName || 'Valued Client' }}</span>
                  <span class="d-block small text-muted">{{ userData.email }}</span>
                  <span class="badge bg-primary mt-1" v-if="userData.role === 'admin'">Administrator</span>
              </li>

              <li v-if="userData.role === 'admin'">
                  <router-link class="dropdown-item d-flex align-items-center gap-2" to="/admin" @click="closeMenu">
                      <span>⚙️</span> Admin Panel
                  </router-link>
              </li>
              <li>
                  <router-link class="dropdown-item d-flex align-items-center gap-2" to="/dashboard" @click="closeMenu">
                      <span>👤</span> My Profile
                  </router-link>
              </li>
              <li><hr class="dropdown-divider"></li>
              <li>
                <button @click="handleAuthClick" class="dropdown-item fw-bold d-flex align-items-center gap-2 text-danger">
                   Log Out
                </button>
              </li>
            </ul>
          </li>

          <li class="nav-item" v-else>
            <button 
              @click="handleAuthClick" 
              class="btn btn-sm px-4 fw-bold auth-btn"
              :class="isScrolled ? 'btn-primary' : 'btn-outline-light'"
            >
              Log In
            </button>
          </li>

        </ul>
      </div>
    </div>
  </nav>
</template>

<style scoped>
/* Keeping your exact original styles */
.text-navy { color: #1a2b49 !important; }
.text-white { color: white !important; }
.border-navy { border: 2px solid #1a2b49; }
.border-white { border: 2px solid rgba(255,255,255,0.8); }

@media (min-width: 992px) {
  .dropdown-menu {
      margin-top: 15px; 
      background: #fff;
      border: none;
      box-shadow: 0 10px 30px rgba(0,0,0,0.15); 
      animation: fadeInUp 0.3s ease;
  }
}

.dropdown-item {
    padding: 10px 15px;
    font-size: 0.95rem;
    border-radius: 6px;
    color: #495057;
    transition: all 0.2s ease;
}
.dropdown-item:hover {
    background-color: #f8f9fa;
    color: #1a2b49; 
    padding-left: 20px; 
}

@keyframes fadeInUp {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
}

.glass-nav {
    background-color: rgba(255, 255, 255, 0.95) !important;
    backdrop-filter: blur(1px); 
    -webkit-backdrop-filter: blur(8px);
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.05);
}
.glass-nav .navbar-toggler-icon { filter: invert(1); }

.bg-solid {
    background-color: #1a2b49; 
    box-shadow: none;
    padding-top: 1rem;
    padding-bottom: 1rem;
}
.bg-solid .navbar-toggler-icon { filter: invert(0); }

.brand-container {
    position: relative;
    display: flex; align-items: center;
    height: 40px; min-width: 180px; overflow: hidden;
}
.brand-text {
    font-size: 1.5rem;
    transition: all 0.4s ease-in-out;
    position: absolute; left: 0; top: 50%;
    transform: translateY(-50%);
}
.brand-logo {
    position: absolute; left: 0; width: 40px; height: 40px;
    border-radius: 50%; object-fit: cover; opacity: 0;
    transform: translateY(150%);
    transition: all 0.4s ease-in-out;
}
.show-logo { opacity: 1; transform: translateY(0); }

.user-avatar-small {
    width: 32px; height: 32px;
    border-radius: 50%; overflow: hidden;
    background: #1a2b49; 
    display: flex; align-items: center; justify-content: center;
}
.user-avatar-small img { width: 100%; height: 100%; object-fit: cover; }
.initial-small { color: white; font-size: 0.8rem; font-weight: bold; }

@media (max-width: 991px) {
    .custom-mobile-menu {
        position: absolute;
        top: 100%;
        right: 0;
        width: 300px; 
        background-color: #1a2b49 !important; /* Always Navy */
        border: 1px solid rgba(255,255,255,0.1);
        
        /* SCROLL FIX */
        max-height: 85vh; 
        overflow-y: auto; 
        
        padding: 20px;
        border-radius: 15px;
        box-shadow: 0 10px 40px rgba(0,0,0,0.5);
        margin-top: 10px; 
    }

    .nav-link { color: rgba(255,255,255,0.95) !important; text-align: center; border-bottom: 1px solid rgba(255,255,255,0.05); }
    .nav-link:hover { color: white !important; }
    
    .auth-item { justify-content: center; margin-top: 10px; }
    
    /* DISTINCT MOBILE DROPDOWN (White Box on Navy BG) */
    .dropdown-menu {
        background: #ffffff !important; /* Solid White */
        border: none;
        text-align: center;
        border-radius: 8px;
        padding: 10px;
        margin-top: 5px;
    }
    .dropdown-item { 
        color: #1a2b49 !important; /* Navy Text */
        font-weight: 600;
    }
    .dropdown-item:hover { 
        background: #e9ecef !important; /* Light Grey Hover */
        color: #1a2b49 !important; 
    }
}

.transition-navbar { transition: all 0.4s ease-in-out; width: 100%; top: 0; z-index: 1000; -webkit-transform: translateZ(0); transform: translateZ(0); backface-visibility: hidden; }
</style>