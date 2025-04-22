import app from "./app";

const stores = {
  app: app,
};

export function useStore<T extends keyof typeof stores>(
  name: T
): (typeof stores)[T] {
  return stores[name];
}
