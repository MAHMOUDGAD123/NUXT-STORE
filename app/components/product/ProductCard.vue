<script setup lang="ts">
  defineProps<{
    product: ProductWithMetaData;
  }>();

  const { getCategory } = useCategoryFilterStore();
</script>

<template>
  <UPageCard
    :key="product.id"
    :title="product.title"
    :description="product.description"
    variant="subtle"
    class="cv-auto-700 shadow-primary shadow-sm transition-opacity duration-500 contain-content starting:opacity-0"
    :ui="{
      container: 'p-2.5 sm:p-2.5',
      header: 'w-full',
      footer: 'w-full flex flex-col gap-5 items-center',
      title: 'font-bold text-[1.15rem] line-clamp-2 text-dimmed',
      description: 'line-clamp-3',
    }"
  >
    <template #header>
      <ULink :to="{ name: 'product', params: { product_id: product.id } }">
        <NuxtImg
          src="/logo.svg"
          class="light:bg-accented bg-secondary hover:bg-primary-800 hover:duration-global aspect-video w-full rounded-xl hover:transition-[background-color]"
        />
      </ULink>
    </template>

    <template #title>
      <ULink :to="{ name: 'product', params: { product_id: product.id } }">
        {{ product.title }}
      </ULink>
    </template>

    <template #description>
      <p :title="product.description">
        {{ product.description }}
      </p>
    </template>

    <template #leading>
      <div class="flex items-center gap-3">
        <UBadge class="text-center" :icon="getCategory(product.category, 'icon')" size="lg" />
        <UBadge
          class="text-center"
          size="lg"
          :label="`${product.stockCount} left`"
          variant="soft"
        />
      </div>
    </template>

    <template #footer>
      <ProductPrice :product />
      <ProductActions :product class="ms-auto" />
    </template>
  </UPageCard>
</template>
