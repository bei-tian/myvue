import { MyVue } from '../src/myvue';

window.data = {
  msg: 'hello',
  msg2: 'hello2',
  sub: {
    msg3: 'hello3'
  }
}

new MyVue({
  el: '#app',
  data: data
});