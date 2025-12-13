<script setup lang="ts">
  useSeoMeta({
    title: 'Shop',
  });

  definePageMeta({
    name: 'shop',
    alias: ['/products'],
    pageHero: 'SHOP',
    pageHeroIcon: 'fa7-solid:home',
  });

  const productStore = storeToRefs(useProductStore());
  const { products } = productStore;
</script>

<template>
  <UPageGrid class="py-9">
    <UPageCard
      v-for="product in products.list"
      :key="product.id"
      :title="product.title"
      :description="product.description"
      variant="subtle"
      reverse
      :to="{ name: 'product', params: { product_id: product.id } }"
    >
      <NuxtImg src="/logo.svg" />
    </UPageCard>
  </UPageGrid>
</template>
