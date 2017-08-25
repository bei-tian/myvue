import { MyVue } from './myvue'
import { Watcher } from './watcher'

export class Compile {
  constructor(vm) {
    this.$vm = vm;
    this.$el = this.parseToDOM(vm.$options.template)[0]
    this.$fragment = this.node2Fragment(this.$el)
    this.init();
    this.$el.appendChild(this.$fragment)
    vm.$el = this.$el;
  }
  
  init() {
    this.compile(this.$fragment);
  }
  
  node2Fragment(el) {
    let fragment = document.createDocumentFragment(),
      child;
    
    // 将原生节点拷贝到fragment
    while (child = el.firstChild) {
      fragment.appendChild(child);
    }
    return fragment;
  }
  //compile all el
  compile(el) {
    el.childNodes.forEach(childNode => {
      if (this.isTextNode(childNode)) {
        this.compileText(childNode)
      }
    
      if(this.isElementNode(childNode)) {
        
        //处理组件
        let parent = childNode.parentNode
        let tagName = childNode.tagName.toLowerCase()
        let MyVueComponent = MyVue.queueComponent[tagName]
        if (MyVueComponent) {
          let sub = new MyVueComponent()
          parent.replaceChild(sub.$el,childNode)
        } else {
          this.compileElement(childNode)
        }
      }
    
      this.compile(childNode) //递归子节点
    })
  }
  
  compileElement(node) {
    let attrs = node.attributes;
    [].slice.call(attrs).forEach(attr => {
      if(attr.name.indexOf('v-') == 0) {
        let exp = attr.value //msg,sub.msg3
        let dir = attr.name.substring(2) //text,html,model
        this.bind(node, this.$vm, exp ,dir);
        node.removeAttribute(attr.name);
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
    
    new Watcher(vm, function (value) {
      updaterFn(node , value)
    })
    updaterFn(node , this.getVmVal(vm, exp)) //初始化原始数据，并触发setter
  }
  
  
  parseToDOM(str){
  var div = document.createElement("div");
  if(typeof str === "string")
    div.innerHTML = str;
  return div.childNodes;
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


