<script setup lang="ts">
  import type { NavigationMenuItem } from '@nuxt/ui';

  // Links
  const NavItems: NavigationMenuItem[] = [
    {
      to: { name: 'shop' },
      label: 'SHOP',
      icon: 'fa7-solid:shop',
    },
    {
      to: { name: 'receipts' },
      label: 'RECEIPTS',
      icon: 'fa7-solid:receipt',
    },
    {
      to: { name: 'profile' },
      label: 'PROFILE',
      icon: 'fa7-solid:user',
    },
  ];

  // Data
  const themeStore = useThemeStore();
  const { theme } = storeToRefs(themeStore);
  const iconSize: 'sm' | 'xl' | 'xs' | 'md' | 'lg' = 'xl';
</script>

<template>
  <UHeader
    mode="slideover"
    :toggle="{
      size: iconSize,
      class: 'hover:text-primary focus-visible:text-primary',
    }"
  >
    <template #left>
      <AppLogo />
    </template>

    <template #default>
      <UNavigationMenu
        :items="NavItems"
        :ui="{
          list: 'rounded-full px-3 gap-5',
          link: 'rouded-full w-14 aspect-square text-4xl p-0 flex justify-center before:w-full before:h-full',
        }"
      >
        <template #item="{ item }">
          <UTooltip
            :text="item.label"
            :delay-duration="0"
            :ui="{
              content: 'text-primary p-1 px-2.5 rounded-full bg-accented font-bold',
            }"
            :content="{ avoidCollisions: true, sideOffset: 15 }"
          >
            <UIcon :name="item.icon" />
          </UTooltip>
        </template>
      </UNavigationMenu>
    </template>

    <template #body>
      <UNavigationMenu :items="NavItems" orientation="vertical">
        <template #item="{ item }">
          <div class="flex items-center gap-3 font-bold">
            <UIcon :name="item.icon" class="text-3xl" />
            <span class="">{{ item.label }}</span>
          </div>
        </template>
      </UNavigationMenu>
    </template>

    <template #right>
      <UTooltip
        text="+9"
        :delay-duration="0"
        :content="{ avoidCollisions: true, sideOffset: 5, side: 'bottom' }"
        class="hover:text-primary focus-visible:text-primary relative"
        :ui="{
          content: 'bg-accented font-bold text-primary rounded-full',
        }"
      >
        <UButton
          :to="{ name: 'cart' }"
          variant="ghost"
          :size="iconSize"
          color="neutral"
          icon="fa7-solid:cart-shopping"
          :class="{ 'text-primary': $route.name === 'cart' }"
        />
      </UTooltip>

      <ClientOnly>
        <UTooltip
          :text="theme.toUpperCase()"
          :delay-duration="0"
          :content="{ avoidCollisions: true, sideOffset: 5, side: 'bottom' }"
          class="hover:text-primary focus-visible:text-primary relative"
          :ui="{
            content: 'bg-accented font-bold text-primary rounded-full',
          }"
        >
          <UButton
            ref="themeToggleBtn"
            :size="iconSize"
            variant="ghost"
            color="neutral"
            :icon="theme === 'dark' ? 'lucide:moon' : 'ph:sun-bold'"
            class="hover:text-primary focus-visible:text-primary"
            @click="themeStore.toggleTheme"
          />
        </UTooltip>
        <template #fallback>
          <UButton loading variant="ghost" :size="iconSize" color="neutral" />
        </template>
      </ClientOnly>
    </template>
  </UHeader>
</template>
