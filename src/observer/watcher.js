import { Dep } from './dep'

export class Watcher {
  vm;
  expOrFn;
  cb;
  getter;
  value;
  constructor(vm, expOrFn, cb) {
    this.vm = vm
    this.expOrFn = expOrFn
    this.cb = cb
    
    if(typeof expOrFn === 'function') {
      this.getter = expOrFn
    } else {
      this.getter = this.parseGetter(expOrFn)
    }
    
    this.value = this.get()
    
  }
  
  update() {
    this.value = this.getter.call(this.vm, this.vm)
    this.cb(this.value)
  }
  
  get() {
    Dep.target = this
    //这里会触发vm相应变量的getter函数,将当前watcher注入到dep队列
    let value = this.getter.call(this.vm, this.vm);
    Dep.target = null;
    return value;
  }
  
  parseGetter(exp) {
    if (/[^\w.$]/.test(exp)) return;
    
    let exps = exp.split('.');
    
    return function(obj) {
      for (let i = 0, len = exps.length; i < len; i++) {
        if (!obj) return;
        obj = obj[exps[i]];
      }
      return obj;
    }
  }
  
  
}