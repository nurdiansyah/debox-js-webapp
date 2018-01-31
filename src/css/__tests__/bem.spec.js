// @flow

import Bem from '../bem'

process.env.NODE_ENV = 'development'

const mockCSSModule = {
  input: 'HASH_INPUT',
  input_disabled: 'HASH_INPUT_DISABLED',
  input__field: 'HASH_INPUT_FIELD',
  input__field_disabled: 'HASH_INPUT_FIELD_DISABLED',
  input__field_type_text: 'HASH_INPUT_FIELD_TYPE_TEXT',
  input__field_type_phone: 'HASH_INPUT_FIELD_TYPE_PHONE',
  input__icon: 'HASH_INPUT_ICON',
  'is-active': 'HASH_IS_ACTIVE',
  'is-removed': 'HASH_IS_REMOVED'
}

const namesToArray = name => name.split(' ').sort()

describe('bem-css-modules', () => {
  const bem = new Bem(mockCSSModule)
  const block = bem.block()

  it('should return base element', () => {
    expect(block.className()).toBe('HASH_INPUT')
    expect(block.className(null)).toBe('HASH_INPUT')
    expect(block.className('')).toBe('HASH_INPUT')
  })

  it('should return base element with mods', () => {
    expect(namesToArray(block.className('', {disabled: true}))).toEqual(
      namesToArray('HASH_INPUT HASH_INPUT_DISABLED')
    )

    expect(namesToArray(block.className(null, {disabled: true}))).toEqual(
      namesToArray('HASH_INPUT HASH_INPUT_DISABLED')
    )

    expect(namesToArray(block.className({disabled: true}))).toEqual(
      namesToArray('HASH_INPUT HASH_INPUT_DISABLED')
    )
  })

  it('should return base element with mods and states', () => {
    expect(namesToArray(block.className('', {disabled: true}, {active: true}))).toEqual(
      namesToArray('HASH_INPUT HASH_INPUT_DISABLED HASH_IS_ACTIVE')
    )

    expect(namesToArray(block.className(null, {disabled: true}, {active: true}))).toEqual(
      namesToArray('HASH_INPUT HASH_INPUT_DISABLED HASH_IS_ACTIVE')
    )
    expect(namesToArray(block.className({disabled: true}, {active: true}))).toEqual(
      namesToArray('HASH_INPUT HASH_INPUT_DISABLED HASH_IS_ACTIVE')
    )
  })

  it('should return elements', () => {
    expect(block.className('icon')).toBe('HASH_INPUT_ICON')
    expect(block.className('field')).toBe('HASH_INPUT_FIELD')

    expect(new Bem({input__field: 'foo'}).block().className('field')).toBe('foo')
  })

  it('should return elements with mods', () => {
    expect(block.className('field', {disabled: true})).toBe('HASH_INPUT_FIELD HASH_INPUT_FIELD_DISABLED')
    expect(block.className('field', {disabled: false})).toBe('HASH_INPUT_FIELD')
    expect(block.className('field', {type: 'text'})).toBe('HASH_INPUT_FIELD HASH_INPUT_FIELD_TYPE_TEXT')
    expect(namesToArray(block.className('field', {type: 'phone', disabled: true}))).toEqual(
      namesToArray('HASH_INPUT_FIELD HASH_INPUT_FIELD_TYPE_PHONE HASH_INPUT_FIELD_DISABLED')
    )
  })

  it('should return elements with states', () => {
    expect(block.className('field', null, {active: true, removed: false})).toBe(
      'HASH_INPUT_FIELD HASH_IS_ACTIVE'
    )
    expect(namesToArray(block.className('field', null, {active: true, removed: true}))).toEqual(
      namesToArray('HASH_INPUT_FIELD HASH_IS_ACTIVE HASH_IS_REMOVED')
    )

    expect(namesToArray(block.className(null, null, {active: true, removed: true}))).toEqual(
      namesToArray('HASH_INPUT HASH_IS_ACTIVE HASH_IS_REMOVED')
    )
  })

  it('should return elements with mods and states', () => {
    expect(namesToArray(block.className('field', {disabled: true}, {active: true, removed: true}))).toEqual(
      namesToArray('HASH_INPUT_FIELD HASH_IS_ACTIVE HASH_IS_REMOVED HASH_INPUT_FIELD_DISABLED')
    )
    expect(
      namesToArray(block.className('field', {disabled: true, type: 'text'}, {active: true, removed: true}))
    ).toEqual(
      namesToArray(
        'HASH_INPUT_FIELD HASH_IS_ACTIVE HASH_IS_REMOVED HASH_INPUT_FIELD_DISABLED HASH_INPUT_FIELD_TYPE_TEXT'
      )
    )
  })

  it('should work with dirty module', () => {
    const _bem = new Bem({
      input: 'INPUT',
      input__icon: 'INPUT__ICON',
      button: 'BUTTON',
      button__icon: 'BUTTON__ICON'
    })
    let dirtyBlock = _bem.block('button')

    expect(dirtyBlock.className()).toBe('BUTTON')
    expect(dirtyBlock.className('icon')).toBe('BUTTON__ICON')

    dirtyBlock = _bem.block('input')

    expect(dirtyBlock.className()).toBe('INPUT')
    expect(dirtyBlock.className('icon')).toBe('INPUT__ICON')
  })

  describe('errors with throwOnError = true', () => {
    const _bem = new Bem({})
    beforeEach(() => {
      _bem.setSettings({throwOnError: true})
    })

    afterAll(() => {
      _bem.setSettings({throwOnError: false})
    })

    it('should throw error with css modules without keys', () => {
      expect(() => _bem.block().className()).toThrowError('cssModule has no keys')
    })

    it('should throw error with unexisted elements', () => {
      _bem.setCssModule({input: 'INPUT'})
      expect(() => _bem.block().className('foo')).toThrowError('Tidak ada className input__foo di cssModule')
    })

    it('should throw error with unexisted mods', () => {
      _bem.setCssModule({input: 'INPUT', input__icon: 'INPUT__ICON'})
      expect(() => _bem.block().className('icon', {foo: true})).toThrowError(
        'Tidak ada className input__icon_foo di cssModule'
      )
      expect(() => _bem.block().className('icon', {foo: 'bar'})).toThrowError(
        'Tidak ada className input__icon_foo_bar di cssModule'
      )
    })

    it('should throw error with unexisted states', () => {
      expect(() => _bem.block().className('icon', null, {foo: true})).toThrowError(
        'There is no is-foo in cssModule'
      )
    })
  })

  describe('errors with throwOnError = false', () => {
    let spy

    beforeEach(() => {
      spy = jest.spyOn(global.console, 'warn').mockImplementation(() => null)
    })

    afterEach(() => {
      spy.mockReset()
      spy.mockRestore()
    })

    it('should throw error with css modules without keys', () => {
      const _bem = new Bem({})
      const _block = _bem.block()
      _block.className()
      expect(spy).toHaveBeenCalledWith('cssModule has no keys')

      function SomeClass() {
        // pass
      }

      SomeClass.prototype = {foo: 1, _insertCss: () => ({})}

      _bem.setCssModule(new SomeClass())
      _block.className()
      expect(spy).toHaveBeenCalledWith('cssModule has no keys')
    })

    it('should throw error with unexisted elements', () => {
      block.className('foo')
      expect(spy).toHaveBeenCalledWith('Tidak ada className input__foo di cssModule')
    })

    it('should throw error with unexisted mods', () => {
      block.className('icon', {foo: true})
      expect(spy).toHaveBeenCalledWith('Tidak ada className input__icon_foo di cssModule')

      block.className('icon', {foo: 'bar'})
      expect(spy).toHaveBeenCalledWith('Tidak ada className input__icon_foo_bar di cssModule')
    })

    it('should throw error with unexisted states', () => {
      block.className('icon', null, {foo: true})
      expect(spy).toHaveBeenCalledWith('There is no is-foo in cssModule')
    })
  })
  describe('running with initial block classnames', () => {
    it('should running normal', () => {
      const classNames = bem.block.bind(bem)
      const _block = classNames()
      expect(_block.className()).toBe('HASH_INPUT')
    })
  })
})
