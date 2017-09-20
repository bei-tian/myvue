import { createElement } from '../vdom/create-element'
import { parse } from '../compile/parse'

export function initRender(vm) {
  vm._vnode = null
  
  vm._c = vm.$createElement = createElement
  
  let option = vm.$options
  if (!option.render) {
    option.render = parse(option.template)
  }
}

export function renderMixin(MyVue) {
  MyVue.prototype._render = function() {
    let vm = this
    let render = vm.$options.render
    let vNode = null
    if (render) {
      vNode = render.call(vm, createElement)
    }
    
    return vNode
  }
}