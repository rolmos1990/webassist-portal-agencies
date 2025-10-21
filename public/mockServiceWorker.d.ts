declare module './mockServiceWorker.js' {
  export const worker: {
    start: (options?: { onUnhandledRequest?: string }) => Promise<void>;
  };
}
