<script setup lang="ts">
  const route = useRoute();

  useSeoMeta({
    title: `Product ${route.params.product_id}`,
  });

  definePageMeta({
    name: 'product',
    pageHero: 'PRODUCT',
    pageHeroIcon: 'line-md:loading-loop',
  });

  const categoryStore = useCategoryFilterStore();
  const product = categoryStore.getItemById(route.params.product_id as string);
  route.meta.pageHeroIcon = `${product.icon}`;
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
