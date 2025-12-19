<script setup lang="ts">
  useSeoMeta({
    title: 'Shop',
  });

  definePageMeta({
    name: 'shop',
    alias: ['/products'],
    pageHero: 'SHOP',
    pageHeroIcon: 'fa7-solid:shop',
    layout: 'filter-layout',
  });

  const { filteredProducts } = storeToRefs(useCategoryFilterStore());
  const emptyStore = computed(() => filteredProducts.value.length === 0);
</script>

<template>
  <ShopCardGrid :productsList="filteredProducts" :isEmpty="emptyStore" />
</template>
