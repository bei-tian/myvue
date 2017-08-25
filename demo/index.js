import MyVue from '../src/index';

MyVue.component('my-component', {
  el: '#app',
  data:{
    msg2:'hello2'
  },
  template: '<div>{{ msg2 }}</div>'
})

window.data = {
  msg: 'hello'
}

new MyVue({
  el: '#app',
  data: data,
  template: '<span><span> {{msg}} </span><my-component></my-component><span v-text="msg"></span></span>'
});

