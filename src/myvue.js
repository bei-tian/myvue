import { observer } from './observer'
import { Compile } from './compile'

let uid = 0;
export class MyVue {
  constructor(options) {
    this._init(options)
  }
  
  _init(options) {
    let vm = this
    vm._uid = uid++
    let data = options.data
  
    vm._data = options.data
    vm.$options = options

    observer(data)
    new Compile(vm)

    //根节点自动挂载
    if (vm._uid === 0) {
      vm.$amount(options.el)
    }
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