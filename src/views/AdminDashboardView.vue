<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { store } from '../store';
import { useRouter } from 'vue-router';
import { db } from '../firebase'; 
import { collection, query, orderBy, limit, onSnapshot, where, getDocs } from 'firebase/firestore'; 
import Hero from '../components/Hero.vue'; 

const router = useRouter();

// Protect Route
if (!store.isAdmin) {
    router.push('/');
}

// --- STATE ---
const draftContent = ref({ heroSlides: [], hero: {}, about: {}, socialUpdates: [] });
const activityLogs = ref([]); 
const isLoadingLogs = ref(true); 
const isLogsExpanded = ref(true); // [NEW] Toggle for table visibility
let unsubscribeLogs = null; 

// --- REPORTING STATE ---
const reportMonths = ref([]); // Holds "January 2026", "February 2026", etc.
const isGeneratingReport = ref(false);

// --- FILE UPLOAD STATE ---
const isUploading = ref(false);
const uploadProgress = ref(0);
const newFileName = ref('');
const selectedFile = ref(null);

// --- INTELLIGENT ANALYTICS ---
const analytics = computed(() => {
    const total = activityLogs.value.length;
    const logins = activityLogs.value.filter(l => l.action === 'Login').length;
    const contentViews = activityLogs.value.filter(l => l.action === 'Content Access').length;
    return { total, logins, contentViews };
});

// --- LIVE LOG LISTENER ---
const subscribeToLogs = () => {
    try {
        const q = query(collection(db, "user_logs"), orderBy("timestamp", "desc"), limit(50));
        unsubscribeLogs = onSnapshot(q, (snapshot) => {
            activityLogs.value = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
                time: doc.data().timestamp ? new Date(doc.data().timestamp.seconds * 1000).toLocaleString() : 'Just now'
            }));
            isLoadingLogs.value = false;
        }, (error) => {
            console.error("Live Sync Error:", error);
            isLoadingLogs.value = false;
        });
    } catch (e) {
        console.error("Connection failed:", e);
        isLoadingLogs.value = false;
    }
};

// --- [NEW] MONTHLY REPORT LOGIC ---
const initReportDropdown = () => {
    // Generates the last 12 months for the dropdown
    const options = [];
    const today = new Date();
    for (let i = 0; i < 12; i++) {
        const d = new Date(today.getFullYear(), today.getMonth() - i, 1);
        const label = d.toLocaleString('default', { month: 'long', year: 'numeric' }); // e.g., "February 2026"
        const value = `${d.getFullYear()}-${d.getMonth()}`; // e.g., "2026-1" (Months are 0-indexed)
        options.push({ label, value });
    }
    reportMonths.value = options;
};

const handleReportSelect = async (event) => {
    const selectedValue = event.target.value;
    if (!selectedValue) return;

    isGeneratingReport.value = true;
    const [year, month] = selectedValue.split('-').map(Number);

    try {
        // 1. Calculate Start and End Date for the selected month
        const startDate = new Date(year, month, 1);
        const endDate = new Date(year, month + 1, 0, 23, 59, 59); // Last second of the month

        // 2. Query Firestore for ONLY that month's data
        const q = query(
            collection(db, "user_logs"),
            where("timestamp", ">=", startDate),
            where("timestamp", "<=", endDate),
            orderBy("timestamp", "desc")
        );

        const snapshot = await getDocs(q);
        const monthlyLogs = snapshot.docs.map(doc => {
            const data = doc.data();
            return {
                time: data.timestamp ? new Date(data.timestamp.seconds * 1000).toLocaleString() : 'Unknown',
                userName: data.userName || 'Unknown',
                userEmail: data.userEmail || 'N/A',
                action: data.action,
                details: data.details
            };
        });

        if (monthlyLogs.length === 0) {
            alert(`No activity found for ${new Date(year, month).toLocaleString('default', { month: 'long' })}.`);
            event.target.value = ""; // Reset dropdown
            isGeneratingReport.value = false;
            return;
        }

        // 3. Generate CSV
        let csvContent = "data:text/csv;charset=utf-8,";
        csvContent += "Time,User Name,User Email,Action,Details\n";
        monthlyLogs.forEach(log => {
             const row = [
                `"${log.time}"`,
                `"${log.userName}"`,
                `"${log.userEmail}"`,
                `"${log.action}"`,
                `"${log.details}"`
            ].join(",");
            csvContent += row + "\n";
        });

        // 4. Download
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `RA_Report_${year}_${month + 1}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

    } catch (e) {
        console.error("Report Generation Error:", e);
        alert("Error generating report. Check console.");
    } finally {
        isGeneratingReport.value = false;
        event.target.value = ""; // Reset dropdown
    }
};

const openFirestoreConsole = () => {
    window.open('https://console.firebase.google.com/u/0/project/ra-consulting-app/firestore/data/~2Fuser_logs', '_blank');
};

onMounted(() => {
    draftContent.value = JSON.parse(JSON.stringify(store.content));
    if (!draftContent.value.socialUpdates) draftContent.value.socialUpdates = [];
    if (!store.content.resources) store.content.resources = [];
    
    subscribeToLogs();
    initReportDropdown(); // [NEW] Init dropdown
});

onUnmounted(() => {
    if (unsubscribeLogs) unsubscribeLogs();
});

// --- HELPERS & OTHER LOGIC (Slider, Socials, Files) ---
// (Keeping existing logic for brevity - it remains unchanged)
const formatLastUpdated = (dateString) => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    return date.toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
};

const addSlide = () => {
    draftContent.value.heroSlides.push({ id: Date.now(), image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80', title: 'New Headline', subtitle: 'New subtitle description.' });
};
const removeSlide = (index) => { if (draftContent.value.heroSlides.length > 1) draftContent.value.heroSlides.splice(index, 1); else alert("Keep at least one slide."); };
const addSocialPost = () => { draftContent.value.socialUpdates.unshift({ id: Date.now(), platform: 'LinkedIn', date: new Date().toISOString(), text: 'New update...', link: '#' }); };
const updateTimestamp = (post) => { post.date = new Date().toISOString(); };
const removeSocialPost = (index) => { draftContent.value.socialUpdates.splice(index, 1); };
const handleFileSelect = (event) => { const file = event.target.files[0]; if (file) { selectedFile.value = file; newFileName.value = file.name.split('.')[0]; } };
const handleUpload = () => {
    if (!selectedFile.value) return;
    isUploading.value = true;
    uploadProgress.value = 0;
    const interval = setInterval(() => {
        uploadProgress.value += 10;
        if (uploadProgress.value >= 100) {
            clearInterval(interval);
            const bytes = selectedFile.value.size;
            let displaySize = (bytes < 1024 * 1024) ? (bytes / 1024).toFixed(0) + ' KB' : (bytes / (1024 * 1024)).toFixed(1) + ' MB';
            const newResource = { id: Date.now(), title: newFileName.value, fileName: selectedFile.value.name, type: selectedFile.value.name.split('.').pop().toUpperCase(), size: displaySize, status: 'Available' };
            store.addResource(newResource);
            isUploading.value = false;
            selectedFile.value = null;
            newFileName.value = '';
            alert("File published successfully to Client Portal.");
        }
    }, 200);
};
const deleteResource = (index) => { if(confirm("Are you sure?")) store.deleteResource(index); };
const publishChanges = () => { const currentResources = store.content.resources || []; store.content = JSON.parse(JSON.stringify(draftContent.value)); store.content.resources = currentResources; store.saveContent(); alert("Content Changes Published Successfully!"); };
const discardChanges = () => { if(confirm("Discard all unsaved text changes?")) draftContent.value = JSON.parse(JSON.stringify(store.content)); };
</script>

<template>
  <main class="admin-page py-5 mt-5 bg-light min-vh-100">
    <div class="container py-4">
      
      <div class="d-flex flex-column flex-md-row justify-content-between align-items-center mb-5 border-bottom pb-4 gap-3">
          <div class="text-center text-md-start">
              <h6 class="text-danger fw-bold ls-2 small">ADMINISTRATION</h6>
              <h1 class="display-6 fw-bold text-navy">Content Manager</h1>
          </div>
          <div class="d-flex gap-2">
              <button @click="discardChanges" class="btn btn-outline-secondary btn-sm">Discard Drafts</button>
              <button @click="publishChanges" class="btn btn-navy btn-sm fw-bold px-4">Publish Content</button>
          </div>
      </div>

      <div class="row g-4">
          
          <div class="col-12">
              <div class="card border-0 shadow-sm p-4 bg-white">
                  <div class="d-flex flex-wrap justify-content-between align-items-center mb-4 gap-3">
                      <div class="d-flex align-items-center gap-3">
                          <button @click="isLogsExpanded = !isLogsExpanded" class="btn btn-light rounded-circle border shadow-sm p-0 d-flex align-items-center justify-content-center" style="width: 32px; height: 32px;">
                                <span v-if="isLogsExpanded">−</span>
                                <span v-else>+</span>
                          </button>
                          <div>
                              <h5 class="fw-bold text-navy mb-1">User Activity Intelligence</h5>
                              <p class="text-muted small mb-0">Live tracking • {{ isLogsExpanded ? 'Expanded View' : 'Minimized' }}</p>
                          </div>
                      </div>
                      
                      <div class="d-flex gap-2 align-items-center">
                          <div class="dropdown-wrapper d-flex align-items-center gap-2">
                              <span class="small fw-bold text-muted text-uppercase d-none d-md-block">Download Report:</span>
                              <select class="form-select form-select-sm fw-bold border-success text-success" @change="handleReportSelect" :disabled="isGeneratingReport" style="width: 160px;">
                                  <option value="" selected>{{ isGeneratingReport ? 'Generating...' : 'Select Month' }}</option>
                                  <option v-for="m in reportMonths" :key="m.value" :value="m.value">
                                      {{ m.label }}
                                  </option>
                              </select>
                          </div>

                          <button @click="openFirestoreConsole" class="btn btn-outline-secondary btn-sm d-flex align-items-center gap-2">
                              <span>⚙️</span> DB
                          </button>
                      </div>
                  </div>

                  <div v-if="isLogsExpanded" class="fade-in">
                      <div class="row g-3 mb-4">
                          <div class="col-md-4">
                              <div class="p-3 bg-light-navy rounded border border-navy">
                                  <h3 class="fw-bold text-navy mb-0">{{ analytics.total }}</h3>
                                  <small class="text-muted fw-bold text-uppercase">Total Interactions</small>
                              </div>
                          </div>
                          <div class="col-md-4">
                              <div class="p-3 bg-light rounded border">
                                  <h3 class="fw-bold text-success mb-0">{{ analytics.logins }}</h3>
                                  <small class="text-muted fw-bold text-uppercase">Logins</small>
                              </div>
                          </div>
                          <div class="col-md-4">
                              <div class="p-3 bg-light rounded border">
                                  <h3 class="fw-bold text-primary mb-0">{{ analytics.contentViews }}</h3>
                                  <small class="text-muted fw-bold text-uppercase">Content Views</small>
                              </div>
                          </div>
                      </div>
                      
                      <div class="table-responsive border rounded" style="max-height: 300px; overflow-y: auto;">
                          <table class="table table-hover align-middle mb-0">
                              <thead class="bg-light sticky-top">
                                  <tr>
                                      <th class="small text-muted text-uppercase">Time</th>
                                      <th class="small text-muted text-uppercase">User</th>
                                      <th class="small text-muted text-uppercase">Action</th>
                                      <th class="small text-muted text-uppercase">Details</th>
                                  </tr>
                              </thead>
                              <tbody>
                                  <tr v-if="isLoadingLogs">
                                      <td colspan="4" class="text-center p-4 text-muted">
                                          <span class="spinner-border spinner-border-sm text-navy" role="status"></span>
                                          Connecting to live feed...
                                      </td>
                                  </tr>
                                  <tr v-else-if="activityLogs.length === 0">
                                      <td colspan="4" class="text-center p-4 text-muted">No activity recorded yet.</td>
                                  </tr>
                                  <tr v-for="log in activityLogs" :key="log.id">
                                      <td class="small text-muted text-nowrap">{{ log.time }}</td>
                                      <td>
                                          <div class="d-flex align-items-center gap-2">
                                              <div class="bg-light-navy text-navy rounded-circle d-flex align-items-center justify-content-center fw-bold small" style="width: 24px; height: 24px;">
                                                  {{ log.userName ? log.userName.charAt(0) : '?' }}
                                              </div>
                                              <span class="small fw-bold">{{ log.userName || log.userEmail }}</span>
                                          </div>
                                      </td>
                                      <td><span class="badge bg-light text-dark border">{{ log.action }}</span></td>
                                      <td class="small text-muted">{{ log.details }}</td>
                                  </tr>
                              </tbody>
                          </table>
                      </div>
                  </div>
              </div>
          </div>

          <div class="col-12">
              <div class="card border-0 shadow-sm p-4 bg-white">
                  <div class="row g-4">
                      <div class="col-lg-4 border-end-lg">
                          <h5 class="fw-bold text-navy mb-3">Upload Resource</h5>
                          <div class="mb-3">
                              <label class="small text-muted fw-bold mb-1">Select Document</label>
                              <input type="file" class="form-control form-control-sm" @change="handleFileSelect" accept=".pdf,.docx,.xlsx,.pptx">
                          </div>
                          <div class="mb-3" v-if="selectedFile">
                              <label class="small text-muted fw-bold mb-1">Display Title</label>
                              <input type="text" class="form-control form-control-sm" v-model="newFileName">
                          </div>
                          <div v-if="isUploading" class="progress mb-3" style="height: 6px;">
                              <div class="progress-bar bg-success progress-bar-striped progress-bar-animated" :style="{ width: uploadProgress + '%' }"></div>
                          </div>
                          <button @click="handleUpload" class="btn btn-navy w-100 fw-bold btn-sm" :disabled="!selectedFile || isUploading">
                              {{ isUploading ? 'Uploading...' : 'Publish to Portal' }}
                          </button>
                      </div>

                      <div class="col-lg-8">
                          <h6 class="fw-bold text-navy mb-3">Active Files (Live on Client Portal)</h6>
                          <div class="list-group list-group-flush border rounded">
                               <div v-if="store.content.resources && store.content.resources.length === 0" class="p-4 text-center text-muted small">
                                  No files uploaded yet.
                              </div>
                              <div v-for="(file, index) in store.content.resources" :key="file.id" class="list-group-item d-flex justify-content-between align-items-center">
                                  <div class="d-flex align-items-center gap-3">
                                      <div class="badge bg-light text-dark border">{{ file.type }}</div>
                                      <div>
                                          <div class="fw-bold text-navy small">{{ file.title }}</div>
                                          <small class="text-muted" style="font-size: 0.75rem">{{ file.fileName }} • {{ file.size }}</small>
                                      </div>
                                  </div>
                                  <button @click="deleteResource(index)" class="btn btn-sm text-danger fw-bold hover-bg-light">
                                      Delete
                                  </button>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>

          <div class="col-12">
              <div class="card border-0 shadow-sm p-4">
                  <div class="d-flex justify-content-between align-items-center mb-4">
                    <h5 class="fw-bold text-navy mb-0">Home Page Slider</h5>
                    <button @click="addSlide" class="btn btn-sm btn-outline-primary">+ Add Slide</button>
                  </div>
                  
                  <div class="table-responsive d-none d-md-block">
                    <table class="table align-middle">
                      <thead class="bg-light small text-uppercase">
                        <tr>
                          <th style="min-width: 60px">Img</th>
                          <th>Image URL</th>
                          <th>Title</th>
                          <th>Subtitle</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="(slide, index) in draftContent.heroSlides" :key="slide.id">
                          <td><img :src="slide.image" class="rounded border" style="width: 50px; height: 30px; object-fit: cover;"></td>
                          <td><input v-model="slide.image" type="text" class="form-control form-control-sm"></td>
                          <td><input v-model="slide.title" type="text" class="form-control form-control-sm"></td>
                          <td><input v-model="slide.subtitle" type="text" class="form-control form-control-sm"></td>
                          <td><button @click="removeSlide(index)" class="btn btn-sm text-danger">×</button></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div class="d-md-none d-flex flex-column gap-3">
                      <div v-for="(slide, index) in draftContent.heroSlides" :key="slide.id" class="bg-light p-3 rounded border">
                          <div class="d-flex justify-content-between mb-2">
                              <span class="badge bg-secondary">Slide {{ index + 1 }}</span>
                              <button @click="removeSlide(index)" class="btn btn-sm text-danger fw-bold">Delete</button>
                          </div>
                          <input v-model="slide.title" type="text" class="form-control form-control-sm mb-2" placeholder="Title">
                          <input v-model="slide.subtitle" type="text" class="form-control form-control-sm mb-2" placeholder="Subtitle">
                          <input v-model="slide.image" type="text" class="form-control form-control-sm" placeholder="Image URL">
                      </div>
                  </div>

              </div>
          </div>

          <div class="col-12">
              <div class="card border-0 shadow-sm p-4">
                  <div class="d-flex justify-content-between align-items-center mb-4">
                    <div>
                        <h5 class="fw-bold text-navy mb-0">Social Media Feeds</h5>
                        <small class="text-muted d-none d-md-block">Content updates automatically save the time.</small>
                    </div>
                    <button @click="addSocialPost" class="btn btn-sm btn-outline-primary">+ Add Post</button>
                  </div>

                  <div class="table-responsive d-none d-md-block">
                    <table class="table align-middle">
                      <thead class="bg-light small text-uppercase">
                        <tr>
                          <th style="width: 150px">Platform</th>
                          <th>Post Content</th>
                          <th style="width: 200px">Link URL</th>
                          <th style="width: 150px">Last Updated</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="(post, index) in draftContent.socialUpdates" :key="post.id">
                          <td>
                              <select v-model="post.platform" class="form-select form-select-sm" @change="updateTimestamp(post)">
                                  <option value="LinkedIn">LinkedIn</option>
                                  <option value="Twitter (X)">Twitter (X)</option>
                                  <option value="Facebook">Facebook</option>
                              </select>
                          </td>
                          <td><textarea v-model="post.text" @input="updateTimestamp(post)" class="form-control form-control-sm" rows="1"></textarea></td>
                          <td><input v-model="post.link" type="text" class="form-control form-control-sm"></td>
                          <td class="small text-muted">{{ formatLastUpdated(post.date) }}</td>
                          <td><button @click="removeSocialPost(index)" class="btn btn-sm text-danger">×</button></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div class="d-md-none d-flex flex-column gap-3">
                        <div v-for="(post, index) in draftContent.socialUpdates" :key="post.id" class="bg-light p-3 rounded border">
                           <div class="d-flex justify-content-between mb-2 align-items-center">
                              <select v-model="post.platform" class="form-select form-select-sm w-auto shadow-sm" @change="updateTimestamp(post)">
                                  <option value="LinkedIn">LinkedIn</option>
                                  <option value="Twitter (X)">Twitter (X)</option>
                                  <option value="Facebook">Facebook</option>
                              </select>
                              <button @click="removeSocialPost(index)" class="btn btn-sm text-danger fw-bold">Delete</button>
                           </div>
                           <textarea v-model="post.text" @input="updateTimestamp(post)" class="form-control form-control-sm mb-2" rows="3" placeholder="Post Content"></textarea>
                           <input v-model="post.link" type="text" class="form-control form-control-sm mb-2" placeholder="Link URL">
                        </div>
                  </div>
              </div>
          </div>

          <div class="col-lg-6">
              <div class="card border-0 shadow-sm p-4 h-100">
                  <h5 class="fw-bold text-navy mb-4">About Us Section</h5>
                  <div class="mb-3">
                      <label class="form-label small fw-bold text-muted">TITLE</label>
                      <input v-model="draftContent.about.title" type="text" class="form-control">
                  </div>
                  <div class="mb-3">
                      <label class="form-label small fw-bold text-muted">BODY TEXT</label>
                      <textarea v-model="draftContent.about.text" class="form-control" rows="6"></textarea>
                  </div>
              </div>
          </div>

          <div class="col-lg-6">
              <div class="card border-0 shadow-sm overflow-hidden h-100 bg-dark">
                  <div class="card-header bg-white border-bottom p-3">
                      <strong class="text-navy small">LIVE SLIDER PREVIEW</strong>
                  </div>
                  <div class="position-relative h-100 preview-container">
                      <Hero :previewData="draftContent.heroSlides" />
                  </div>
              </div>
          </div>

      </div>
    </div>
  </main>
</template>

<style scoped>
.text-navy { color: #1a2b49; }
.bg-light-navy { background-color: #f0f4f8; }
.border-navy { border-color: #1a2b49 !important; }
.btn-navy { background-color: #1a2b49; color: white; }
.preview-container { min-height: 300px; height: 100%; }
.ls-2 { letter-spacing: 2px; }
.fade-in { animation: fadeIn 0.3s ease-in-out; }
@keyframes fadeIn { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }

@media (min-width: 992px) {
    .border-end-lg { border-right: 1px solid #dee2e6; }
}
</style>