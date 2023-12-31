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
import classnames from 'classnames'
import { isEmpty, isEqual, remove } from 'lodash'

import { COLORS_MAP } from 'utils/constants'

import {
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  Legend,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
} from 'recharts'
import CustomLegend from 'components/Charts/Custom/Legend'
import CustomTooltip from 'components/Charts/Custom/Tooltip'
import { getActiveSeries } from 'components/Charts/utils'

import styles from './index.scss'

const AreaColors = ['green', 'blue', 'yellow']

export default class SimpleBar extends React.Component {
  static propTypes = {
    theme: PropTypes.oneOf(['light', 'dark']),
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    xKey: PropTypes.string,
    unit: PropTypes.string,
    data: PropTypes.array,
    areaColors: PropTypes.array,
    renderTitle: PropTypes.func,
    renderBar: PropTypes.func,
  }

  static defaultProps = {
    theme: 'light',
    width: '100%',
    height: 200,
    title: 'Title',
    xKey: 'time',
    unit: '',
    areaColors: AreaColors,
    data: [],
  }

  constructor(props) {
    super(props)

    const series = getActiveSeries(props)
    this.state = {
      series,
      activeSeries: series,
    }
  }

  static getDerivedStateFromProps(props, state) {
    const series = getActiveSeries(props)
    if (!isEqual(series, state.series)) {
      return {
        series,
        activeSeries: series,
      }
    }
    return null
  }

  handleLegendClick = (e, key) => {
    const activeSeries = [...this.state.activeSeries]

    if (activeSeries.includes(key)) {
      remove(activeSeries, item => item === key)
    } else {
      activeSeries.push(key)
    }

    this.setState({ activeSeries })
  }

  renderTitle() {
    const { title, unit, renderTitle } = this.props

    const text = renderTitle
      ? renderTitle()
      : isEmpty(unit)
      ? t(title)
      : `${t(title)} (${unit})`
    return <div className={styles.title}>{text}</div>
  }

  renderLegend() {
    return (
      <Legend
        wrapperStyle={{
          top: 0,
          left: 'auto',
          right: 0,
          width: '70%',
          zIndex: 1001,
        }}
        content={
          <CustomLegend
            activeSeries={this.state.activeSeries}
            onClick={this.handleLegendClick}
          />
        }
      />
    )
  }

  renderBar() {
    const { unit, areaColors, renderBar } = this.props

    if (renderBar) {
      return renderBar()
    }

    return this.series.map((key, index) => {
      const colorName = areaColors[index]
      const color = COLORS_MAP[colorName] || colorName

      return (
        <Bar
          key={key}
          dataKey={key}
          stroke={color}
          fill={`url(#${colorName}-area)`}
          unit={unit}
          hide={!this.state.activeSeries.includes(key)}
        />
      )
    })
  }

  render() {
    const { theme, width, height, xKey, data } = this.props
    const classNames = classnames(styles.chart, 'chart', `chart-${theme}`)

    return (
      <div className={classNames} style={{ width, height }}>
        {this.renderTitle()}
        <ResponsiveContainer width="100%" height="100%" debounce={1}>
          <BarChart
            data={data}
            margin={{ top: 50, bottom: -20, left: 0, right: 20 }}
          >
            <CartesianGrid
              stroke="#d8dee5"
              strokeDasharray="2 3"
              vertical={false}
            />
            <XAxis dataKey={xKey} axisLine={false} tickLine={false} />
            <YAxis
              width={45}
              axisLine={false}
              tickLine={false}
              tickFormatter={value => (value > 0 ? value : '')}
            />
            <Tooltip
              wrapperStyle={{ zIndex: 1000 }}
              cursor={
                theme === 'dark'
                  ? {
                      fill: COLORS_MAP['lightest'],
                      fillOpacity: 0.2,
                    }
                  : {
                      fill: COLORS_MAP['grey'],
                    }
              }
              content={<CustomTooltip />}
            />
            {this.renderLegend()}
            {this.renderBar()}
          </BarChart>
        </ResponsiveContainer>
      </div>
    )
  }
}
