/**
 * Virtual DOM patching algorithm based on Snabbdom by
 * Simon Friis Vindum (@paldepind)
 * Licensed under the MIT License
 * https://github.com/paldepind/snabbdom/blob/master/LICENSE
 *
 * modified by Yangjingzhuo
 *
 */
import { dom } from '../util/dom'
import { createEle, updateEle } from './createEle'

function sameVNode(oldVNode, vNode){
	return vNode.key === oldVNode.key && vNode.tag === oldVNode.tag
}
function createKeyToOldIdx (children, beginIdx, endIdx) {
    let i, map = {}, key, ch
    for (i = beginIdx; i <= endIdx; ++i) {
        ch = children[i]
        if (ch !== null) {
            key = ch.key
            if (key !== null)
                map[key] = i
        }
    }
    return map
}
function removeVNodes (parentElm, vNodes, startIdx, endIdx) {
        for ( ;startIdx <= endIdx; ++startIdx) {
            let ch = vNodes[startIdx]
            if (ch !== null) {
                    dom.removeChild(parentElm, ch.el)
            }
        }
    }
function addVNodes (parentElm, before, vNodes, startIdx, endIdx) {
        for ( ;startIdx <= endIdx; ++startIdx) {
            let ch = vNodes[startIdx]
            if (ch !== null) {
                dom.insertBefore(parentElm, createEle(ch).el, before)
            }
        }
    }    
function patchVNode (oldVNode, vNode) {
	const el = vNode.el = oldVNode.el
  let i, oldCh = oldVNode.children, ch = vNode.children
  if (oldVNode === vNode) return
  if (oldVNode.text !== null && vNode.text !== null && oldVNode.text !== vNode.text) {
    
    dom.setTextContent(el, vNode.text)
  }else {
      updateEle(el, vNode, oldVNode)
    if (oldCh && ch && oldCh !== ch) {
      updateChildren(el, oldCh, ch)
    }else if (ch){
      createEle(vNode) //create el's children dom
    }else if (oldCh){
      dom.removeChildren(el)
    }
  }
}

function updateChildren (parentElm, oldCh, newCh) {
	let oldStartIdx = 0, newStartIdx = 0
    let oldEndIdx = oldCh.length - 1
    let oldStartVNode = oldCh[0]
    let oldEndVNode = oldCh[oldEndIdx]
    let newEndIdx = newCh.length - 1
    let newStartVNode = newCh[0]
    let newEndVNode = newCh[newEndIdx]
    let oldKeyToIdx
    let idxInOld
    let elmToMove
    let before
    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
            if (oldStartVNode === null) {
                oldStartVNode = oldCh[++oldStartIdx] // VNode might have been moved left
            }else if (oldEndVNode === null) {
                oldEndVNode = oldCh[--oldEndIdx]
            }else if (newStartVNode === null) {
                newStartVNode = newCh[++newStartIdx]
            }else if (newEndVNode === null) {
                newEndVNode = newCh[--newEndIdx]
            }else if (sameVNode(oldStartVNode, newStartVNode)) {
                patchVNode(oldStartVNode, newStartVNode)
                oldStartVNode = oldCh[++oldStartIdx]
                newStartVNode = newCh[++newStartIdx]
            }else if (sameVNode(oldEndVNode, newEndVNode)) {
                patchVNode(oldEndVNode, newEndVNode)
                oldEndVNode = oldCh[--oldEndIdx]
                newEndVNode = newCh[--newEndIdx]
            }else if (sameVNode(oldStartVNode, newEndVNode)) {
                patchVNode(oldStartVNode, newEndVNode)
                dom.insertBefore(parentElm, oldStartVNode.el, dom.nextSibling(oldEndVNode.el))
                oldStartVNode = oldCh[++oldStartIdx]
                newEndVNode = newCh[--newEndIdx]
            }else if (sameVNode(oldEndVNode, newStartVNode)) {
                patchVNode(oldEndVNode, newStartVNode)
                dom.insertBefore(parentElm, oldEndVNode.el, oldStartVNode.el)
                oldEndVNode = oldCh[--oldEndIdx]
                newStartVNode = newCh[++newStartIdx]
            }else {
                if (oldKeyToIdx === undefined) {
                    oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx)
                }
                idxInOld = oldKeyToIdx[newStartVNode.key]
                if (!idxInOld) {
                    dom.insertBefore(parentElm, createEle(newStartVNode).el, oldStartVNode.el)
                    newStartVNode = newCh[++newStartIdx]
                } else {
                    elmToMove = oldCh[idxInOld]
                    if (elmToMove.tag !== newStartVNode.tag) {
                        dom.insertBefore(parentElm, createEle(newStartVNode).el, oldStartVNode.el)
                    }else {
                        patchVNode(elmToMove, newStartVNode)
                        oldCh[idxInOld] = null
                        dom.insertBefore(parentElm, elmToMove.el, oldStartVNode.el)
                    }
                    newStartVNode = newCh[++newStartIdx]
                }
            }
        }
        if (oldStartIdx > oldEndIdx) {
            before = newCh[newEndIdx + 1] ? newCh[newEndIdx + 1].el : null
            addVNodes(parentElm, before, newCh, newStartIdx, newEndIdx)
        }else if (newStartIdx > newEndIdx) {
            removeVNodes(parentElm, oldCh, oldStartIdx, oldEndIdx)
        }
}

export function patch (oldVNode, vNode) {
  if (oldVNode.nodeType) { //第一次挂载dom
    createEle(vNode)
    oldVNode.appendChild(vNode.el)
    return vNode.el
  }
	if (sameVNode(oldVNode, vNode)) {
		patchVNode(oldVNode, vNode)
	} else {
		const oEl = oldVNode.el
		let parentEle = dom.parentNode(oEl)
		createEle(vNode)
		if (parentEle !== null) {
			dom.insertBefore(parentEle, vNode.el, dom.nextSibling(oEl))
			dom.removeChild(parentEle, oldVNode.el)
			oldVNode = null
		}
	}
	return vNode.el
}
