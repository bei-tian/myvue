export class Dep {
  sub = []
  
  append(watcher) {
    this.sub.push(watcher)
  }
  notify(value) {
    this.sub.map(watcher => {
      watcher.update(value)
    })
  }
}