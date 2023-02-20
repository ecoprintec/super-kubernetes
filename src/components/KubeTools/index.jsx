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
import { observer, inject } from 'mobx-react'
import { isEmpty } from 'lodash'
import classnames from 'classnames'
import MuiButton from '@material-ui/core/Button'
import { safeParseJSON } from 'utils'
import { trigger } from 'utils/action'
import { createCenterWindowOpt } from 'utils/dom'
import { Icon } from '@kube-design/components'
import { Tooltip } from '@material-ui/core'
import styles from '../Layout/Nav/index.scss'
import '../Layout/Nav/index.css'

const KS_TOOLBOX_POS_KEY = 'ks-toolbox-pos'

@inject('rootStore')
@observer
@trigger
export default class KubeTools extends React.Component {
  state = {
    showTools: 0,
    defaultPosition: safeParseJSON(localStorage.getItem(KS_TOOLBOX_POS_KEY), {
      x: 0,
      y: 0,
    }),
  }

  getWindowOpts() {
    return createCenterWindowOpt({
      width: 1200,
      height: 800,
      scrollbars: 1,
      resizable: 1,
    })
  }

  get isHideMeterModal() {
    return (
      globals.app.hasKSModule('metering') &&
      (globals.app.hasPermission({
        module: 'workspaces',
        action: 'view',
      }) ||
        !isEmpty(globals.user.workspaces) ||
        globals.app.hasPermission({
          module: 'clusters',
          action: 'view',
        }))
    )
  }

  get toolList() {
    return [
      {
        group: 'ANALYSIS_TOOLS',
        data: [
          {
            icon: 'file',
            title: t('CONTAINER_LOG_SEARCH'),
            description: t('CONTAINER_LOG_SEARCH_DESC'),
            link: '/logquery',
            hidden: !globals.app.hasKSModule('logging'),
            action: 'toolbox.logquery',
          },
          {
            icon: 'thunder',
            title: t('RESOURCE_EVENT_SEARCH'),
            description: t('RESOURCE_EVENT_SEARCH_DESC'),
            link: '/eventsearch',
            hidden: !globals.app.hasKSModule('events'),
            action: 'toolbox.eventsearch',
          },
          {
            icon: 'login-servers',
            title: t('AUDIT_LOG_SEARCH'),
            description: t('AUDIT_LOG_DESC'),
            link: '/auditingsearch',
            hidden: !globals.app.hasKSModule('auditing'),
            action: 'toolbox.auditingsearch',
          },
          {
            icon: 'wallet',
            title: t('RESOURCE_CONSUMPTION_STATISTICS'),
            description: t('METERING_AND_BILLING_DESC'),
            link: '/bill',
            hidden: !this.isHideMeterModal,
            action: 'toolbox.bill',
          },
          {
            icon: 'documentation',
            description: t('VIEW_KUBE_CONFIG'),
            title: 'kubeconfig',
            link: '/kubeConfig',
            hidden: !globals.config.enableKubeConfig,
            action: 'toolbox.kubeconfig',
          },
        ],
      },
      {
        group: 'CONTROL_TOOL',
        data: [
          {
            icon: 'terminal',
            link: '/terminal/kubectl',
            title: 'kubectl',
            description: t('KUBECTL_DESC'),
            hidden: !globals.app.isPlatformAdmin,
            action: 'toolbox.kubectl',
          },
        ],
      },
    ]
  }

  get enabledTools() {
    const { toolList } = this
    toolList.forEach(item => {
      item.data = item.data.filter(dataItem => !dataItem.hidden)
    })

    return toolList.filter(item => !isEmpty(item.data))
  }

  get thirdPartyToolList() {
    return (globals.config.thirdPartyTools || []).map(item => ({
      icon: 'cookie',
      ...item,
    }))
  }

  handleToolItemClick = e => {
    e.preventDefault()
    e.stopPropagation()
    const data = e.currentTarget.dataset

    if (e.shiftKey || !data.action) {
      return window.open(data.link, data.title, this.getWindowOpts())
    }

    this.trigger(data.action, {})
  }

  handleThirdPartyToolItemClick = e => {
    e.preventDefault()
    e.stopPropagation()
    const data = e.currentTarget.dataset
    window.open(data.link, '_blank')
  }

  handleStop = (e, data) => {
    localStorage.setItem(
      KS_TOOLBOX_POS_KEY,
      JSON.stringify({ x: 0, y: Math.max(Math.min(data.y, 0), -900) })
    )
  }

  renderTools() {
    return (
      <div>
        {this.enabledTools.map(group => (
          <div key={group.group} className={styles.toolsGroup}>
            <div className={styles.groupContent}>
              {group.data.map(item => (
                <div
                  key={item.key || item.link}
                  data-title={item.title}
                  data-link={item.link}
                  data-action={item.action}
                  onClick={item.onClick || this.handleToolItemClick}
                >
                  <Tooltip title={t(item.title)}>
                    <MuiButton
                      className={classnames(
                        styles.navsglobal,
                        styles.arcordionItem
                      )}
                    >
                      <Icon name={item.icon} />
                      &nbsp;
                      <div className={styles.arcordionItemName}>
                        {t(item.title)}
                      </div>
                    </MuiButton>
                  </Tooltip>
                </div>
              ))}
            </div>
          </div>
        ))}
        {!isEmpty(this.thirdPartyToolList) && (
          <div className={styles.toolsGroup}>
            <div className={styles.groupTitle}>{t('THIRD_PARTY_TOOLS')}</div>
            <div className={styles.groupContent}>
              {this.thirdPartyToolList.map(item => (
                <div
                  key={item.key || item.link}
                  data-title={item.title}
                  data-link={item.link}
                  data-action={item.action}
                  onClick={this.handleThirdPartyToolItemClick}
                >
                  <MuiButton
                    className={classnames(
                      styles.navsglobal,
                      styles.arcordionItem
                    )}
                  >
                    <Icon name={item.icon} />
                    &nbsp;
                    <div className={styles.arcordionItemName}>
                      {t(item.title)}
                    </div>
                  </MuiButton>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    )
  }

  render() {
    if (isEmpty(this.enabledTools)) {
      return null
    }

    return <div>{this.renderTools()}</div>
  }
}
