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

  const productsStore = useProductsStore();
  const product = productsStore.getProductById(route.params.product_id as string);

  if (!product) {
    throw createError({
      statusCode: 404,
      message: `Product id [${route.params.product_id}] not found`,
      fatal: true,
      data: {
        overwriteStatusMessage: 'Product not found',
      },
    });
  }

  const { getCategory } = useCategoryFilterStore();
  route.meta.pageHeroIcon = `${getCategory(product.category, 'icon')}`;
</script>

<template>
  <div>
    <ClientOnly>
      <template #fallback>
        <SkeletonProductPage />
      </template>
      <template #placeholder>
        <SkeletonProductPage />
      </template>

      <UCard class="my-7">
        <template #header>
          <ProductActions :product />
        </template>

        <template #default>
          <UBadge variant="soft" :label="`${product.stockCount} left`" size="xl" class="mb-3" />

          <h2 class="mb-5 text-2xl font-extrabold">{{ product?.title }}</h2>
          <p class="mb-5 text-(--text-color-muted)">{{ product?.description }}</p>

          <ProductPrice :product size="xl" />
        </template>

        <template #footer>
          <h4 class="text-primary mb-3 font-extrabold">PRODUCT DETAILS</h4>
          <UTable
            :data="Object.entries(product?.specs)"
            :ui="{
              thead: 'hidden',
            }"
          />
        </template>
      </UCard>
    </ClientOnly>
  </div>
</template>

<style>
  tr:nth-child(even) {
    background-color: var(--background-color-muted);
  }

  tr td:first-child {
    color: var(--text-color-toned);
    font-weight: bold;
  }
</style>
