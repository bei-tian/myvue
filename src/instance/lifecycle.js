import { Watcher } from '../observer/watcher'
import { patch } from '../vdom/patch'
import { parse } from '../compile/parse'

export function lifecycleMixin(MyVue) {
  MyVue.prototype.$mount = function(el) {
    let vm = this
    
    let option = vm.$options
    if (!option.render) {
      option.render = parse(option.template)
    }
    
    vm.$el = document.querySelector(el)
    //mountComponent
    return mountComponent(vm)
  }
  

  
  MyVue.prototype._update = function(vNode) {
    let vm = this
    
    const prevVNode = vm._vnode
    vm._vnode = vNode
  
    if (!prevVNode) {
      // initial render 初始挂载dom
      vm.$el = patch(vm.$el, vNode)
    } else {
      // updates
      vm.$el = patch(prevVNode, vNode)
    }
    console.log(vNode)
  }
}


function mountComponent(vm) {

  let updateComponent = () => {
    vm._update(vm._render())
  }
  vm._watcher = new Watcher(vm, updateComponent, function () {})
  
  return vm
}