<script setup lang="ts"></script>

<template>
  <UApp>
    <MainHeader />

    <UContainer as="main" class="min-h-[calc(100vh-var(--ui-header-height))]">
      <Transition name="fade" appear type="transition" mode="out-in">
        <PageTitleCard :title="$route.meta.pageHero" :key="$route.name">
          <UIcon :name="$route.meta.pageHeroIcon" />
        </PageTitleCard>
      </Transition>
      <slot></slot>
    </UContainer>

    <MainFooter />
  </UApp>
</template>
