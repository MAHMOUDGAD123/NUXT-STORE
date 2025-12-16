<script setup lang="ts"></script>

<template>
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
