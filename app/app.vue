<template>
  <UApp>
    <UHeader title="My first Nuxt page"/>

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
