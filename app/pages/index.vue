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

  const { filteredProducts } = storeToRefs(useCategoryFilterStore());
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
      <UPageAside class="p-0">
        <template #top>
          <div class="bg-secondary light:bg-accented flex items-center gap-3 rounded-lg px-4 py-3">
            <h4 class="font-bold">Categories</h4>
            <UIcon name="fa7-solid:filter" class="ms-auto text-xl" />
          </div>
        </template>
        <ProductCategoryFilter />
      </UPageAside>
    </template>

    <template #default>
      <ProductFilterHeader />

      <UPageGrid class="grid grid-cols-1 py-9 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
        <ClientOnly>
          <ProductCard v-for="product in filteredProducts" :key="product.id" :product />
          <template #placeholder>
            <ProductCardSkeleton />
          </template>
          <template #fallback>
            <ProductCardSkeleton />
          </template>
        </ClientOnly>
      </UPageGrid>
    </template>
  </UPage>
</template>
