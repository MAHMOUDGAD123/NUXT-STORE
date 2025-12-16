<script setup lang="ts">
  import ProductFilterHeader from '~/components/product/ProductFilterHeader.vue';

  useSeoMeta({
    title: 'Shop',
  });

  definePageMeta({
    name: 'shop',
    alias: ['/products'],
    pageHero: 'SHOP',
    pageHeroIcon: 'fa7-solid:shop',
  });
</script>

<template>
  <UPage
    class="my-7"
    :ui="{
      left: 'lg:col-span-4',
      center: 'lg:col-span-12',
      root: 'lg:grid-cols-16',
    }"
  >
    <template #left>
      <PageAside />
    </template>

    <template #default>
      <ProductFilterHeader />
      <ShopCardGrid />
    </template>
  </UPage>
</template>
