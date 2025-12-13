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
    // Get click coordinates or fallback to top-right
    const x = rect?.x ? rect.x + 0.5 * rect.width : window.innerWidth;
    const y = rect?.y ? rect.y + 0.5 * rect.height : 0;

    document.documentElement.style.setProperty('--toggle-x', `${x}px`);
    document.documentElement.style.setProperty('--toggle-y', `${y}px`);

    document.startViewTransition(() => {
      document.documentElement.classList.replace(oldTheme, newTheme);
    });
  };

  return {
    theme,
    toggleTheme,
  };
});
