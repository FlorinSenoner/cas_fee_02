import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const BetsList = ({ bets }) => <ul>{bets.map(bet => <li key={bet.id}>{bet.title}</li>)}</ul>

BetsList.propTypes = {
  bets: PropTypes.array.isRequired,
}

const mapStateToProps = state => ({ bets: state.dashboard.bets })

const enhance = connect(mapStateToProps)

export default enhance(BetsList)
