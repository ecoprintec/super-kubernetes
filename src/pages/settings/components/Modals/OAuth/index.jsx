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
import PropTypes from 'prop-types'
import copy from 'fast-copy'

import { Column, Columns, Form, Input } from '@kube-design/components'
import { Modal } from 'components/Base'

import styles from './index.scss'

export default class OAuthModal extends React.Component {
  static propTypes = {
    detail: PropTypes.object,
    visible: PropTypes.bool,
    onOk: PropTypes.func,
    onCancel: PropTypes.func,
    isSubmitting: PropTypes.bool,
  }

  static defaultProps = {
    visible: false,
    onOk() {},
    onCancel() {},
    isSubmitting: false,
  }

  constructor(props) {
    super(props)

    this.state = {
      formData: copy(props.detail),
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.visible && this.props.visible !== prevProps.visible) {
      this.setState({ formData: copy(this.props.detail) })
    }
  }

  render() {
    const { visible, isSubmitting, onOk, onCancel } = this.props
    const { formData } = this.state

    return (
      <Modal.Form
        data={formData}
        width={960}
        title={'OAuth'}
        description={t('OAUTH_DESC')}
        icon="safe-notice"
        onOk={onOk}
        onCancel={onCancel}
        visible={visible}
        isSubmitting={isSubmitting}
      >
        <Columns className={styles.content}>
          <Column>
            <Form.Item
              label={t('NAME')}
              rules={[{ required: true, message: t('NAME_EMPTY_DESC') }]}
            >
              <Input name="name" />
            </Form.Item>
            <Form.Item
              label={t('CLIENT_ID')}
              rules={[{ required: true, message: t('PLEASE_INPUT_CLIENT_ID') }]}
            >
              <Input name="clientID" />
            </Form.Item>
          </Column>
          <Column>
            <Form.Item
              label={t('SERVER_ADDRESS')}
              rules={[
                { required: true, message: t('PLEASE_INPUT_SERVER_ADDRESS') },
              ]}
            >
              <Input name="server" />
            </Form.Item>
            <Form.Item label={t('CLIENT_SECRET')}>
              <Input name="secret" />
            </Form.Item>
          </Column>
        </Columns>
      </Modal.Form>
    )
  }
}
