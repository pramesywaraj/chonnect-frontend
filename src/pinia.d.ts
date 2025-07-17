import 'pinia';

declare module 'pinia' {
  export interface DefineStoreOptionsBase<S, Store> {
    /**
     * Persist Pinia state to storage.
     * Can be a boolean or an object for advanced configuration.
     * @see https://prazdevs.github.io/pinia-plugin-persistedstate/guide/configuration.html
     */
    persist?: boolean | PersistedStateOptions | PersistedStateOptions[];
  }
}

// Optionally, add the PersistedStateOptions type for better intellisense:
import type { PersistedStateOptions } from 'pinia-plugin-persistedstate';
