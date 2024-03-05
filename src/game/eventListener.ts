type Callback<T extends Array<any>> = (...args: T) => void;

class EventListener<
  EventListenerMap extends Record<string, any[]>,
  Event extends keyof EventListenerMap = keyof EventListenerMap
> {
  private listeners: {
    event: Event;
    callback: Callback<EventListenerMap[Event]>;
  }[] = [];

  public on(event: Event, callback: Callback<EventListenerMap[Event]>) {
    this.listeners.push({ event, callback });
  }

  public off(event: Event, callback: Callback<EventListenerMap[Event]>) {
    this.listeners = this.listeners.filter(
      (listener) => listener.event !== event && listener.callback !== callback
    );
  }

  public emit<E extends Event>(event: E, ...args: EventListenerMap[E]) {
    this.listeners
      .filter((listener) => listener.event === event)
      .forEach((listener) => listener.callback(...args));
  }
}

export default EventListener;
