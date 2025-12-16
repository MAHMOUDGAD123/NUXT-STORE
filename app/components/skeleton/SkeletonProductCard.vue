<script setup lang="ts"></script>

<template>
  <UPageCard
    v-for="n in 7"
    variant="outline"
    :ui="{
      wrapper: 'h-full',
      header: 'w-full',
      footer: 'w-full flex flex-col gap-5 items-center',
      body: 'w-full flex flex-col gap-5',
    }"
  >
    <template #header>
      <USkeleton class="aspect-video" />
    </template>

    <template #leading>
      <USkeleton class="aspect-square w-7" />
    </template>

    <template #title>
      <div class="flex flex-col gap-2">
        <USkeleton class="h-5 w-full" />
        <USkeleton class="h-5 w-1/2" />
      </div>
    </template>

    <template #description>
      <div class="flex flex-col gap-2">
        <USkeleton class="h-5 w-full" />
        <USkeleton class="h-5 w-full" />
        <USkeleton class="h-5 w-1/2" />
      </div>
    </template>

    <template #footer>
      <div class="flex w-full flex-col gap-2">
        <USkeleton class="h-7 w-20" />
        <div class="flex h-7 gap-2">
          <USkeleton class="w-20" />
          <USkeleton class="w-10" />
        </div>
      </div>

      <div class="ms-auto flex gap-3">
        <USkeleton class="aspect-square w-10" />
        <USkeleton class="aspect-square w-10" />
      </div>
    </template>
  </UPageCard>
</template>
