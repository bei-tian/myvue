import {dom} from '../util/dom'

export function parse(template) {
  let el = dom.parseToDOM(template)
  return compile(el[0])
}


function compile(el) {
  
  return function render() {
    
    let children = compileElement(el, this)
    
    
    return this._c(el.tagName,{},children)
  }
}

function compileElement(node, vm) {
  let children = []
  node.childNodes.forEach(childNode => {
    if(childNode.nodeType === 3) { //文本节点
      compileText(childNode, vm, children)
    } else { //普通节点
      compileNode(childNode, vm, children)
    }
  })
  
  return children
}

function compileText(node, vm, children) {
  let reg = /\{\{(.*)\}\}/
  if (reg.test(node.textContent)) {
    let exp = RegExp.$1.trim()
    children.push(vm._c('text',{},vm[exp]))
  }
}

function compileNode(node, vm, children) {
  [].slice.call(node.attributes).forEach(attr => {
    if(attr.name.indexOf('v-') === 0) {
      let exp = attr.value //msg,sub.msg3
      let dir = attr.name.substring(2) //text,html,model
      
      if (dir === 'text') {
        children.push(vm._c(node.tagName,{},vm[exp]))
      }
      
      if (dir === 'html') {
        children.push(vm._c(node.tagName,{
          domProps:{
            innerHTML:vm[exp]
          }
        }, ''))
      }
    }
  })
  if(node.attributes.length === 0) {
    children.push(vm._c(node.tagName,{},compileElement(node, vm)))
  }
}

