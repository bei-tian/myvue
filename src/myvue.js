import { compile } from './compile'

export function MyVue(options) {
  let data = options.data
  let node = document.querySelector(options.el)
  const keys = Object.keys(data)
  keys.forEach(key => {
    let val = data[key]
    Object.defineProperty(data, key, {
      enumerable: true,
      configurable: false,
      get: function() {
        return val
      },
      set: function(newVal) {
        val = newVal
        
        compile(node,data)
      }
    })
  })
  
}

