import { defineStore, skipHydrate } from 'pinia';

type Theme = 'dark' | 'light' | 'system';

export const useThemeStore = defineStore('theme', ({ action }) => {
  const storageKey = 'nuxt-color-mode';
  const theme = skipHydrate(useLocalStorage<Theme>(storageKey, 'dark'));

  const initAppTheme = action(() => {
    if (!import.meta.client) return;

    const storedTheme = localStorage.getItem(storageKey) as Theme;
    if (!storedTheme || storedTheme === 'system') {
      theme.value = 'dark';
      document.documentElement.classList.replace('system', 'dark');
    }
  });

  initAppTheme();

  const toggleTheme = (ev?: MouseEvent) => {
    if (!import.meta.client) return;

    const oldTheme = theme.value;
    theme.value = theme.value === 'dark' ? 'light' : 'dark';
    const newTheme = theme.value;

    const switchButton = ev?.currentTarget as HTMLButtonElement | null;
    const rect = switchButton?.getBoundingClientRect();

    const x = rect ? rect.left + rect.width / 2 : window.innerWidth;
    const y = rect ? rect.top + rect.height / 2 : 0;

    // Go and take a look about the ~/assets/view-transition.css file
    document.documentElement.style.setProperty('--theme-toggle-x', `${x}px`);
    document.documentElement.style.setProperty('--theme-toggle-y', `${y}px`);

    if (!document.startViewTransition) {
      document.documentElement.classList.replace(oldTheme, newTheme);
      return;
    }

    document.startViewTransition(() => {
      document.documentElement.classList.replace(oldTheme, newTheme);
    });
  };

  return {
    theme,
    toggleTheme,
  };
});
