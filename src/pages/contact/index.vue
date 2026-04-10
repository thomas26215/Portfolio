<template>
  <main>
    <div class="page-hero">
      <div class="page-hero-bg"></div>
      <div class="container">
        <div class="section-label animate-up">Contact</div>
        <h1 class="page-title animate-up d1">Travaillons ensemble</h1>
        <p class="page-sub animate-up d2">Disponible pour des collaborations, projets freelance, ou une alternance à partir de juillet 2026.</p>
      </div>
    </div>

    <div class="container main-grid">
      <!-- Left: form -->
      <div class="form-col">
        <div class="form-card animate-up d1">
          <div class="form-title">Envoyer un message</div>

          <div class="field-row">
            <div class="field-group">
              <label class="field-label">Prénom &amp; nom</label>
              <input v-model="form.name" class="field-input" placeholder="Jean Dupont" />
            </div>
            <div class="field-group">
              <label class="field-label">Email</label>
              <input v-model="form.email" type="email" class="field-input" placeholder="jean@exemple.com" />
            </div>
          </div>

          <div class="field-group">
            <label class="field-label">Sujet</label>
            <div class="subject-chips">
              <button
                v-for="subj in subjects"
                :key="subj"
                class="subj-chip"
                :class="{ active: form.subject === subj }"
                @click="form.subject = subj"
              >{{ subj }}</button>
            </div>
          </div>

          <div class="field-group">
            <label class="field-label">Message</label>
            <textarea v-model="form.message" class="field-textarea" rows="6" placeholder="Décrivez votre projet ou votre demande…"></textarea>
          </div>

          <Transition name="fade">
            <div v-if="sent" class="success-msg">
              <span class="success-icon">✅</span>
              Message envoyé ! Je vous répondrai sous 48h.
            </div>
          </Transition>

          <button v-if="!sent" class="btn-primary send-btn" :disabled="!canSend" @click="handleSend">
            Envoyer le message ↗
          </button>
        </div>
      </div>

      <!-- Right: info -->
      <aside class="info-col">
        <!-- Status -->
        <div class="status-card animate-up d1">
          <div class="sc-left">
            <div class="sc-dot"></div>
          </div>
          <div>
            <div class="sc-title">Actuellement en stage</div>
            <div class="sc-sub">APIX Analytics · Grenoble · Mars – Juin 2026</div>
          </div>
        </div>

        <!-- Coords -->
        <div class="info-card animate-up d2">
          <div class="info-card-title">Coordonnées</div>
          <a :href="`mailto:${profile.email}`" class="coord-row">
            <div class="coord-icon">✉️</div>
            <div>
              <div class="coord-name">Email</div>
              <div class="coord-val">{{ profile.email }}</div>
            </div>
          </a>
          <a :href="profile.github" target="_blank" class="coord-row">
            <div class="coord-icon">⬡</div>
            <div>
              <div class="coord-name">GitHub</div>
              <div class="coord-val">github.com/thomas26215</div>
            </div>
          </a>
          <a :href="profile.linkedin" target="_blank" class="coord-row">
            <div class="coord-icon">💼</div>
            <div>
              <div class="coord-name">LinkedIn</div>
              <div class="coord-val">linkedin.com/in/thomas-venouil</div>
            </div>
          </a>
          <a :href="profile.website" target="_blank" class="coord-row">
            <div class="coord-icon">🌐</div>
            <div>
              <div class="coord-name">Site</div>
              <div class="coord-val">liftconnect.eu</div>
            </div>
          </a>
        </div>

        <!-- Disponibilités -->
        <div class="info-card animate-up d3">
          <div class="info-card-title">Disponibilités</div>
          <div class="avail-row">
            <div class="avail-dot green"></div>
            <div>
              <div class="avail-title">Projets freelance</div>
              <div class="avail-sub">Possible en parallèle du stage</div>
            </div>
          </div>
          <div class="avail-row">
            <div class="avail-dot yellow"></div>
            <div>
              <div class="avail-title">Alternance / Poste</div>
              <div class="avail-sub">Disponible à partir de juillet 2026</div>
            </div>
          </div>
          <div class="avail-row">
            <div class="avail-dot green"></div>
            <div>
              <div class="avail-title">Collaboration open-source</div>
              <div class="avail-sub">Toujours partant !</div>
            </div>
          </div>
        </div>
      </aside>
    </div>

    <footer class="footer">
      <div class="container footer-inner">
        <span class="footer-name">Thomas Venouil · 2026</span>
        <div class="footer-links">
          <a :href="profile.github" target="_blank">GitHub</a>
          <a :href="profile.linkedin" target="_blank">LinkedIn</a>
          <RouterLink to="/">À propos</RouterLink>
        </div>
      </div>
    </footer>
  </main>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { RouterLink } from 'vue-router'
import { profile } from '@/data'

const subjects = ['Opportunité pro', 'Collaboration', 'Question technique', 'Autre']

const form = reactive({ name: '', email: '', subject: '', message: '' })
const sent = ref(false)

const canSend = computed(() => form.name && form.email && form.message)

function handleSend() {
  if (!canSend.value) return
  // In production: call an API or mailto
  sent.value = true
}
</script>

<style scoped>
main { padding-top: var(--nav-h); }

.page-hero {
  position: relative; padding: 60px 0 40px;
  border-bottom: 1px solid var(--border-soft); overflow: hidden;
}
.page-hero-bg {
  position: absolute; inset: 0;
  background: radial-gradient(ellipse 50% 80% at 5% 50%, rgba(34,59,101,0.5), transparent);
  pointer-events: none;
}
.section-label { font-size: 0.68rem; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: var(--secondary); opacity: 0.8; margin-bottom: 10px; }
.page-title { font-family: var(--font-serif); font-size: 3rem; color: var(--title-text); letter-spacing: -0.02em; margin-bottom: 12px; }
.page-sub { font-size: 0.9rem; color: rgba(255,255,255,0.4); max-width: 500px; line-height: 1.6; }

.main-grid {
  display: grid; grid-template-columns: 1fr 320px;
  gap: 40px; padding: 40px 24px 60px; align-items: start;
}

/* Form */
.form-card {
  background: var(--card-glass); border: 1px solid var(--border-soft);
  border-radius: var(--radius); padding: 32px 32px;
  backdrop-filter: blur(20px); display: flex; flex-direction: column; gap: 22px;
}
.form-title { font-family: var(--font-serif); font-size: 1.4rem; color: var(--title-text); }

.field-row { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
.field-group { display: flex; flex-direction: column; gap: 7px; }
.field-label { font-size: 0.72rem; font-weight: 600; color: rgba(255,255,255,0.4); }

.field-input, .field-textarea {
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 10px; padding: 11px 14px;
  color: #fff; font-size: 0.85rem; font-family: var(--font-sans);
  transition: border-color 0.25s, box-shadow 0.25s; outline: none; resize: none;
}
.field-input:focus, .field-textarea:focus {
  border-color: rgba(186,242,216,0.3);
  box-shadow: 0 0 0 3px rgba(186,242,216,0.06);
}
.field-input::placeholder, .field-textarea::placeholder { color: rgba(255,255,255,0.2); }

.subject-chips { display: flex; gap: 6px; flex-wrap: wrap; }
.subj-chip {
  padding: 6px 14px; border-radius: 20px; font-size: 0.75rem; font-weight: 600;
  color: rgba(255,255,255,0.38); background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.09);
  cursor: pointer; transition: all 0.2s;
}
.subj-chip.active { background: rgba(186,242,216,0.1); border-color: rgba(186,242,216,0.28); color: var(--secondary); }
.subj-chip:hover:not(.active) { color: rgba(255,255,255,0.7); border-color: rgba(255,255,255,0.16); }

.send-btn {
  width: 100%; justify-content: center; padding: 14px;
  font-size: 0.88rem;
  opacity: 1; transition: opacity 0.2s, background 0.25s, transform 0.3s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.25s;
}
.send-btn:disabled { opacity: 0.4; cursor: not-allowed; transform: none !important; box-shadow: none !important; }

.success-msg {
  display: flex; align-items: center; gap: 10px;
  padding: 14px 18px; border-radius: 12px;
  background: rgba(186,242,216,0.07); border: 1px solid rgba(186,242,216,0.22);
  color: var(--secondary); font-size: 0.85rem; font-weight: 500;
}
.success-icon { font-size: 1rem; }

.fade-enter-active, .fade-leave-active { transition: opacity 0.4s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

/* Info col */
.info-col { display: flex; flex-direction: column; gap: 12px; }

.status-card {
  display: flex; align-items: center; gap: 14px;
  background: rgba(186,242,216,0.05); border: 1px solid rgba(186,242,216,0.2);
  border-radius: var(--radius); padding: 18px 20px;
}
.sc-dot {
  width: 10px; height: 10px; border-radius: 50%;
  background: var(--secondary); box-shadow: 0 0 10px rgba(186,242,216,0.5);
  flex-shrink: 0; animation: pulse 2s ease-in-out infinite;
}
@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.35} }
.sc-title { font-size: 0.85rem; font-weight: 600; color: var(--secondary); margin-bottom: 3px; }
.sc-sub { font-size: 0.72rem; color: rgba(255,255,255,0.35); }

.info-card {
  background: var(--card-glass); border: 1px solid var(--border-soft);
  border-radius: var(--radius); padding: 18px 20px;
  backdrop-filter: blur(20px); display: flex; flex-direction: column; gap: 4px;
}
.info-card-title {
  font-size: 0.68rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em;
  color: rgba(255,255,255,0.28); margin-bottom: 8px; padding-bottom: 8px;
  border-bottom: 1px solid rgba(255,255,255,0.06);
}

.coord-row {
  display: flex; align-items: center; gap: 10px;
  padding: 9px 8px; border-radius: 9px; text-decoration: none;
  transition: background 0.2s;
}
.coord-row:hover { background: rgba(255,255,255,0.04); }
.coord-icon {
  width: 30px; height: 30px; border-radius: 8px;
  background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.07);
  display: flex; align-items: center; justify-content: center;
  font-size: 0.82rem; flex-shrink: 0;
}
.coord-name { font-size: 0.62rem; color: rgba(255,255,255,0.28); margin-bottom: 1px; }
.coord-val { font-size: 0.77rem; font-weight: 500; color: rgba(255,255,255,0.7); }

.avail-row {
  display: flex; align-items: flex-start; gap: 12px;
  padding: 9px 8px;
}
.avail-dot {
  width: 8px; height: 8px; border-radius: 50%;
  flex-shrink: 0; margin-top: 5px;
}
.avail-dot.green { background: var(--secondary); box-shadow: 0 0 8px rgba(186,242,216,0.4); }
.avail-dot.yellow { background: #fbbf24; box-shadow: 0 0 8px rgba(251,191,36,0.3); }
.avail-title { font-size: 0.8rem; font-weight: 600; color: rgba(255,255,255,0.75); margin-bottom: 2px; }
.avail-sub { font-size: 0.7rem; color: rgba(255,255,255,0.3); }

/* Footer */
.footer { border-top: 1px solid var(--border-soft); padding: 24px 0; }
.footer-inner { display: flex; align-items: center; justify-content: space-between; }
.footer-name { font-size: 0.75rem; color: rgba(255,255,255,0.25); }
.footer-links { display: flex; gap: 20px; }
.footer-links a { font-size: 0.75rem; color: rgba(255,255,255,0.3); transition: color 0.2s; }
.footer-links a:hover { color: rgba(255,255,255,0.65); }

@media (max-width: 768px) {
  .main-grid { grid-template-columns: 1fr; }
  .field-row { grid-template-columns: 1fr; }
  .page-title { font-size: 2.2rem; }
}
</style>
