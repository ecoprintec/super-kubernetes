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

import Dashboard from '../containers/Dashboard'
import NotFound from '../containers/NotFound'
import LogQuery from '../containers/LogQuery'
import EventSearch from '../containers/EventSearch'
import AuditingSearch from '../containers/AuditingSearch'
import Bill from '../containers/Bill'
import Support from '../containers/Support'

export default [
  { path: '/404', component: NotFound, exact: true },
  { path: '/dashboard', component: Dashboard, exact: true },
  { path: `/logquery`, exact: true, component: LogQuery },
  { path: '/eventsearch', exact: true, component: EventSearch },
  { path: '/auditingsearch', exact: true, component: AuditingSearch },
  { path: '/bill', exact: true, component: Bill },
  { path: '/support', exact: true, component: Support },
  {
    path: '*',
    redirect: { from: '*', to: '/404', exact: true },
  },
]
