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

import { Notify } from '@kube-design/components'
import { isArray } from 'lodash'
import { Modal } from 'components/Base'
import DeleteModal from 'components/Modals/Delete'
import DeleteCustom from 'components/Modals/Delete/DeleteCustom'

import StopModal from 'components/Modals/Stop'
import ServiceStore from 'stores/service'

export default {
  'resource.delete': {
    on({ store, detail, success, ...props }) {
      const modal = Modal.open({
        onOk: () => {
          store.delete(detail).then(() => {
            Modal.close(modal)
            Notify.success({ content: t('DELETED_SUCCESSFULLY') })
            success && success()
          })
        },

        store,
        modal: DeleteModal,
        // confirmDel: `Are you sure delete ? If you agree then type : ${
        //   isArray(detail) ? detail[0] : detail?.name
        // } in form and click OK.`,
        resource: isArray(detail) ? detail[0] : detail?.name,
        ...props,
      })
    },
  },
  'resource.batch.deleteMulti': {
    on({ store, success, selectValues, ...props }) {
      const serviceStore = new ServiceStore()
      const { data } = store.list

      const selectNames = selectValues.map(item => item.name)

      const modal = Modal.open({
        onOk: async () => {
          const reqs = []

          data.forEach(item => {
            const selectValue = selectValues.find(
              value =>
                value.name === item.name && value.namespace === item.namespace
            )

            if (selectValue) {
              reqs.push(store.deleteMulti(item))
              if (store.module === 'statefulsets') {
                reqs.push(
                  serviceStore.delete({ ...item, name: item.spec.serviceName })
                )
              }
            }
          })

          await Promise.all(reqs)

          Modal.close(modal)
          Notify.success({ content: t('DELETED_SUCCESSFULLY') })
          store.setSelectRowKeys([])
          success && success()
        },
        title: 'Multi delete pods',
        resource: selectNames.join(', '),
        modal: DeleteCustom,
        confirmDel: `Are you sure delete ? If you agree then type : ${selectNames.join(
          ', '
        )} in form and click OK.`,
        store,
        ...props,
      })
    },
  },
  'resource.batch.delete': {
    on({ store, success, rowKey, ...props }) {
      const serviceStore = new ServiceStore()
      const { data, selectedRowKeys } = store.list
      const selectValues = data
        .filter(item => selectedRowKeys.includes(item[rowKey]))
        .map(item => {
          return { name: item.name, namespace: item.namespace }
        })

      const selectNames = selectValues.map(item => item.name)
      const modal = Modal.open({
        onOk: async () => {
          const reqs = []
          data.forEach(item => {
            const selectValue = selectValues.find(
              value =>
                value.name === item.name && value.namespace === item.namespace
            )

            if (selectValue) {
              reqs.push(store.delete(item))
              if (store.module === 'statefulsets') {
                reqs.push(
                  serviceStore.delete({ ...item, name: item.spec.serviceName })
                )
              }
            }
          })
          await Promise.all(reqs)

          Modal.close(modal)
          Notify.success({ content: t('DELETED_SUCCESSFULLY') })
          // store.setSelectRowKeys([])
          success && success()
        },
        resource: selectNames.join(', '),
        confirmDel: `Are you sure delete ? If you agree then type : ${selectNames.join(
          ', '
        )} in form and click OK.`,
        modal: DeleteCustom,
        store,
        ...props,
      })
    },
  },
  'resource.batch.stop': {
    on({ store, success, rowKey, ...props }) {
      const { data, selectedRowKeys } = store.list
      const selectValues = data
        .filter(item => selectedRowKeys.includes(item[rowKey]))
        .map(item => {
          return { name: item.name, namespace: item.namespace }
        })

      const selectNames = selectValues.map(item => item.name)

      const modal = Modal.open({
        onOk: async () => {
          const reqs = []

          data.forEach(item => {
            const selectValue = selectValues.find(
              value =>
                value.name === item.name && value.namespace === item.namespace
            )

            if (selectValue) {
              reqs.push(store.stop(item))
            }
          })

          await Promise.all(reqs)

          Modal.close(modal)
          Notify.success({ content: `${t('STOP_SUCCESS_DESC')}` })
          store.setSelectRowKeys([])
          success && success()
        },
        resource: selectNames.join(', '),
        modal: StopModal,
        store,
        ...props,
      })
    },
  },
}
