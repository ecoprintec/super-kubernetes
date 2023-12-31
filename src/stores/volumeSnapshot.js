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
import Base from './base'

export default class VolumeSnapshotStore extends Base {
  module = 'volumesnapshots'

  get resourceKind() {
    return 'VolumeSnapshot'
  }

  get apiVersion() {
    return 'apis/snapshot.storage.k8s.io/v1beta1'
  }

  async createSnapshot({ name, type, sourceName, cluster, namespace }) {
    const path = this.getListUrl({ cluster, namespace })

    const params = {
      apiVersion: 'snapshot.storage.k8s.io/v1beta1',
      kind: this.resourceKind,
      metadata: {
        name,
      },
      spec: {
        volumeSnapshotClassName: type,
        source: {
          kind: this.resourceKind,
          persistentVolumeClaimName: sourceName,
        },
      },
    }

    await this.submitting(request.post(path, params))
  }
}
