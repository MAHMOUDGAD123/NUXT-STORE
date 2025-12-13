export default defineNuxtPlugin(() => {
  const router = useRouter();
  // const logger = createLogger({ side: 'client' });

  router.beforeEach((to) => {
    // logger.info('Plugin:', to.name);
  });
});
