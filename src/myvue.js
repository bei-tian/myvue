import { observer } from './observer'
import { Compile } from './compile'

export class MyVue {
  constructor(options) {
    let vm = this
    let data = options.data
  
    vm._data = options.data
    vm.$options = options
  
    observer(data)
    new Compile(options.el, vm)
  }
  
}

