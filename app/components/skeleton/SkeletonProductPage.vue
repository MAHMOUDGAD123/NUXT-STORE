<script setup lang="ts">
  const skeletonTableData = Array.from({ length: 6 }).map((v) => ({ c1: '', c2: '' }));
</script>

<template>
  <UCard class="my-7">
    <template #header>
      <div class="flex justify-center gap-3">
        <USkeleton v-for="n in 2" class="aspect-square w-10" />
      </div>
    </template>

    <template #default>
      <USkeleton class="mb-5 h-8 w-120" />
      <USkeleton class="mb-3 h-5 w-200" />
      <USkeleton class="h-5 w-70" />
    </template>

    <template #footer>
      <USkeleton class="mb-3 h-7 w-40" />

      <UTable
        :data="skeletonTableData"
        :ui="{
          thead: 'hidden',
          tr: 'animate-pulse',
        }"
      >
      </UTable>
    </template>
  </UCard>
</template>
