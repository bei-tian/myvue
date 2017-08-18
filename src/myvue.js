import { observer } from './observer'
import { compile } from './compile'

export function MyVue(options) {
  let data = options.data
  let node = document.querySelector(options.el)
  
  observer(data)
  compile(node, data)
}

