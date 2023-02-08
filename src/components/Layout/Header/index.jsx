/*
 * This file is part of KubeSphere Console.
 * Copyright (C) 2019 The KubeSphere Console Authors.
 *
 * KubeSphere Console is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * KubeSphere Console is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with KubeSphere Console.  If not, see <https://www.gnu.org/licenses/>.
 */

import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { Link } from 'react-router-dom'
import { Icon, Menu, Dropdown } from '@kube-design/components'
import { isAppsPage, getWebsiteUrl } from 'utils'
import Dashboard from '@material-ui/icons/Dashboard'
import AppsIcon from '@material-ui/icons/Apps'
import SettingsIcon from '@material-ui/icons/Settings'
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import MuiButton from '@material-ui/core/Button'
import { Box, Typography } from '@material-ui/core'

import Collapse from '@material-ui/core/Collapse'
import styles from './index.scss'
import LoginInfo from '../LoginInfo'

class Header extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    innerRef: PropTypes.object,
    jumpTo: PropTypes.func,
    route: PropTypes.any,
  }

  constructor(props) {
    super(props)
    this.state = {
      path: this.props.location.pathname,
      getTitle: '',
    }
  }

  get isLoggedIn() {
    return Boolean(globals.user)
  }

  handleLinkClick = link => () => {
    this.props.jumpTo(link)
  }

  handleDocumentLinkClick = (e, key) => {
    window.open(key)
  }

  renderDocumentList() {
    const { url, api } = getWebsiteUrl()
    return (
      <Menu onClick={this.handleDocumentLinkClick} data-test="header-docs">
        <Menu.MenuItem key={url}>
          <Icon name="hammer" /> {t('USER_GUIDE')}
        </Menu.MenuItem>
        <Menu.MenuItem key={api}>
          <Icon name="api" /> {t('API_DOCUMENT')}
        </Menu.MenuItem>
      </Menu>
    )
  }

  componentDidMount() {
    this.handleCheckTitle()
  }

  componentDidUpdate(prevLocation) {
    if (prevLocation.location.pathname !== this.props.location.pathname) {
      this.handleCheckTitle()
    }
  }

  handleCheckTitle = () => {
    const checkTitleMatch = []
    this.props.route.map(routeItem => {
      if (
        this.props.location.pathname.startsWith(routeItem.path) &&
        routeItem.name
      ) {
        checkTitleMatch.push(routeItem.name)
        this.setState({
          ...this.state,
          getTitle: routeItem.name ? routeItem.name : '',
        })
      }
      return this.state.location
    })
    if (checkTitleMatch.length === 0) {
      this.setState({
        ...this.state,
        getTitle: '',
      })
    }
  }

  toogleMenu = () => {}

  render() {
    const { className, innerRef, location } = this.props
    const { getTitle } = this.state
    const logo = globals.config.logo || '/assets/logo.svg'

    return (
      <div
        ref={innerRef}
        className={classnames(
          styles.header,
          {
            [styles.inAppsPage]: isAppsPage(),
          },
          className,
          this.state.checkWindowScroll === true ? styles.header_shadows : ''
        )}
      >
        <Box component={'div'} display={'flex'} alignItems={'center'}>
          <IconButton onClick={this.props.onToggleOpenMenu}>
            <MenuIcon htmlColor="#283593" />
          </IconButton>
          <Link to={isAppsPage() && !globals.user ? '/apps' : '/'}>
            <img
              className={styles.logo}
              src={isAppsPage() ? `/assets/logo.svg` : logo}
              alt=""
            />
          </Link>
          <Collapse in={true}>
            <Typography>
              <span className={styles.header_title}>{getTitle}</span>
            </Typography>
          </Collapse>
        </Box>
        <Box component={'div'} display={'flex'} alignItems={'center'}>
          {this.isLoggedIn && (
            <div className={styles.navs}>
              {globals.app.enableGlobalNav && (
                <MuiButton onClick={this.props.onToggleNav}>
                  <SettingsIcon />
                  &nbsp;
                  {t('PLATFORM')}
                </MuiButton>
              )}
              {globals.app.enableAppStore && (
                <MuiButton
                  onClick={this.handleLinkClick('/apps')}
                  className={classnames({
                    [styles.active]: location.pathname === '/apps',
                  })}
                >
                  <AppsIcon />
                  &nbsp;
                  {t('APP_STORE')}
                </MuiButton>
              )}
              <MuiButton
                onClick={this.handleLinkClick('/')}
                className={classnames({
                  [styles.active]: location.pathname === '/',
                })}
              >
                <Dashboard />
                &nbsp;
                {t('WORKBENCH')}
              </MuiButton>
            </div>
          )}
          <div className={styles.right}>
            {this.isLoggedIn && (
              <Dropdown content={this.renderDocumentList()}>
                <IconButton>
                  <LibraryBooksIcon />
                </IconButton>
              </Dropdown>
            )}
            <LoginInfo className={styles.loginInfo} isAppsPage={isAppsPage()} />
          </div>
        </Box>
      </div>
    )
  }
}

export default Header
