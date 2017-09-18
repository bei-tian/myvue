import {dom} from '../util/dom'

export function generate(template) {
  let el = dom.parseToDOM(template)[0]
  
  let children = compileElement(el)
  
  return `_c('${el.tagName}',{}, ${children})`
}



function compileElement(node) {
  let children = '['
  node.childNodes.forEach(childNode => {
    if(childNode.nodeType === 3) { //文本节点
      children = compileText(childNode, children)
    } else { //普通节点
      children = compileNode(childNode, children)
    }
  })
  children = children + ']'
  return children
}

function compileText(node, children) {
  let reg = /\{\{(.*)\}\}/
  if (reg.test(node.textContent)) {
    let exp = RegExp.$1.trim()
    children = children + `_c('text',{}, ${exp}),`
  }
  return children
}

function compileNode(node, children) {
  [].slice.call(node.attributes).forEach(attr => {
    if(attr.name.indexOf('v-') === 0) {
      let exp = attr.value //msg,sub.msg3
      let dir = attr.name.substring(2) //text,html,model
      
      if (dir === 'text') {
        children = children + `_c('${node.tagName}',{}, ${exp}),`
      }
      
      if (dir === 'html') {
        children = children + `_c('${node.tagName}',{domProps:{innerHTML:${exp}}}, ''),`
      }
    }
  })
  if(node.attributes.length === 0) {
    children = children + `_c('${node.tagName}',{}, `+ compileElement(node) +`),`
  }
  return children
}

