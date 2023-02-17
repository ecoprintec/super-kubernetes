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

import Dashboard from './Dashboard'
import Initializing from './Initializing'

@inject('clusterStore')
@observer
export default class Overview extends React.Component {
  get cluster() {
    return this.props.clusterStore
  }

  render() {
    const { isReady } = this.cluster.detail

    if (!isReady) {
      return <Initializing store={this.cluster} match={this.props.match} />
    }

    return <Dashboard match={this.props.match} />
  }
}
