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
    } else {
      this.text = children.toString()
    }
  }
  
  mount() {
    let el = document.createElement(this.tag)
    
    let children = this.children || []
    if(this.text === '') {
      children.map(function (child) {
        let childEl = child.mount()
        el.appendChild(childEl)
      })
    } else {
      let childEl = document.createTextNode(this.text)
      el.appendChild(childEl);
    }
    this.el = el
    
    return el
  }
}