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
import { inject, observer } from 'mobx-react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { Tooltip, Icon } from '@kube-design/components'
import MUITooltip from '@material-ui/core/Tooltip'
import Link from './Link'
import styles from './index.scss'

@inject('rootStore')
@observer
export default class NavItem extends React.Component {
  static propTypes = {
    item: PropTypes.object,
    current: PropTypes.string,
    prefix: PropTypes.string,
    onClick: PropTypes.func,
    onOpen: PropTypes.func,
    disabled: PropTypes.bool,
    cate: PropTypes.string,
    isWorkSpaceNav: PropTypes.any,
  }

  checkSelect = (item = {}) => {
    const { current } = this.props
    if (item.children) {
      return item.children.some(child => this.checkSelect(child))
    }
    if (item.tabs) {
      return item.tabs.some(tab => this.checkSelect(tab))
    }
    return current.startsWith(item.name)
  }

  handleOpen = () => {
    const { onOpen, item } = this.props
    onOpen(item.name)
  }

  renderDisabledTip(item) {
    if (item.reason === 'CLUSTER_UPGRADE_REQUIRED') {
      return (
        <Tooltip
          content={t(item.reason, { version: item.requiredClusterVersion })}
          placement="topRight"
        >
          <Icon
            name="update"
            className={styles.tip}
            color={{
              primary: '#ffc781',
              secondary: '#f5a623',
            }}
          />
        </Tooltip>
      )
    }

    return null
  }

  render() {
    const {
      item,
      prefix,
      disabled,
      onClick,
      isOpen,
      isWorkSpaceNav,
      navsProjects,
    } = this.props
    const itemDisabled = (disabled || item.disabled) && !item.showInDisable
    if (isWorkSpaceNav && item.children) {
      return (
        <MUITooltip title={t(item.title)}>
          <li
            className={classnames({
              [styles.childSelect]: this.checkSelect(item),
              [styles.open]: item.open || isOpen,
              [styles.disabled]: itemDisabled,
            })}
          >
            <div className={styles.title} onClick={this.handleOpen}>
              <div style={{ width: '90%', display: 'flex' }}>
                <Icon name={item.icon} />
                <div
                  style={{
                    width: 120,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {t(item.title)}
                </div>
              </div>
              {!item.open && (
                <Icon name="chevron-down" className={styles.rightIcon} />
              )}
            </div>
            <ul className={styles.innerNav}>
              {item.children.map(child => {
                const childDisabled =
                  (disabled || child.disabled) && !child.showInDisable
                return (
                  <MUITooltip
                    key={child.name}
                    title={t(child.title)}
                    placement={'right'}
                  >
                    <li
                      className={classnames({
                        [styles.select]: this.checkSelect(child),
                        [styles.disabled]: childDisabled,
                      })}
                    >
                      <Link
                        to={
                          item.cluster
                            ? `/${prefix}/${item.cluster}/${child.name}`
                            : `/${prefix}/${child.name}`
                        }
                        disabled={childDisabled}
                      >
                        {t(child.title)}
                        {childDisabled && this.renderDisabledTip(child)}
                      </Link>
                    </li>
                  </MUITooltip>
                )
              })}
            </ul>
          </li>
        </MUITooltip>
      )
    }
    if (navsProjects && item.children) {
      return (
        <li
          className={classnames({
            [styles.childSelect]: this.checkSelect(item),
            [styles.open]: item.open || isOpen,
            [styles.disabled]: itemDisabled,
          })}
        >
          <div className={styles.title} onClick={this.handleOpen}>
            <div style={{ width: '90%', display: 'flex' }}>
              <Icon name={item.icon} />
              <div
                style={{
                  width: 120,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {t(item.title)}
              </div>
            </div>
            {!item.open && (
              <Icon name="chevron-down" className={styles.rightIcon} />
            )}
          </div>
          <ul className={styles.innerNav}>
            {item.children.map(child => {
              const childDisabled =
                (disabled || child.disabled) && !child.showInDisable
              if (child.children) {
                return (
                  <li key={child.name} style={{ cursor: 'pointer' }}>
                    {t(child.title)}
                    {child.children.map(secondChild => {
                      return (
                        <ul
                          key={secondChild.name}
                          className={classnames({
                            [styles.select]: this.checkSelect(secondChild),
                            [styles.disabled]: childDisabled,
                          })}
                        >
                          <MUITooltip title={t(secondChild.title)}>
                            <li
                              className={classnames(
                                {
                                  [styles.selectProject]: this.checkSelect(
                                    secondChild
                                  ),
                                },
                                styles.ProjectLiTag
                              )}
                            >
                              <Link
                                key={secondChild.name}
                                to={
                                  item.cluster
                                    ? `/${prefix}/${item.cluster}/${secondChild.name}`
                                    : `/${prefix}/${secondChild.name}`
                                }
                                disabled={childDisabled}
                              >
                                <span>{t(secondChild.title)}</span>
                                {childDisabled &&
                                  this.renderDisabledTip(secondChild)}
                              </Link>
                            </li>
                          </MUITooltip>
                        </ul>
                      )
                    })}
                  </li>
                )
              }
              return (
                <MUITooltip title={t(child.title)}>
                  <li
                    key={child.name}
                    className={classnames({
                      [styles.select]: this.checkSelect(child),
                      [styles.disabled]: childDisabled,
                    })}
                  >
                    <Link
                      to={
                        item.cluster
                          ? `/${prefix}/${item.cluster}/${child.name}`
                          : `/${prefix}/${child.name}`
                      }
                      disabled={childDisabled}
                    >
                      {t(child.title)}
                      {childDisabled && this.renderDisabledTip(child)}
                    </Link>
                  </li>
                </MUITooltip>
              )
            })}
          </ul>
        </li>
      )
    }
    if (item.children) {
      return (
        <MUITooltip title={t(item.title)}>
          <li
            className={classnames({
              [styles.childSelect]: this.checkSelect(item),
              [styles.open]: item.open || isOpen,
              [styles.disabled]: itemDisabled,
            })}
          >
            <div className={styles.title} onClick={this.handleOpen}>
              <div style={{ width: '90%', display: 'flex' }}>
                <Icon name={item.icon} />
                <div
                  style={{
                    width: 120,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {t(item.title)}
                </div>
              </div>
              {!item.open && (
                <Icon name="chevron-down" className={styles.rightIcon} />
              )}
            </div>
            <ul className={styles.innerNav}>
              {item.children.map(child => {
                const childDisabled =
                  (disabled || child.disabled) && !child.showInDisable
                return (
                  <MUITooltip
                    key={child.name}
                    title={t(child.title)}
                    placement={'right'}
                  >
                    <li
                      className={classnames({
                        [styles.select]: this.checkSelect(child),
                        [styles.disabled]: childDisabled,
                      })}
                    >
                      <Link
                        to={
                          item.cluster
                            ? `/${prefix}/${item.cluster}/${child.name}`
                            : `/${prefix}/${child.name}`
                        }
                        disabled={childDisabled}
                      >
                        {t(child.title)}
                        {childDisabled && this.renderDisabledTip(child)}
                      </Link>
                    </li>
                  </MUITooltip>
                )
              })}
            </ul>
          </li>
        </MUITooltip>
      )
    }

    return (
      <MUITooltip title={item.name}>
        <li
          key={item.name}
          className={classnames({
            [styles.select]: this.checkSelect(item),
            [styles.disabled]: itemDisabled,
          })}
        >
          <Link
            to={
              item.cluster
                ? `/${prefix}/${item.cluster}/${item.name}`
                : `/${prefix}/${item.name}`
            }
            onClick={onClick}
            disabled={itemDisabled}
          >
            <Icon name={item.icon} /> {t(item.title)}
            {itemDisabled && this.renderDisabledTip(item)}
          </Link>
        </li>
      </MUITooltip>
    )
  }
}
