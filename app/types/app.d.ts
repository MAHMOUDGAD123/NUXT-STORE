import type { CustomRouteMap } from 'strict-vue-router';

declare module '#app' {
  interface PageMeta {
    pageHero?: Uppercase<keyof CustomRouteMap>;
    pageHeroIcon?: string;
  }
}
