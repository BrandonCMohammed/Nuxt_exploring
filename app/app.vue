<script lang="ts" setup>
  import type { NavigationMenuItem } from '@nuxt/ui'

const route = useRoute()

const items = computed<NavigationMenuItem[]>(() => [
  {
    label: 'Home',
    to: '/',
  },
  {
    label: 'About',
    to: '/about',
  },
  {
    label: 'Forms',
    to: '/forms',

  },
  {
    label: 'Login',
    to: '/Login',

  },
]) 
</script>

<template>
  <!-- <NuxtIsland name="testdb"></NuxtIsland> -->
  <UApp>
    <UHeader title="My first Nuxt page">
      <UNavigationMenu :items="items"/>
    </UHeader>

    <UMain>
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </UMain>

    <UFooter>
      <template #left>
        <span>© 2024 My Company</span>
      </template>
      <template #right>
        <a href="https://example.com" target="_blank" rel="noopener">Test Link</a>
      </template>
    </UFooter>
  </UApp>
</template>
