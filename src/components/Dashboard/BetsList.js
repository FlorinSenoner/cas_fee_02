import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const mapStateToProps = state => ({ bets: state.bets.bets })

const BetsList = ({ bets }) => <ul>{bets.map(el => <li key={el.id}>{el.title}</li>)}</ul>

BetsList.propTypes = {
  bets: PropTypes.array.isRequired,
}

export default connect(mapStateToProps)(BetsList)
