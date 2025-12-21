export const useIntersectionObserver = (
  actionCallback: () => void,
  observerInit?: IntersectionObserverInit,
) => {
  const intersectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        actionCallback();
      }
    });
  }, observerInit);

  return {
    observer: intersectionObserver,
  };
};
