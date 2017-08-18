import { observer } from './observer'

export function MyVue(options) {
  let data = options.data
  let node = document.querySelector(options.el)
  
  observer(data,node)
  
}

