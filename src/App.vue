<template>
  <AppNavBar
    logo-href="/"
    :links="navLinks"
    :show-cta="true"
    cta-label="Me contacter"
    cta-href="/contact"
    :show-scroll-bar="true"
  />
  <RouterView />
</template>

<script setup>
import { computed } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import AppNavBar from '@/core/components/NavBar.vue'
import '@/assets/main.css'

const route = useRoute()

const navLinks = computed(() => [
  { href: '/',         label: 'À propos' },
  { href: '/projets',  label: 'Projets' },
  { href: '/parcours', label: 'Parcours' },
])
</script>
