import { initRender } from './render'
import { initState } from './state'


let uid = 0;
export function initMixin(MyVue) {
  
  MyVue.prototype._init = function(options) {
    let vm = this
    vm._uid = uid++
    vm.$options = options
  
    
    initState(vm)
    
    //自动挂载
    if (vm.$options.el) {
      vm.$mount(vm.$options.el)
    }
  }
  
  
}