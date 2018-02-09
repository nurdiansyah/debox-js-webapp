import {propsClassNames} from '../classnamesUtils'
import Bem from '../../css/bem'

const styles = {
  navigation: 'NAVIGATION',
  navigation__left: 'NAVIGATION__LEFT',
  'navigation--top': 'NAVIGATION--TOP'
}

describe('classNamesUtils', () => {
  describe('propsClassNames', () => {
    it('cek bem support styles', () => {
      const bemStyles = new Bem(styles)
      const classNames = propsClassNames({styles: bemStyles}, 'navigation')
      expect(classNames()).toEqual('NAVIGATION')
      expect(classNames('left')).toEqual('NAVIGATION__LEFT')
    })

    it('cek bem support dengan block', () => {
      const block = new Bem(styles).block('navigation')
      const classNames = propsClassNames({block})
      expect(classNames()).toEqual('NAVIGATION')
      expect(classNames('left')).toEqual('NAVIGATION__LEFT')
    })

    it('cek styles tanpa bem', () => {
      const classNames = propsClassNames({styles})
      expect(classNames()).toEqual('')
      expect(classNames('left')).toEqual('left')
      expect(classNames('navigation')).toEqual('NAVIGATION')
    })

    it('cek styles tanpa bem tetapi dengan block', () => {
      const classNames = propsClassNames({styles}, 'navigation')
      expect(classNames()).toEqual('NAVIGATION')
      expect(classNames('left')).toEqual('left')
      expect(classNames('navigation__left')).toEqual('NAVIGATION__LEFT')
    })

    it('cek tanpa styles tetapi dengan block', () => {
      const classNames = propsClassNames({}, 'navigation')
      expect(classNames()).toEqual('navigation')
      expect(classNames('left')).toEqual('left')
      expect(classNames('navigation__left')).toEqual('navigation__left')
    })
  })
})
