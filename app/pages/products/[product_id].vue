<script setup lang="ts">
  const route = useRoute();

  useSeoMeta({
    title: `Product ${route.params.product_id}`,
  });

  const categoryStore = useCategoryFilterStore();
  const product = categoryStore.getItemById(route.params.product_id as string);

  definePageMeta({
    name: 'product',
    pageHero: 'PRODUCT',
    pageHeroIcon: 'fa7-solid:basket-shopping',
  });
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
