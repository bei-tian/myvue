export class Dep {
  sub = []
  
  append(fn) {
    this.sub.push(fn)
  }
  notify(value) {
    this.sub.map(fn => {
      fn(value);
    })
  }
}