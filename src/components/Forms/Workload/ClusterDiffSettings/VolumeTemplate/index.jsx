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

import React, { Component } from 'react'
import { get, pick } from 'lodash'

import VolumeSettings from 'components/Forms/Volume/VolumeSettings/FormTemplate'
import EditForm from '../EditForm'

export default class VolumeSettingsDiff extends Component {
  handleSubmit = data => {
    const { index, onEdit } = this.props
    onEdit({ index, data: pick(data, ['spec']) })
  }

  render() {
    const { cluster, namespace, formData } = this.props

    return (
      <EditForm
        {...this.props}
        title={t('STORAGE_CLASS_VALUE', {
          value: get(formData, 'spec.storageClassName'),
        })}
        onOk={this.handleSubmit}
      >
        <div className="padding-12">
          <VolumeSettings cluster={cluster} namespace={namespace} />
        </div>
      </EditForm>
    )
  }
}
