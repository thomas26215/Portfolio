<template>
  <main>
    <!-- ── HERO ──────────────────────────────────────────────────── -->
    <section class="hero">
      <div class="hero-bg">
        <div class="hero-orb orb1"></div>
        <div class="hero-orb orb2"></div>
        <div class="hero-grid"></div>
      </div>
      <div class="container hero-inner">
        <div class="hero-badge animate-up">
          <span class="badge-dot"></span>
          En stage · APIX Analytics · Grenoble
        </div>
        <h1 class="hero-title animate-up d1">
          Thomas<br>
          <em class="grad-text">Venouil</em>
        </h1>
        <p class="hero-sub animate-up d2">{{ profile.title }}</p>
        <p class="hero-desc animate-up d3">{{ profile.bio }}</p>
        <div class="hero-actions animate-up d4">
          <RouterLink to="/projets" class="btn-primary">Voir mes projets ↗</RouterLink>
          <RouterLink to="/contact" class="btn-ghost">Me contacter</RouterLink>
        </div>
        <div class="hero-links animate-up d5">
          <a :href="profile.github" target="_blank" class="hero-link">
            <svg class="link-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
            GitHub
          </a>
          <a :href="profile.linkedin" target="_blank" class="hero-link">
            <svg class="link-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
            LinkedIn
          </a>
          <a :href="profile.website" target="_blank" class="hero-link">
            <svg class="link-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
            liftconnect.eu
          </a>
        </div>
      </div>
    </section>

    <!-- ── STATS ──────────────────────────────────────────────────── -->
    <section class="section stats-section">
      <div class="container">
        <div class="stats-grid">
          <div v-for="(s, i) in profile.stats" :key="s.label" class="stat-card card animate-up" :class="`d${i+1}`" :style="`--c:${s.color}`">
            <div class="stat-icon">{{ s.icon }}</div>
            <div class="stat-val">{{ s.value }}</div>
            <div class="stat-label">{{ s.label }}</div>
            <div class="stat-sub">{{ s.sub }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- ── À PROPOS ───────────────────────────────────────────────── -->
    <section class="section about-section" id="about">
      <div class="container about-grid">
        <!-- Left: skills -->
        <div>
          <div class="section-label animate-up">Compétences techniques</div>
          <h2 class="section-title animate-up d1">Stack & outils</h2>
          <div class="skills-categories animate-up d2">
            <div v-for="cat in profile.skillCategories" :key="cat.label" class="skill-category">
              <div class="skill-cat-label" :style="`color:${cat.color}`">{{ cat.label }}</div>
              <div class="skill-cat-chips">
                <span v-for="s in cat.skills" :key="s" class="skill-chip" :style="`--c:${cat.color}`">{{ s }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Right: bio cards -->
        <div class="bio-col">
          <div class="bio-card card animate-up d1">
            <div class="bio-card-icon">🎓</div>
            <div class="bio-card-label">Formation</div>
            <div class="bio-card-title">{{ profile.school }}</div>
            <div class="bio-card-sub">BUT Informatique · 2023 – 2026</div>
          </div>

          <div class="bio-card card animate-up d2">
            <div class="bio-card-icon">🏢</div>
            <div class="bio-card-label">Stage actuel</div>
            <div class="bio-card-title">APIX Analytics</div>
            <div class="bio-card-sub">Mars – Juin 2026 · Vue.js + Python</div>
          </div>

          <div class="bio-card card animate-up d3">
            <div class="bio-card-icon">📍</div>
            <div class="bio-card-label">Localisation</div>
            <div class="bio-card-title">{{ profile.location }}</div>
            <div class="bio-card-sub">Ouvert au remote</div>
          </div>

          <div class="bio-card card animate-up d4">
            <div class="bio-card-icon">🌐</div>
            <div class="bio-card-label">Langues</div>
            <div v-for="l in profile.langues" :key="l.label" class="lang-row">
              <span class="lang-name">{{ l.label }}</span>
              <span class="lang-level">{{ l.level }}</span>
            </div>
          </div>

          <div class="interests-card card animate-up d5">
            <div class="bio-card-label">Centres d'intérêt</div>
            <div class="interests-chips">
              <span v-for="i in profile.interests" :key="i" class="interest-chip">{{ i }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ── FEATURED PROJECTS ──────────────────────────────────────── -->
    <section class="section projects-section">
      <div class="container">
        <div class="section-label animate-up">Sélection</div>
        <div class="section-row">
          <h2 class="section-title animate-up d1">Projets mis en avant</h2>
          <RouterLink to="/projets" class="btn-ghost animate-up d2">Tous les projets ↗</RouterLink>
        </div>

        <div class="featured-grid">
          <RouterLink
            v-for="(p, i) in featuredProjects"
            :key="p.id"
            :to="`/projets/${p.id}`"
            class="feat-card card animate-up"
            :class="`d${i+1}`"
          >
            <div class="feat-top">
              <div class="feat-tags">
                <span :class="['tag', `tag-${p.category}`]">{{ categoryLabels[p.category] }}</span>
                <span v-for="t in p.tags.slice(0,2)" :key="t" :class="['tag', `tag-${t}`]">{{ tagLabels[t] }}</span>
              </div>
              <div class="feat-status" :style="`color:${statusColors[p.status]}`">
                <span class="sdot" :style="`background:${statusColors[p.status]}`"></span>
                {{ statusLabels[p.status] }}
              </div>
            </div>
            <div class="feat-title">{{ p.title }}</div>
            <div class="feat-sub">{{ p.subtitle }}</div>
            <p class="feat-desc">{{ p.desc }}</p>
            <div class="feat-footer">
              <span class="feat-year">{{ p.year }}</span>
              <span class="feat-cta">Voir le projet ↗</span>
            </div>
          </RouterLink>
        </div>
      </div>
    </section>

    <!-- ── CTA ────────────────────────────────────────────────────── -->
    <section class="section cta-section">
      <div class="container">
        <div class="cta-card card animate-up">
          <div class="cta-orb"></div>
          <h2 class="cta-title">Travaillons ensemble</h2>
          <p class="cta-desc">Disponible pour des projets freelance, des collaborations open-source, ou une alternance à partir de juillet 2026.</p>
          <RouterLink to="/contact" class="btn-primary cta-btn">Me contacter ↗</RouterLink>
        </div>
      </div>
    </section>

    <!-- ── FOOTER ─────────────────────────────────────────────────── -->
    <footer class="footer">
      <div class="container footer-inner">
        <span class="footer-name">Thomas Venouil · 2026</span>
        <div class="footer-links">
          <a :href="profile.github" target="_blank">GitHub</a>
          <a :href="profile.linkedin" target="_blank">LinkedIn</a>
          <RouterLink to="/contact">Contact</RouterLink>
        </div>
      </div>
    </footer>
  </main>
</template>

<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { profile, projects, categoryLabels, statusLabels, statusColors, tagLabels } from '@/data'

const featuredProjects = computed(() => projects.filter(p => p.featured))
</script>

<style scoped>
main { padding-top: var(--nav-h); }

/* ── Hero ── */
.hero {
  position: relative;
  min-height: calc(100vh - var(--nav-h));
  display: flex; align-items: center;
  overflow: hidden;
}
.hero-bg { position: absolute; inset: 0; pointer-events: none; }
.hero-orb {
  position: absolute; border-radius: 50%;
  filter: blur(80px); opacity: 0.25;
}
.orb1 { width: 600px; height: 600px; background: radial-gradient(#223B65, transparent); top: -100px; left: -200px; }
.orb2 { width: 400px; height: 400px; background: radial-gradient(rgba(186,242,216,0.3), transparent); bottom: -80px; right: -80px; }
.hero-grid {
  position: absolute; inset: 0;
  background-image: linear-gradient(rgba(186,242,216,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(186,242,216,0.03) 1px, transparent 1px);
  background-size: 60px 60px;
  mask-image: radial-gradient(ellipse 70% 60% at 30% 30%, black 10%, transparent 100%);
}

.hero-inner { position: relative; z-index: 1; padding: 80px 24px; }

.hero-badge {
  display: inline-flex; align-items: center; gap: 8px;
  font-size: 0.75rem; font-weight: 600;
  color: var(--secondary);
  background: rgba(186,242,216,0.08);
  border: 1px solid rgba(186,242,216,0.2);
  border-radius: 100px; padding: 5px 14px;
  margin-bottom: 28px;
}
.badge-dot {
  width: 7px; height: 7px; border-radius: 50%;
  background: var(--secondary);
  box-shadow: 0 0 8px rgba(186,242,216,0.6);
  animation: pulse 2s ease-in-out infinite;
}
@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }

.hero-title {
  font-family: var(--font-serif);
  font-size: clamp(3.5rem, 8vw, 7rem);
  line-height: 1;
  color: var(--title-text);
  letter-spacing: -0.03em;
  margin-bottom: 18px;
}
.hero-title em { font-style: italic; display: block; }

.hero-sub {
  font-size: 1.1rem; font-weight: 500;
  color: rgba(255,255,255,0.55);
  margin-bottom: 20px;
}
.hero-desc {
  max-width: 560px;
  font-size: 0.95rem; color: rgba(255,255,255,0.42); line-height: 1.7;
  margin-bottom: 36px;
}
.hero-actions { display: flex; gap: 12px; flex-wrap: wrap; margin-bottom: 36px; }
.hero-links { display: flex; gap: 20px; flex-wrap: wrap; }
.hero-link {
  display: flex; align-items: center; gap: 7px;
  font-size: 0.8rem; font-weight: 600; color: rgba(255,255,255,0.38);
  transition: color 0.2s;
}
.hero-link:hover { color: rgba(255,255,255,0.75); }
.link-svg { width: 15px; height: 15px; flex-shrink: 0; }

/* ── Stats ── */
.stats-section { padding: 40px 0 80px; }
.stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; }
.stat-card {
  padding: 24px 22px; text-align: center;
  position: relative; overflow: hidden; cursor: default;
}
.stat-card::after {
  content: '';
  position: absolute; bottom: 0; left: 0; right: 0; height: 2px;
  background: linear-gradient(90deg, var(--c, #baf2d8), transparent);
  opacity: 0.5; transition: opacity 0.3s;
}
.stat-card:hover::after { opacity: 1; }
.stat-icon { font-size: 1.4rem; margin-bottom: 10px; }
.stat-val { font-size: 2.4rem; font-weight: 700; color: #fff; letter-spacing: -0.04em; line-height: 1; margin-bottom: 6px; }
.stat-label { font-size: 0.78rem; font-weight: 600; color: rgba(255,255,255,0.6); margin-bottom: 3px; }
.stat-sub { font-size: 0.65rem; color: rgba(255,255,255,0.25); }

/* ── About ── */
.about-section { background: rgba(255,255,255,0.015); border-top: 1px solid var(--border-soft); border-bottom: 1px solid var(--border-soft); }
.about-grid { display: grid; grid-template-columns: 1fr 320px; gap: 64px; align-items: start; }

.section-label { font-size: 0.68rem; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: var(--secondary); opacity: 0.8; margin-bottom: 10px; }
.section-title { font-family: var(--font-serif); font-size: 2.2rem; color: var(--title-text); letter-spacing: -0.02em; line-height: 1.1; margin-bottom: 36px; }
.section-row { display: flex; align-items: flex-end; justify-content: space-between; gap: 20px; margin-bottom: 40px; }
.section-row .section-title { margin-bottom: 0; }

.skills-categories { display: flex; flex-direction: column; gap: 20px; }
.skill-category { display: flex; flex-direction: column; gap: 8px; }
.skill-cat-label { font-size: 0.65rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.12em; }
.skill-cat-chips { display: flex; flex-wrap: wrap; gap: 7px; }
.skill-chip {
  font-size: 0.78rem; font-weight: 500;
  padding: 5px 12px; border-radius: 20px;
  color: var(--c, #fff);
  background: color-mix(in srgb, var(--c, #fff) 10%, transparent);
  border: 1px solid color-mix(in srgb, var(--c, #fff) 22%, transparent);
}

.bio-col { display: flex; flex-direction: column; gap: 10px; }
.bio-card { padding: 16px 18px; }
.bio-card-icon { font-size: 1.2rem; margin-bottom: 8px; }
.bio-card-label { font-size: 0.62rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: rgba(255,255,255,0.3); margin-bottom: 4px; }
.bio-card-title { font-size: 0.88rem; font-weight: 600; color: #fff; margin-bottom: 2px; }
.bio-card-sub { font-size: 0.72rem; color: rgba(255,255,255,0.38); }
.lang-row { display: flex; justify-content: space-between; padding: 5px 0; border-bottom: 1px solid rgba(255,255,255,0.05); }
.lang-row:last-child { border-bottom: none; padding-bottom: 0; }
.lang-name { font-size: 0.82rem; font-weight: 500; color: rgba(255,255,255,0.7); }
.lang-level { font-size: 0.72rem; color: var(--secondary); font-weight: 600; }
.interests-card { padding: 16px 18px; }
.interests-chips { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 8px; }
.interest-chip { font-size: 0.72rem; padding: 4px 10px; border-radius: 20px; background: rgba(186,242,216,0.06); border: 1px solid var(--border-soft); color: rgba(255,255,255,0.5); }

/* ── Featured projects ── */
.projects-section { }
.featured-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; }
.feat-card { padding: 28px 26px; display: flex; flex-direction: column; gap: 10px; text-decoration: none; position: relative; overflow: hidden; }
.feat-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 1px; background: linear-gradient(90deg, var(--secondary), transparent 60%); opacity: 0; transition: opacity 0.3s; }
.feat-card:hover::before { opacity: 1; }
.feat-top { display: flex; align-items: center; justify-content: space-between; gap: 8px; }
.feat-tags { display: flex; gap: 5px; flex-wrap: wrap; }
.feat-status { display: flex; align-items: center; gap: 5px; font-size: 0.64rem; font-weight: 600; flex-shrink: 0; }
.sdot { width: 5px; height: 5px; border-radius: 50%; flex-shrink: 0; }
.feat-title { font-size: 1.2rem; font-weight: 700; color: #fff; letter-spacing: -0.02em; }
.feat-card:hover .feat-title { color: var(--secondary); transition: color 0.25s; }
.feat-sub { font-size: 0.75rem; color: rgba(255,255,255,0.35); }
.feat-desc { font-size: 0.83rem; color: rgba(255,255,255,0.48); line-height: 1.6; flex: 1; }
.feat-footer { display: flex; justify-content: space-between; align-items: center; padding-top: 14px; border-top: 1px solid var(--border-soft); margin-top: auto; }
.feat-year { font-size: 0.68rem; color: rgba(255,255,255,0.25); }
.feat-cta { font-size: 0.75rem; font-weight: 600; color: var(--secondary); opacity: 0; transform: translateX(-6px); transition: opacity 0.25s, transform 0.25s; }
.feat-card:hover .feat-cta { opacity: 1; transform: translateX(0); }

/* ── CTA section ── */
.cta-section { padding-bottom: 40px; }
.cta-card {
  position: relative; overflow: hidden;
  padding: 60px 48px; text-align: center;
  display: flex; flex-direction: column; align-items: center; gap: 16px;
}
.cta-orb {
  position: absolute; width: 500px; height: 300px;
  border-radius: 50%; background: radial-gradient(rgba(186,242,216,0.08), transparent 70%);
  top: 50%; left: 50%; transform: translate(-50%, -50%);
  pointer-events: none;
}
.cta-title { font-family: var(--font-serif); font-size: 2.4rem; color: var(--title-text); letter-spacing: -0.02em; position: relative; }
.cta-desc { font-size: 0.92rem; color: rgba(255,255,255,0.45); max-width: 480px; line-height: 1.65; position: relative; }
.cta-btn { position: relative; padding: 14px 32px; font-size: 0.9rem; }

/* ── Footer ── */
.footer { border-top: 1px solid var(--border-soft); padding: 24px 0; }
.footer-inner { display: flex; align-items: center; justify-content: space-between; }
.footer-name { font-size: 0.75rem; color: rgba(255,255,255,0.25); }
.footer-links { display: flex; gap: 20px; }
.footer-links a { font-size: 0.75rem; color: rgba(255,255,255,0.3); transition: color 0.2s; }
.footer-links a:hover { color: rgba(255,255,255,0.65); }

@media (max-width: 768px) {
  .stats-grid { grid-template-columns: repeat(2, 1fr); }
  .about-grid { grid-template-columns: 1fr; }
  .featured-grid { grid-template-columns: 1fr; }
  .hero-title { font-size: 3.2rem; }
}
</style>
