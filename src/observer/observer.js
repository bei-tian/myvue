import { Dep } from './dep'
export function observer(data) {
  if (!data || typeof data != 'object') {
    return
  }
  
  const keys = Object.keys(data)
  keys.forEach(key => {
    let val = data[key]
    observer(val)
    defineReactive(data, key ,val)
  })
}

export function defineReactive(data, key, value) {
  let val = value
  let dep = new Dep()
  Object.defineProperty(data, key, {
    enumerable: true,
    configurable: false,
    get: function() {
      if (Dep.target) {
        dep.append(Dep.target)
      }
      return val
    },
    set: function(newVal) {
      val = newVal
      dep.notify(newVal)
    }
  })
}