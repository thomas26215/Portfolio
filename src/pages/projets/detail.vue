<template>
  <main v-if="project">
    <div class="page-hero">
      <div class="page-hero-bg"></div>
      <div class="container">
        <RouterLink to="/projets" class="back-link animate-up">← Retour aux projets</RouterLink>
        <div class="hero-tags animate-up d1">
          <span :class="['tag', `tag-${project.category}`]">{{ categoryLabels[project.category] }}</span>
          <span v-if="project.semester" class="sem-badge">{{ project.semester }}</span>
          <span v-for="t in project.tags" :key="t" :class="['tag', `tag-${t}`]">{{ tagLabels[t] }}</span>
        </div>
        <h1 class="page-title animate-up d2">{{ project.title }}</h1>
        <p class="page-sub animate-up d3">{{ project.subtitle }}</p>
        <div class="hero-meta animate-up d4">
          <div class="hmeta-item">
            <span class="hmeta-label">Statut</span>
            <span class="hmeta-val" :style="`color:${statusColors[project.status]}`">{{ statusLabels[project.status] }}</span>
          </div>
          <div class="hmeta-sep"></div>
          <div class="hmeta-item">
            <span class="hmeta-label">Période</span>
            <span class="hmeta-val">{{ project.year }}</span>
          </div>
          <div v-if="project.semester" class="hmeta-sep"></div>
          <div v-if="project.semester" class="hmeta-item">
            <span class="hmeta-label">Semestre</span>
            <span class="hmeta-val">{{ semesterLabels[project.semester] }}</span>
          </div>
        </div>
        <div class="hero-actions animate-up d5">
          <a v-if="project.link" :href="project.link" target="_blank" class="btn-primary">🌐 Voir le projet ↗</a>
          <a v-if="project.github" :href="project.github" target="_blank" class="btn-ghost">⬡ GitHub</a>
        </div>
      </div>
    </div>

    <div class="container detail-grid">
      <!-- Main -->
      <div class="main-col">
        <div class="detail-section animate-up">
          <h2 class="ds-title">Description</h2>
          <p class="ds-text">{{ project.longDesc || project.desc }}</p>
        </div>

        <div class="detail-section animate-up d1">
          <h2 class="ds-title">Stack technique</h2>
          <div class="tech-grid">
            <div v-for="tech in project.tech" :key="tech" class="tech-chip">
              <span class="tech-dot"></span>{{ tech }}
            </div>
          </div>
        </div>
      </div>

      <!-- Sidebar -->
      <aside class="side-col">
        <div class="side-card animate-up d1">
          <div class="side-card-title">Informations</div>
          <div class="side-row">
            <span class="side-label">Catégorie</span>
            <span class="side-val">{{ categoryLabels[project.category] }}</span>
          </div>
          <div class="side-row">
            <span class="side-label">Statut</span>
            <span class="side-val" :style="`color:${statusColors[project.status]}`">{{ statusLabels[project.status] }}</span>
          </div>
          <div class="side-row">
            <span class="side-label">Période</span>
            <span class="side-val">{{ project.year }}</span>
          </div>
          <div v-if="project.semester" class="side-row">
            <span class="side-label">Semestre</span>
            <span class="side-val">{{ semesterLabels[project.semester] }}</span>
          </div>
        </div>

        <div v-if="project.link || project.github" class="side-card animate-up d2">
          <div class="side-card-title">Liens</div>
          <a v-if="project.link" :href="project.link" target="_blank" class="link-row">
            <span class="lr-icon">🌐</span>
            <div><div class="lr-name">Site web</div><div class="lr-url">{{ project.link }}</div></div>
            <span class="lr-arr">↗</span>
          </a>
          <a v-if="project.github" :href="project.github" target="_blank" class="link-row">
            <span class="lr-icon">⬡</span>
            <div><div class="lr-name">GitHub</div><div class="lr-url">{{ project.github }}</div></div>
            <span class="lr-arr">↗</span>
          </a>
        </div>

        <div class="animate-up d3">
          <div class="side-card-title" style="margin-bottom:12px">Autres projets</div>
          <div class="other-list">
            <RouterLink v-for="p in otherProjects" :key="p.id" :to="`/projets/${p.id}`" class="other-item">
              <div class="other-name">{{ p.title }}</div>
              <div class="other-sub">{{ p.subtitle }}</div>
            </RouterLink>
          </div>
        </div>
      </aside>
    </div>

    <footer class="footer">
      <div class="container footer-inner">
        <span class="footer-name">Thomas Venouil · 2026</span>
        <RouterLink to="/contact" class="footer-cta">Me contacter ↗</RouterLink>
      </div>
    </footer>
  </main>

  <main v-else class="not-found">
    <div class="nf-inner">
      <div class="nf-icon">🔍</div>
      <h1>Projet introuvable</h1>
      <RouterLink to="/projets" class="btn-primary">← Retour aux projets</RouterLink>
    </div>
  </main>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { projects, categoryLabels, statusLabels, statusColors, tagLabels, semesterLabels } from '@/data'

const route = useRoute()
const project = computed(() => projects.find(p => p.id === route.params.id))
const otherProjects = computed(() => projects.filter(p => p.id !== route.params.id).slice(0, 5))
</script>

<style scoped>
main { padding-top: var(--nav-h); }

.page-hero {
  position: relative; padding: 50px 0 40px;
  border-bottom: 1px solid var(--border-soft); overflow: hidden;
}
.page-hero-bg {
  position: absolute; inset: 0;
  background: radial-gradient(ellipse 50% 80% at 5% 50%, rgba(34,59,101,0.5), transparent);
  pointer-events: none;
}
.back-link { display: inline-flex; align-items: center; gap: 6px; font-size: 0.78rem; font-weight: 600; color: rgba(255,255,255,0.38); transition: color 0.2s; margin-bottom: 20px; }
.back-link:hover { color: var(--secondary); }

.hero-tags { display: flex; gap: 6px; flex-wrap: wrap; margin-bottom: 16px; }
.sem-badge { font-size: 0.58rem; font-weight: 800; letter-spacing: 0.06em; padding: 2px 7px; border-radius: 5px; background: rgba(196,181,253,0.08); border: 1px solid rgba(196,181,253,0.22); color: #c4b5fd; }

.page-title { font-family: var(--font-serif); font-size: 2.8rem; color: var(--title-text); letter-spacing: -0.02em; margin-bottom: 8px; }
.page-sub { font-size: 0.9rem; color: rgba(255,255,255,0.38); margin-bottom: 20px; }

.hero-meta { display: flex; align-items: center; gap: 16px; margin-bottom: 24px; flex-wrap: wrap; }
.hmeta-item { display: flex; flex-direction: column; gap: 2px; }
.hmeta-label { font-size: 0.62rem; text-transform: uppercase; letter-spacing: 0.08em; color: rgba(255,255,255,0.25); }
.hmeta-val { font-size: 0.82rem; font-weight: 600; color: rgba(255,255,255,0.8); }
.hmeta-sep { width: 1px; height: 30px; background: rgba(255,255,255,0.1); }

.hero-actions { display: flex; gap: 10px; flex-wrap: wrap; }

.detail-grid { display: grid; grid-template-columns: 1fr 280px; gap: 40px; padding: 40px 24px 60px; align-items: start; }

.main-col { display: flex; flex-direction: column; gap: 36px; }
.detail-section {}
.ds-title { font-family: var(--font-serif); font-size: 1.4rem; color: var(--title-text); margin-bottom: 16px; }
.ds-text { font-size: 0.88rem; color: rgba(255,255,255,0.52); line-height: 1.75; }

.tech-grid { display: flex; flex-wrap: wrap; gap: 8px; }
.tech-chip {
  display: flex; align-items: center; gap: 8px;
  padding: 7px 14px; border-radius: 10px;
  background: rgba(255,255,255,0.04); border: 1px solid var(--border-soft);
  font-size: 0.8rem; color: rgba(255,255,255,0.65); font-weight: 500;
  transition: all 0.2s;
}
.tech-chip:hover { border-color: var(--border-mid); color: rgba(255,255,255,0.85); }
.tech-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--secondary); flex-shrink: 0; }

/* Sidebar */
.side-col { display: flex; flex-direction: column; gap: 14px; }
.side-card {
  background: var(--card-glass); border: 1px solid var(--border-soft); border-radius: var(--radius);
  padding: 18px 20px; display: flex; flex-direction: column; gap: 10px;
}
.side-card-title { font-size: 0.72rem; font-weight: 600; color: rgba(255,255,255,0.55); padding-bottom: 8px; border-bottom: 1px solid rgba(255,255,255,0.06); }
.side-row { display: flex; justify-content: space-between; gap: 8px; }
.side-label { font-size: 0.73rem; color: rgba(255,255,255,0.3); }
.side-val { font-size: 0.73rem; font-weight: 600; color: rgba(255,255,255,0.75); }

.link-row { display: flex; align-items: center; gap: 10px; padding: 8px; border-radius: 9px; text-decoration: none; transition: background 0.2s; }
.link-row:hover { background: rgba(255,255,255,0.04); }
.lr-icon { width: 28px; height: 28px; border-radius: 8px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.07); display: flex; align-items: center; justify-content: center; font-size: 0.8rem; flex-shrink: 0; }
.lr-name { font-size: 0.77rem; font-weight: 600; color: rgba(255,255,255,0.7); }
.lr-url { font-size: 0.62rem; color: rgba(255,255,255,0.28); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; max-width: 140px; }
.lr-arr { margin-left: auto; font-size: 0.8rem; color: rgba(255,255,255,0.2); }

.other-list { display: flex; flex-direction: column; gap: 6px; }
.other-item { padding: 10px 12px; border-radius: 10px; background: rgba(255,255,255,0.03); border: 1px solid var(--border-soft); text-decoration: none; transition: all 0.2s; display: block; }
.other-item:hover { border-color: var(--border-mid); background: rgba(255,255,255,0.06); }
.other-name { font-size: 0.8rem; font-weight: 600; color: rgba(255,255,255,0.7); margin-bottom: 2px; }
.other-sub { font-size: 0.67rem; color: rgba(255,255,255,0.28); }

/* Footer */
.footer { border-top: 1px solid var(--border-soft); padding: 24px 0; }
.footer-inner { display: flex; align-items: center; justify-content: space-between; }
.footer-name { font-size: 0.75rem; color: rgba(255,255,255,0.25); }
.footer-cta { font-size: 0.78rem; font-weight: 600; color: var(--secondary); }

.not-found { display: flex; align-items: center; justify-content: center; min-height: 100vh; }
.nf-inner { text-align: center; display: flex; flex-direction: column; gap: 20px; align-items: center; }
.nf-icon { font-size: 3rem; opacity: 0.3; }
.nf-inner h1 { font-family: var(--font-serif); color: var(--title-text); }

@media (max-width: 768px) {
  .detail-grid { grid-template-columns: 1fr; }
  .page-title { font-size: 2rem; }
}
</style>
