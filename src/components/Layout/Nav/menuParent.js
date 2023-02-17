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
      name: 'APPS',
      icon: <WidgetsIcon />,
    },
    {
      tabindex: 0,
      name: 'SO',
      icon: <WidgetsIcon />,
    },
    {
      tabindex: 0,
      name: 'SQ',
      icon: <WidgetsIcon />,
    },
    {
      tabindex: 0,
      name: 'SS',
      icon: <WidgetsIcon />,
    },
    {
      tabindex: 0,
      name: 'Billing',
      icon: <WidgetsIcon />,
    },
  ]
}
