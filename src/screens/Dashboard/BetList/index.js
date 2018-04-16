import React from 'react'
import PropTypes from 'prop-types'
import { branch, renderNothing } from 'recompose'
import isEmpty from 'lodash/fp/isEmpty'
import List from 'material-ui/List'

import { propTypesBet } from '../../../customPropTypes'
import BetCard from './BetCard'

const BetsList = ({ bets, selector }) => (
  <List data-test-id={selector}>{bets.map(bet => <BetCard key={bet.id} bet={bet} />)}</List>
)

BetsList.propTypes = {
  bets: PropTypes.arrayOf(propTypesBet.isRequired),
  selector: PropTypes.string.isRequired,
}

const enhance = branch(({ bets }) => isEmpty(bets), renderNothing)

export default enhance(BetsList)
