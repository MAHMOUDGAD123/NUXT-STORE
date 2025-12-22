<script setup lang="ts">
  import type { NuxtError } from '#app';

  useSeoMeta({
    title: 'ERROR',
  });

  const { error } = defineProps<{
    error: NuxtError;
  }>();
</script>

<template>
  <UApp>
    <MainHeader />

    <UContainer as="main" class="min-h-[calc(100vh-var(--ui-header-height))]">
      <UError
        :error="{
          statusCode: error?.statusCode ?? 404,
          statusMessage: error.data?.overwriteStatusMessage ?? 'Page not found',
          message: error?.message || 'The page you are looking for does not exist.',
          fatal: true,
        }"
        :clear="{
          icon: 'fa7-solid:shop',
          label: 'Back to shop',
          replace: true,
        }"
        :ui="{
          statusCode: 'text-5xl font-saira',
          statusMessage: 'text-2xl',
        }"
      />
    </UContainer>

    <MainFooter />
  </UApp>
</template>
