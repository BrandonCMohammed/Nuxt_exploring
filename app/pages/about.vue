<script setup lang="ts">
const cards = ref([
    {
        title: 'Card 1',
        description: 'Description of card 1,Description of card 1,Description of card 1,Description of card 1,Description of card 1',
    },
    {
        title: 'Card 2',
        description: 'Description of card 2,Description of card 2,Description of card 2,Description of card 2,Description of card 2',
    },
    {
        title: 'Card 3',
        description: 'Description of card 3,Description of card 3,Description of card 3,Description of card 3,Description of card 3',
    }
])
</script>

<template>

    <UPageSection title="This is the section title" description="This is the section description" :features="cards"
        orientation="horizontal">
        <img src="https://picsum.photos/704/1294" width="200" height="400" alt="Illustration"
            class="w-full rounded-lg" />
    </UPageSection>
    <section class="bg-orange-500">
        <h1>Welcome to About Page</h1>
        <p>This is a simple page created with Nuxt.js and Ukit.</p>
    </section>
</template>