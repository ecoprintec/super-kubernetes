/*
 * This file is part of Super Kubenetes Console.
 * Copyright (C) 2019 The Super Kubenetes Console Authors.
 *
 * Super Kubenetes Console is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Super Kubenetes Console is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Super Kubenetes Console.  If not, see <https://www.gnu.org/licenses/>.
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
import BuildIcon from '@material-ui/icons/Build'
import TabPanel from './TabPanel'
import { getParentMenu } from './menuParent'
import styles from './index.scss'
import avataImg from '../../../assets/pp_boy4.jpg'
import NavItem from './NavItem'
import KubeTools from '../../KubeTools'

@inject('rootStore')
@observer
class Nav extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    navsCluster: PropTypes.array,
    navsManageApp: PropTypes.array,
    navsAccessControl: PropTypes.array,
    navsPlatformSettings: PropTypes.array,
    prefix: PropTypes.string,
    checkSelect: PropTypes.func,
    onItemClick: PropTypes.func,
    innerRef: PropTypes.object,
    haveNavTitle: PropTypes.any,
    navsWorkspace: PropTypes.any,
    navsProjects: PropTypes.any,
  }

  static defaultProps = {
    className: '',
    prefix: '',
    expanded: false,
    checkSelect() {},
    onItemClick() {},
  }

  constructor(props) {
    super(props)

    this.state = {
      workspacelink: location.pathname
        .split('/', 3)
        .join('/')
        .substring(1),
      projectlink: location.pathname
        .split('/', 6)
        .join('/')
        .substring(1),
      value: 0,
    }
  }

  get isLoggedIn() {
    return Boolean(globals.user)
  }

  get arrayOfCate() {
    return {
      '/clusters': 'cluster',
      '/access': 'access',
      '/apps-manage': 'apps',
      '/settings': 'platformsettings',
      '/workspaces': 'access',
      '/projects': 'access',
      '/devops': 'access',
    }
  }

  componentDidMount() {
    this._ismounted = true
    this.props.rootStore.checkIsNavMounted(this._ismounted)
    Object.keys(this.arrayOfCate).forEach(cate => {
      if (this.props.location.pathname.startsWith(cate)) {
        this.props.rootStore.checkExpandedAcordion(this.arrayOfCate[cate])
      } else if (this.props.location.pathname.includes(cate)) {
        this.props.rootStore.checkExpandedAcordion(this.arrayOfCate[cate])
      }
    })
  }

  componentWillUnmount() {
    this._ismounted = false
    this.props.rootStore.checkIsNavMounted(this._ismounted)
  }

  handleLinkClick = link => () => {
    this.props.rootStore.routing.push(link)
  }

  get currentPath() {
    const {
      location: { pathname },
      match: { url },
    } = this.props

    const length = trimEnd(url, '/').length
    return pathname.slice(length + 1)
  }

  handleItemOpen = name => {
    this.setState(({ openedNav }) => ({
      openedNav: openedNav === name ? '' : name,
    }))
  }

  handleChangeArcodion = panel => () => {
    if (this.props.rootStore.expandedAcordion === panel) {
      this.props.rootStore.checkExpandedAcordion('')
      return
    }
    this.props.rootStore.checkExpandedAcordion(panel)
  }

  render() {
    const {
      className,
      navsCluster,
      navsManageApp,
      navsAccessControl,
      navsPlatformSettings,
      navsWorkspace,
      navsProjects,
      innerRef,
      onItemClick,
      disabled,
      rootStore,
      haveNavTitle,
      isWorkSpaceNav,
      location,
    } = this.props
    const { openedNav, value, workspacelink, projectlink } = this.state
    const current = this.currentPath
    const handleChange = (event, newValue) => {
      this.setState({ ...this.state, value: newValue })
    }
    const navs = [
      navsCluster,
      navsManageApp,
      navsAccessControl,
      navsPlatformSettings,
      navsWorkspace || '',
      navsProjects || '',
    ]
    const handleOpenMenu = () => {
      this.props.rootStore.onOpenMenu()
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
                    onClick={handleOpenMenu}
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
          >
            <Grow timeout={300} in={rootStore.openMenu}>
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
                        expanded={true}
                      >
                        <AccordionSummary
                          className={styles.accordionSummaryGlobal}
                        >
                          <MuiButton className={styles.navsglobal}>
                            <SettingsIcon />
                            &nbsp;
                            {t('PLATFORM')}
                          </MuiButton>
                        </AccordionSummary>
                        <AccordionDetails
                          className={styles.accordionDetailsPlatform}
                        >
                          {globals.user &&
                            globals.app.enableGlobalNav &&
                            globals.app
                              .getGlobalNavs()
                              .map((platformItem, platfromKey) => {
                                return (
                                  <Accordion
                                    key={platfromKey}
                                    expanded={
                                      rootStore.expandedAcordion ===
                                      platformItem.cate
                                    }
                                    onChange={this.handleChangeArcodion(
                                      platformItem.cate
                                    )}
                                    className={styles.accordionGlobal}
                                    elevation={0}
                                  >
                                    <AccordionSummary
                                      expandIcon={
                                        <ExpandMoreIcon className="expand-platform-icon" />
                                      }
                                      className={
                                        styles.accordionSummaryPlatform
                                      }
                                    >
                                      <MuiButton
                                        className={styles.AccordionFirstSummary}
                                      >
                                        <Icon
                                          name={platformItem.icon}
                                          size={20}
                                        />
                                        &nbsp;
                                        {t(platformItem.title)}
                                      </MuiButton>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                      {navs.map(
                                        function(nav) {
                                          if (
                                            nav[0] &&
                                            nav[0].cate === platformItem.cate
                                          ) {
                                            return (
                                              <div
                                                key={nav[0].cate}
                                                className={styles.subNav}
                                              >
                                                {nav[0].title && (
                                                  <p>{t(nav[0].title)}</p>
                                                )}
                                                <ul>
                                                  {nav[0].items.map(item => {
                                                    return (
                                                      <NavItem
                                                        cate={nav[0].cate}
                                                        key={item.name}
                                                        item={item}
                                                        prefix={
                                                          platformItem.name
                                                        }
                                                        current={current}
                                                        onClick={onItemClick}
                                                        isOpen={
                                                          item.name ===
                                                          openedNav
                                                        }
                                                        onOpen={
                                                          this.handleItemOpen
                                                        }
                                                        disabled={disabled}
                                                      />
                                                    )
                                                  })}
                                                  {isWorkSpaceNav &&
                                                    platformItem.cate ===
                                                      'access' && (
                                                      <NavItem
                                                        cate={nav[0].cate}
                                                        item={isWorkSpaceNav}
                                                        prefix={workspacelink}
                                                        current={current}
                                                        onClick={onItemClick}
                                                        isWorkSpaceNav
                                                        isOpen={
                                                          isWorkSpaceNav.name ===
                                                          openedNav
                                                        }
                                                        onOpen={
                                                          this.handleItemOpen
                                                        }
                                                        disabled={disabled}
                                                      />
                                                    )}
                                                  {navsProjects &&
                                                    platformItem.cate ===
                                                      'access' && (
                                                      <NavItem
                                                        cate={nav[0].cate}
                                                        item={navsProjects}
                                                        prefix={projectlink}
                                                        current={current}
                                                        onClick={onItemClick}
                                                        navsProjects
                                                        isOpen={
                                                          navsProjects.name ===
                                                          openedNav
                                                        }
                                                        onOpen={
                                                          this.handleItemOpen
                                                        }
                                                        disabled={disabled}
                                                      />
                                                    )}
                                                </ul>
                                              </div>
                                            )
                                          }
                                        }.bind(this)
                                      )}
                                    </AccordionDetails>
                                  </Accordion>
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
                    {globals.user && (
                      <Accordion
                        expanded={true}
                        className={styles.accordionGlobal}
                        elevation={0}
                      >
                        <AccordionSummary
                          className={styles.accordionSummaryGlobal}
                        >
                          <MuiButton className={styles.navsglobal}>
                            <BuildIcon />
                            &nbsp;
                            {t('TOOLBOX')}
                          </MuiButton>
                        </AccordionSummary>
                        <AccordionDetails
                          className={styles.accordionDetailsGlobal}
                        >
                          <KubeTools />
                        </AccordionDetails>
                      </Accordion>
                    )}
                  </Box>
                )}
              </Box>
            </Grow>
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
