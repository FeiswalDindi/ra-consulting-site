import { reactive } from 'vue';

export const store = reactive({
  isLoginModalOpen: false, // Controls if the popup is visible
  user: null, // Stores the logged-in user info
  
  openModal() {
    this.isLoginModalOpen = true;
  },
  
  closeModal() {
    this.isLoginModalOpen = false;
  }
});