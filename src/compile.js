import { Dep } from './dep'

export class Compile {
  constructor(el,vm) {
    this.$vm = vm;
    this.$el = this.isElementNode(el) ? el : document.querySelector(el);
  
    this.init();
  }
  
  init() {
    this.compile(this.$el);
  }
  
  //compile all el
  compile(el) {
    el.childNodes.forEach(childNode => {
      if (this.isTextNode(childNode)) {
        this.compileText(childNode)
      }
    
      if(this.isElementNode(childNode)) {
        this.compileElement(childNode)
      }
    
      this.compile(childNode)
    })
  }
  
  compileElement(node) {
    let attrs = node.attributes;
    [].slice.call(attrs).forEach(attr => {
      if(attr.name.indexOf('v-') == 0) {
        let exp = attr.value //msg,sub.msg3
        let dir = attr.name.substring(2) //text,html,model
        this.bind(node, this.$vm, exp ,dir);
      }
    })
  }
  
  compileText(node) {
    let reg = /\{\{(.*)\}\}/
    if (reg.test(node.textContent)) {
      let exp = RegExp.$1.trim()
      this.bind(node, this.$vm, exp ,'text');
    }
  }

  
  isTextNode(node) {
    return node.nodeType == 3
  }
  
  isElementNode(node) {
    return node.nodeType == 1
  }
  
  getVmVal(vm, exp) {
    let val = vm._data;
    exp.split('.').forEach(key => {
      val = val[key];
    })
    return val
  }
  
  
  bind(node, vm, exp, dir) {
    let updaterFn = updater[dir + 'Updater']
    Dep.updaterFn = function (value) {
      updaterFn(node , value)
    }
    this.getVmVal(vm, exp) //这里会触发setter
    Dep.updaterFn = null
  }
}




const updater = {
  textUpdater(node, value) {
    node.textContent = value
  },
  htmlUpdater(node, value) {
    node.innerHTML = value
  },
  modelUpdater(node, value) {
    node.value = value
  }
}


