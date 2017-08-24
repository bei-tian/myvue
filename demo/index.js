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
new MyVue({
  el: '#app',
  data: data,
  template: '<span><span> {{msg}} </span><my-component></my-component><span>{{msg}} </span></span>'
});


