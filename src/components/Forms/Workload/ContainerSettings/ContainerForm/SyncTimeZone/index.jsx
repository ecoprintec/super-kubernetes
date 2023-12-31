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
import { get, set } from 'lodash'
import { Checkbox } from '@kube-design/components'

import styles from './index.scss'

export default class SyncTimeZone extends React.PureComponent {
  state = {
    isCheck: get(this.props.data, 'volumeMounts', []).some(
      vm => vm.mountPath === '/etc/localtime'
    ),
  }

  handleCheck = () => {
    this.setState(
      ({ isCheck }) => ({ isCheck: !isCheck }),
      () => {
        const vms = get(this.props.data, 'volumeMounts', [])
        if (this.state.isCheck) {
          set(this.props.data, 'volumeMounts', [
            ...vms,
            {
              name: 'host-time',
              mountPath: '/etc/localtime',
              readOnly: true,
            },
          ])
        } else {
          set(
            this.props.data,
            'volumeMounts',
            vms.filter(vm => vm.mountPath !== '/etc/localtime')
          )
        }
      }
    )
  }

  render() {
    const { isCheck } = this.state
    return (
      <div className={styles.wrapper}>
        <div className={styles.title}>
          <Checkbox checked={isCheck} onChange={this.handleCheck}>
            {t('SYNC_HOST_TIMEZONE')}
          </Checkbox>
        </div>
        <div className={styles.desc}>{t('SYNC_HOST_TIMEZONE_DESC')}</div>
      </div>
    )
  }
}
