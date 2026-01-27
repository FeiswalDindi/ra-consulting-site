<script setup>
import { onMounted } from 'vue';
import { auth } from '../firebase'; 
import { GoogleAuthProvider, signInWithCredential, onAuthStateChanged } from 'firebase/auth';

// ⚠️ PASTE YOUR CLIENT ID HERE
const GOOGLE_CLIENT_ID = "563844962607-l97k6aknol8n3duh1bgi0k17tknf9atf.apps.googleusercontent.com"; 

onMounted(() => {
  onAuthStateChanged(auth, (user) => {
    if (!user) initializeOneTap();
  });
});

const initializeOneTap = () => {
  if (window.google) {
    window.google.accounts.id.initialize({
      client_id: GOOGLE_CLIENT_ID,
      callback: handleResponse,
      cancel_on_tap_outside: false,
      context: 'signin',
    });
    window.google.accounts.id.prompt((notif) => {
      if (notif.isNotDisplayed()) console.log("One Tap skipped:", notif.getNotDisplayedReason());
    });
  }
};

const handleResponse = (response) => {
  const credential = GoogleAuthProvider.credential(response.credential);
  signInWithCredential(auth, credential)
    .then((res) => console.log("Auto-login success:", res.user))
    .catch((err) => console.error("One Tap Error:", err));
};
</script>

<template>
  <div style="display: none;"></div>
</template>