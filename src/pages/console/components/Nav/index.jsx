import React from 'react'
import { inject, observer } from 'mobx-react'
import { Link } from 'react-router-dom'
import classnames from 'classnames'
import { Icon } from '@kube-design/components'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import HomeIcon from '@material-ui/icons/Home'
import Avatar from '@material-ui/core/Avatar'
import { Box } from '@material-ui/core'
import MuiButton from '@material-ui/core/Button'
import SettingsIcon from '@material-ui/icons/Settings'
import AppsIcon from '@material-ui/icons/Apps'
import Accordion from '@material-ui/core/Accordion'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Dashboard from '@material-ui/icons/Dashboard'
import BuildIcon from '@material-ui/icons/Build'
import Help from '@material-ui/icons/Help'
import TabPanel from './TabPanel'
import { getParentMenu } from '../../../../components/Layout/Nav/menuParent'
import avataImg from '../../../../assets/pp_boy4.jpg'
import styles from './index.scss'
import KubeTools from '../../../../components/KubeTools'

@inject('rootStore')
@observer
export default class ConsoleNav extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      value: 0,
      expanded: false,
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
  }

  handleOpenGlobalMenu = () => {
    this.props.rootStore.onOpenMenu()
  }

  handleChangeTab = (event, newValue) => {
    this.setState({ ...this.state, value: newValue })
  }

  handleChangeArcodion = panel => (event, isExpanded) => {
    this.setState({ ...this.state, expanded: isExpanded ? panel : false })
  }

  render() {
    const { rootStore } = this.props
    const { value, expanded } = this.state

    return (
      <Box component={'div'} position="relative">
        <Box display={'flex'} className={styles.dashboard_leftsidebar}>
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
              onChange={this.handleChangeTab}
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
                    onClick={this.handleOpenGlobalMenu}
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
                      expanded={expanded === 'panelCluster'}
                      onChange={this.handleChangeArcodion('panelCluster')}
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
                                  <Icon name={platformItem.icon} size={20} />
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
                  {globals.user && (
                    <Accordion
                      expanded={expanded === 'panelTool'}
                      onChange={this.handleChangeArcodion('panelTool')}
                      className={styles.accordionGlobal}
                      elevation={0}
                    >
                      <AccordionSummary
                        className={styles.accordionSummaryGlobal}
                        expandIcon={<ExpandMoreIcon />}
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
                  <MuiButton
                    onClick={this.handleLinkClick('/docs')}
                    className={classnames(
                      {
                        [styles.active]: location.pathname === '/docs',
                      },
                      styles.navsglobal
                    )}
                  >
                    <Help />
                    &nbsp;
                    {t('Helps')}
                  </MuiButton>
                </Box>
              )}
            </Box>
          </TabPanel>
        </Box>
        <div
          className="nav-underfixed"
          style={{
            width: rootStore.openMenu === true ? 300 : 95,
            transition: '0.45s',
          }}
        ></div>
      </Box>
    )
  }
}
