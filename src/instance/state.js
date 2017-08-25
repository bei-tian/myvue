import { observer } from '../observer'
import { Compile } from '../compile'


export function initState(vm) {
  const opts = vm.$options
  
  if (opts.data) {
    initData(vm)
  } else {
    observer(vm._data = {})
  }
  //initProps
  //initComputer
  
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