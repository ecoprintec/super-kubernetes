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
import { get } from 'lodash'
import { parse } from 'qs'
import { toJS } from 'mobx'
import { inject, observer } from 'mobx-react'
import moment from 'moment-mini'
import { Button, Tag, Columns, Column, Loading } from '@kube-design/components'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Typography from '@material-ui/core/Typography'
import { TypeSelect } from 'components/Base'

import VersionStore from 'stores/openpitrix/version'
import AppStore from 'stores/openpitrix/app'

import Banner from 'apps/components/Banner'
import AppInfo from 'apps/components/AppInfo'
import AppPreview from 'apps/components/AppPreview'
import AppBase from 'apps/components/AppBase'

import { trigger } from 'utils/action'

import styles from './index.scss'

function TabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Typography>{children}</Typography>}
    </div>
  )
}

@inject('rootStore')
@observer
@trigger
export default class App extends React.Component {
  constructor(props) {
    super(props)

    this.params = parse(location.search.slice(1)) || {}
    this.htmlOrigBgColor = ''

    this.state = {
      tab: 0,
      selectAppVersion: '',
      showDeploy: false,
    }

    this.appId = this.props.match.params.appId
    this.appStore = new AppStore()
    this.versionStore = new VersionStore()
  }

  get routing() {
    return this.props.rootStore.routing
  }

  get loggedIn() {
    return Boolean(globals.user)
  }

  get versionOptions() {
    const versions = this.versionStore.list.data
    return versions.map(({ version_id, name, create_time }) => ({
      label: name,
      description: moment(create_time).format('YYYY-MM-DD'),
      value: version_id,
    }))
  }

  componentDidMount() {
    this.fixBodyColor()
    this.getData()
  }

  componentWillUnmount() {
    // restore bg color
    document.querySelector('html').style.backgroundColor = this.htmlOrigBgColor
  }

  getData() {
    this.appStore.fetchDetail({ app_id: this.appId })

    this.versionStore
      .fetchList({
        app_id: this.appId,
        status: 'active',
      })
      .then(() => {
        const selectAppVersion = get(
          this.versionStore,
          'list.data[0].version_id',
          ''
        )
        this.setState({ selectAppVersion })
      })
  }

  handleTabChange = tab => {
    this.setState({ tab })
  }

  fixBodyColor() {
    const htmlElem = document.querySelector('html')
    this.htmlOrigBgColor = window.getComputedStyle(htmlElem).backgroundColor
    htmlElem.style.backgroundColor = 'white'
  }

  handleBack = () => {
    this.routing.push('/apps')
  }

  handleChangeAppVersion = version => {
    this.params.version = version
    this.setState({ selectAppVersion: version })
  }

  handleDeploy = () => {
    const {
      detail: { isv },
    } = this.appStore

    if (
      isv !== 'system-workspace' ||
      localStorage.getItem(`${globals.user.username}-app-agreement`) === 'true'
    ) {
      this.handleLink()
      return
    }
    this.trigger('openpitrix.app.agreement', {
      success: this.handleLink,
    })
  }

  handleLink = () => {
    const link = `${this.props.match.url}/deploy${location.search}`

    if (!globals.user) {
      location.href = `/login?referer=${link}`
    } else {
      this.routing.push(link)
    }
  }

  renderAppFilePreview() {
    const { selectAppVersion } = this.state

    return <AppPreview versionId={selectAppVersion} appId={this.appId} />
  }

  renderKeywords() {
    const { detail } = this.appStore
    let { keywords = '' } = detail
    keywords = keywords
      .split(',')
      .map(v => v.trim())
      .filter(Boolean)

    return (
      <div className={styles.keywords}>
        <div className="h6 margin-b12">{t('KEYWORDS')}</div>
        <div>
          {keywords.length === 0
            ? t('NONE')
            : keywords.map((v, idx) => (
                <Tag key={idx} type="secondary">
                  {v}
                </Tag>
              ))}
        </div>
      </div>
    )
  }

  renderDeployButton() {
    return (
      <div className={styles.deployButton}>
        <Button onClick={this.handleDeploy} type="control">
          {t('INSTALL')}
        </Button>
      </div>
    )
  }

  renderContent() {
    const { detail, isLoading } = this.appStore
    const { data } = this.versionStore.list

    if (isLoading) {
      return <Loading className={styles.loading} />
    }

    return (
      <>
        <Tabs
          className={styles.tabs_new}
          // activeName={tab}
          value={this.state.tab || 0}
          onChange={(event, newValue) => this.handleTabChange(newValue)}
        >
          <Tab label={t('APP_INFORMATION')} value={0} />
          <Tab label={t('APP_DETAILS')} value={1} />
        </Tabs>
        <div className={styles.tab_content}>
          <TabPanel value={this.state.tab} index={0}>
            <>
              {this.renderDeployButton()}
              <Columns>
                <Column className="is-8">
                  <AppInfo app={detail} versions={toJS(data)} />
                </Column>
                <Column>
                  <AppBase app={detail} />
                </Column>
              </Columns>
            </>
          </TabPanel>
          <TabPanel value={this.state.tab} index={1}>
            <>
              {this.renderDeployButton()}
              <Columns>
                <Column className="is-8">{this.renderAppFilePreview()}</Column>
                <Column>
                  <div className="h6 margin-b12">{t('VERSIONS')}</div>
                  <TypeSelect
                    value={this.state.selectAppVersion}
                    options={this.versionOptions}
                    onChange={this.handleChangeAppVersion}
                  />
                  {this.renderKeywords()}
                </Column>
              </Columns>
            </>
          </TabPanel>
        </div>
      </>
    )
  }

  render() {
    return (
      <div className={styles.main}>
        <Banner
          className={styles.banner}
          detail={this.appStore.detail}
          onBack={this.handleBack}
        />
        <div className={styles.content}>{this.renderContent()}</div>
      </div>
    )
  }
}
