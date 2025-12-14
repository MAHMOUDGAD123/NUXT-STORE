<script setup lang="ts">
  const categoryFilterStore = storeToRefs(useCategoryFilterStore());
  const { filterPageTitle } = categoryFilterStore;
</script>

<template>
  <ClientOnly>
    <template #fallback>
      <div
        class="light:bg-accented bg-secondary-900 mb-5 flex h-14 items-center rounded-lg p-3 *:h-full"
      >
        <USkeleton class="w-25" />
        <USkeleton class="ms-auto aspect-square w-9" />
      </div>
    </template>

    <template #placeholder>
      <div
        class="light:bg-accented bg-secondary-900 mb-5 flex h-14 items-center rounded-lg p-3 *:h-full"
      >
        <USkeleton class="w-25" />
        <USkeleton class="ms-auto aspect-square w-9" />
      </div>
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
