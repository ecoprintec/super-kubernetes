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
import { inject, observer } from 'mobx-react'
import { trimEnd } from 'lodash'
import classnames from 'classnames'
import Avatar from '@material-ui/core/Avatar'
import { Link } from 'react-router-dom'
import './index.css'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import HomeIcon from '@material-ui/icons/Home'
import { Box, Grow } from '@material-ui/core'
import MuiButton from '@material-ui/core/Button'
import SettingsIcon from '@material-ui/icons/Settings'
import AppsIcon from '@material-ui/icons/Apps'
import Dashboard from '@material-ui/icons/Dashboard'
import Accordion from '@material-ui/core/Accordion'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { Icon } from '@kube-design/components'
import TabPanel from './TabPanel'
import { getParentMenu } from './menuParent'
import styles from './index.scss'
import avataImg from '../../../assets/pp_boy4.jpg'
import NavItem from './NavItem'

@inject('rootStore')
@observer
class Nav extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    navs: PropTypes.array.isRequired,
    prefix: PropTypes.string,
    checkSelect: PropTypes.func,
    onItemClick: PropTypes.func,
    innerRef: PropTypes.object,
    haveNavTitle: PropTypes.any,
  }

  static defaultProps = {
    className: '',
    prefix: '',
    checkSelect() {},
    onItemClick() {},
  }

  constructor(props) {
    super(props)

    this.state = {
      openedNav: this.getOpenedNav(),
      value: 0,
    }
  }

  get isLoggedIn() {
    return Boolean(globals.user)
  }

  componentDidMount() {
    this._ismounted = true
    this.props.rootStore.checkIsNavMounted(this._ismounted)
  }

  componentWillUnmount() {
    this._ismounted = false
    this.props.rootStore.checkIsNavMounted(this._ismounted)
  }

  handleLinkClick = link => () => {
    this.props.rootStore.routing.push(link)
    this.props.rootStore.closeGlobalMenu()
  }

  handleDocumentLinkClick = (e, key) => {
    window.open(key)
  }

  get currentPath() {
    const {
      location: { pathname },
      match: { url },
    } = this.props

    const length = trimEnd(url, '/').length
    return pathname.slice(length + 1)
  }

  getOpenedNav() {
    let name = ''
    const { navs } = this.props
    const current = this.currentPath
    navs.forEach(nav => {
      nav.items.forEach(item => {
        if (
          item.children &&
          item.children.some(child => {
            if (child.name === current) {
              return true
            }
            if (child.tabs) {
              return child.tabs.some(tab => tab.name === current)
            }

            return false
          })
        ) {
          name = item.name
        }
      })
    })

    return name
  }

  handleItemOpen = name => {
    this.setState(({ openedNav }) => ({
      openedNav: openedNav === name ? '' : name,
    }))
  }

  render() {
    const {
      className,
      navs,
      match,
      innerRef,
      onItemClick,
      disabled,
      rootStore,
      haveNavTitle,
    } = this.props
    const { openedNav, value } = this.state
    const current = this.currentPath
    const prefix = trimEnd(match.url, '/')

    const handleChange = (event, newValue) => {
      this.setState({ ...this.state, value: newValue })
    }

    const handleOpenMenu = () => {
      this.props.rootStore.onOpenMenu()
    }

    const handleOpenGlobalMenu = () => {
      this.props.rootStore.onOpenMenu()
      this.props.rootStore.openGlobalMenu()
    }

    return (
      <div>
        <div
          ref={innerRef}
          className={className}
          style={{
            marginTop: haveNavTitle && rootStore.openMenu === true ? 90 : 0,
            transitionDelay:
              haveNavTitle && rootStore.openMenu === false ? '0.3s' : 'unset',
          }}
        >
          <div className={styles.navparent}>
            <Tab
              icon={
                <div className="avatar-menu-icon">
                  <Avatar src={avataImg}></Avatar>
                  <div className="avatar-dot-status"></div>
                </div>
              }
              className={`${styles.parent_nav_tabs} ${styles.avatar}`}
            ></Tab>
            <Link to={'/'}>
              <Tab
                icon={
                  <div
                    className="left-menu-parent-icon"
                    style={{ color: 'rgba(0, 0, 0, 0.24)' }}
                  >
                    <HomeIcon />
                  </div>
                }
                label={t('Home')}
                className={styles.parent_nav_tabs}
              ></Tab>
            </Link>
            <Tabs
              orientation="vertical"
              variant="scrollable"
              value={value}
              onChange={handleChange}
              TabIndicatorProps={{
                style: {
                  background: '#283593',
                  width: '5px',
                  borderRadius: '5px',
                  left: 0,
                },
              }}
            >
              {getParentMenu().map((menuItem, parentkey) => {
                return (
                  <Tab
                    key={parentkey}
                    icon={
                      <div className="left-menu-parent-icon">
                        {menuItem.icon}
                      </div>
                    }
                    label={menuItem.name}
                    id={`vertical-tab-${menuItem.tabindex}`}
                    aria-controls={`vertical-tabpanel-${menuItem.tabindex}`}
                    onClick={
                      !menuItem.menu ? handleOpenMenu : handleOpenGlobalMenu
                    }
                    className={styles.parent_nav_tabs}
                  ></Tab>
                )
              })}
            </Tabs>
          </div>
          <TabPanel
            value={value}
            index={0}
            openMenuTabpanel={rootStore.openMenu}
            nodeChild={navs.map(nav => (
              <div key={nav.cate} className={styles.subNav}>
                {nav.title && <p>{t(nav.title)}</p>}
                <ul>
                  {nav.items.map(item => (
                    <NavItem
                      key={item.name}
                      item={item}
                      prefix={prefix}
                      current={current}
                      onClick={onItemClick}
                      isOpen={item.name === openedNav}
                      onOpen={this.handleItemOpen}
                      disabled={disabled}
                    />
                  ))}
                </ul>
              </div>
            ))}
          >
            {rootStore.isGlobalMenu && (
              <Grow timeout={300} in={rootStore.isGlobalMenu}>
                <Box component={'div'}>
                  {this.isLoggedIn && (
                    <Box
                      component={'div'}
                      display={'flex'}
                      flexDirection={'column'}
                      alignItems={'flex-start'}
                      width={197}
                    >
                      {globals.app.enableGlobalNav && (
                        <Accordion
                          className={styles.accordionGlobal}
                          elevation={0}
                        >
                          <AccordionSummary
                            className={styles.accordionSummaryGlobal}
                            expandIcon={<ExpandMoreIcon />}
                          >
                            <MuiButton className={styles.navsglobal}>
                              <SettingsIcon />
                              &nbsp;
                              {t('PLATFORM')}
                            </MuiButton>
                          </AccordionSummary>
                          <AccordionDetails
                            className={styles.accordionDetailsGlobal}
                          >
                            {globals.user &&
                              globals.app.enableGlobalNav &&
                              globals.app
                                .getGlobalNavs()
                                .map((platformItem, platfromKey) => {
                                  return (
                                    <MuiButton
                                      key={platfromKey}
                                      onClick={this.handleLinkClick(
                                        `/${platformItem.name}`
                                      )}
                                      className={classnames(
                                        {
                                          [styles.active]:
                                            location.pathname === '/',
                                        },
                                        styles.navsglobal,
                                        styles.arcordionItem
                                      )}
                                    >
                                      <Icon
                                        name={platformItem.icon}
                                        size={20}
                                      />
                                      &nbsp;
                                      {t(platformItem.title)}
                                    </MuiButton>
                                  )
                                })}
                          </AccordionDetails>
                        </Accordion>
                      )}
                      {globals.app.enableAppStore && (
                        <MuiButton
                          onClick={this.handleLinkClick('/apps')}
                          className={classnames(
                            {
                              [styles.active]: location.pathname === '/apps',
                            },
                            styles.navsglobal
                          )}
                        >
                          <AppsIcon />
                          &nbsp;
                          {t('APP_STORE')}
                        </MuiButton>
                      )}
                      <MuiButton
                        onClick={this.handleLinkClick('/dashboard')}
                        className={classnames(
                          {
                            [styles.active]: location.pathname === '/dashboard',
                          },
                          styles.navsglobal
                        )}
                      >
                        <Dashboard />
                        &nbsp;
                        {t('WORKBENCH')}
                      </MuiButton>
                    </Box>
                  )}
                </Box>
              </Grow>
            )}
          </TabPanel>
        </div>
        <div
          className="nav-underfixed"
          style={{
            width: rootStore.openMenu === true ? 400 : 95,
            transition: '0.45s',
          }}
        ></div>
      </div>
    )
  }
}

export default Nav
