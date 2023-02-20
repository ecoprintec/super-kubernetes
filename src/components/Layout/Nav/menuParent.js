import WidgetsIcon from '@material-ui/icons/Widgets'
import Help from '@material-ui/icons/Help'
import Computer from '@material-ui/icons/Computer'
import CloudCircle from '@material-ui/icons/CloudCircle'
import React from 'react'

export function getParentMenu() {
  return [
    {
      tabindex: 0,
      name: 'Super Kubenetes',
      icon: <WidgetsIcon />,
      menu: true,
    },
    {
      tabindex: 0,
      name: 'Super Quantum Composer',
      icon: <Computer />,
    },
    {
      tabindex: 0,
      name: 'Super Cloud',
      icon: <CloudCircle />,
    },
    {
      tabindex: 0,
      name: 'Helps',
      icon: <Help />,
    },
  ]
}
