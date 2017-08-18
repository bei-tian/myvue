import { Dep } from './dep'
export function observer(data) {
  if (!data || typeof data != 'object') {
    return
  }
  
  const keys = Object.keys(data)
  keys.forEach(key => {
    let val = data[key]
    let child = val
    let dep = new Dep();
    Object.defineProperty(data, key, {
      enumerable: true,
      configurable: false,
      get: function() {
        if (Dep.updaterFn) {
          dep.append(Dep.updaterFn)
        }
        return val
      },
      set: function(newVal) {
        val = newVal
        dep.notify(newVal)
      }
    })
    
    observer(child)
  })
}