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

import { getAreaChartOps } from 'utils/monitoring'

import { SimpleArea } from 'components/Charts'

import styles from './index.scss'

export default class LineChart extends React.Component {
  static propTypes = {
    title: PropTypes.string,
    unit: PropTypes.string,
    data: PropTypes.array,
    legendData: PropTypes.array,
  }

  static defaultProps = {
    title: '',
    data: [],
    legendData: [],
  }

  render() {
    const { data, legendData, ...rest } = this.props
    const params = {
      width: '100%',
      legend: legendData,
      data: data.map(item => ({
        values: item,
      })),
      areaColors: ['#329dce', '#c7deef'],
      ...rest,
    }

    return (
      <div className={styles.chart}>
        <SimpleArea {...getAreaChartOps(params)} />
      </div>
    )
  }
}
