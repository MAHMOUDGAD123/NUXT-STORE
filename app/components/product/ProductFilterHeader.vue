<script setup lang="ts">
  const categoryFilterStore = storeToRefs(useCategoryFilterStore());
  const { filterPageTitle } = categoryFilterStore;
</script>

<template>
  <ClientOnly>
    <template #fallback>
      <SkeletonProductFilterHeader />
    </template>

    <template #placeholder>
      <SkeletonProductFilterHeader />
    </template>

    <UPageHeader
      class="bg-secondary light:bg-accented flex items-center rounded-lg p-3"
      :headline="filterPageTitle"
      :ui="{
        headline: 'm-0 text-xl font-bold',
        container: 'ms-auto',
      }"
    >
      <UDrawer
        title="Category Filter"
        description="Choose your category from the list"
        class="lg:hidden"
        :ui="{
          title: 'font-bold',
        }"
      >
        <UTooltip>
          <template #content>Filter</template>
          <UButton icon="fa7-solid:filter" variant="solid" />
        </UTooltip>

        <template #body>
          <ProductCategoryFilter />
        </template>
      </UDrawer>
    </UPageHeader>
  </ClientOnly>
</template>
