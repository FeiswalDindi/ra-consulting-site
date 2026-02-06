<script setup>
import { ref, watch, onMounted } from 'vue';
import { store } from '../store';
import { useRouter } from 'vue-router';

// IMPORT SUB-COMPONENTS
import AdminAnalytics from '../components/admin/AdminAnalytics.vue';
import AdminHeroEditor from '../components/admin/AdminHeroEditor.vue';
import AdminAboutEditor from '../components/admin/AdminAboutEditor.vue';
import AdminSocialsEditor from '../components/admin/AdminSocialsEditor.vue';
import AdminFileManager from '../components/admin/AdminFileManager.vue';

const router = useRouter();
if (!store.isAdmin) router.push('/');

// --- DRAFT STATE ---
const draftContent = ref(JSON.parse(JSON.stringify(store.content)));
const isLogsExpanded = ref(true);

// --- REPORTING STATE ---
const showReportModal = ref(false);
const reportType = ref('daily');
const reportDate = ref(new Date().toISOString().slice(0, 10));

// Sync Data Logic (Ensures editors aren't empty)
watch(() => store.content, (newVal) => {
    if (newVal) {
        const currentDraft = JSON.stringify(draftContent.value);
        const currentStore = JSON.stringify(newVal);
        if (currentDraft.length < 200 && currentStore.length > 200) {
            draftContent.value = JSON.parse(currentStore);
        }
        // Safety defaults
        if (!draftContent.value.heroSlides) draftContent.value.heroSlides = [];
        if (!draftContent.value.socialUpdates) draftContent.value.socialUpdates = [];
        if (!draftContent.value.about) draftContent.value.about = { title: '', text: '' };
    }
}, { deep: true, immediate: true });

// --- ACTIONS ---
const publishChanges = () => {
    store.content = JSON.parse(JSON.stringify(draftContent.value));
    store.saveContent();
    store.trackActivity("CMS Update", "Admin published global content changes");
    alert("✅ Changes Published Live!");
};

const discardChanges = () => {
    if(confirm("Discard all unsaved changes?")) draftContent.value = JSON.parse(JSON.stringify(store.content));
};

const goToFirestore = () => window.open('https://console.firebase.google.com/', '_blank');

// --- REPORTING LOGIC ---
const openReportModal = () => { showReportModal.value = true; };
const closeReportModal = () => { showReportModal.value = false; };

const generateReport = () => {
    // 1. Filter Logs
    const selected = new Date(reportDate.value);
    let filteredLogs = [];
    let filename = "Report.csv";

    // Helper: Safely get date object from log
    const getLogDate = (log) => {
        if (log.timestamp && log.timestamp.seconds) return new Date(log.timestamp.seconds * 1000);
        if (log.rawDate) return new Date(log.rawDate);
        return new Date();
    };

    if (reportType.value === 'daily') {
        filename = `Daily_Report_${reportDate.value}.csv`;
        filteredLogs = store.activityLogs.filter(log => {
            const d = getLogDate(log);
            return d.toISOString().slice(0, 10) === reportDate.value;
        });
    } else if (reportType.value === 'weekly') {
        filename = `Weekly_Report_${reportDate.value}.csv`;
        const start = new Date(reportDate.value);
        const end = new Date(start);
        end.setDate(start.getDate() + 7);
        filteredLogs = store.activityLogs.filter(log => {
            const d = getLogDate(log);
            return d >= start && d <= end;
        });
    } else if (reportType.value === 'monthly') {
        filename = `Monthly_Report_${reportDate.value}.csv`;
        const [year, month] = reportDate.value.split('-');
        filteredLogs = store.activityLogs.filter(log => {
            const d = getLogDate(log);
            return d.getFullYear() === parseInt(year) && (d.getMonth() + 1) === parseInt(month);
        });
    }

    if (filteredLogs.length === 0) {
        alert("No records found for this period.");
        return;
    }

    // 2. Create CSV
    const headers = ["Time", "User", "Role", "Action", "Details"];
    const rows = filteredLogs.map(log => [
        `"${log.time}"`, `"${log.userName}"`, `"${log.userRole}"`, `"${log.action}"`, `"${log.details.replace(/"/g, '""')}"`
    ]);
    const csvContent = "data:text/csv;charset=utf-8," + headers.join(",") + "\n" + rows.map(e => e.join(",")).join("\n");
    
    // 3. Trigger Download
    const link = document.createElement("a");
    link.href = encodeURI(csvContent);
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    closeReportModal();
};
</script>

<template>
  <main class="admin-page py-5 mt-5 bg-light min-vh-100">
    <div class="container py-4">
      
      <div class="d-flex flex-column flex-md-row justify-content-between align-items-center mb-5 border-bottom pb-4 gap-3">
          <div class="text-center text-md-start">
              <h6 class="text-sky fw-bold ls-2 small text-uppercase mb-1">Management Console</h6>
              <h1 class="display-6 fw-bold text-navy">RA Dashboard</h1>
          </div>
          <div class="d-flex flex-wrap gap-2 justify-content-center">
              <button @click="goToFirestore" class="btn btn-white border shadow-sm btn-sm d-flex align-items-center gap-2 text-muted fw-bold">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" /></svg>
                  <span>Database</span>
              </button>
              <button @click="openReportModal" class="btn btn-white border shadow-sm btn-sm d-flex align-items-center gap-2 text-muted fw-bold">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                  <span>Export Reports</span>
              </button>
              <div class="vr mx-2 text-muted opacity-25"></div>
              <button @click="discardChanges" class="btn btn-outline-danger btn-sm d-flex align-items-center gap-2 fw-bold">Discard</button>
              <button @click="publishChanges" class="btn btn-navy fw-bold px-4 d-flex align-items-center gap-2 shadow-sm">Publish All</button>
          </div>
      </div>

      <div class="card border-0 shadow-sm p-4 bg-white mb-5 rounded-4">
          <div class="d-flex justify-content-between align-items-center mb-4">
              <h5 class="fw-bold text-navy mb-0 d-flex align-items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" class="text-sky"><path stroke-linecap="round" stroke-linejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                  Activity Intelligence
              </h5>
              <button @click="isLogsExpanded = !isLogsExpanded" class="btn btn-sm btn-light border fw-bold text-muted">
                  {{ isLogsExpanded ? 'Collapse' : 'Expand' }}
              </button>
          </div>
          <div v-if="isLogsExpanded" class="fade-in">
              <AdminAnalytics :logs="store.activityLogs" />
              
              <div class="table-responsive border rounded mt-4" style="max-height: 300px; overflow-y: auto;">
                  <table class="table table-hover align-middle mb-0">
                      <thead class="bg-light sticky-top">
                          <tr><th class="ps-3">Time</th><th>User</th><th>Role</th><th>Action</th><th>Details</th></tr>
                      </thead>
                      <tbody>
                          <tr v-for="log in store.activityLogs" :key="log.id">
                              <td class="small text-muted ps-3 text-nowrap">{{ log.time }}</td>
                              <td class="fw-bold small">{{ log.userName }}</td>
                              <td><span class="badge bg-light text-dark border">{{ log.userRole }}</span></td>
                              <td><span class="badge bg-navy text-white">{{ log.action }}</span></td>
                              <td class="small text-muted text-truncate" style="max-width: 200px;">{{ log.details }}</td>
                          </tr>
                      </tbody>
                  </table>
              </div>
          </div>
      </div>

      <hr class="my-5 text-muted opacity-25">

      <AdminHeroEditor :slides="draftContent.heroSlides" />

      <div class="row g-4 mb-5">
          <div class="col-12">
              <AdminAboutEditor :aboutData="draftContent.about" />
          </div>
          <div class="col-12">
              <AdminSocialsEditor :socials="draftContent.socialUpdates" />
          </div>
      </div>

      <AdminFileManager />

    </div>

    <div v-if="showReportModal" class="modal-backdrop-custom d-flex align-items-center justify-content-center">
        <div class="bg-white p-4 rounded-4 shadow-lg border" style="width: 400px; max-width: 90%;">
            <h5 class="fw-bold text-navy mb-3">Export Activity Records</h5>
            <div class="mb-3">
                <label class="small text-muted fw-bold mb-1">Report Type</label>
                <select v-model="reportType" class="form-select">
                    <option value="daily">Daily Report</option>
                    <option value="weekly">Weekly Report</option>
                    <option value="monthly">Monthly Report</option>
                </select>
            </div>
            <div class="mb-4">
                <label class="small text-muted fw-bold mb-1">Select Period</label>
                <input v-if="reportType === 'daily' || reportType === 'weekly'" type="date" v-model="reportDate" class="form-control">
                <input v-else type="month" v-model="reportDate" class="form-control">
            </div>
            <div class="d-flex gap-2">
                <button @click="closeReportModal" class="btn btn-light border w-50">Cancel</button>
                <button @click="generateReport" class="btn btn-navy w-50">Download CSV</button>
            </div>
        </div>
    </div>

  </main>
</template>

<style scoped>
.text-navy { color: #1a2b49; }
.bg-navy { background-color: #1a2b49 !important; }
.btn-navy { background-color: #1a2b49; color: white; border: none; }
.btn-navy:hover { background-color: #0f1a2e; transform: translateY(-1px); }
.btn-white { background-color: white; color: #555; }
.btn-white:hover { background-color: #f8f9fa; color: #1a2b49; }
.text-sky { color: #0ea5e9; }
.ls-2 { letter-spacing: 2px; }
.fade-in { animation: fadeIn 0.4s ease-out; }
.modal-backdrop-custom {
    position: fixed; top: 0; left: 0; width: 100%; height: 100%;
    background: rgba(26, 43, 73, 0.4); backdrop-filter: blur(4px); z-index: 1050;
}
@keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
</style>