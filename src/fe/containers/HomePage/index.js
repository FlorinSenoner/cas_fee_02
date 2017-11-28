import React from 'react'
import { injectIntl } from 'react-intl'
import PropTypes from 'prop-types'
import messages from './messages'

const HomePage = ({ intl: { formatMessage } }) => (
  <div>
    <p>{formatMessage(messages.header)}</p>
  </div>
)

HomePage.propTypes = {
  intl: PropTypes.shape({
    formatMessage: PropTypes.func.isRequired,
  }),
}

const enhance = injectIntl

export default enhance(HomePage)
