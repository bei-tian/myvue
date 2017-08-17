import { MyVue } from '../src/myvue';

window.data = {
  msg: 'hello',
}
new MyVue({
  el: '#app',
  data: data
});