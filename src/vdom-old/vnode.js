
export class VNode {
  tag;
  props;
  children;
  
  constructor(tag, props, children) {
    this.tag = tag
    this.props = props
    this.children = children
  }
  
  render() {
    let el = document.createElement(this.tag)
    let props = this.props
    for(let propName in props) {
      el.setAttribute(propName, props[propName])
    }
    
    let children = this.children || []
    children.map(function (child) {
      let childEl = (child instanceof VNode) ? child.render() : document.createTextNode(child);
      el.appendChild(childEl);
    })
    return el
  }
}