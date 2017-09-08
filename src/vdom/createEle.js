import { dom } from '../util/dom'

export function createEle (vNode) {
	let i, e
	if( !vNode.el && (i = vNode.text)) {
		e = vNode.el = dom.createTextNode(i)
		return vNode
	}
	if ( (i = vNode.tag) && vNode.el === null) {
		e = vNode.el = dom.createElement(i)
	}else if (vNode.el.nodeType === 1) {
		e = vNode.el
	}
	updateEle(e, vNode)
	return vNode
}

export function updateEle (e ,vNode, oldVNode) {
	// let i
	// if( (i = vNode.className).length > 0 ) dom.setClass(e, i)
	// if( (i = vNode.data) !== null ) dom.setAttrs(e, i)
	// if( (i = vNode.id) !== null ) dom.setId(e, i)
	// if( (i = vNode.children) !== null && !oldVNode) dom.appendChildren(e, i)
}
