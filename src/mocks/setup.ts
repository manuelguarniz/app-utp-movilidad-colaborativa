import { worker } from "@/mocks/browser";

export function enableMocking() {
  if (import.meta.env.DEV) {
    worker.start({
      onUnhandledRequest: "bypass",
    });
  }
}
