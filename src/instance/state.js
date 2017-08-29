import { observer } from '../observer/observer'
import { Watcher } from '../observer/watcher'
import { Compile } from '../compile'

let noop = function () {

}

export function initState(vm) {
  const opts = vm.$options
  
  if (opts.data) {
    initData(vm)
  } else {
    observer(vm._data = {})
  }
  //initProps
  initComputed(vm, opts.computed)
  
  new Compile(vm)
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