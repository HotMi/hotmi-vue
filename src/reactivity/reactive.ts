import { collect, trigger } from './effect'
/**
 * 按照vue3的用法 const obj = reactive({ foo: 1 })
 * reactive函数 应该是接收一个普通对象，返回一个响应式对象
 * 这里用new Proxy对传进来的对象做一个get和set的监听
 */
export function reactive(raw) {
  return new Proxy(raw, {
    get(target, key) {
      const result = Reflect.get(target, key)
      // 在触发get的时候, 需要收集依赖
      collect(target, key)
      return result
    },
    set(target, key, value) {
      const result = Reflect.set(target, key, value)
      // 在触发set的时候, 需要触发依赖
      trigger(target, key)
      return result
    }
  })
}