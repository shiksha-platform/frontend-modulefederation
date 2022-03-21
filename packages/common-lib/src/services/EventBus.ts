import postal from 'postal'

class EventBus {
  private channel = postal.channel('app_events')
  constructor() {}

  public publish(topic: string, message: any) {
    this.channel.publish(topic, message)
  }
  public subscribe(
    topic: string,
    callbackfunction: (data: any, envelope: any) => any
  ) {
    return this.channel.subscribe(topic, callbackfunction)
  }
  public unsubscribe(subscription: ISubscriptionDefinition<unknown>) {
    subscription.unsubscribe()
  }
}

export const eventBus = new EventBus()
