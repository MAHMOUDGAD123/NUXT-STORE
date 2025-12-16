<script setup lang="ts">
  import type { VNode } from 'vue';

  defineProps<{
    title: string;
  }>();

  defineSlots<{
    defaul(): VNode[];
  }>();
</script>

<template>
  <h1
    class="page-hero font-saira text-primary bg-secondary-700 light:bg-accented xsm:text-6xl mt-6 h-30 w-full content-center rounded-md text-center text-5xl"
  >
    <slot>
      <UIcon v-if="$route.meta.pageHeroIcon" :name="$route.meta.pageHeroIcon" />
      <div v-else class="text-4xl">{{ title ?? 'TITLE' }}</div>
    </slot>
  </h1>
</template>

<style scoped>
  .page-hero {
    mask-image: linear-gradient(to right, transparent, #000 50%, transparent);
  }
</style>
