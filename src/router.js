import { createRouter, createWebHistory } from 'vue-router';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

// --- IMPORT VIEWS ---
import HomeView from './views/HomeView.vue';
import DashboardView from './views/DashboardView.vue';
import ContactView from './views/ContactView.vue';
// Ensure the path matches where you actually saved the file (likely ./views/...)
import AboutView from './views/AboutView.vue'; 
import ServicesView from './views/ServicesView.vue'; // <--- We will create this next!
import CareersView from './views/CareersView.vue';
import InsightsView from './views/InsightsView.vue';
import AdminDashboardView from './views/AdminDashboardView.vue';

const routes = [
    { 
        path: '/', 
        component: HomeView,
        meta: { title: 'Home | RA Consulting' } 
    },
    { 
        path: '/about', 
        name: 'about',
        component: AboutView,
        meta: { title: 'About Us | RA Consulting' }
    },
    { 
        path: '/contact', 
        name: 'contact',
        component: ContactView,
        meta: { title: 'Contact Us | RA Consulting' }
    },
    // --- SERVICE ROUTES (Dynamic) ---
    // This handles /services/research, /services/ict, etc. using one file
    {
        path: '/services/:serviceId?', 
        name: 'services',
        component: ServicesView,
        props: true,
        meta: { title: 'Our Services | RA Consulting' }
    },
    { 
        path: '/careers', 
        name: 'careers',
        component: CareersView,
        meta: { title: 'Join Our Team | RA Consulting' }
    },
    { 
        path: '/partners', 
        name: 'partners',
        component: CareersView, // Reusing the same page for now
        meta: { title: 'Partner With Us | RA Consulting' }
    },

    { 
        path: '/insights', 
        name: 'insights',
        component: InsightsView,
        meta: { title: 'Insights & Resources | RA Consulting' }
    },

    { 
    path: '/admin', 
    name: 'admin', 
    component: AdminDashboardView 
},
    { 
        path: '/dashboard', 
        name: 'dashboard',
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
    // Smooth Scrolling behavior
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
    document.title = to.meta.title || 'RA Strategic & Analytics Consulting';
});

export default router;