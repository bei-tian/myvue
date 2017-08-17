import { MyVue } from '../src/myvue';

window.data = {
  msg: 'hello',
  msg2: 'hello2',
}
new MyVue({
  el: '#app',
  data: data
});