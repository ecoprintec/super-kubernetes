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
import { get } from 'lodash'

import { Form, Input, Notify, Tooltip, Icon } from '@kube-design/components'

import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Typography from '@material-ui/core/Typography'

import BaseForm from '../BaseForm'
import Item from './Item'
import KeyWords from './KeyWords'

import styles from './index.scss'

function TabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Typography>{children}</Typography>}
    </div>
  )
}

export default class DingTalkForm extends Component {
  state = {
    type: 0,
  }

  validateCid = value => {
    const data = get(
      this.props.data,
      'receiver.spec.dingtalk.conversation.chatids',
      []
    )
    const count = globals.config.notification.dingtalk['max_number_of_cid']
    if (!value) {
      Notify.error({
        content: t('ENTER_CHAT_ID_DESC'),
        durantion: 1000,
      })
      return
    }
    if (data.length > count - 1) {
      Notify.error({
        content: t.html('MAX_CID_COUNT', { count }),
        durantion: 1000,
      })
      return
    }
    if (data.includes(value)) {
      Notify.error({
        content: t('CHAT_ID_EXISTS'),
        duration: 1000,
      })
      return
    }

    return true
  }

  validateKeywords = value => {
    const data = get(
      this.props.data,
      'receiver.spec.dingtalk.chatbot.keywords',
      []
    )
    const count = globals.config.notification.dingtalk['max_number_of_keyword']
    if (!value) {
      Notify.error({
        content: t('ENTER_KEYWORD_DESC'),
        durantion: 1000,
      })
      return
    }
    if (data.length > count - 1) {
      Notify.error({
        content: t.html('MAX_KEYWORD_COUNT', { count }),
        durantion: 1000,
      })
      return
    }
    if (data.includes(value)) {
      Notify.error({
        content: t(`KEYWORD_EXISTS`),
        duration: 1000,
      })
      return
    }

    return true
  }

  renderLabel() {
    return (
      <div className={styles.labelWrapper}>
        <span>Chat ID</span>
        {this.props.user && (
          <Tooltip content={t('CHAT_ID_TIP')}>
            <Icon className={styles.tip} name="question" />
          </Tooltip>
        )}
      </div>
    )
  }

  renderServiceSetting() {
    return (
      <div className={styles.row}>
        <div className={styles.title}>{t('APP_SETTINGS')}</div>
        <div className={styles.item}>
          <Form.Item label="App Key">
            <Input name="secret.data.appkey" />
          </Form.Item>
          <Form.Item label="App Secret">
            <Input name="secret.data.appsecret" />
          </Form.Item>
        </div>
      </div>
    )
  }

  renderReceiverSetting() {
    const { wrapperClassName } = this.props
    return (
      <div className={styles.row}>
        <div className={styles.title}>
          <span>{t('RECIPIENT_SETTINGS')}</span>
        </div>
        <div className={styles.item}>
          <Form.Item label={this.renderLabel()}>
            <Item
              className={wrapperClassName}
              name="receiver.spec.dingtalk.conversation.chatids"
              title="Chat ID"
              placeholder=" "
              validate={this.validateCid}
            />
          </Form.Item>
        </div>
      </div>
    )
  }

  renderChatSetting() {
    const { wrapperClassName } = this.props
    return (
      <div className={styles.row}>
        <div className={styles.title}>
          <span>{t('CHATBOT_SETTINGS')}</span>
        </div>
        <div className={styles.item}>
          <Form.Item label="Webhook URL">
            <Input name="secret.data.webhook" />
          </Form.Item>
          <Form.Item label="Secret">
            <Input name="secret.data.chatbotsecret" />
          </Form.Item>
          <Form.Item>
            <KeyWords
              className={wrapperClassName}
              name="receiver.spec.dingtalk.chatbot.keywords"
              validate={this.validateKeywords}
            />
          </Form.Item>
        </div>
      </div>
    )
  }

  handleTypeChange = newValue => {
    this.setState({ type: newValue })
  }

  render() {
    const { user, data, onChange, hideFooter, ...rest } = this.props
    return (
      <BaseForm
        name="dingtalk"
        module="DingTalk"
        icon="dingtalk"
        data={data}
        onChange={onChange}
        hideFooter={hideFooter}
        user={user}
        {...rest}
      >
        <Tabs
          value={this.state.type || 0}
          onChange={(event, newValue) => this.handleTypeChange(newValue)}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          <Tab label={t('CHAT_SETTINGS')} value={0} />
          <Tab label={t('CHATBOT_SETTINGS')} value={1} />
        </Tabs>
        <TabPanel value={this.state.type} index={0}>
          <>
            {!user && this.renderServiceSetting()}
            {this.renderReceiverSetting()}
          </>
        </TabPanel>
        <TabPanel value={this.state.type} index={1}>
          {this.renderChatSetting()}
        </TabPanel>
      </BaseForm>
    )
  }
}
