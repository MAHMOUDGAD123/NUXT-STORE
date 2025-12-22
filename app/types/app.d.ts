import type { RouteMap } from 'vue-router';

declare module '#app' {
  interface PageMeta {
    pageHero?: Uppercase<keyof RouteMap> | (string & {});
    pageHeroIcon?: string;
  }

  export interface NuxtError<DataT = unknown> {
    data: {
      overwriteStatusMessage: string;
    };
  }
}
