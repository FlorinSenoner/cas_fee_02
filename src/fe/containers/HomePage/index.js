/** @format */

import React from 'react'
import { injectIntl, intlShape } from 'react-intl'
import messages from './messages'

const HomePage = ({ intl: { formatMessage } }) => (
  <div>
    <p>{formatMessage(messages.header)}</p>
  </div>
)

HomePage.propTypes = {
  // eslint-disable-next-line react/no-typos
  intl: intlShape.isRequired,
}

const enhance = injectIntl

export default enhance(HomePage)
