import { observer } from './observer'
import { Compile } from './compile'

export class MyVue {
  constructor(options) {
    this._init(options)
  }
  
  _init(options) {
    let vm = this
    let data = options.data
  
    vm._data = options.data
    vm.$options = options

    observer(data)
    new Compile(vm)
  }
  
  
  $amount(el) {
    document.querySelector(el).appendChild(this.$el);
  }
  
}

MyVue.extend = function (options) {
  let Sub = function MyVueComponent() {
    this._init(options)
  }
  Sub.prototype = Object.create(MyVue.prototype)
  Sub.prototype.constructor = Sub
  
  return Sub
}

MyVue.component = function (name, component) {
  if (typeof component == 'object') {
    component = MyVue.extend(component)
  }
  if (this.queueComponent == undefined) {
    this.queueComponent = {}
  }
  this.queueComponent[name] = component
}