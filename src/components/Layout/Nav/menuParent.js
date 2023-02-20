import WidgetsIcon from '@material-ui/icons/Widgets'
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
      icon: <WidgetsIcon />,
    },
    {
      tabindex: 0,
      name: 'Super Cloud',
      icon: <WidgetsIcon />,
    },
    {
      tabindex: 0,
      name: 'APPS',
      icon: <WidgetsIcon />,
    },
  ]
}
