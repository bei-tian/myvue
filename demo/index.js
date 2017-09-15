/*import Vue from 'vue'

window.vm = new Vue({
  data: {
    message: 'Hello Vue!'
  },
  template: '<div>A custom component!</div>'
})
vm.$mount('#app')
console.log(vm)
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
  msg2: 'world',
  msg3: '<b>world</b>'
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
  // render(createElement) {
  //   return createElement('div',{} , [
  //     createElement('div',{}, this.msg),
  //     createElement('div',{}, this.msg),
  //     createElement('div',{}, this.msg),
  //     createElement('div',{
  //       attrs: {
  //         id: 'foo'
  //       },
  //       // DOM 属性
  //       domProps: {
  //         innerHTML: '<b>baz</b>'
  //       },
  //     })
  //   ])
  // },
  template: '<span><span> {{msg}} </span><span v-text="msg2"></span><div v-text="reversedMsg"></div><span v-html="msg3"></span></span>'
});

console.log(vm)
