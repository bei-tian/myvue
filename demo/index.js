import { MyVue } from '../src/myvue';

MyVue.component('my-component', {
  el: '#app',
  data:{
    msg2:'hello2'
  },
  template: '<div>{{ msg2 }}</div>'
})

new MyVue({
  el: '#app',
  data: {
    msg: 'hello'
  },
  template: '<span><span> {{msg}} </span><my-component></my-component><span v-text="msg"></span></span>'
});

