import { currentInstance, setCurrentInstance } from "./component"

const enum LifeCycleHooks {
  BEFORE_MOUNT = 'bm',
  MOUNTED = 'm',
  BEFORE_UPDATE = 'bu',
  UPDATED = 'u'
}

const injectHook = (type, hook, target) => {
  if (!target) {
    return console.warn('hook 无法注入到实例里面');
  } else {
    const hooks = target[type] || (target[type] = []);
    const wrap = () => {
      setCurrentInstance(target);
      hook.call(target);
      setCurrentInstance(null);
    }
    hooks.push(wrap);
  }
}

const createHook = (lifecycle) => (hook, target = currentInstance) => {
  // 给当前实例增加对应的生命周期, 在函数中保存实例
  injectHook(lifecycle, hook, target);
}

export const invokeArrayFns = (fns) => {
  for (let i = 0; i < fns.length; i++) {
    fns[i]()
  }
}

export const onBeforeMount = createHook(LifeCycleHooks.BEFORE_MOUNT)
export const onMounted = createHook(LifeCycleHooks.MOUNTED)
export const onBeforeUpdate = createHook(LifeCycleHooks.BEFORE_UPDATE)
export const onUpdated = createHook(LifeCycleHooks.UPDATED)