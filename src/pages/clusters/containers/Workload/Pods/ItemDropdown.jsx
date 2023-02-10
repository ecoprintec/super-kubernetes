import * as React from 'react'
import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'
import ClickAwayListener from '@mui/material/ClickAwayListener'
import Grow from '@mui/material/Grow'
import Paper from '@mui/material/Paper'
import Popper from '@mui/material/Popper'
import MenuItem from '@mui/material/MenuItem'
import MenuList from '@mui/material/MenuList'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { isFunction } from 'lodash'
import { Icon } from '@kube-design/components'
import styles from './index.scss'

export default function SplitButton(props) {
  const [open, setOpen] = React.useState(false)
  const anchorRef = React.useRef(null)
  const handleToggle = () => {
    setOpen(prevOpen => !prevOpen)
  }

  const handleClose = event => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return
    }

    setOpen(false)
  }
  const options = props.options
  const detail = props.detail
  return (
    <React.Fragment>
      <ButtonGroup ref={anchorRef}>
        <Button
          size="small"
          aria-controls={open ? 'split-button-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-label="select merge strategy"
          aria-haspopup="menu"
          onClick={handleToggle}
          style={{
            border: '0px',
          }}
        >
          <MoreVertIcon />
        </Button>
      </ButtonGroup>
      <Popper
        sx={{
          zIndex: 99999,
        }}
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === 'bottom' ? 'center top' : 'center bottom',
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList id="split-button-menu" autoFocusItem>
                  {options
                    .filter(item =>
                      isFunction(item.show) ? item.show(detail) : true
                    )
                    .map(option => (
                      <MenuItem
                        key={option?.key}
                        // disabled={index === 2}
                        // selected={index === selectedIndex}
                        onClick={() => option.action(detail)}
                        className={styles.MenuItem}
                      >
                        <div className={styles.MenuItemDiv}>
                          {isFunction(option.icon) ? (
                            <Icon name={option.icon(detail)} />
                          ) : (
                            option?.icon
                          )}
                        </div>
                        &emsp;
                        {isFunction(option.title)
                          ? option.title(detail)
                          : option?.title}
                      </MenuItem>
                    ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </React.Fragment>
  )
}
