import { createRouter, createWebHistory } from 'vue-router';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

import HomeView from './views/HomeView.vue';
import DashboardView from './views/DashboardView.vue';
import ContactView from './views/ContactView.vue';

const routes = [
    { 
        path: '/', 
        component: HomeView,
        meta: { title: 'Home | RA Consulting' } // <--- Custom Title
    },
    { 
        path: '/contact', 
        component: ContactView,
        meta: { title: 'Contact Us | RA Consulting' }
    },
    { 
        path: '/dashboard', 
        component: DashboardView,
        meta: { 
            requiresAuth: true,
            title: 'My Dashboard | RA Consulting'
        }
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior(to, from, savedPosition) {
        if (to.hash) {
            return { el: to.hash, behavior: 'smooth' }
        }
        return { top: 0 }
    }
});

// --- 1. Security Guard (Keep Dashboard Safe) ---
router.beforeEach(async (to, from, next) => {
    const auth = getAuth();
    const user = await new Promise((resolve) => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            unsubscribe();
            resolve(user);
        });
    });

    if (to.meta.requiresAuth && !user) {
        next('/'); 
    } else {
        next();
    }
});

// --- 2. Title Updater (Change Browser Tab) ---
router.afterEach((to) => {
    // If the route has a title, use it. Otherwise, use a default.
    document.title = to.meta.title || 'RA Strategic & Analytics Consulting';
});

export default router;