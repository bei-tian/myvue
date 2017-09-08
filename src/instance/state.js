import { observer, defineReactive } from '../observer/observer'
import { Watcher } from '../observer/watcher'

import { Dep } from '../observer/dep'

let noop = function () {

}

export function initState(vm) {
  const opts = vm.$options
  if(opts.props) initProps(vm, opts.props)
  if (opts.data) {
    initData(vm)
  } else {
    observer(vm._data = {})
  }
  //initProps
  initComputed(vm, opts.computed)
  
  
}

function initProps(vm, propsOptions) {
  const props = vm._props = vm.$options._props
  for (let key in propsOptions) {
    let prop = propsOptions[key]
    const value = props[prop]
    defineReactive(props, prop, value)
  
    if (!(key in vm)) {
      proxy(vm, `_props`, prop)
    }
  }
}


function initData(vm) {
  let data = vm._data = vm.$options.data
  
  observer(data)
  
  const keys = Object.keys(data)
  keys.forEach(key => {
    proxy(vm, '_data', key)
  })
}

function initComputed(vm, computed) {
  for (let key in computed) {
    let userDef = computed[key]
    let watcher = new Watcher(vm, userDef, noop)
    
    //把computed属性代理到vm上
    if (!(key in vm)) {
      Object.defineProperty(vm, key, {
        enumerable: true,
        configurable: false,
        get: function() {
          if (Dep.target) {
            //编译计算属性模板指令时，通过这个函数来触发data的getter，
            // 进而将模板指令的watcher加入到data属性对应的dep队列中
            watcher.getter.call(vm, vm);
          }
          return watcher.value
        },
        set: noop
      })
    }
  }
}

//将data数据代理到vm
function proxy(vm, sourceKey, key) {
  let data = vm[sourceKey]
  Object.defineProperty(vm, key, {
    configurable: false,
    enumerable: true,
    get: function proxyGetter() {
      return data[key];
    },
    set: function proxySetter(newVal) {
      vm[sourceKey][key] = newVal;
    }
  });
  
}