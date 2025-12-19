<script setup lang="ts"></script>

<template>
  <NuxtLayout name="default">
    <UPage
      class="my-7"
      :ui="{
        left: 'lg:col-span-4',
        center: 'lg:col-span-12',
        root: 'lg:grid-cols-16',
      }"
    >
      <template #left>
        <PageAside />
      </template>

      <template #default>
        <ProductFilterHeader />
        <slot></slot>
      </template>
    </UPage>
  </NuxtLayout>
</template>
