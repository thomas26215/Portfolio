<template>
  <main>
    <div class="page-hero">
      <div class="page-hero-bg"></div>
      <div class="container">
        <div class="section-label animate-up">Portfolio</div>
        <h1 class="page-title animate-up d1">Mes projets</h1>
        <p class="page-sub animate-up d2">Projets personnels, académiques et de stage — filtrés par catégorie ou semestre.</p>
      </div>
    </div>

    <div class="container content">
      <!-- Filter bar -->
      <div class="filter-bar animate-up d1">
        <div class="filter-tabs">
          <button v-for="cat in categories" :key="cat.key" class="ftab" :class="{ active: activeCat === cat.key }" @click="activeCat = cat.key; activeSem = null">
            {{ cat.label }}
            <span class="ftab-count">{{ getCatCount(cat.key) }}</span>
          </button>
        </div>

        <div v-if="activeCat === 'acad'" class="sem-tabs">
          <button v-for="sem in availableSems" :key="sem" class="sem-chip" :class="{ active: activeSem === sem }" @click="activeSem = activeSem === sem ? null : sem">
            {{ sem }}
          </button>
        </div>
      </div>

      <!-- Featured strip (all tab) -->
      <template v-if="activeCat === 'all'">
        <div class="group-header animate-up">
          <span class="group-label">⭐ Mis en avant</span>
        </div>
        <div class="projects-grid featured animate-up d1">
          <ProjectCard v-for="p in featuredProjects" :key="p.id" :project="p" featured />
        </div>
        <div class="group-header animate-up d2">
          <span class="group-label">Tous les projets</span>
        </div>
        <div class="projects-grid animate-up d3">
          <ProjectCard v-for="p in nonFeaturedProjects" :key="p.id" :project="p" />
        </div>
      </template>

      <!-- Academic: semester groups -->
      <template v-else-if="activeCat === 'acad'">
        <template v-for="sem in visibleSems" :key="sem">
          <div class="sem-section animate-up">
            <div class="sem-header">
              <div class="sem-badge-big">{{ sem }}</div>
              <div class="sem-info">
                <div class="sem-name">{{ semesterLabels[sem] }}</div>
                <div class="sem-count-txt">{{ (projectsBySem[sem] || []).length }} projet{{ (projectsBySem[sem] || []).length > 1 ? 's' : '' }}</div>
              </div>
            </div>
            <div class="projects-grid">
              <ProjectCard v-for="p in projectsBySem[sem]" :key="p.id" :project="p" />
            </div>
          </div>
        </template>
        <div v-if="visibleSems.length === 0" class="empty">
          <div class="empty-icon">🔍</div>
          <p>Aucun projet pour ce semestre</p>
        </div>
      </template>

      <!-- Filtered grid -->
      <template v-else>
        <div class="projects-grid animate-up d1">
          <ProjectCard v-for="p in filteredProjects" :key="p.id" :project="p" />
        </div>
        <div v-if="filteredProjects.length === 0" class="empty">
          <div class="empty-icon">🔍</div>
          <p>Aucun projet dans cette catégorie</p>
        </div>
      </template>
    </div>

    <footer class="footer">
      <div class="container footer-inner">
        <span class="footer-name">Thomas Venouil · 2026</span>
        <RouterLink to="/contact" class="footer-cta">Me contacter ↗</RouterLink>
      </div>
    </footer>
  </main>
</template>

<script setup>
import { ref, computed } from 'vue'
import { RouterLink } from 'vue-router'
import ProjectCard from './ProjectCard.vue'
import { projects, semesterLabels } from '@/data'

const activeCat = ref('all')
const activeSem = ref(null)

const categories = [
  { key: 'all',   label: 'Tous' },
  { key: 'perso', label: 'Personnels' },
  { key: 'acad',  label: 'Académiques' },
  { key: 'stage', label: 'Stage' },
]

function getCatCount(key) {
  if (key === 'all') return projects.length
  return projects.filter(p => p.category === key).length
}

const filteredProjects = computed(() => {
  if (activeCat.value === 'all') return projects
  return projects.filter(p => p.category === activeCat.value)
})
const featuredProjects    = computed(() => projects.filter(p => p.featured))
const nonFeaturedProjects = computed(() => projects.filter(p => !p.featured))

const academicProjects = computed(() => projects.filter(p => p.category === 'acad'))

const projectsBySem = computed(() => {
  const g = {}
  academicProjects.value.forEach(p => {
    const k = p.semester || 'S?'
    if (!g[k]) g[k] = []
    g[k].push(p)
  })
  return g
})

const allSems = ['S1','S2','S3','S4','S5','S6']
const availableSems = computed(() => allSems.filter(s => projectsBySem.value[s]))
const visibleSems   = computed(() => {
  if (activeSem.value) return [activeSem.value].filter(s => projectsBySem.value[s])
  return availableSems.value
})
</script>

<style scoped>
main { padding-top: var(--nav-h); }

.page-hero {
  position: relative; padding: 60px 0 40px;
  border-bottom: 1px solid var(--border-soft);
  overflow: hidden;
}
.page-hero-bg {
  position: absolute; inset: 0;
  background: radial-gradient(ellipse 60% 80% at 10% 50%, rgba(34,59,101,0.4), transparent);
  pointer-events: none;
}
.section-label { font-size: 0.68rem; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: var(--secondary); opacity: 0.8; margin-bottom: 10px; }
.page-title { font-family: var(--font-serif); font-size: 3rem; color: var(--title-text); letter-spacing: -0.02em; margin-bottom: 12px; }
.page-sub { font-size: 0.9rem; color: rgba(255,255,255,0.4); max-width: 500px; line-height: 1.6; }

.content { padding: 36px 24px 60px; }

/* Filter bar */
.filter-bar { display: flex; flex-direction: column; gap: 12px; margin-bottom: 32px; }
.filter-tabs { display: flex; gap: 4px; background: rgba(255,255,255,0.03); border: 1px solid var(--border-soft); border-radius: 12px; padding: 4px; width: fit-content; }
.ftab {
  display: flex; align-items: center; gap: 6px;
  padding: 7px 16px; border-radius: 9px; font-size: 0.8rem; font-weight: 600;
  color: rgba(255,255,255,0.45); background: transparent;
  transition: all 0.2s; cursor: pointer; border: none;
}
.ftab.active { background: rgba(255,255,255,0.08); color: #fff; }
.ftab:hover:not(.active) { color: rgba(255,255,255,0.75); }
.ftab-count { font-size: 0.64rem; background: rgba(255,255,255,0.08); border-radius: 20px; padding: 1px 6px; color: rgba(255,255,255,0.35); }
.ftab.active .ftab-count { background: rgba(186,242,216,0.15); color: var(--secondary); }

.sem-tabs { display: flex; gap: 6px; flex-wrap: wrap; }
.sem-chip {
  padding: 5px 12px; border-radius: 20px; font-size: 0.72rem; font-weight: 700;
  color: rgba(255,255,255,0.3); background: rgba(255,255,255,0.03); border: 1px solid var(--border-soft);
  cursor: pointer; transition: all 0.2s;
}
.sem-chip.active, .sem-chip:hover { color: var(--secondary); background: rgba(186,242,216,0.08); border-color: rgba(186,242,216,0.25); }

/* Group header */
.group-header { display: flex; align-items: center; gap: 10px; margin-bottom: 14px; }
.group-label { font-size: 0.72rem; font-weight: 600; color: rgba(255,255,255,0.4); }

/* Projects grid */
.projects-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-bottom: 32px; }
.projects-grid.featured { grid-template-columns: repeat(2, 1fr); }

/* Semester section */
.sem-section { margin-bottom: 36px; }
.sem-header { display: flex; align-items: center; gap: 14px; margin-bottom: 16px; padding-bottom: 12px; border-bottom: 1px solid var(--border-soft); }
.sem-badge-big {
  font-size: 0.65rem; font-weight: 800; letter-spacing: 0.08em;
  padding: 4px 10px; border-radius: 7px;
  background: rgba(196,181,253,0.08); border: 1px solid rgba(196,181,253,0.22); color: #c4b5fd;
}
.sem-name { font-size: 0.88rem; font-weight: 600; color: rgba(255,255,255,0.75); margin-bottom: 2px; }
.sem-count-txt { font-size: 0.68rem; color: rgba(255,255,255,0.3); }

/* Empty */
.empty { text-align: center; padding: 60px; color: rgba(255,255,255,0.25); display: flex; flex-direction: column; align-items: center; gap: 12px; }
.empty-icon { font-size: 2rem; opacity: 0.4; }
.empty p { font-size: 0.85rem; }

/* Footer */
.footer { border-top: 1px solid var(--border-soft); padding: 24px 0; }
.footer-inner { display: flex; align-items: center; justify-content: space-between; }
.footer-name { font-size: 0.75rem; color: rgba(255,255,255,0.25); }
.footer-cta { font-size: 0.78rem; font-weight: 600; color: var(--secondary); transition: opacity 0.2s; }
.footer-cta:hover { opacity: 0.7; }

@media (max-width: 768px) {
  .projects-grid { grid-template-columns: 1fr; }
  .projects-grid.featured { grid-template-columns: 1fr; }
}
</style>
