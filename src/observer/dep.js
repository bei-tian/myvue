export class Dep {
  sub = []
  
  append(watcher) {
    if(this.sub.indexOf(watcher) === -1) {
      this.sub.push(watcher)
    }
    
  }
  notify(value) {
    this.sub.map(watcher => {
      watcher.update(value)
    })
  }
}