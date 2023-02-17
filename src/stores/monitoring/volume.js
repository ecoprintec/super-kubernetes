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

import { omit } from 'lodash'
import Base from './base'

export default class VolumeMonitor extends Base {
  constructor(filters = {}) {
    super('volumes')

    this.filters = filters
  }

  fetchMetrics(params) {
    super.fetchMetrics({ ...this.filters, ...params })
  }

  getApi = ({ namespace, pvc = '' }) =>
    `${this.apiVersion}/namespaces/${namespace}/persistentvolumeclaims/${pvc}`

  handleParams = params => omit(params, ['namespace', 'pvc'])

  monitoringMetrics(
    params = {},
    pollingOps = {
      interval: 5000,
    }
  ) {
    this.fetchMetrics(params)

    return setInterval(() => {
      this.fetchMetrics({ ...params, autoRefresh: true })
    }, pollingOps.interval)
  }
}
