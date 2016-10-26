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
