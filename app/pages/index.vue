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

  const { productsRenderList } = storeToRefs(useProductsStore());
  const { filteredProducts, currentFilter } = storeToRefs(useCategoryFilterStore());
  const shopList = computed(() =>
    currentFilter.value === 'all' ? productsRenderList.value : filteredProducts.value,
  );

  const emptyStore = computed(() => filteredProducts.value.length === 0);
</script>

<template>
  <ShopCardGrid :productsList="shopList" :isEmpty="emptyStore" />
</template>
