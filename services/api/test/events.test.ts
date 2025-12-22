import { emitter } from '../src/events'
import { buildServer } from '../src/index'

describe('events emitter', () => {
  test('publishing alert emits event', async () => {
    const payload = { type: 'alert.created', payload: { id: 'a1', message: 'test' } }
    const listener = jest.fn()
    emitter.on('app:event', listener)
    // publish
    emitter.emit('app:event', payload)
    expect(listener).toHaveBeenCalled()
    emitter.removeListener('app:event', listener)
  })
})
