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
import { mount } from 'enzyme'

import Steps from './index'

it('renders correctly', () => {
  const steps = [
    { title: 'step1', component: <p>step1</p>, required: true },
    { title: 'step2', component: <p>step2</p>, required: true },
  ]
  const wrapper = mount(<Steps steps={steps} current={0} />)

  const lists = wrapper.find('ul li')
  expect(lists).toHaveLength(2)
  expect(lists.first().hasClass('current')).toEqual(true)
})
