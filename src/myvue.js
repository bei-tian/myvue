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
      //更新dom
      let node = document.querySelector(options.el)
      var reg = /\{\{(.*)\}\}/
      if (reg.test(node.textContent)) {
        let exp = RegExp.$1.trim() //msg
        node.textContent = data[exp]
      }
    }
  })
}
