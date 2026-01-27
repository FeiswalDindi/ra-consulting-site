<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { store } from '../store';
import { auth } from '../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';

// --- IMPORT YOUR LOGO HERE ---
// Make sure your file in src/assets/ is actually named 'logo.png'
import logoImg from '../assets/logo.png'; 

const isScrolled = ref(false);
const isLoggedIn = ref(false);
const userData = ref(null);

// Monitor Login Status
onAuthStateChanged(auth, (user) => {
  isLoggedIn.value = !!user;
  userData.value = user;
  store.user = user;
});

// Compute user initial
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
};

// Scroll Logic
const handleScroll = () => {
  isScrolled.value = window.scrollY > 50;
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
    <div class="container">
      
      <router-link class="navbar-brand fw-bold brand-container" to="/">
        <span class="brand-text" :class="{ 'hide-text': isScrolled }">RA Consulting</span>
        
        <img 
            :src="logoImg" 
            alt="RA Logo" 
            class="brand-logo" 
            :class="{ 'show-logo': isScrolled }"
        >
      </router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto align-items-center">
          <li class="nav-item"><router-link class="nav-link" to="/">Home</router-link></li>
          <li class="nav-item"><a class="nav-link" href="/#about">About Us</a></li>
          <li class="nav-item"><a class="nav-link" href="/#services">Services</a></li>
          <li class="nav-item"><a class="nav-link" href="#contact">Contact</a></li>
          
          <li class="nav-item ms-lg-3 d-flex align-items-center gap-2">
            
            <div v-if="isLoggedIn && userData" class="user-avatar">
                <img v-if="userData.photoURL" :src="userData.photoURL" alt="User">
                <span v-else class="initial">{{ userInitial }}</span>
            </div>

            <button 
              @click="handleAuthClick" 
              class="btn btn-outline-light btn-sm rounded-pill px-3 fw-bold"
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
.transition-navbar {
    transition: all 0.4s ease-in-out;
    padding-top: 1rem;
    padding-bottom: 1rem;
}
.bg-solid { background-color: #1a2b49; box-shadow: none; }
.glass-nav {
    background-color: rgba(26, 43, 73, 0.85) !important; 
    backdrop-filter: blur(12px); 
    -webkit-backdrop-filter: blur(12px);
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

/* --- BRAND COLLAPSE ANIMATION --- */
.brand-container {
    position: relative;
    display: flex;
    align-items: center;
    height: 40px;
    overflow: hidden;
    /* Ensure the container is wide enough so the logo doesn't overlap text if needed */
    min-width: 180px; 
}

.brand-text {
    font-size: 1.5rem;
    transition: all 0.4s ease-in-out;
    white-space: nowrap;
    position: absolute; /* Keep text anchored */
    left: 0;
    top: 50%;
    transform: translateY(-50%);
}

/* When scrolled, move text UP and fade out */
.hide-text {
    opacity: 0;
    transform: translateY(-150%);
}

.brand-logo {
    position: absolute;
    left: 0;
    opacity: 0;
    transform: translateY(150%); /* Start from below */
    transition: all 0.4s ease-in-out;
    
    /* Circular & Sizing Styling */
    width: 40px; 
    height: 40px;
    border-radius: 50%; /* Makes it a circle */
    object-fit: cover;  /* Ensures image doesn't stretch */
    border: 2px solid white; /* Optional: adds a nice white ring around it */
}

/* When scrolled, move logo into place and fade in */
.show-logo {
    opacity: 1;
    transform: translateY(0);
}

/* --- USER AVATAR STYLES --- */
.user-avatar {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    overflow: hidden;
    border: 2px solid rgba(255, 255, 255, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    background: #1a2b49;
}

.user-avatar img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.initial {
    color: white;
    font-weight: bold;
    font-size: 1.1rem;
}
</style>