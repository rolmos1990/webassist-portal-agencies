export type ToastType = "success" | "error" | "warning";

type ToastHandler = (type: ToastType, title: string, message?: string) => void;

class ToastService {
  private handler: ToastHandler | null = null;

  register(handler: ToastHandler) {
    this.handler = handler;
  }

  private emit(type: ToastType, title: string, message?: string) {
    if (this.handler) {
      this.handler(type, title, message);
    } else {
      console.warn("Toast handler not registered");
    }
  }

  success(title: string, message?: string) {
    this.emit("success", title, message);
  }

  error(title: string, message?: string) {
    this.emit("error", title, message);
  }

  warning(title: string, message?: string) {
    this.emit("warning", title, message);
  }

  unregister() {
    this.handler = null;
  }
}

export const toast = new ToastService();
