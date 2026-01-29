<script setup>
import { ref } from 'vue';
import { store } from '../store';
import { auth, googleProvider } from '../firebase';
import { 
  signInWithPopup, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  updateProfile 
} from 'firebase/auth';
import { useRouter } from 'vue-router'; 

const router = useRouter(); 

// Form Data
const email = ref('');
const password = ref('');
const errorMessage = ref(''); // Fixed name match
const isLogin = ref(true);    // Fixed missing toggle state

// 1. Unified Form Handler (Matches @submit.prevent="handleSubmit")
const handleSubmit = async () => {
    errorMessage.value = '';

    // A. CHECK FOR ADMIN LOGIN (Only works in Login Mode)
    if (isLogin.value && email.value === "feisaldindi4@gmail.com" && password.value === "Admin123") {
        store.loginAdmin();
        store.closeModal();
        router.push('/admin'); 
        return;
    }

    // B. NORMAL FIREBASE LOGIC
    try {
        if (isLogin.value) {
            // Login
            await signInWithEmailAndPassword(auth, email.value, password.value);
        } else {
            // Sign Up
            const userCredential = await createUserWithEmailAndPassword(auth, email.value, password.value);
            // Optional: Set a default name based on email
            await updateProfile(userCredential.user, {
                displayName: email.value.split('@')[0]
            });
        }
        // Success -> Close Modal
        store.closeModal();
    } catch (error) {
        console.error(error);
        if (error.code === 'auth/wrong-password') errorMessage.value = "Incorrect password.";
        else if (error.code === 'auth/user-not-found') errorMessage.value = "No account found with this email.";
        else if (error.code === 'auth/email-already-in-use') errorMessage.value = "Email already in use. Please log in.";
        else errorMessage.value = "Authentication failed. Please try again.";
    }
};

// 2. Google Handler (Matches @click="handleGoogle")
const handleGoogle = async () => {
  try {
    await signInWithPopup(auth, googleProvider);
    store.closeModal();
  } catch (error) {
    errorMessage.value = "Google sign-in failed.";
  }
};
</script>

<template>
  <div v-if="store.isLoginModalOpen" class="modal-overlay" @click.self="store.closeModal()">
    <div class="glass-card">
      <button class="close-btn" @click="store.closeModal()">×</button>
      
      <div class="text-center mb-4">
        <h3 class="fw-bold text-white">{{ isLogin ? 'Welcome Back' : 'Join RA Consulting' }}</h3>
        <p class="text-white-50 small">Please login to send messages & access features.</p>
      </div>

      <button @click="handleGoogle" class="social-btn google mb-3">
        <svg class="icon" viewBox="0 0 24 24" width="20" height="20" xmlns="http://www.w3.org/2000/svg"><g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)"><path fill="#4285F4" d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"/><path fill="#34A853" d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z"/><path fill="#FBBC05" d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"/><path fill="#EA4335" d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z"/></g></svg>
        <span>Continue with Google</span>
      </button>

      <div class="divider text-white-50">or</div>

      <form @submit.prevent="handleSubmit">
        <input type="email" v-model="email" placeholder="Email Address" required class="glass-input mb-3">
        <input type="password" v-model="password" placeholder="Password" required class="glass-input mb-3">
        
        <p v-if="errorMessage" class="error-msg">{{ errorMessage }}</p>

        <button type="submit" class="submit-btn">{{ isLogin ? 'Log In' : 'Sign Up' }}</button>
      </form>

      <p class="toggle-text mt-3 text-white-50">
        {{ isLogin ? "No account?" : "Have an account?" }}
        <span @click="isLogin = !isLogin" class="text-white fw-bold pointer">{{ isLogin ? 'Sign up' : 'Log in' }}</span>
      </p>
    </div>
  </div>
</template>

<style scoped>
/* 1. The Dark Overlay */
.modal-overlay {
  position: fixed;
  top: 0; left: 0; width: 100%; height: 100%;
  background: rgba(0, 0, 0, 0.4); 
  backdrop-filter: blur(4px); 
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10000;
}

/* 2. The Glass Card */
.glass-card {
  background: rgba(26, 43, 73, 0.75); 
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  padding: 40px;
  width: 90%;
  max-width: 420px;
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
  position: relative;
  text-align: center;
}

.glass-input {
  width: 100%;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 12px;
  border-radius: 8px;
  color: white;
  outline: none;
}
.glass-input::placeholder { color: rgba(255, 255, 255, 0.6); }
.glass-input:focus { background: rgba(255, 255, 255, 0.2); border-color: white; }

.submit-btn {
  width: 100%;
  padding: 12px;
  background: #ffffff;
  color: #1a2b49;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  transition: transform 0.2s;
}
.submit-btn:hover { transform: scale(1.02); }

.social-btn {
  width: 100%;
  background: white;
  border: none;
  padding: 10px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-weight: 600;
  color: #333;
}

.close-btn {
  position: absolute;
  top: 15px; right: 20px;
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.6);
  font-size: 1.5rem;
}
.close-btn:hover { color: white; }
.pointer { cursor: pointer; text-decoration: underline; }
.error-msg { color: #ff9999; font-size: 0.85rem; margin-bottom: 10px; }
</style>