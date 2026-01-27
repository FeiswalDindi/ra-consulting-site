import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
// 1. Import the directive
import scrollReveal from './directives/scrollReveal'

// Import Bootstrap CSS and JS
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

// --- FIX START ---

// 1. Create the App Instance FIRST
const app = createApp(App)

// 2. Use the Router
app.use(router)

// 3. Register the scroll directive
app.directive('scroll-reveal', scrollReveal)

// 4. Finally, mount the app to the screen
app.mount('#app')

// ---  END ---