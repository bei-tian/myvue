import {VNode} from './vnode'
import MyVue from '../instance/index'

export function createElement(tag, data, children) {
  let MyVueComponent = MyVue.queueComponent[tag.toLowerCase()]
  if (MyVueComponent) {
    fetchPropData(MyVueComponent._options, data)  //缓存子组件的prop值
    let sub = new MyVueComponent()
    return sub._vnode
  } else {
    return new VNode(tag, data, children)
  }
}


function fetchPropData(options, data) {
  let prop = {}
  let attrs = data.attrs;
  for(let key in attrs) {
    prop[key] = attrs[key]
  }
  options._props = prop
}