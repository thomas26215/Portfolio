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
      <!-- Search -->
      <div class="search-wrap animate-up">
        <input v-model="search" type="text" placeholder="Rechercher un projet, une techno…" class="search-input" />
        <button v-if="search" class="search-clear" @click="search = ''">✕</button>
      </div>

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
        <!-- LiftConnect SaaS hero -->
        <RouterLink v-if="liftconnect" :to="`/projets/${liftconnect.id}`" class="saas-hero animate-up">
          <div class="saas-hero-bg"></div>
          <div class="saas-hero-inner">
            <div class="saas-hero-left">
              <div class="saas-hero-badge-row">
                <span class="saas-hero-badge"><span class="sh-dot"></span>SaaS · En production</span>
                <span class="saas-hero-year">{{ liftconnect.year }}</span>
              </div>
              <div class="saas-hero-title">{{ liftconnect.title }}</div>
              <p class="saas-hero-desc">{{ liftconnect.desc }}</p>
              <div class="saas-hero-techs">
                <span v-for="t in liftconnect.tech" :key="t" class="sh-tech">{{ t }}</span>
              </div>
            </div>
            <div class="saas-hero-right">
              <div v-if="liftconnect.saasStats" class="sh-stats">
                <div v-for="s in liftconnect.saasStats" :key="s.label" class="sh-stat">
                  <div class="sh-stat-val">{{ s.value }}</div>
                  <div class="sh-stat-lbl">{{ s.label }}</div>
                </div>
              </div>
              <div class="sh-cta">Voir le projet ↗</div>
            </div>
          </div>
        </RouterLink>

        <div class="group-header animate-up d1">
          <span class="group-label">⭐ Mis en avant</span>
        </div>
        <div class="projects-grid featured animate-up d2">
          <ProjectCard v-for="p in featuredProjectsNoSaas" :key="p.id" :project="p" featured />
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

const liftconnect = projects.find(p => p.id === 'liftconnect')

const activeCat = ref('all')
const activeSem = ref(null)
const search = ref('')

const categories = [
  { key: 'all',   label: 'Tous' },
  { key: 'perso', label: 'Personnels' },
  { key: 'acad',  label: 'Académiques' },
  { key: 'stage', label: 'Stage' },
]

function getCatCount(key) {
  if (key === 'all') return searchFiltered.value.length
  return searchFiltered.value.filter(p => p.category === key).length
}

const searchFiltered = computed(() => {
  if (!search.value.trim()) return projects
  const q = search.value.toLowerCase()
  return projects.filter(p =>
    p.title.toLowerCase().includes(q) ||
    (p.subtitle || '').toLowerCase().includes(q) ||
    p.desc.toLowerCase().includes(q) ||
    (p.tech || []).some(t => t.toLowerCase().includes(q))
  )
})

const filteredProjects = computed(() => {
  if (activeCat.value === 'all') return searchFiltered.value
  return searchFiltered.value.filter(p => p.category === activeCat.value)
})
const featuredProjects       = computed(() => searchFiltered.value.filter(p => p.featured))
const featuredProjectsNoSaas = computed(() => searchFiltered.value.filter(p => p.featured && !p.saas))
const nonFeaturedProjects    = computed(() => searchFiltered.value.filter(p => !p.featured))

const academicProjects = computed(() => searchFiltered.value.filter(p => p.category === 'acad'))

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

/* Search */
.search-wrap { position: relative; margin-bottom: 14px; }
.search-input {
  width: 100%; padding: 10px 40px 10px 16px;
  background: rgba(255,255,255,0.04); border: 1px solid var(--border-soft);
  border-radius: 12px; font-size: 0.85rem; color: rgba(255,255,255,0.75);
  font-family: var(--font-sans); outline: none; transition: border-color 0.2s, box-shadow 0.2s;
}
.search-input::placeholder { color: rgba(255,255,255,0.2); }
.search-input:focus { border-color: rgba(186,242,216,0.35); box-shadow: 0 0 0 3px rgba(186,242,216,0.06); }
.search-clear {
  position: absolute; right: 12px; top: 50%; transform: translateY(-50%);
  background: none; border: none; cursor: pointer;
  font-size: 0.7rem; color: rgba(255,255,255,0.3); padding: 4px;
  transition: color 0.2s;
}
.search-clear:hover { color: rgba(255,255,255,0.6); }

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

/* SaaS hero */
.saas-hero {
  display: block; text-decoration: none;
  position: relative; overflow: hidden;
  background: linear-gradient(135deg, rgba(34,59,101,0.6) 0%, rgba(8,12,18,0.85) 60%);
  border: 1px solid rgba(186,242,216,0.25);
  border-radius: 16px; padding: 36px 40px;
  margin-bottom: 28px;
  transition: border-color 0.3s, transform 0.3s cubic-bezier(0.34,1.2,0.64,1), box-shadow 0.3s;
}
.saas-hero::before {
  content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px;
  background: linear-gradient(90deg, var(--secondary), rgba(186,242,216,0.25) 50%, transparent);
}
.saas-hero:hover {
  border-color: rgba(186,242,216,0.4);
  transform: translateY(-3px);
  box-shadow: 0 24px 60px rgba(0,0,0,0.35), 0 0 0 1px rgba(186,242,216,0.08);
}
.saas-hero-bg {
  position: absolute; width: 400px; height: 400px; border-radius: 50%;
  background: radial-gradient(rgba(34,59,101,0.45), transparent 70%);
  top: -150px; right: -80px; pointer-events: none;
}
.saas-hero-inner { position: relative; z-index: 1; display: grid; grid-template-columns: 1fr auto; gap: 40px; align-items: center; }
.saas-hero-badge-row { display: flex; align-items: center; gap: 10px; margin-bottom: 12px; }
.saas-hero-badge {
  display: inline-flex; align-items: center; gap: 6px;
  font-size: 0.65rem; font-weight: 800; letter-spacing: 0.08em; text-transform: uppercase;
  color: var(--secondary); background: rgba(186,242,216,0.1); border: 1px solid rgba(186,242,216,0.3);
  border-radius: 100px; padding: 4px 12px;
}
.sh-dot {
  width: 5px; height: 5px; border-radius: 50%;
  background: var(--secondary); box-shadow: 0 0 7px rgba(186,242,216,0.8);
  animation: pulse 2s ease-in-out infinite; flex-shrink: 0;
}
.saas-hero-year { font-size: 0.68rem; color: rgba(255,255,255,0.3); }
.saas-hero-title { font-family: var(--font-serif); font-size: 2rem; font-weight: 700; color: #fff; letter-spacing: -0.02em; margin-bottom: 10px; }
.saas-hero:hover .saas-hero-title { color: var(--secondary); transition: color 0.25s; }
.saas-hero-desc { font-size: 0.82rem; color: rgba(255,255,255,0.48); line-height: 1.65; margin-bottom: 18px; max-width: 600px; }
.saas-hero-techs { display: flex; gap: 6px; flex-wrap: wrap; }
.sh-tech { font-size: 0.68rem; font-weight: 600; padding: 3px 10px; border-radius: 20px; color: rgba(186,242,216,0.7); background: rgba(186,242,216,0.07); border: 1px solid rgba(186,242,216,0.14); }

.saas-hero-right { display: flex; flex-direction: column; align-items: flex-end; gap: 20px; flex-shrink: 0; }
.sh-stats { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
.sh-stat { background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.06); border-radius: 10px; padding: 12px 14px; text-align: center; min-width: 90px; }
.sh-stat-val { font-size: 1.1rem; font-weight: 700; color: var(--secondary); letter-spacing: -0.02em; margin-bottom: 3px; }
.sh-stat-lbl { font-size: 0.58rem; font-weight: 600; color: rgba(255,255,255,0.28); text-transform: uppercase; letter-spacing: 0.07em; }
.sh-cta { font-size: 0.78rem; font-weight: 700; color: var(--secondary); opacity: 0; transform: translateX(-6px); transition: opacity 0.25s, transform 0.25s; }
.saas-hero:hover .sh-cta { opacity: 1; transform: translateX(0); }

@media (max-width: 680px) {
  .saas-hero-inner { grid-template-columns: 1fr; gap: 20px; }
  .saas-hero { padding: 24px 20px; }
  .saas-hero-right { align-items: flex-start; }
}

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
