/** @format */

import React from 'react'
import PropTypes from 'prop-types'
import { injectIntl, intlShape } from 'react-intl'

const Option = ({ value, message, intl: { formatMessage } }) => (
  <option value={value}>{message ? formatMessage(message) : value}</option>
)

Option.propTypes = {
  value: PropTypes.string.isRequired,
  message: PropTypes.object,
  // eslint-disable-next-line react/no-typos
  intl: intlShape.isRequired,
}

export default injectIntl(Option)
