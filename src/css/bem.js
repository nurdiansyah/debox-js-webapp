/* eslint-disable no-console */
// @flow

const isDev = process.env.NODE_ENV !== 'production'

type CssModuleType = {_insertCss?: Function, [key: string]: string}

export type ElementType = null | string | Object

export type ModsType = {
  [string]: boolean | string | number
}

export type StatesType = {
  [string]: boolean
}

export type Options = {|
  throwOnError?: boolean,
  ignoreError?: boolean,
  suppressWarning?: boolean
|}

/*
 Format bem <block>__<element>--<modifierKey>[_<modValue>] is_<states>
*/
class Bem {
  static regExpClearBEM = /__.*/g
  cssModule: CssModuleType
  settings: Options = {throwOnError: false, suppressWarning: true}

  constructor(cssModule: CssModuleType, settings?: Options) {
    this.cssModule = cssModule
    settings && this.setSettings(settings)
  }
  /**
   * Base function for bem naming with css modules
   * @param {Object} cssModule. Imported css module
   * @param {String} name. BEM name
   * @param {String} [element]
   * @param {Object} [mods]
   * @param {Object} [states]
   * @return {String}
   */
  block(name?: string = this.extractModuleName()) {
    return {
      name,
      className: (
        elementParam?: ?ElementType,
        modsParam?: ?Object | string,
        statesParam?: StatesType | string,
        classNameParam?: string
      ): string => {
        let mods: ?ModsType, states: ?StatesType, element: ?string, className: ?string
        if (elementParam && typeof elementParam === 'object') {
          mods = elementParam
          if (typeof modsParam === 'string') {
            className = modsParam
          } else {
            states = modsParam
            className = typeof statesParam === 'string' ? statesParam : classNameParam
          }
        } else {
          element = elementParam
          if (typeof modsParam === 'object') {
            mods = modsParam
            if (typeof statesParam === 'string') {
              className = statesParam
            } else {
              states = statesParam
              className = classNameParam
            }
          } else {
            className = modsParam
          }
        }
        const baseBlock = element ? `${name}__${element}` : name
        let result = this.cssModule[baseBlock]
        if (!result) {
          if (isDev && !this.settings.ignoreError) {
            const message = `Tidak ada className ${baseBlock} di cssModule`
            if (this.settings.throwOnError) {
              throw Error(message)
            } else {
              this.settings.suppressWarning || console.warn(message)
            }
          }
          result = baseBlock
        }

        if (mods) {
          result = Object.keys(mods).reduce((acc, next) => {
            const modValue = mods && mods[next]

            let mod

            if (typeof modValue === 'boolean') {
              const cn = `${baseBlock}--${next}`
              if (isDev && !this.settings.ignoreError) {
                if (!(cn in this.cssModule)) {
                  const message = `Tidak ada className ${cn} di cssModule`

                  if (this.settings.throwOnError) {
                    throw Error(message)
                  } else {
                    this.settings.suppressWarning || console.warn(message)
                  }
                }
              }

              if (modValue) {
                mod = this.cssModule[cn] || cn
              } else {
                return acc
              }
            } else {
              const cn = modValue && `${baseBlock}--${next}_${modValue}`
              if (isDev && !this.settings.ignoreError) {
                if (modValue && !(cn && cn in this.cssModule)) {
                  const message = `Tidak ada className ${cn || ''} di cssModule`

                  if (this.settings.throwOnError) {
                    throw Error(message)
                  } else {
                    this.settings.suppressWarning || console.warn(message)
                  }
                }
              }
              mod = (cn && this.cssModule[cn]) || cn || ''
            }

            return `${acc} ${mod}`
          }, result)
        }

        if (states) {
          result = Object.keys(states).reduce((acc, next) => {
            const stateValue = states && states[next]
            if (!stateValue) {
              return acc
            }
            const cn = `is-${next}`
            const state = this.cssModule[cn]
            if (!state) {
              if (isDev && !this.settings.ignoreError) {
                const message = `There is no ${cn} in cssModule`

                if (this.settings.throwOnError) {
                  throw Error(message)
                } else {
                  this.settings.suppressWarning || console.warn(message)
                }
              }
            }
            return `${acc} ${state}`
          }, result)
        }
        return className ? `${result} ${className}` : result
      }
    }
  }

  setCssModule(cssModule: CssModuleType): void {
    this.cssModule = cssModule
  }

  getCssModule(): CssModuleType {
    return this.cssModule
  }

  extractModuleName = () => {
    if (isDev) {
      if (!this.cssModule || typeof this.cssModule !== 'object' || Array.isArray(this.cssModule)) {
        const message = 'cssModule object should be a Object with keys'
        if (this.settings.throwOnError) {
          throw Error(message)
        } else {
          this.settings.suppressWarning || console.warn(message)
          return ''
        }
      }
    }

    const [name] = Object.keys(this.cssModule)

    if (isDev) {
      if (!name) {
        const message = 'cssModule has no keys'

        if (this.settings.throwOnError) {
          throw Error(message)
        } else {
          this.settings.suppressWarning || console.warn(message)
          return ''
        }
      }
    }

    return name.replace(Bem.regExpClearBEM, '')
  }
  setSettings = (newSettings: Object) => {
    this.settings = Object.assign(this.settings, newSettings)
  }
}
export default Bem
