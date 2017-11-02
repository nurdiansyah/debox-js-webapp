// @flow

import * as reduxStore from '@debox-client/core/redux/store'
import {register} from '../styles-manager'

describe('styles-manager', () => {
  let store: Object
  beforeEach(() => {
    const _store = jest.spyOn(reduxStore, 'getStore').mockImplementation(() => ({
      dispatch: jest.fn
    }))
    store = _store()
  })
  it('register dgn argument object styles', () => {
    const styles = {
      link: 'link__',
      menu: 'menu__',
      _insertCss: () => {},
      _getContent: () => {},
      _getCss: () => {},
      _id: './test/styles.scss'
    }
    jest.spyOn(store, 'dispatch').mockImplementation(args => expect(args).toEqual([styles]))
    register(styles)
  })
})
