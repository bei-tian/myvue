import { observer } from './observer'
import { Compile } from './compile'

export function MyVue(options) {
  let vm = this
  let data = options.data
  
  vm._data = options.data
  
  observer(data)
  new Compile(options.el, vm)
}

