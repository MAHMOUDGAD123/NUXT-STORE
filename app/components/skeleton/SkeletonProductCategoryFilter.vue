<script setup lang="ts">
  const categoryFilterStore = useCategoryFilterStore();
</script>

<template>
  <div class="flex w-full flex-col gap-3 px-2">
    <USkeleton v-for="i in categoryFilterStore.filterOptions.length" class="h-14" />
  </div>
</template>
