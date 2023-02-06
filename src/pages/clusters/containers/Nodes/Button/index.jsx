import React from 'react'
import classNames from 'classnames'
import styles from '../index.scss'

export default class CustomButton extends React.Component {
  render() {
    return (
      <button
        className={classNames(
          styles.button_base_root,
          styles.button_root,
          styles.button_primary
        )}
        onClick={this.props.onClick}
      >
        {t('EDIT_TAINTS')}
      </button>
    )
  }
}
