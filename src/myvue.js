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

function compile(node,data) {
  //循环处理每个子节点
  node.childNodes.forEach(childNode => {
    let isTextNode = (childNode.nodeType == 3) //判断是否文本节点
    let reg = /\{\{(.*)\}\}/
    if (isTextNode && reg.test(childNode.textContent)) {
      let exp = RegExp.$1.trim()
      childNode.textContent = data[exp]
    }
    
    compile(childNode,data)
  })
}
