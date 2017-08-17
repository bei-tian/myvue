import { compile } from './compile'

export function MyVue(options) {
  let data = options.data
  Object.defineProperty(data, 'msg', {
    enumerable: true,
    configurable: false,
    get: function() {
      return this._val
    },
    set: function(newVal) {
      this._val = newVal
      
      let node = document.querySelector(options.el)
      compile(node,data)
    }
  })
}

