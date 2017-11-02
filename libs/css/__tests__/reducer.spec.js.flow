// @flow

import {Map} from 'immutable'

import {reducer} from '../reducer'
import {registerAction, removeAction, removeAllAction} from '../actions'

const mockStyle = {
  link: 'link__',
  button: 'button__',
  _insertCss: jest.fn(() => () => {}),
  _getContent: () => {},
  _getCss: () => {},
  _id: '____id'
}
const initial = Map({})

describe('reducer styles', () => {
  it('check register style', () => {
    const _mockStyle = Object.assign({}, mockStyle)
    const expectedStore = Map({
      [mockStyle._id]: {
        count: 1,
        style: _mockStyle
      }
    })
    const action = registerAction([_mockStyle])
    const store = reducer(initial, action)
    expect(store).toEqual(expectedStore)

    let dt = store.get(mockStyle._id)
    expect(dt.count).toEqual(1)
    expect(dt.style._removeCss).toEqual(expect.any(Function))
    expect(mockStyle._insertCss).toHaveBeenCalledTimes(1)

    // loop register
    dt = reducer(store, action).get(mockStyle._id)
    expect(dt.count).toEqual(2)
    expect(dt.style._removeCss).toEqual(expect.any(Function))
    expect(mockStyle._insertCss).toHaveBeenCalledTimes(1)
    mockStyle._insertCss.mockReset()
    mockStyle._insertCss.mockRestore()
  })

  it('check remove style', () => {
    const id = mockStyle._id
    const action = removeAction(id)
    const _mockStyle = Object.assign({}, mockStyle, {_removeCss: () => null})
    delete _mockStyle._id
    const spyRemoveHeaderCss = jest.spyOn(_mockStyle, '_removeCss')
    const state = Map({
      [id]: {
        count: 2,
        style: _mockStyle
      }
    })

    let store = reducer(state, action)
    let style = store.get(id)
    expect(spyRemoveHeaderCss).toHaveBeenCalledTimes(0)
    expect(style.count).toEqual(1)

    // remove second
    store = reducer(store, action)
    style = store.get(id)
    expect(style).toBeUndefined()
    expect(spyRemoveHeaderCss).toHaveBeenCalledTimes(1)
  })

  it('check remove all style', () => {
    const id = mockStyle._id
    const action = removeAllAction()
    const _mockStyle = Object.assign({}, mockStyle, {_removeCss: () => null, _count: 5})
    delete _mockStyle._id
    const spyRemoveHeaderCss = jest.spyOn(_mockStyle, '_removeCss')
    const state = Map({
      [id]: _mockStyle
    })

    const store = reducer(state, action)
    const style = store.get(id)
    expect(spyRemoveHeaderCss).toHaveBeenCalledTimes(1)
    expect(style).toBeUndefined()
  })
})
