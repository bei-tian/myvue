const updater = {
  textUpdater(node, value) {
    node.textContent = value
  },
  htmlUpdater(node, value) {
    node.innerHTML = value
  },
  modelUpdater(node, value) {
    node.value = value
  }
}

export function compile(node,data) {
  node.childNodes.forEach(childNode => {
    let isTextNode = (childNode.nodeType == 3) //判断是否文本节点
    let isElementNode = (childNode.nodeType == 1) //判断是否element节点
    if (isTextNode) {
      let reg = /\{\{(.*)\}\}/
      if (reg.test(childNode.textContent)) {
        let exp = RegExp.$1.trim()
        updater.textUpdater(childNode, data[exp])
      }
    }
    
    if(isElementNode) {
      compileElement(childNode, data)
    }
    
    compile(childNode,data)
  })
}

//希望把这里的updater[dir+'Updater'](node , value) 放到setter中去执行
function compileElement(node, data) {
  let attrs = node.attributes;
  [].slice.call(attrs).forEach(attr => {
    if(attr.name.indexOf('v-') == 0) {
      let exp = attr.value //msg,sub.msg3
      let dir = attr.name.substring(2) //text,html,model
      window.updaterFn = function (value) {
        updater[dir+'Updater'](node , value)
      }
      getDataVal(data, exp) //这里会触发setter
      window.updaterFn = null
    }
  })
}

function getDataVal(data, exp) {
  let val = data
  exp.split('.').forEach(key => {
    val = val[key];
  })
  return val
}

