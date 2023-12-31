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
import { get, set } from 'lodash'
import Base from './base'

export default class VolumeSnapshotClassStore extends Base {
  module = 'volumesnapshotclasses'

  get resourceKind() {
    return 'VolumeSnapshotClass'
  }

  get apiVersion() {
    return 'apis/snapshot.storage.k8s.io/v1beta1'
  }

  create(params, options) {
    return super.create(
      {
        apiVersion: 'snapshot.storage.k8s.io/v1beta1',
        kind: this.resourceKind,
        deletionPolicy: 'Delete',
        ...params,
      },
      options
    )
  }

  @action
  async fetchDetail(params) {
    this.isLoading = true

    const result = await request.get(
      this.getDetailUrl(params),
      {},
      {},
      () => {}
    )
    const detail = result ? { ...params, ...this.mapper(result) } : {}

    this.detail = detail
    this.isLoading = false
    return detail
  }

  async deleteSilent(params) {
    await request.delete(this.getDetailUrl(params), {}, {}, () => {})
  }

  async silentBatchDelete(keys) {
    return Promise.all(
      keys.map(name =>
        request.delete(this.getDetailUrl({ name }), {}, {}, () => {})
      )
    )
  }

  @action
  async getDataPodsYaml(detail) {
    const url = `/apis/snapshot.storage.k8s.io/v1beta1/volumesnapshotclasses/${detail[0]}`
    return await this.submitting(request.get(url))
  }

  @action
  async update(params, newObject) {
    const url = `/apis/${newObject.apiVersion}/volumesnapshotclasses/${newObject.metadata.name}`
    const result = await request.get(url)
    const resourceVersion = get(result, 'metadata.resourceVersion')
    if (resourceVersion) {
      set(newObject, 'metadata.resourceVersion', resourceVersion)
    }
    return this.submitting(request.put(url, newObject))
  }

  @action
  deleteMulti(params) {
    const url = this.getDetailUrl(params)
    return this.submitting(request.delete(url))
  }
}
