export function initExtend(MyVue) {
  MyVue.extend = function (options) {
    let Sub = function MyVueComponent() {
      this._init(options)
    }
    Sub.prototype = Object.create(MyVue.prototype)
    Sub.prototype.constructor = Sub
    
    return Sub
  }
  
  MyVue.component = function (name, component) {
    if (typeof component === 'object') {
      component = MyVue.extend(component)
    }
    if (this.queueComponent === undefined) {
      this.queueComponent = {}
    }
    this.queueComponent[name] = component
  }
}
