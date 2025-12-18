<script setup lang="ts">
  const categoryFilterStore = useCategoryFilterStore();
  const { currentValue } = storeToRefs(categoryFilterStore);
</script>

<template>
  <ClientOnly>
    <template #placeholder>
      <SkeletonProductCategoryFilter />
    </template>

    <template #fallback>
      <SkeletonProductCategoryFilter />
    </template>

    <URadioGroup
      loop
      :items="categoryFilterStore.filterOptions"
      variant="card"
      indicator="hidden"
      :ui="{
        item: 'cursor-pointer border-4 border-accented transition-all duration-global mx-2 hover:border-primary-800',
      }"
      name="category-filter"
      v-model="currentValue"
    >
      <template #label="{ item }">
        <div
          class="flex w-full items-center transition-colors"
          :class="{ 'text-primary': item.value === currentValue }"
        >
          <span class="font-bold">{{ item.label }}</span>
          <div class="relative ms-auto h-5 w-5 rounded-full">
            <UIcon
              :name="item.icon"
              class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[3ex]"
            />
          </div>
        </div>
      </template>
    </URadioGroup>
  </ClientOnly>
</template>
