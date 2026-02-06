<script setup>
import { computed, defineProps } from 'vue';

// 1. Accept Data from Parent
const props = defineProps(['logs']);

// 2. Stats Logic
const analytics = computed(() => {
    const data = props.logs || [];
    return {
        total: data.length,
        logins: data.filter(l => l.action === 'Login').length,
        views: data.filter(l => l.action === 'Page View').length
    };
});

// 3. Chart Logic (Simplified & Robust)
const chartData = computed(() => {
    const daysMap = {};
    const today = new Date();
    
    // A. Create 7 Empty Buckets
    // We use .toDateString() (e.g. "Fri Feb 06 2026") as the unique key.
    // This is timezone-safe and bulletproof.
    for (let i = 6; i >= 0; i--) {
        const d = new Date();
        d.setDate(today.getDate() - i);
        const key = d.toDateString(); 
        
        daysMap[key] = {
            label: d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }), // "Feb 6"
            count: 0
        };
    }

    // B. Fill Buckets
    if (props.logs) {
        props.logs.forEach(log => {
            // We TRUST the store's rawDate. 
            // We create a new Date object to ensure it's a valid instance.
            if (log.rawDate) {
                const logDate = new Date(log.rawDate);
                const key = logDate.toDateString();

                // If this date key exists in our 7-day map, count it.
                if (daysMap[key]) {
                    daysMap[key].count++;
                }
            }
        });
    }

    // C. Format for UI
    // We rebuild the array based on the 7-day loop to ensure chronological order
    const result = [];
    for (let i = 6; i >= 0; i--) {
        const d = new Date();
        d.setDate(today.getDate() - i);
        const key = d.toDateString();
        if (daysMap[key]) {
            result.push(daysMap[key]);
        }
    }

    // Calculate Bar Heights
    const maxVal = Math.max(...result.map(d => d.count), 1);
    
    return result.map(item => ({ 
        date: item.label, 
        count: item.count, 
        height: (item.count / maxVal) * 100 + '%' 
    }));
});
</script>

<template>
  <div class="row g-4 mb-4">
    <div class="col-lg-4">
      <div class="row g-3 h-100">
        <div class="col-12">
            <div class="p-3 bg-light-navy rounded border border-navy h-100 d-flex flex-column justify-content-center position-relative overflow-hidden">
              <h2 class="fw-bold text-navy mb-0 position-relative z-2">{{ analytics.total }}</h2>
              <small class="text-muted fw-bold text-uppercase position-relative z-2">Total Activity</small>
              <svg class="position-absolute end-0 bottom-0 mb-n2 me-n2 text-navy opacity-10" width="80" height="80" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M8 1a2 2 0 0 1 2 2v2H6V3a2 2 0 0 1 2-2zm3 4V3a3 3 0 1 0-6 0v2H3.36a1.5 1.5 0 0 0-1.483 1.277L.85 13.13A2.5 2.5 0 0 0 3.322 16h9.355a2.5 2.5 0 0 0 2.473-2.87l-1.028-6.853A1.5 1.5 0 0 0 12.64 5H11zm-1 1v1.5a.5.5 0 0 0 1 0V6h1.64a.5.5 0 0 1 .495.426l1.028 6.851A1.5 1.5 0 0 1 12.678 15H3.322a1.5 1.5 0 0 1-1.483-1.723l1.028-6.851A.5.5 0 0 1 4.36 6H6v1.5a.5.5 0 0 0 1 0V6h3z"/>
              </svg>
            </div>
        </div>
        <div class="col-6">
            <div class="p-3 bg-light rounded border h-100">
              <h4 class="fw-bold text-success mb-0">{{ analytics.logins }}</h4>
              <small class="text-muted small">Logins</small>
            </div>
        </div>
        <div class="col-6">
            <div class="p-3 bg-light rounded border h-100">
              <h4 class="fw-bold text-sky mb-0">{{ analytics.views }}</h4>
              <small class="text-muted small">Views</small>
            </div>
        </div>
      </div>
    </div>

    <div class="col-lg-8">
      <div class="p-3 border rounded bg-white h-100 d-flex flex-column">
        <div class="d-flex justify-content-between align-items-center mb-3">
             <small class="fw-bold text-muted text-uppercase ls-2">7-Day Engagement Trend</small>
             <div class="d-flex align-items-center gap-2">
                 <span class="status-dot"></span>
                 <small class="text-muted" style="font-size: 0.7rem;">Live</small>
             </div>
        </div>
        
        <div class="d-flex align-items-end justify-content-between flex-grow-1" style="min-height: 150px;">
          <div v-for="day in chartData" :key="day.date" class="d-flex flex-column align-items-center" style="width: 12%;">
            <div class="bg-navy rounded-top w-100 position-relative chart-bar" :style="{ height: day.height, minHeight: '4px' }">
                <div class="bar-tooltip">{{ day.count }} Events</div>
            </div>
            <small class="text-muted mt-2 fw-bold" style="font-size: 0.65rem;">{{ day.date }}</small>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.text-navy { color: #1a2b49; }
.bg-navy { background-color: #1a2b49; }
.text-sky { color: #0ea5e9; }
.bg-light-navy { background-color: #f0f4f8; }
.border-navy { border-color: #1a2b49 !important; }
.ls-2 { letter-spacing: 2px; }
.opacity-10 { opacity: 0.1; }

.status-dot { width: 6px; height: 6px; background-color: #2ecc71; border-radius: 50%; animation: blink 2s infinite; }
@keyframes blink { 0% { opacity: 1; } 50% { opacity: 0.4; } 100% { opacity: 1; } }

.chart-bar { transition: height 0.6s ease; cursor: pointer; opacity: 0.9; }
.chart-bar:hover { background-color: #0ea5e9; opacity: 1; transform: scaleY(1.05); transform-origin: bottom; }

.bar-tooltip { 
    position: absolute; 
    top: -30px; 
    left: 50%; 
    transform: translateX(-50%); 
    background: #1a2b49; 
    color: white; 
    padding: 4px 8px; 
    border-radius: 4px; 
    font-size: 0.7rem; 
    opacity: 0; 
    transition: 0.2s; 
    pointer-events: none; 
    white-space: nowrap;
    z-index: 5;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}
.chart-bar:hover .bar-tooltip { opacity: 1; top: -35px; }
</style>