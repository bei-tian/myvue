export function observer(data) {
  if (!data || typeof data != 'object') {
    return
  }
  
  const keys = Object.keys(data)
  keys.forEach(key => {
    let val = data[key]
    let child = val
    let updaterFn
    Object.defineProperty(data, key, {
      enumerable: true,
      configurable: false,
      get: function() {
        if (window.updaterFn) {
          updaterFn = window.updaterFn
        }
        return val
      },
      set: function(newVal) {
        val = newVal
        updaterFn(newVal);
      }
    })
    
    observer(child)
  })
}