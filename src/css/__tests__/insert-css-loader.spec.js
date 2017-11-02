import insertCssLoader from '../insert-css-loader'


describe('utils/css/insert-css-loader', () => {
  it('should request insert-css correctly', () => {
    expect(insertCssLoader.pitch()).toMatch(/.*(utils\/css\/insert-css.js).*/)
  })
})
