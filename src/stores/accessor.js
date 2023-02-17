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
import { action } from 'mobx'
import Base from './base'

export default class accessorStore extends Base {
  module = 'accessors'

  @action
  async fetchDetail(params) {
    this.isLoading = true

    const result = await request.get(this.getDetailUrl(params))

    this.detail = result
    this.isLoading = false
    return result
  }

  @action
  silentPatch(params, newObject) {
    return this.submitting(
      request.patch(
        this.getDetailUrl(params),
        newObject,
        {},
        (err, response) => {
          if (err) {
            return err
          }
          return response
        }
      )
    )
  }
}
