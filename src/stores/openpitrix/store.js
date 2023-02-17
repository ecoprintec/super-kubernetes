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

import { action, observable } from 'mobx'

import { STORE_QUERY_STATUS } from 'configs/openpitrix/app'
import Base from 'stores/openpitrix/base'

export default class Store extends Base {
  resourceName = 'apps'

  defaultStatus = STORE_QUERY_STATUS

  @observable
  allApps = []

  defaultRepo = 'repo-helm'

  @action
  adjustCategory = async params =>
    await this.submitting(
      Promise.all(
        this.list.selectedRowKeys.map(appId =>
          request.patch(this.getUrl({ app_id: appId }), { ...params })
        )
      )
    )
}
