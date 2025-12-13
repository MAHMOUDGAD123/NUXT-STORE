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
    class="font-saira text-primary bg-secondary-700 light:bg-accented xsm:text-6xl mt-6 h-30 w-full content-center rounded-md text-center text-5xl"
  >
    <slot>
      {{ title ?? 'TITLE' }}
    </slot>
  </h1>
</template>

<style scoped>
  h1 {
    mask-image: linear-gradient(to right, transparent, #000 50%, transparent);
  }
</style>
