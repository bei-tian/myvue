/*import Vue from 'vue'

window.vm = new Vue({
  data: {
    message: 'Hello Vue!'
  },
  render (h) {
    return h('div', [
      h('div', this.message),
      h('div', this.message)
    ])
  }
})
vm.$mount('#app')
 */


import MyVue from '../src/index';

MyVue.component('my-component', {
  props:['prop1'],
  el: '#app',
  data:{
    msg2:'hello2'
  },
  template: '<div>{{ prop1 }}</div>'
})

window.data = {
  msg: 'hello',
  msg2: 'world'
}

let vm = new MyVue({
  el: '#app',
  data: data,
  computed: {
    reversedMsg: function () {
      return this.msg.split('').reverse().join('')
    },
    concat: function () {
      return this.msg + this.msg2
    }
  },
  render(createElement) {
    return createElement('div',{} , [
      createElement('div',{}, this.msg),
      createElement('div',{}, this.msg),
      createElement('div',{}, this.msg),
      createElement('div',{
        attrs: {
          id: 'foo'
        },
        // DOM 属性
        domProps: {
          innerHTML: '<b>baz</b>'
        },
      })
    ])
  },
  template: '<span><span> {{msg}} </span><span v-text="msg2"></span><div v-text="reversedMsg"></div></span>'
});

console.log(vm)
