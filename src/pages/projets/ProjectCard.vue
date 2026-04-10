<template>
  <RouterLink :to="`/projets/${project.id}`" class="pcard" :class="{ featured }">
    <div class="pc-top">
      <div class="pc-tags">
        <span :class="['tag', `tag-${project.category}`]">{{ categoryLabels[project.category] }}</span>
        <span v-if="project.semester" class="sem-badge">{{ project.semester }}</span>
      </div>
      <div class="pc-status" :style="`color:${statusColors[project.status]}`">
        <span class="sdot" :style="`background:${statusColors[project.status]}`"></span>
        {{ statusLabels[project.status] }}
      </div>
    </div>
    <div class="pc-title">{{ project.title }}</div>
    <div class="pc-sub">{{ project.subtitle }}</div>
    <p class="pc-desc">{{ project.desc }}</p>
    <div class="pc-techs">
      <span v-for="t in project.tags.slice(0,3)" :key="t" :class="['tag', `tag-${t}`]">{{ tagLabels[t] }}</span>
    </div>
    <div class="pc-footer">
      <span class="pc-year">{{ project.year }}</span>
      <div class="pc-actions">
        <span v-if="project.link" class="pc-badge">🌐 Live</span>
        <span v-if="project.github" class="pc-badge">⬡ GitHub</span>
        <span class="pc-see">Voir →</span>
      </div>
    </div>
  </RouterLink>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import { categoryLabels, statusLabels, statusColors, tagLabels } from '@/data'
defineProps({ project: { type: Object, required: true }, featured: { type: Boolean, default: false } })
</script>

<style scoped>
.pcard {
  display: flex; flex-direction: column; gap: 9px;
  padding: 22px 22px;
  background: var(--card-glass);
  border: 1px solid var(--border-soft);
  border-radius: var(--radius);
  backdrop-filter: blur(20px);
  text-decoration: none; cursor: pointer;
  transition: border-color 0.3s, transform 0.3s cubic-bezier(0.34,1.2,0.64,1), box-shadow 0.3s;
  position: relative; overflow: hidden;
}
.pcard:hover {
  border-color: var(--border-mid);
  transform: translateY(-5px);
  box-shadow: 0 20px 60px rgba(0,0,0,0.3), 0 0 0 1px rgba(186,242,216,0.06);
}
.pcard.featured {
  background: rgba(34,59,101,0.45);
  border-color: rgba(186,242,216,0.18);
}
.pcard.featured::before {
  content: '';
  position: absolute; top: 0; left: 0; right: 0; height: 1px;
  background: linear-gradient(90deg, var(--secondary), transparent 65%);
}

.pc-top { display: flex; align-items: center; justify-content: space-between; gap: 8px; }
.pc-tags { display: flex; gap: 5px; align-items: center; flex-wrap: wrap; }
.pc-status { display: flex; align-items: center; gap: 5px; font-size: 0.62rem; font-weight: 600; flex-shrink: 0; }
.sdot { width: 5px; height: 5px; border-radius: 50%; flex-shrink: 0; }

.sem-badge {
  font-size: 0.55rem; font-weight: 800; letter-spacing: 0.06em;
  padding: 2px 7px; border-radius: 5px;
  background: rgba(196,181,253,0.08); border: 1px solid rgba(196,181,253,0.22); color: #c4b5fd;
}

.pc-title {
  font-size: 1rem; font-weight: 700; color: #fff; letter-spacing: -0.02em;
  transition: color 0.25s;
}
.pcard:hover .pc-title { color: var(--secondary); }
.pcard.featured .pc-title { font-size: 1.1rem; }

.pc-sub { font-size: 0.72rem; color: rgba(255,255,255,0.32); }

.pc-desc {
  font-size: 0.8rem; color: rgba(255,255,255,0.44); line-height: 1.58;
  display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden;
  flex: 1;
}

.pc-techs { display: flex; gap: 5px; flex-wrap: wrap; }

.pc-footer {
  display: flex; align-items: center; justify-content: space-between;
  padding-top: 12px; border-top: 1px solid rgba(255,255,255,0.05); margin-top: auto;
}
.pc-year { font-size: 0.65rem; color: rgba(255,255,255,0.22); }
.pc-actions { display: flex; align-items: center; gap: 6px; }
.pc-badge { font-size: 0.62rem; padding: 2px 7px; border-radius: 5px; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.07); color: rgba(255,255,255,0.3); }
.pc-see { font-size: 0.72rem; font-weight: 600; color: var(--secondary); opacity: 0; transform: translateX(-4px); transition: opacity 0.25s, transform 0.25s; }
.pcard:hover .pc-see { opacity: 1; transform: translateX(0); }
</style>
