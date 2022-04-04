let activeEffect
class ReactiveEffect {
  private _fn: any
  constructor(fn) {
    this._fn = fn
  }
  run() {
    // 在初始化调用run的时候，把this赋值给全局的activeEffect
    activeEffect = this
    this._fn()
  }
}
/**
 * effect应该是接收一个函数
 */
export function effect(fn) {
  activeEffect = new ReactiveEffect(fn)
  activeEffect.run()
}

/**
 * 声明依赖收集容器
 * 分析一下，对象有多个属性，而每个属性又对应多个依赖
 * 依赖不能重复，所以用new Set() 数据类型
 * 要以整个target当作键来存储依赖的话，那么这里用到new Map()类型
 * 所以容器的整体结构应该是
 * globalMap = {
 *  [target]: {
 *    depsMap: new set([dep1, dep2, dep3])
 *  }
 * }
 */ 
let globalMap = new Map()
/**
 * 收集依赖的函数
 */
export function collect(target, key) {
  let depsMap = globalMap.get(target)
  if (!depsMap) {
    depsMap = new Map()
    globalMap.set(target, depsMap)
  }
  let deps = depsMap.get(key)
  if (!deps) {
    deps = new Set()
    depsMap.set(key, deps)
  }
  deps.add(activeEffect)
}

/**
 * 触发依赖的函数
 */
export function trigger(target, key) {
  let depsMap = globalMap.get(target)
  let deps = depsMap.get(key)
  for (const effect of deps) {
    effect.run()
  }
}
