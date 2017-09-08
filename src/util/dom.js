import {  isArray, isObject } from './is'
import { createEle } from '../vdom/createEle'
import { VNode } from '../vdom/vnode'

let dom = {}
dom.createElement = function (tag) {
  return document.createElement(tag)
}
dom.createTextNode = function (txt) {
  return document.createTextNode(txt)
}
dom.appendChild = function (parent, child) {
  return parent.appendChild(child)
}
dom.parentNode = function (node) {
  return node.parentNode
}
dom.insertBefore = function (parent, newNode, rf) {
  return parent.insertBefore(newNode, rf)
}
dom.nextSibling = function (el) {
  return el.nextSibling
}
dom.removeChild = function (parent, rc) {
  return parent.removeChild(rc)
}
dom.setTextContent = function (ele, txt) {
  ele.textContent = txt
}
dom.setId = function (ele, id) {
  ele.id = id
}

dom.removeChildren = function (ele) {
  let ch = ele.childNodes
  while(ch[0]) {
    this.removeChild(ele, ch[0])
  }
}

dom.defineProperty = function (obj, prop, descriptor) {
  Object.defineProperty(obj, prop, descriptor)
}
dom.appendChildren = function (ele, children) {
  if(ele && isArray(children)) {
    for(let i = 0; i < children.length; i++) {
      let c
      if (children[i] instanceof VNode) {
        c = children[i].el || createEle(children[i]).el
      }
      this.appendChild(ele, c)
    }
  }
}
dom.setClass = function (ele, c) {
  if(ele && isArray(c)) {
    let k = ''
    for(let i = 0; i < c.length; i++) {
      //ele.classList.add(c[i])
      if(i !== c.length-1){
        k += c[i] + ' '
      }else{
        k += c[i]
      }
    }
    ele.className = k
  }
}
dom.setAttrs = function (ele, a) {
  if(ele && isObject(a)) {
    for(let k in a) {
      if (k === 'class') continue
      let s = a[k]
      if (k === 'style' && isObject(s)) {
        for(let j in s) {
          ele.style[j] = s[j]
        }
      }else {
        ele[k] = s
      }
    }
  }
}

export { dom }












