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

import { getIndexRoute } from 'utils/router.config'

import Events from 'core/containers/Base/Detail/Events'
import Metadata from 'core/containers/Base/Detail/Metadata'
import ResourceStatus from './ResourceStatus'
import Snapshots from './Snapshots'

export default PATH => [
  {
    path: `${PATH}/resource-status`,
    title: 'RESOURCE_STATUS',
    exact: true,
    component: ResourceStatus,
  },
  {
    path: `${PATH}/metadata`,
    title: 'METADATA',
    component: Metadata,
    exact: true,
  },
  {
    path: `${PATH}/events`,
    title: 'EVENT_PL',
    exact: true,
    component: Events,
  },
  {
    path: `${PATH}/snapshot`,
    title: 'SNAPSHOT_PL',
    exact: true,
    component: Snapshots,
  },
  getIndexRoute({ path: PATH, to: `${PATH}/resource-status`, exact: true }),
]
