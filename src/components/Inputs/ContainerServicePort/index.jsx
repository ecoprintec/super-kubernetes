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

import { debounce, isUndefined } from 'lodash'
import React from 'react'
import { Input, Select, Icon, Tooltip } from '@kube-design/components'
import { NumberInput, AddonsInput } from 'components/Inputs'
import { PROTOCOLS } from 'utils/constants'

import styles from './index.scss'

const DEFAULT_PROTOCOL = 'HTTP'

const getStateFromProps = props => {
  let protocol = DEFAULT_PROTOCOL
  const { name, containerPort, servicePort } = props.value
  const { index } = props
  if (!isUndefined(name)) {
    const matchs = name.match(/^(\w+)-(.*)/)
    if (matchs) {
      protocol = (matchs[1] || DEFAULT_PROTOCOL).toUpperCase()
    }
  }

  return {
    name: !isUndefined(name) ? name : `${protocol.toLowerCase()}-${index}`,
    protocol: PROTOCOLS.some(item => item.value === protocol)
      ? protocol
      : props.value.protocol,
    containerPort,
    servicePort,
    propsValue: props.value,
  }
}

export default class ServicePort extends React.Component {
  static defaultProps = {
    value: {},
    onChange() {},
  }

  constructor(props) {
    super(props)

    this.state = getStateFromProps(props)
  }

  static getDerivedStateFromProps(props, state) {
    if (props.value !== state.propsValue) {
      return getStateFromProps(props)
    }
    return null
  }

  triggerChange = debounce(() => {
    const { name, protocol, containerPort, servicePort } = this.state
    this.props.onChange({
      name,
      protocol: protocol === 'UDP' ? 'UDP' : 'TCP',
      containerPort,
      servicePort,
    })
  }, 300)

  handleNameChange = (e, name) => {
    this.setState({ name }, () => this.triggerChange())
  }

  handleProtocolChange = protocol => {
    let name
    const oldName = this.state.name
    const prefix = `${this.state.protocol.toLowerCase()}-`
    const { index } = this.props
    if (oldName.startsWith(prefix)) {
      name = `${protocol.toLowerCase()}-${oldName.replace(prefix, '')}`
    } else {
      name = `${protocol.toLowerCase()}-${index}`
    }

    this.setState(
      {
        name,
        protocol,
      },
      () => this.triggerChange()
    )
  }

  handleContainerPortChange = containerPort => {
    this.setState({ containerPort }, () => this.triggerChange())
  }

  handleServicePortChange = servicePort => {
    this.setState({ servicePort }, () => this.triggerChange())
  }

  render() {
    const { name, protocol, containerPort, servicePort } = this.state
    return (
      <div className={styles.wrapper}>
        <AddonsInput
          prefix={
            <div className={styles.tip}>
              <span>{t('PROTOCOL')}</span>
              <Tooltip content={t('ISTIO_PROTOCOL_TIP')}>
                <Icon name="question" />
              </Tooltip>
            </div>
          }
        >
          <Select
            name="protocol"
            value={protocol}
            options={PROTOCOLS}
            defaultValue={DEFAULT_PROTOCOL}
            onChange={this.handleProtocolChange}
          />
        </AddonsInput>
        <AddonsInput prefix={t('NAME')}>
          <Input
            name="name"
            value={name}
            placeholder={t('REQUIRED')}
            onChange={this.handleNameChange}
          />
        </AddonsInput>
        <AddonsInput prefix={t('CONTAINER_PORT')}>
          <NumberInput
            name="containerPort"
            min={1}
            max={65535}
            value={containerPort}
            integer
            placeholder={t('REQUIRED')}
            onChange={this.handleContainerPortChange}
          />
        </AddonsInput>
        <AddonsInput prefix={t('SERVICE_PORT')}>
          <NumberInput
            name="servicePort"
            min={1}
            max={65535}
            value={servicePort}
            integer
            placeholder={t('REQUIRED')}
            onChange={this.handleServicePortChange}
          />
        </AddonsInput>
      </div>
    )
  }
}
