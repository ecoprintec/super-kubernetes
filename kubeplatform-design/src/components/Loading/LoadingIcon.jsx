import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { isNumber, noop } from 'lodash'

class LoadingIcon extends PureComponent {
  static propTypes = {
    prefix: PropTypes.string,
    name: PropTypes.string.isRequired,
    type: PropTypes.string,
    size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    className: PropTypes.string,
    style: PropTypes.object,
    changeable: PropTypes.bool,
    clickable: PropTypes.bool,
    onClick: PropTypes.func,
    disabled: PropTypes.bool,
  }

  static defaultProps = {
    type: 'dark',
    size: 'small',
    prefix: 'qicon',
    style: {},
    changeable: false,
    clickable: false,
    disabled: false,
    onClick: noop,
  }

  render() {
    const {
      prefix,
      name,
      type,
      size,
      className,
      onClick,
      style,
      clickable,
      changeable,
      disabled,
    } = this.props

    let styles = style
    if (isNumber(size)) {
      styles = { ...style, width: `${size}px`, height: `${size}px` }
    }

    return (
      <span
        style={styles}
        className={classNames(
          'icon',
          {
            [`is-${size}`]: !isNumber(size),
            'icon-clickable': clickable,
            'icon-changeable': changeable && !disabled,
            'icon-disabled': disabled,
          },
          className
        )}
        onClick={onClick}
      >
        <svg
          className={`${prefix} ${prefix}-${name} ${prefix}-${type} svg-loading`}
          xmlns="http://www.w3.org/2000/svg"
          width="48"
          height="48"
          viewBox="0 0 48 48"
        >
          <g fill="none">
            <path
              stroke="currentColor"
              stroke-width="4"
              d=" M 44 24 A 20 20 0 0 1 14 41"
            />
            <path
              stroke="currentColor"
              stroke-width="4"
              d=" M 4 24 A 20 20 180 0 1 34 7"
            />
          </g>
        </svg>
      </span>
    )
  }
}

export default LoadingIcon
