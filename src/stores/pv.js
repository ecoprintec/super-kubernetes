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
import { get, set } from 'lodash'
import { action } from 'mobx'
import Base from './base'

export default class PvcStore extends Base {
  module = 'persistentvolumes'

  getDetailUrl = (params = {}) =>
    `${this.getResourceUrl(params)}/${params.name}`

  getKs8Url = (params = {}) =>
    `api/v1${this.getPath(params)}/${this.module}/${params.name}`

  @action
  async fetchDetail(params) {
    this.isLoading = true

    const result = await request.get(this.getKs8Url(params))
    const detail = { ...params, ...this.mapper(result) }

    this.detail = detail
    this.isLoading = false
    return detail
  }

  @action
  async update(params, newObject) {
    const result = await request.get(this.getResourceUrl(params))
    const resourceVersion = get(result, 'metadata.resourceVersion')
    if (resourceVersion) {
      set(newObject, 'metadata.resourceVersion', resourceVersion)
    }
    return this.submitting(request.put(this.getKs8Url(params), newObject))
  }

  @action
  patch(params, newObject) {
    return this.submitting(request.patch(this.getKs8Url(params), newObject))
  }

  @action
  delete(params) {
    return this.submitting(request.delete(this.getKs8Url(params)))
  }

  @action
  async getDataPodsYaml(detail) {
    const url = `/api/v1/persistentvolumes/${detail.name}`
    return await this.submitting(request.get(url))
  }
}
