import {VNode} from './vnode'
import MyVue from '../instance/index'

export function createElement(tag, data, children) {
  let vNode
  let MyVueComponent = MyVue.queueComponent[tag.toLowerCase()]
  if (MyVueComponent) {
    vNode = createComponent(MyVueComponent, data)
  } else {
    vNode = new VNode(tag, data, children)
  }
  
  return vNode
}



function createComponent(Component, data) {
  fetchPropData(Component._options, data)  //缓存子组件的prop值
  let sub = new Component()
  
  return sub._render()
}

function fetchPropData(options, data) {
  let prop = {}
  let attrs = data.attrs;
  for(let key in attrs) {
    prop[key] = attrs[key]
  }
  options._props = prop
}