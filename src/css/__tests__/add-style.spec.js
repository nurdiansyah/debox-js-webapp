import addStyle from '../add-css'
import {noop} from '../../index'


describe('utils/css/add-style', () => {
  it('cek input object', () => {
    const input = {
      button: {
        link: 'link__',
        _insertCss: noop
      },
      navbar: {
        menu: 'menu__',
        _insertCss: noop
      }
    }
    const options = {injectReturnStyles: noop}
    const spy = jest.spyOn(options, 'injectReturnStyles')
      .mockImplementation(args => expect(args).toEqual([input.button, input.navbar]))
    addStyle(input, options)
    expect(spy).toHaveBeenCalled()
  })
})
