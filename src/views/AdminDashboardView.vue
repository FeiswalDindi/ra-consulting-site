<script setup>
import { ref, onMounted } from 'vue';
import { store } from '../store';
import { useRouter } from 'vue-router';
import Hero from '../components/Hero.vue'; 

const router = useRouter();

// Protect Route
if (!store.isAdmin) {
    router.push('/');
}

const draftContent = ref({ heroSlides: [], hero: {}, about: {}, socialUpdates: [] });

onMounted(() => {
    draftContent.value = JSON.parse(JSON.stringify(store.content));
    if (!draftContent.value.socialUpdates) {
        draftContent.value.socialUpdates = [];
    }
});

// --- HELPER: SMART DATE FORMATTER ---
const formatLastUpdated = (dateString) => {
    const date = new Date(dateString);
    // If it's invalid (like "2 Days Ago"), just show the text
    if (isNaN(date.getTime())) return dateString;
    // Otherwise show full date and time
    return date.toLocaleString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit' 
    });
};

// --- SLIDER LOGIC ---
const addSlide = () => {
    draftContent.value.heroSlides.push({
        id: Date.now(),
        image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80',
        title: 'New Headline',
        subtitle: 'New subtitle description.'
    });
};

const removeSlide = (index) => {
    if (draftContent.value.heroSlides.length > 1) {
        draftContent.value.heroSlides.splice(index, 1);
    } else {
        alert("Keep at least one slide.");
    }
};

// --- SOCIAL MEDIA LOGIC ---
const addSocialPost = () => {
    draftContent.value.socialUpdates.unshift({ 
        id: Date.now(),
        platform: 'LinkedIn', 
        date: new Date().toISOString(), // Sets current time
        text: 'New update...',
        link: '#'
    });
};

const updateTimestamp = (post) => {
    // Updates time whenever you type
    post.date = new Date().toISOString();
};

const removeSocialPost = (index) => {
    draftContent.value.socialUpdates.splice(index, 1);
};

// --- GLOBAL ACTIONS ---
const publishChanges = () => {
    store.content = JSON.parse(JSON.stringify(draftContent.value));
    store.saveContent();
    alert("Changes Published Successfully!");
};

const discardChanges = () => {
    if(confirm("Discard all unsaved changes?")) {
        draftContent.value = JSON.parse(JSON.stringify(store.content));
    }
};
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
              <button @click="discardChanges" class="btn btn-outline-secondary btn-sm">Discard</button>
              <button @click="publishChanges" class="btn btn-navy btn-sm fw-bold px-4">Publish Live</button>
          </div>
      </div>

      <div class="row g-4">
          
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
                          
                          <div class="d-flex align-items-center text-muted small bg-white px-2 py-1 rounded border">
                              <span class="me-2">🕒 Updated:</span>
                              <strong>{{ formatLastUpdated(post.date) }}</strong>
                          </div>
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
.btn-navy { background-color: #1a2b49; color: white; }
.preview-container { min-height: 300px; height: 100%; }
</style>