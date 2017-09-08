import {VNode} from './vnode'

export function createElement(tag, data, children) {
  
  return new VNode(tag, data, children)
}
