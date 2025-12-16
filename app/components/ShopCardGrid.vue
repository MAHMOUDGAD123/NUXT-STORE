<script setup lang="ts">
  const { filteredProducts } = storeToRefs(useCategoryFilterStore());
</script>

<template>
  <UPageGrid class="grid grid-cols-1 py-9 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
    <ClientOnly>
      <ProductCard v-for="product in filteredProducts" :key="product.id" :product />
      <template #placeholder>
        <SkeletonProductCard />
      </template>
      <template #fallback>
        <SkeletonProductCard />
      </template>
    </ClientOnly>
  </UPageGrid>
</template>
