/*
 * This file is part of KubeSphere Console.
 * Copyright (C) 2019 The KubeSphere Console Authors.
 *
 * KubeSphere Console is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * KubeSphere Console is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with KubeSphere Console.  If not, see <https://www.gnu.org/licenses/>.
 */

import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Grid, Box, Typography, Container, TextField } from '@material-ui/core'
import IconButton from '@material-ui/core/IconButton'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward'
import InputLabel from '@material-ui/core/InputLabel'
import InputAdornment from '@material-ui/core/InputAdornment'
import FormControl from '@material-ui/core/FormControl'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import FilledInput from '@material-ui/core/FilledInput'
import Button from '@material-ui/core/Button'
import cookie from 'utils/cookie'
import Alert from '@material-ui/lab/Alert'
import { Form } from '@kube-design/components'
import { get } from 'lodash'
import { Base64 } from 'js-base64'
import Logo from '../../../assets/login-logo.svg'
import HexaDeco from '../../../assets/background/hexaDecorationWhite.svg'
import styles from './index.scss'
import './index.css'

function encrypt(salt, str) {
  return mix(salt, Base64.encode(str))
}

function mix(salt, str) {
  if (str.length > salt.length) {
    salt += str.slice(0, str.length - salt.length)
  }

  const ret = []
  const prefix = []
  for (let i = 0, len = salt.length; i < len; i++) {
    const tomix = str.length > i ? str.charCodeAt(i) : 64
    const sum = salt.charCodeAt(i) + tomix
    prefix.push(sum % 2 === 0 ? '0' : '1')
    ret.push(String.fromCharCode(Math.floor(sum / 2)))
  }
  return `${Base64.encode(prefix.join(''))}@${ret.join('')}`
}

@inject('rootStore')
@observer
export default class Login extends Component {
  state = {
    formData: {},
    isSubmmiting: false,
    errorCount: 0,
    showPassword: false,
  }

  handleOAuthLogin = server => e => {
    const info = {
      name: server.title,
      type: server.type,
      endSessionURL: server.endSessionURL,
    }
    cookie('oAuthLoginInfo', JSON.stringify(info))
    window.location.href = e.currentTarget.dataset.url
  }

  handleSubmit = data => {
    const { username, password, ...rest } = data
    this.setState({ isSubmmiting: true })

    cookie('oAuthLoginInfo', '')

    const encryptKey = get(globals, 'config.encryptKey', 'kubesphere')

    this.props.rootStore
      .login({
        username,
        encrypt: encrypt(encryptKey, password),
        ...rest,
      })
      .then(resp => {
        this.setState({ isSubmmiting: false })
        if (resp.status !== 200) {
          this.setState({
            errorMessage: resp.message,
            errorCount: resp.errorCount,
          })
        }
      })
  }

  handleClickShowPassword = () => {
    this.setState({ ...this.state, showPassword: !this.state.showPassword })
  }

  render() {
    const { formData, isSubmmiting, errorMessage } = this.state
    return (
      <Grid container>
        <Grid item lg={4} md={5} xs={1}>
          <Container className={styles.left_login_container}>
            <img
              className={`${styles.image_background_hexa} ${styles.hexa_1}`}
              src={HexaDeco}
              alt=""
            />
            <img
              className={`${styles.image_background_hexa} ${styles.hexa_2}`}
              src={HexaDeco}
              alt=""
            />
            <Box
              display={'flex'}
              alignItems={'center'}
              className={styles.left_login_openheading}
            >
              <img className="logo-login" src={Logo} alt="" />
            </Box>
            <Typography>
              <h3 className={`${styles.left_login_text} ${styles.opening}`}>
                Welcome to Kubesphere
              </h3>
              <span
                className={`${styles.left_login_text} ${styles.openingnotice}`}
              >
                Please sign in to continue
              </span>
            </Typography>
          </Container>
        </Grid>
        <Grid item lg={8} md={7} xs={12}>
          <Container className={styles.right_login_container}>
            <Box component={'div'} className={styles.full}>
              <Box component={'div'} className={styles.login_wrapper}>
                <Box component={'div'} className={styles.login_card_wrapper}>
                  <Typography className={styles.login_right_opening}>
                    <Box
                      display={'flex'}
                      justifyContent={'center'}
                      alignItems={'flex-end'}
                    >
                      <h3 className={styles.heading}>{t('Sign in')}</h3>
                    </Box>
                  </Typography>
                  {get(globals, 'oauthServers', []).map(server => (
                    <div
                      key={server.url}
                      className={styles.oauth}
                      data-url={server.url}
                      onClick={this.handleOAuthLogin(server)}
                    >
                      <span>
                        {t('LOG_IN_WITH_TITLE', { title: server.title })}
                      </span>
                    </div>
                  ))}
                  <Box component={'div'} className={styles.login_right}>
                    <Form
                      className={styles.form}
                      data={formData}
                      onSubmit={this.handleSubmit}
                    >
                      <Form.Item
                        rules={[
                          {
                            required: true,
                            message: t('INPUT_USERNAME_OR_EMAIL_TIP'),
                          },
                        ]}
                      >
                        <TextField
                          className={styles.input_login}
                          variant="filled"
                          required
                          name="username"
                          label={t('Username')}
                        />
                      </Form.Item>
                      <FormControl className={styles.input_login}>
                        <InputLabel htmlFor="standard-adornment-password">
                          {t('Password')}
                          &nbsp;*
                        </InputLabel>
                        <Form.Item
                          rules={[
                            {
                              required: true,
                              message: t('PASSWORD_EMPTY_DESC'),
                            },
                          ]}
                        >
                          <FilledInput
                            required
                            name="password"
                            type={this.state.showPassword ? 'text' : 'password'}
                            endAdornment={
                              <InputAdornment position="end">
                                <IconButton
                                  aria-label="toggle password visibility"
                                  onClick={this.handleClickShowPassword}
                                >
                                  {this.state.showPassword ? (
                                    <VisibilityOff htmlColor={'white'} />
                                  ) : (
                                    <Visibility htmlColor={'white'} />
                                  )}
                                </IconButton>
                              </InputAdornment>
                            }
                          />
                        </Form.Item>
                      </FormControl>
                      <div className="signin-button">
                        <Button
                          loading={isSubmmiting}
                          htmlType="submit"
                          type="control"
                          className={'signin-button'}
                        >
                          {t('CONTINUE')}
                          <ArrowForwardIcon />
                        </Button>
                      </div>
                    </Form>
                    {errorMessage && (
                      <Alert severity="error">{t(errorMessage)}</Alert>
                    )}
                  </Box>
                </Box>
              </Box>
            </Box>
          </Container>
        </Grid>
      </Grid>
    )
  }
}
