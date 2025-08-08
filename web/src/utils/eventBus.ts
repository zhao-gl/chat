// src/utils/eventBus.ts
type EventHandler<T = unknown> = (data: T) => void;

class EventBus {
  private events: Map<string, EventHandler[]> = new Map();

  // 订阅事件
  on<T = unknown>(event: string, handler: EventHandler<T>): void {
    if (!this.events.has(event)) {
      this.events.set(event, []);
    }
    this.events.get(event)!.push(handler as EventHandler);
  }

  // 取消订阅
  off<T = unknown>(event: string, handler: EventHandler<T>): void {
    const handlers = this.events.get(event);
    if (handlers) {
      const index = handlers.indexOf(handler as EventHandler);
      if (index > -1) {
        handlers.splice(index, 1);
      }
    }
  }

  // 发布事件
  emit<T = unknown>(event: string, data?: T): void {
    const handlers = this.events.get(event);
    if (handlers) {
      handlers.forEach(handler => handler(data as unknown as T));
    }
  }
}

export default new EventBus();
