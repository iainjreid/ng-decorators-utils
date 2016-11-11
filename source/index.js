'use strict'

export function Inject (...injectables) {
  return function (target) {
    return class extends target {
      constructor (...deps) {
        super(...deps)

        let i = 0
        for (let dep of deps) {
          this[injectables[i++]] = dep
        }
      }

      static get $inject () {
        return injectables
      }
    }
  }
}

export function Memoize (alias) {
  return (target, name) => {
    const fn = target[name]

    target[name] = function () {
      const call = fn.apply(this, arguments)

      if (!(call instanceof Promise)) {
        target[`$${alias}`] = call
      }

      return !(call instanceof Promise) ? assign(target, alias, call) : call.then(data => assign(target, alias, data))
    }

    target[alias] = () => target[`$${alias}`]

    return target
  }

  function assign (target, alias, data) {
    // Attempt to update the value by shallow reference, otherwise assign by value
    if (target[`$${alias}`] instanceof Array && data instanceof Array) {
      for (let i = 0, n = Math.max(target[`$${alias}`].length, data.length); i < n; i++) {
        if (data[i]) {
          target[`$${alias}`][i] = data[i]
        } else {
          target[`$${alias}`].splice(i, 1)
        }
      }
    } else if (target[`$${alias}`] instanceof Object && data instanceof Object) {
      for (let key in data) {
        if (data.hasOwnProperty(key)) {
          target[`$${alias}`][key] = data[key]
        }
      }

      for (let key in target[`$${alias}`]) {
        if (target[`$${alias}`].hasOwnProperty(key) && !data.hasOwnProperty(key)) {
          delete target[`$${alias}`][key]
        }
      }
    } else {
      target[`$${alias}`] = data
    }

    return data
  }
}

export function EventEmitter (...subjects) {
  const evts = {}

  for (let subject of subjects) {
    evts[subject] = []
  }

  return target => {
    return class extends target {
      on (subject, fn) {
        for (let subject of subject.split('|')) {
          evts[subject].push(fn)
        }

        // Return a function to allow event unsubscription
        return () => {
          for (let subject of subject.split('|')) {
            for (let i = 0, n = evts[subject].length; i < n; i++) {
              if (evts[subject][i] === fn) {
                evts[subject].splice(i, 1)
                break
              }
            }
          }
        }
      }

      when (subject, fn) {
        const unsubscribe = this.on(subject, (...args) => {
          fn(...args)
          unsubscribe()
        })

        // Return a function to preemptively remove the function from the queue
        return unsubscribe
      }

      emit (subject, ...args) {
        let i = 0
        let n = evts[subject].length

        // Execute each of the available listeners
        while (i < n) {
          evts[subject][i++](...args)
        }
      }
    }
  }
}
