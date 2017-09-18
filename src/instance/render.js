import { createElement } from '../vdom/create-element'

export function initRender(vm) {
  vm._vnode = null
  
  vm._c = vm.$createElement = createElement

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