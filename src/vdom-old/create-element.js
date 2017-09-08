import { VNode } from './vnode'

export function createElement(tag, props, children) {
  return new VNode(tag, props, children)
}