import { reactive } from '../reactive'
describe('reactive', () => {
  it('happy path', () => {
    const original = { foo: 1}
    const obServered = reactive(original)
    expect(obServered).not.toBe(original)
    expect(obServered.foo).toBe(1)
  });
});