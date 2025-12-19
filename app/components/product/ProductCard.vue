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
    class="cv-auto-800 hover:shadow-primary transtion-all duration-global scale-3d hover:scale-101 hover:shadow-[0_0_3px_3px] starting:scale-95 starting:opacity-0"
    :ui="{
      container: 'p-2.5 sm:p-2.5',
      header: 'w-full',
      footer: 'w-full flex flex-col gap-5 items-center',
      title: 'font-bold text-[1.15rem]',
    }"
  >
    <template #header>
      <ULink :to="{ name: 'product', params: { product_id: product.id } }">
        <NuxtImg
          src="/logo.svg"
          class="light:bg-accented bg-secondary hover:bg-primary-800 duration-global aspect-video w-full rounded-xl transition-colors"
        />
      </ULink>
    </template>

    <template #title>
      <ULink :to="{ name: 'product', params: { product_id: product.id } }">
        {{ product.title }}
      </ULink>
    </template>

    <template #description>
      {{ product.description }}
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
