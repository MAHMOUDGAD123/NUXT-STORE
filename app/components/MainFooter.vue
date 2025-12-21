<script setup lang="ts">
  import type { ContentSearchLink } from '@nuxt/ui';
  const footerLinks: (ContentSearchLink & { ariaLabel?: string; toolTipText?: string })[] = [
    {
      icon: 'i-simple-icons-github',
      to: 'https://github.com/MAHMOUDGAD123',
      ariaLabel: 'GitHub',
      toolTipText: 'GitHub',
    },
    {
      icon: 'i-simple-icons-linkedin',
      to: 'https://www.linkedin.com/in/mahmoud-gad-674729198/',
      ariaLabel: 'LinkedIn',
      toolTipText: 'LinkedIn',
    },
  ];

  const isSmallScreen = useMediaQuery('(width <= 400px)', { ssrWidth: 400 });
</script>

<template>
  <UFooter
    id="__main_footer__"
    :ui="{
      container: 'py-0 tex-center',
      center: 'flex gap-0 xsm:gap-4 flex-col xsm:flex-row items-center',
    }"
    class="dark:bg-secondary-900 light:bg-secondary-200"
  >
    <div class="flex items-center gap-2">
      <p class="text-muted text-center text-sm">Powered by</p>
      <NuxtLink
        to="https://nuxt.com/"
        target="_blank"
        external
        class="text-primary-600 hover:text-primary focus-visible:text-primary font-bold"
        aria-label="NuxtJs"
        >NuxtJs</NuxtLink
      >
    </div>

    <USeparator
      :orientation="isSmallScreen ? 'horizontal' : 'vertical'"
      color="neutral"
      class="xsm:w-1 h-5 w-25 transition-colors"
    />

    <div class="flex flex-wrap gap-1">
      <UTooltip v-for="link in footerLinks" :text="link.toolTipText">
        <UButton
          :icon="link.icon"
          :to="link.to"
          :aria-label="link.ariaLabel"
          color="neutral"
          variant="link"
          external
          target="_blank"
        />
      </UTooltip>
    </div>
  </UFooter>
</template>
