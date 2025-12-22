import EventEmitter from 'events'

export const emitter = new EventEmitter()

// helper to emit typed events
export type AppEvent = { type: string; payload: any }
export function publish(event: AppEvent) {
  emitter.emit('app:event', event)
}
