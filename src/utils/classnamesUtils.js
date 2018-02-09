// @flow

import {mapProps, compose, pure} from 'recompose'
import classNames from 'classnames'
import bindClassNames from 'classnames/bind'
import Bem from '../css/bem'

const noBlockClassNames = (block: string, _classNames: Function): Function => (
  element?: string,
  modifier?: Object
): string => (element ? _classNames(element, modifier) : _classNames(block, modifier))

export type BlockType = {
  className: Function
}

export type StylesProps = {
  block?: BlockType,
  styles?: BemType
}

export type BemType = Bem

export const injectClassNames = (id?: string, options?: {keepStyles: boolean}) =>
  compose(
    mapProps(({block, classNames: _classNames, styles, ...attributes}) => {
      const addProps = options && options.keepStyles ? {styles} : {}
      return {
        classNames:
          _classNames ||
          (block && block.className) ||
          (id && styles && styles.block(id).className) ||
          classNames,
        ...addProps,
        ...attributes
      }
    }),
    pure
  )

export const bemStylesFactory = (styles: Object, options?: Object): Bem => new Bem(styles, options)

/**
 * block factory.
 *
 * @param block {string} name block bem
 * @param {Object} styles bem or cssModule object
 * @param options {Object} settings bem
 * @return {Bem}
 */
export const blockFactory = (block: string, styles: Object | BemType, options?: Object): BlockType =>
  styles instanceof Bem ? styles.block(block) : new Bem(styles, options).block(block)

export const injectBlockFactory = (block: BlockType) =>
  compose(
    mapProps(props => ({
      classNames: block.className,
      ...props
    })),
    pure
  )

export const propsClassNames = (props: Object, block?: string): Function => {
  if (!block) {
    return (
      props.classNames ||
      (props.block && props.block.className) ||
      (props.styles && bindClassNames.bind(props.styles))
    )
  } else if (props.styles) {
    return (
      (props.styles.block && props.styles.block(block).className) ||
      noBlockClassNames(block, bindClassNames.bind(props.styles))
    )
  }
  return noBlockClassNames(block, classNames)
}

export const classNamesFactory = (blockId: string, props: Object): Function => {
  let block
  if (props.block) {
    block = props.block
  } else {
    const styles = props.styles || {}
    block = styles.block(blockId)
  }
  return propsClassNames({block})
}

export {classNames}
