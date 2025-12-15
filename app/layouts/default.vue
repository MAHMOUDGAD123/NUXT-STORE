<script setup lang="ts"></script>

<template>
  <UApp>
    <UBanner
      title="The app is still in development"
      close
      color="primary"
      icon="material-symbols:info-outline-rounded"
      :ui="{
        left: 'lg:hidden',
        center: 'text-lg',
      }"
    />

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
