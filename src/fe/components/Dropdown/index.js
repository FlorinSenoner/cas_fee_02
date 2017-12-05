/** @format */

import React from 'react'
import PropTypes from 'prop-types'

import Select from './Select'
import Option from './Option'

const Dropdown = ({ value, values, messages, onToggle }) => {
  const content = values ? (
    values.map(val => <Option key={val} value={val} message={messages[val]} />)
  ) : (
    <option>--</option>
  )

  return (
    <Select value={value} onChange={onToggle}>
      {content}
    </Select>
  )
}

Dropdown.propTypes = {
  onToggle: PropTypes.func,
  values: PropTypes.array,
  value: PropTypes.string,
  messages: PropTypes.object,
}

export default Dropdown
