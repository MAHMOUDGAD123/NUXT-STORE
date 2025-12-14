<script setup lang="ts"></script>

<template>
  <UApp>
    <MainHeader />

    <UContainer as="main" class="min-h-[calc(100vh-var(--ui-header-height))]">
      <Transition name="fade" appear type="transition" mode="out-in">
        <PageHeroCard :title="$route.meta.pageHero" :key="$route.name">
          <UIcon v-if="$route.meta.pageHeroIcon" :name="$route.meta.pageHeroIcon" />
        </PageHeroCard>
      </Transition>
      <slot></slot>
    </UContainer>

    <MainFooter />
  </UApp>
</template>
