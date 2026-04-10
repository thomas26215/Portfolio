<template>
  <main>
    <div class="page-hero">
      <div class="page-hero-bg"></div>
      <div class="container">
        <div class="section-label animate-up">Parcours</div>
        <h1 class="page-title animate-up d1">Formation &amp; expériences</h1>
        <p class="page-sub animate-up d2">3 ans de BUT Informatique à l'IUT2 de Grenoble, jalonnés de projets et d'une expérience de stage.</p>
      </div>
    </div>

    <div class="container main-grid">
      <!-- Timeline -->
      <div class="timeline-col">
        <div class="tl-head animate-up">Chronologie</div>
        <div class="timeline">
          <div
            v-for="(item, i) in parcours"
            :key="item.id"
            class="tl-item animate-up"
            :class="[`d${Math.min(i, 6)}`, { selected: selected?.id === item.id }]"
            @click="selected = item"
          >
            <!-- Connector line -->
            <div class="tl-line-col">
              <div class="tl-dot" :class="{ current: item.current }">{{ item.icon }}</div>
              <div v-if="i < parcours.length - 1" class="tl-connector"></div>
            </div>
            <!-- Content -->
            <div class="tl-body" :class="{ active: selected?.id === item.id }">
              <div class="tl-meta">
                <span class="tl-period">{{ item.period }}</span>
                <span v-if="item.current" class="current-pill">En cours</span>
              </div>
              <div class="tl-title">{{ item.title }}</div>
              <div class="tl-org">{{ item.org }}</div>
              <div class="tl-tags">
                <span v-for="t in item.tags" :key="t" :class="['tag', `tag-${t}`]">{{ tagLabels[t] }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Detail panel -->
      <div class="detail-col">
        <div v-if="!selected" class="hint-panel animate-up">
          <div class="hint-icon">👈</div>
          <p>Clique sur une étape pour voir les détails</p>
        </div>

        <div v-else class="detail-panel animate-up">
          <div class="dp-header">
            <div class="dp-icon">{{ selected.icon }}</div>
            <div>
              <div class="dp-title">{{ selected.title }}</div>
              <div class="dp-org">{{ selected.org }}</div>
            </div>
            <span v-if="selected.current" class="current-pill-lg">En cours</span>
          </div>

          <div class="dp-period">📅 {{ selected.period }}</div>

          <div class="dp-tags">
            <span v-for="t in selected.tags" :key="t" :class="['tag', `tag-${t}`]">{{ tagLabels[t] }}</span>
          </div>

          <p class="dp-desc">{{ selected.desc }}</p>

          <RouterLink v-if="selected.sem" :to="`/projets?sem=${selected.sem}`" class="dp-link">
            Voir les projets du {{ selected.sem }} →
          </RouterLink>
        </div>

        <!-- Skills by period -->
        <div class="skills-by-period animate-up d2">
          <div class="sbp-title">Compétences par période</div>
          <div v-for="p in skillPeriods" :key="p.label" class="sbp-row">
            <div class="sbp-label">{{ p.label }}</div>
            <div class="sbp-chips">
              <span v-for="s in p.skills" :key="s" class="sbp-chip">{{ s }}</span>
            </div>
          </div>
        </div>
      </div>
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
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { parcours, tagLabels } from '@/data'

const selected = ref(parcours[0])

const skillPeriods = [
  { label: 'Lycée',  skills: ['Java', 'Flutter (début)'] },
  { label: 'S1–S2',  skills: ['Python', 'SQL', 'HTML/CSS', 'Java OOP'] },
  { label: 'S3–S4',  skills: ['Firebase', 'Flutter avancé', 'Réseaux', 'Agile'] },
  { label: 'S5–S6',  skills: ['Vue.js', 'GitLab CI', 'ANTLR4', 'Riverpod 3'] },
  { label: 'Stage',  skills: ['Vue.js prod', 'Python backend', 'Modbus', 'Figma'], current: true },
]
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
  display: grid; grid-template-columns: 1fr 1fr;
  gap: 48px; padding: 40px 24px 60px; align-items: start;
}

/* Timeline */
.tl-head { font-size: 0.72rem; font-weight: 600; color: rgba(255,255,255,0.35); text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 20px; }

.timeline { display: flex; flex-direction: column; }
.tl-item { display: grid; grid-template-columns: 44px 1fr; gap: 0 14px; cursor: pointer; }

.tl-line-col { display: flex; flex-direction: column; align-items: center; }
.tl-dot {
  width: 38px; height: 38px; border-radius: 50%;
  background: rgba(34,59,101,0.8); border: 1.5px solid var(--border-soft);
  display: flex; align-items: center; justify-content: center;
  font-size: 0.9rem; flex-shrink: 0; position: relative; z-index: 1;
  transition: all 0.3s;
}
.tl-dot.current { background: rgba(186,242,216,0.08); border-color: rgba(186,242,216,0.35); box-shadow: 0 0 16px rgba(186,242,216,0.15); }
.tl-item.selected .tl-dot { border-color: rgba(186,242,216,0.5); box-shadow: 0 0 20px rgba(186,242,216,0.2); }
.tl-item:hover .tl-dot { border-color: var(--border-mid); }

.tl-connector { width: 1px; flex: 1; min-height: 8px; background: linear-gradient(to bottom, rgba(186,242,216,0.12), var(--border-soft)); margin: 2px 0; }

.tl-body {
  padding: 8px 14px 18px; border-radius: 12px; border: 1px solid transparent;
  transition: all 0.25s;
}
.tl-body:hover { background: rgba(34,59,101,0.3); border-color: var(--border-soft); }
.tl-body.active { background: rgba(34,59,101,0.5); border-color: rgba(186,242,216,0.2); }

.tl-meta { display: flex; align-items: center; gap: 8px; margin-bottom: 4px; }
.tl-period { font-size: 0.64rem; color: rgba(255,255,255,0.3); }
.current-pill { font-size: 0.55rem; font-weight: 700; padding: 2px 7px; border-radius: 20px; background: rgba(186,242,216,0.08); border: 1px solid rgba(186,242,216,0.22); color: var(--secondary); }

.tl-title { font-size: 0.85rem; font-weight: 600; color: rgba(255,255,255,0.75); margin-bottom: 2px; }
.tl-item.selected .tl-title { color: #fff; }
.tl-org { font-size: 0.7rem; color: rgba(255,255,255,0.3); margin-bottom: 8px; }
.tl-tags { display: flex; gap: 4px; flex-wrap: wrap; }

/* Detail panel */
.hint-panel {
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  gap: 12px; padding: 60px 20px; border: 1px dashed rgba(255,255,255,0.1);
  border-radius: var(--radius); text-align: center;
  color: rgba(255,255,255,0.25); font-size: 0.82rem;
}
.hint-icon { font-size: 2rem; opacity: 0.3; }

.detail-panel {
  background: var(--card-glass); border: 1px solid var(--border-mid);
  border-radius: var(--radius); padding: 26px 28px;
  margin-bottom: 16px; position: relative; overflow: hidden;
}
.detail-panel::before {
  content: ''; position: absolute; top: 0; left: 0; right: 0; height: 1px;
  background: linear-gradient(90deg, var(--secondary), transparent 60%);
}
.dp-header { display: flex; align-items: flex-start; gap: 14px; margin-bottom: 14px; }
.dp-icon { width: 44px; height: 44px; border-radius: 12px; background: rgba(186,242,216,0.08); border: 1px solid rgba(186,242,216,0.2); display: flex; align-items: center; justify-content: center; font-size: 1.1rem; flex-shrink: 0; }
.dp-title { font-size: 1.05rem; font-weight: 700; color: #fff; letter-spacing: -0.02em; margin-bottom: 3px; }
.dp-org { font-size: 0.75rem; color: rgba(255,255,255,0.35); }
.current-pill-lg { margin-left: auto; flex-shrink: 0; font-size: 0.62rem; font-weight: 700; padding: 4px 9px; border-radius: 20px; background: rgba(186,242,216,0.08); border: 1px solid rgba(186,242,216,0.22); color: var(--secondary); }

.dp-period { font-size: 0.77rem; color: rgba(255,255,255,0.45); margin-bottom: 12px; }
.dp-tags { display: flex; gap: 5px; flex-wrap: wrap; margin-bottom: 14px; }
.dp-desc { font-size: 0.84rem; color: rgba(255,255,255,0.48); line-height: 1.7; margin-bottom: 18px; }
.dp-link { font-size: 0.78rem; font-weight: 600; color: var(--secondary); transition: opacity 0.2s; }
.dp-link:hover { opacity: 0.7; }

/* Skills by period */
.skills-by-period {
  background: var(--card-glass); border: 1px solid var(--border-soft);
  border-radius: var(--radius); padding: 20px 22px;
}
.sbp-title { font-size: 0.72rem; font-weight: 600; color: rgba(255,255,255,0.4); text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 14px; padding-bottom: 10px; border-bottom: 1px solid rgba(255,255,255,0.06); }
.sbp-row { display: flex; align-items: flex-start; gap: 12px; padding: 8px 0; border-bottom: 1px solid rgba(255,255,255,0.04); }
.sbp-row:last-child { border-bottom: none; padding-bottom: 0; }
.sbp-label { font-size: 0.68rem; font-weight: 700; color: var(--secondary); min-width: 46px; margin-top: 2px; }
.sbp-chips { display: flex; flex-wrap: wrap; gap: 5px; }
.sbp-chip { font-size: 0.68rem; padding: 3px 8px; border-radius: 5px; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.07); color: rgba(255,255,255,0.45); }

/* Footer */
.footer { border-top: 1px solid var(--border-soft); padding: 24px 0; }
.footer-inner { display: flex; align-items: center; justify-content: space-between; }
.footer-name { font-size: 0.75rem; color: rgba(255,255,255,0.25); }
.footer-cta { font-size: 0.78rem; font-weight: 600; color: var(--secondary); }

@media (max-width: 768px) {
  .main-grid { grid-template-columns: 1fr; }
}
</style>
