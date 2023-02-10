import React from 'react'
import PropTypes from 'prop-types'
import { Grow } from '@material-ui/core'
import '../index.css'

export default class TabPanel extends React.Component {
  // { children, value, index, menuAction, ...other } = tabprops;
  static propTypes = {
    children: PropTypes.node,
    nodeChild: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
    openMenuTabpanel: PropTypes.bool,
  }

  render() {
    const {
      value,
      children,
      nodeChild,
      index,
      openMenuTabpanel,
      ...other
    } = this.props
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`vertical-tabpanel-${index}`}
        aria-labelledby={`vertical-tab-${index}`}
        {...other}
      >
        {value === index && nodeChild && (
          <Grow
            timeout={400}
            in={openMenuTabpanel}
            mountOnEnter
            exit
            unmountOnExit
          >
            <ul className="ul-wrapper">{children || nodeChild}</ul>
          </Grow>
        )}
      </div>
    )
  }
}