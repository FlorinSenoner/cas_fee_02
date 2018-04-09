import React from 'react'
import PropTypes from 'prop-types'
import { branch, renderNothing } from 'recompose'
import isEmpty from 'lodash/fp/isEmpty'
import List from 'material-ui/List'

import { propTypesBet } from '../../../customPropTypes'
import BetCard from './BetCard'

const BetsList = ({ bets, showEnded }) => (
  <List>{bets.filter(bet => showEnded || !bet.result).map(bet => <BetCard key={bet.id} bet={bet} />)}</List>
)

BetsList.propTypes = {
  bets: PropTypes.arrayOf(propTypesBet.isRequired),
  showEnded: PropTypes.bool.isRequired,
}

const enhance = branch(({ bets }) => isEmpty(bets), renderNothing)

export default enhance(BetsList)
