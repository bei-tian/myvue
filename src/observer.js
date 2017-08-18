import { compile } from './compile'

export function observer(data,node) {
  if (!data || typeof data != 'object') {
    return
  }
  
  const keys = Object.keys(data)
  keys.forEach(key => {
    let val = data[key]
    let child = val
    Object.defineProperty(data, key, {
      enumerable: true,
      configurable: false,
      get: function() {
        return val
      },
      set: function(newVal) {
        val = newVal
        
        compile(node, window.data)
      }
    })
    
    observer(child, node)
  })
}