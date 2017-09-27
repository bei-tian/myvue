import {  isArray, isObject } from './is'
import { createEle } from '../vdom/createEle'
import { VNode } from '../vdom/vnode'

let dom = {

  createElement(tag) {
    return document.createElement(tag)
  },
  
  createTextNode(txt) {
    return document.createTextNode(txt)
  },
  
  appendChild(parent, child) {
    return parent.appendChild(child)
  },
  
  parentNode(node) {
    return node.parentNode
  },
  
  insertBefore(parent, newNode, rf) {
    return parent.insertBefore(newNode, rf)
  },
  
  nextSibling(el) {
    return el.nextSibling
  },
  
  removeChild(parent, rc) {
    return parent.removeChild(rc)
  },
  
  setTextContent(ele, txt) {
    ele.textContent = txt
  },
  
  setId(ele, id) {
    ele.id = id
  },
  
  removeChildren(ele) {
    let ch = ele.childNodes
    while(ch[0]) {
      this.removeChild(ele, ch[0])
    }
  },

  defineProperty(obj, prop, descriptor) {
    Object.defineProperty(obj, prop, descriptor)
  },
  appendChildren(ele, children) {
    if(ele && isArray(children)) {
      for(let i = 0; i < children.length; i++) {
        let c
        if (children[i] instanceof VNode) {
          c = children[i].el || createEle(children[i]).el
        }
        this.appendChild(ele, c)
      }
    }
  },
  setClass(ele, c) {
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
  },
  setAttrs(ele, a) {
    if(ele && isObject(a)) {
      for(let k in a) {
        if (k === 'class') continue
        let s = a[k]
        if (k === 'style' && isObject(s)) {
          for(let j in s) {
            ele.style[j] = s[j]
          }
        }else {
          ele.setAttribute(k, s)
        }
      }
    }
  },
  
  addEvent(el, obj) {
    if(el && isObject(obj)) {
      for(let k in obj) {
        el.addEventListener(k, obj[k])
      }
    }
  },
  
  parseToDOM(str){
    var div = document.createElement("div");
    if(typeof str === "string")
      div.innerHTML = str;
    return div.childNodes;
  }
}
export { dom }












