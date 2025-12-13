<script setup lang="ts">
  const route = useRoute();

  useSeoMeta({
    title: `Product ${route.params.product_id}`,
  });

  definePageMeta({
    name: 'product',
    pageHero: 'PRODUCT',
    pageHeroIcon: 'fa7-solid:basket-shopping',
  });

  const productStore = useProductStore();
  const product = productStore.getItemById(route.params.product_id as string);
</script>

<template>
  <div>
    <ClientOnly>
      <template #fallback>loading...</template>

      <UCard>
        <template #header>
          <div>{{ product?.title }}</div>
        </template>
        <template #default>
          <div>{{ product?.description }}</div>
        </template>
        <template #footer>
          <UTable :data="Object.entries(product?.specs)" caption="Specs" />
        </template>
      </UCard>
    </ClientOnly>
  </div>
</template>
