import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose, branch, renderNothing } from 'recompose'
import isEmpty from 'lodash/fp/isEmpty'
import List from 'material-ui/List'

import BetCard from './BetCard'

const BetsList = ({ bets }) => <List>{bets.map(bet => <BetCard key={bet.id} bet={bet} />)}</List>

BetsList.propTypes = {
  bets: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
}

const mapStateToProps = state => ({ bets: state.dashboard.bets })

const enhance = compose(connect(mapStateToProps), branch(({ bets }) => isEmpty(bets), renderNothing))

export default enhance(BetsList)
