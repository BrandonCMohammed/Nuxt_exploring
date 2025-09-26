<script setup>
   import { withAccelerate } from "@prisma/extension-accelerate";
   const prisma = usePrismaClient().$extends(withAccelerate());
   const testdb = await prisma.testdb.findFirst();
</script>

<template>
  <p>{{ testdb?.name ?? "No user has been added yet." }}</p>
</template>