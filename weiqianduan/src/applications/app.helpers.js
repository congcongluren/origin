// 描述应用整个状态
export const NOT_LOADED = 'NOT_LOADED'; // 应用初始状态
export const LOADING_SOURCE_CODE = 'LOADING_SOURCE_CODE'; // 加载资源
export const NOT_BOOTSTRAPPED = 'NOT_BOOTSTRAPPED'; // 还没有调用bootstrap方法
export const BOOTSTRAPPING = 'BOOTSTRAPPING'; // 启动中
export const NOT_MOUNTED = 'NOT_MOUNTED'; // 没有调用mount方法
export const MOUNTING = 'MOUNTING'; // 正在挂载中
export const MOUNTED = 'MOUNTED'; // 挂载完毕
export const UPDATING = 'UPDATING'; // 更新中
export const UNMOUNTING = 'UNMOUNTING'; // 解除挂载
export const UNLOADING = 'UNLOADING'; // 完全卸载中
export const LOAD_ERR = 'LOAD_ERR'; // 加载失败
export const SKIP_BECAUSE_BROKEN = 'SKIP_BECAUSE_BROKEN'; // 代码异常

// 当前应用是否被激活
export function isActive(app) {
  return app.status === MOUNTED
}

// 当前应用是否需要被激活
export function shouldBeActive(app) {
  // 返回true，应用开始初始化一系列操作
  return app.activeWen(window.location)
}