import { MyVue } from '../src/myvue';

window.data = {
  msg: 'hello'
}
MyVue.component('my-component', {
  el: '#app',
  data:{
    msg2:'hello2'
  },
  template: '<div>{{ msg2 }}</div>'
})

const app = new MyVue({
  data: data,
  template: '<span><span> {{msg}} </span><my-component></my-component><span v-text="msg"></span></span>'
});
app.$amount('#app')

