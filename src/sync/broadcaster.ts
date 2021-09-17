import { Identifyable } from "@app/entity/identify";

/**
 * Main interface that data sources should comply to if they wish to notify others of change
 */
export interface Subscribable<T> {
  broadcast(e: Identifyable, operationType: Operation): void;
  addListener(cb: listenerCallback<T>): void;
}

export interface Repository<T> {
  create(e: Identifyable, writeType: WriteType): Promise<T>;
  update(e: Identifyable, writeType: WriteType): Promise<T>;
}

export type listenerCallback<T> = (u: T, operationType: Operation) => void;

export enum Operation {
  CREATE = "create",
  UPDATE = "update",
}

export enum WriteType {
  SOURCE = "source",
  SINK = "sink",
}
