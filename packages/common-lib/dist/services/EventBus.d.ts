/// <reference types="postal" />
declare class EventBus {
    private channel;
    constructor();
    publish(topic: string, message: any): void;
    subscribe(topic: string, callbackfunction: (data: any, envelope: any) => any): ISubscriptionDefinition<unknown>;
    unsubscribe(subscription: ISubscriptionDefinition<unknown>): void;
}
export declare const eventBus: EventBus;
export {};
