import { dom } from '../util/dom'

export function createEle (vNode) {

	if(!vNode.el) {
	  if(vNode.text) {
      vNode.el = dom.createTextNode(vNode.text)
      return vNode
    }
    if(vNode.tag) {
      vNode.el = dom.createElement(vNode.tag)
    }
	}
 
	updateEle(vNode.el, vNode)
	return vNode
}

export function updateEle (e ,vNode, oldVNode) {
	if(vNode.data.attrs) {
	  dom.setAttrs(e, vNode.data.attrs)
  }
  
	if(vNode.children && !oldVNode) {
	  dom.appendChildren(e, vNode.children)
  }
  
  if(vNode.data.domProps) {
	  let props = vNode.data.domProps
    for(let prop in props) {
      e[prop] = props[prop]
    }
  }
}
