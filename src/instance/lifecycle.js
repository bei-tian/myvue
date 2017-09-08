import { Compile } from '../compile'
import { Watcher } from '../observer/watcher'
import { createElement } from '../vdom/create-element'
import { patch } from '../vdom/patch'

export function lifecycleMixin(MyVue) {
  MyVue.prototype.$mount = function(el) {
    let vm = this
    
    if(!vm._vnode) {
      vm._vnode = vm._render()
    }
    vm.$el = vm._vnode.mount()
    document.querySelector(el).appendChild(vm.$el)
    
    //mountComponent
    mountComponent(vm)
  }
  

  
  MyVue.prototype._update = function(vNode) {
    let vm = this
    
    let oldVNode = vm._vnode
    

    
    patch(oldVNode, vNode)
    console.log(vNode)
  }
  
  
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


function mountComponent(vm) {
  
  
  let updateComponent = () => {
    vm._update(vm._render())
  }
  vm._watcher = new Watcher(vm, updateComponent, function () {})
}