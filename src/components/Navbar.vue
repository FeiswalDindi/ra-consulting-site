<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { store } from '../store';
import { auth } from '../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';

import logoImg from '../assets/logo.png'; 

const isScrolled = ref(false);
const isLoggedIn = ref(false);
const userData = ref(null);
const isMenuOpen = ref(false);

onAuthStateChanged(auth, (user) => {
  isLoggedIn.value = !!user;
  userData.value = user;
  store.user = user;
});

const userInitial = computed(() => {
    if (userData.value?.email) {
        return userData.value.email.charAt(0).toUpperCase();
    }
    return 'U';
});

const handleAuthClick = async () => {
  if (isLoggedIn.value) {
    await signOut(auth);
  } else {
    store.openModal();
  }
  closeMenu();
};

// --- SCROLL LOGIC ---
const handleScroll = () => {
  // 1. Handle Glass Effect
  isScrolled.value = window.scrollY > 20;

  // 2. NEW: Auto-close menu on scroll
  if (isMenuOpen.value) {
    isMenuOpen.value = false;
  }
};

const toggleMenu = () => {
    isMenuOpen.value = !isMenuOpen.value;
};

const closeMenu = () => {
    isMenuOpen.value = false;
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<template>
  <nav 
    class="navbar navbar-expand-lg navbar-dark fixed-top transition-navbar"
    :class="{ 'glass-nav': isScrolled, 'bg-solid': !isScrolled }"
  >
    <div class="container position-relative">
      
      <router-link class="navbar-brand fw-bold brand-container" to="/" @click="closeMenu">
        <span class="brand-text" :class="{ 'hide-text': isScrolled }">RA Consulting</span>
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
        <ul class="navbar-nav ms-auto align-items-center gap-2">
          <li class="nav-item"><router-link class="nav-link" to="/" @click="closeMenu">Home</router-link></li>
          <li class="nav-item"><a class="nav-link" href="/#about" @click="closeMenu">About Us</a></li>
          <li class="nav-item"><a class="nav-link" href="/#services" @click="closeMenu">Services</a></li>
          <li class="nav-item"><a class="nav-link" href="#contact" @click="closeMenu">Contact</a></li>
          
          <li class="nav-item d-flex align-items-center gap-2 auth-item">
            <div v-if="isLoggedIn && userData" class="user-avatar">
                <img v-if="userData.photoURL" :src="userData.photoURL" alt="User">
                <span v-else class="initial">{{ userInitial }}</span>
            </div>
            <button 
              @click="handleAuthClick" 
              class="btn btn-sm px-4 fw-bold auth-btn"
              :class="isScrolled ? 'btn-light text-dark' : 'btn-outline-light'"
            >
              {{ isLoggedIn ? 'Log Out' : 'Log In' }}
            </button>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<style scoped>
/* --- STATE 2: SCROLLED (Light Glassy Background) --- */
.glass-nav {
    background-color: rgba(226, 229, 236, 0.65) !important; 
    backdrop-filter: blur(1px); 
    -webkit-backdrop-filter: blur(1px);
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
}

/* --- INTEGRATED TEXT TRANSITIONS --- */
.glass-nav .nav-link {
    color: #1a2b49 !important;
    font-weight: 500;
}

.glass-nav .nav-link:hover {
    color: #0d6efd !important; 
}

.glass-nav .auth-btn {
    border-color: #1a2b49 !important;
    color: #1a2b49 !important;
}

.glass-nav .auth-btn:hover {
    background-color: #1a2b49 !important;
    color: white !important;
}

.glass-nav .navbar-toggler-icon {
    filter: invert(1);
}

/* --- BASE TRANSITIONS --- */
.transition-navbar {
    transition: all 0.4s ease-in-out;
    padding-top: 1rem;
    padding-bottom: 1rem;
}

/* --- STATE 1: TOP OF PAGE --- */
.bg-solid {
    background-color: #1a2b49; 
    box-shadow: none;
}

/* --- BRAND ANIMATION --- */
.brand-container {
    position: relative;
    display: flex;
    align-items: center;
    height: 40px;
    min-width: 180px; 
    overflow: hidden;
}

.brand-text {
    font-size: 1.5rem;
    transition: all 0.4s ease-in-out;
    position: absolute; left: 0; top: 50%;
    transform: translateY(-50%);
}

.hide-text { opacity: 0; transform: translateY(-150%); }

.brand-logo {
    position: absolute; left: 0;
    width: 40px; height: 40px;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid white;
    opacity: 0;
    transform: translateY(150%);
    transition: all 0.4s ease-in-out;
}

.show-logo { opacity: 1; transform: translateY(0); }

/* --- USER AVATAR --- */
.user-avatar {
    width: 36px; height: 36px;
    border-radius: 50%; overflow: hidden;
    border: 2px solid rgba(255, 255, 255, 0.5);
    display: flex; align-items: center; justify-content: center;
    background: #1a2b49;
}
.user-avatar img { width: 100%; height: 100%; object-fit: cover; }
.initial { color: white; font-weight: bold; }
.auth-btn { border-radius: 20px; }

/* --- CUSTOM MOBILE FLOATING MENU --- */
@media (max-width: 991px) {
    .custom-mobile-menu {
        position: absolute;
        top: 100%;
        right: 0;
        width: 260px;
        background: rgba(26, 43, 73, 0.95);
        backdrop-filter: blur(10px);
        padding: 20px;
        border-radius: 15px;
        box-shadow: 0 10px 40px rgba(0,0,0,0.3);
        border: 1px solid rgba(255, 255, 255, 0.1);
        margin-top: 10px; 
    }

    .navbar-nav .nav-link {
        padding: 10px 0;
        border-bottom: 1px solid rgba(255,255,255,0.05);
        text-align: center;
        color: white !important;
    }
    
    .navbar-nav .nav-link:last-child { border-bottom: none; }
    
    .auth-item {
        justify-content: center;
        margin-top: 10px;
    }
}
</style>