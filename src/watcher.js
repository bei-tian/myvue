import { Dep } from './dep'

export class Watcher {
  constructor(vm,cb) {
    this.vm = vm
    this.cb = cb
    
    Dep.target = this
  }
  
  update(newVal) {
    this.cb(newVal);
  }
  
  
}