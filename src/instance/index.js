import { initMixin } from './init'
import { lifecycleMixin } from './lifecycle'

class MyVue {
  constructor(options) {
    this._init(options)
  }
  
}

lifecycleMixin(MyVue)

//添加 _init 函数，并在_init中初始化Lifecycle，Events，Render，State等相关的操作
initMixin(MyVue)

export default MyVue