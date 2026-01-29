<script setup>
import { ref, onMounted } from 'vue';
import { store } from '../store';
import { useRouter } from 'vue-router';
import Hero from '../components/Hero.vue'; // Import Hero for Preview

const router = useRouter();

// Protect Route
if (!store.isAdmin) {
    router.push('/');
}

// 1. LOCAL DRAFT STATE (Holds ALL content)
const draftContent = ref({
    heroSlides: [],
    hero: {},
    about: {}
});

// 2. Initialize Draft on Load
onMounted(() => {
    // Deep copy the ENTIRE store content so we can edit everything safely
    draftContent.value = JSON.parse(JSON.stringify(store.content));
});

// --- SLIDER LOGIC ---
const addSlide = () => {
    draftContent.value.heroSlides.push({
        id: Date.now(),
        image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80',
        title: 'New Slide Title',
        subtitle: 'New slide description goes here.'
    });
};

const removeSlide = (index) => {
    if (draftContent.value.heroSlides.length > 1) {
        draftContent.value.heroSlides.splice(index, 1);
    } else {
        alert("You must keep at least one slide.");
    }
};

// --- SAVE / DISCARD LOGIC ---
const publishChanges = () => {
    // Overwrite the REAL store with our DRAFT
    store.content = JSON.parse(JSON.stringify(draftContent.value));
    store.saveContent(); // Save to LocalStorage
};

const discardChanges = () => {
    if(confirm("Discard all unsaved changes?")) {
        // Revert draft to match current store
        draftContent.value = JSON.parse(JSON.stringify(store.content));
    }
};
</script>

<template>
  <main class="admin-page py-5 mt-5 bg-light min-vh-100">
    <div class="container py-5">
      
      <div class="d-flex justify-content-between align-items-center mb-5 border-bottom pb-4">
          <div>
              <h6 class="text-danger fw-bold ls-2">ADMINISTRATION MODE</h6>
              <h1 class="display-5 fw-bold text-dark">Master Content Manager</h1>
              <p class="text-muted">Edit Slides, About Us text, and more. <span class="text-success fw-bold">Live Preview Active.</span></p>
          </div>
          <div class="d-flex gap-3">
              <button @click="discardChanges" class="btn btn-outline-secondary">Discard Changes</button>
              <button @click="publishChanges" class="btn btn-success fw-bold px-4">🚀 Publish Live</button>
          </div>
      </div>

      <div class="row g-5">
          
          <div class="col-12">
              <div class="card border-0 shadow-sm p-4">
                  <div class="d-flex justify-content-between align-items-center mb-4">
                    <h5 class="fw-bold text-primary mb-0">🖼️ Home Page Slider</h5>
                    <button @click="addSlide" class="btn btn-sm btn-primary">+ Add Slide</button>
                  </div>
                  
                  <div class="table-responsive">
                    <table class="table align-middle">
                      <thead class="bg-light">
                        <tr>
                          <th style="width: 10%">Preview</th>
                          <th style="width: 35%">Image URL</th>
                          <th style="width: 25%">Title</th>
                          <th style="width: 25%">Subtitle</th>
                          <th style="width: 5%"></th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="(slide, index) in draftContent.heroSlides" :key="index">
                          <td>
                            <img :src="slide.image" class="rounded border" style="width: 60px; height: 40px; object-fit: cover;">
                          </td>
                          <td>
                            <input v-model="slide.image" type="text" class="form-control form-control-sm" placeholder="https://...">
                          </td>
                          <td>
                            <input v-model="slide.title" type="text" class="form-control form-control-sm">
                          </td>
                          <td>
                            <input v-model="slide.subtitle" type="text" class="form-control form-control-sm">
                          </td>
                          <td>
                            <button @click="removeSlide(index)" class="btn btn-sm btn-outline-danger" title="Remove">×</button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
              </div>
          </div>

          <div class="col-lg-6">
              <div class="card border-0 shadow-sm p-4 h-100">
                  <h5 class="fw-bold text-primary mb-4">ℹ️ About Us Section</h5>
                  
                  <div class="mb-3">
                      <label class="form-label fw-bold small text-muted">Section Title</label>
                      <input v-model="draftContent.about.title" type="text" class="form-control">
                  </div>

                  <div class="mb-3">
                      <label class="form-label fw-bold small text-muted">Introduction Text</label>
                      <textarea v-model="draftContent.about.text" class="form-control" rows="6"></textarea>
                  </div>
              </div>
          </div>

          <div class="col-lg-6">
              <div class="card border-0 shadow-sm overflow-hidden h-100 bg-dark">
                  <div class="card-header bg-white border-bottom p-3 d-flex justify-content-between">
                      <strong class="text-primary">👁️ Live Slider Preview</strong>
                      <small class="text-muted">Updates as you type</small>
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
/* Force the preview container to have height so Hero displays */
.preview-container {
    min-height: 400px;
    height: 100%;
}

:deep(.hero-section) {
    /* Scale down the hero for the preview box */
    min-height: 100% !important;
    height: 100% !important;
}
</style>