import {isString, isArray} from '../util/is'
export class VNode {
  tag = ''
  data = {}
  children = []
  text = ''
  parent = null
  el = null
  key = ''
  
  constructor(tag, data, children) {
    this.tag = tag
    this.data = data
    
    if(isArray(children)) {
      this.children = children
    } else if(tag === 'text') {
      this.text = children
    } else if(isString(children)){
      let child = new VNode('text', {}, null)
      child.text = children
      this.children = [child]
    }
  }
}