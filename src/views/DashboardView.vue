<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';

const router = useRouter();
const userEmail = ref('');

// When the page loads, check who is logged in
onMounted(() => {
  const user = auth.currentUser;
  if (user) {
    userEmail.value = user.email;
  }
});

const handleLogout = async () => {
  await signOut(auth);
  router.push('/login'); // Send back to login after signing out
};
</script>

<template>
  <div class="dashboard-container">
    <div class="sidebar">
      <h3>My Account</h3>
      <ul>
        <li class="active">Overview</li>
        <li>Messages</li>
        <li>Settings</li>
      </ul>
      <button @click="handleLogout" class="logout-btn">Log Out</button>
    </div>

    <div class="content">
      <h1>Welcome back!</h1>
      <p class="user-badge">{{ userEmail }}</p>
      
      <div class="card-grid">
        <div class="status-card">
          <h4>Notifications</h4>
          <p class="number">0</p>
          <small>New system messages</small>
        </div>
        <div class="status-card">
          <h4>Active Requests</h4>
          <p class="number">No</p>
          <small>Pending actions</small>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dashboard-container {
  display: flex;
  min-height: 100vh;
  background-color: #f8f9fa;
  padding-top: 80px; /* Space for fixed navbar */
}

.sidebar {
  width: 250px;
  background: white;
  padding: 20px;
  border-right: 1px solid #e1e4e8;
  display: flex;
  flex-direction: column;
}

.sidebar h3 {
  color: #1a2b49;
  margin-bottom: 20px;
}

.sidebar ul {
  list-style: none;
  padding: 0;
  flex: 1;
}

.sidebar li {
  padding: 10px;
  color: #666;
  cursor: pointer;
  border-radius: 5px;
  margin-bottom: 5px;
}

.sidebar li.active, .sidebar li:hover {
  background-color: #e3effd;
  color: #1a2b49;
  font-weight: bold;
}

.logout-btn {
  background-color: #fee2e2;
  color: #dc2626;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
}

.content {
  flex: 1;
  padding: 40px;
}

.user-badge {
  background: #1a2b49;
  color: white;
  display: inline-block;
  padding: 5px 15px;
  border-radius: 20px;
  font-size: 0.9rem;
  margin-bottom: 30px;
}

.card-grid {
  display: flex;
  gap: 20px;
}

.status-card {
  background: white;
  padding: 20px;
  border-radius: 10px;
  width: 200px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.05);
}

.status-card h4 {
  font-size: 1rem;
  color: #666;
}

.status-card .number {
  font-size: 2rem;
  font-weight: bold;
  color: #1a2b49;
  margin: 10px 0;
}
</style>