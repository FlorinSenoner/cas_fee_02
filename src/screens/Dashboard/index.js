import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import BetsList from './BetList'
import CreateBtn from './CreateBtn'
import { myBetsUpdate, guessesUpdate, invitesUpdate } from './actions'
import { propTypesBet } from '../../customPropTypes'
import DefaultPage from '../../components/DefaultPage'
import { onMyBetsUpdate, onGuessesUpdate, onInvitesUpdate } from '../../services/bet.service'

class Dashboard extends PureComponent {
  static propTypes = {
    myBetsUpdate: PropTypes.func.isRequired,
    invitesUpdate: PropTypes.func.isRequired,
    guessesUpdate: PropTypes.func.isRequired,
    myBets: PropTypes.arrayOf(propTypesBet).isRequired,
    invites: PropTypes.arrayOf(propTypesBet).isRequired,
    guesses: PropTypes.arrayOf(propTypesBet).isRequired,
    userId: PropTypes.string.isRequired,
  }

  static extractBets(querySnapshot) {
    return querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }))
  }

  componentDidMount() {
    onMyBetsUpdate(this.props.userId, this.updateMyBets)
    onInvitesUpdate(this.props.userId, this.updateInvites)
    onGuessesUpdate(this.props.userId, this.updateGuesses)
  }

  updateMyBets = querySnapshot => {
    this.props.myBetsUpdate(Dashboard.extractBets(querySnapshot))
  }

  updateGuesses = querySnapshot => {
    this.props.guessesUpdate(Dashboard.extractBets(querySnapshot))
  }

  updateInvites = querySnapshot => {
    this.props.invitesUpdate(Dashboard.extractBets(querySnapshot))
  }

  render() {
    return (
      <DefaultPage>
        <h3>Invites</h3>
        <BetsList bets={this.props.invites} />
        <h3>My Bets</h3>
        <BetsList bets={this.props.myBets} />
        <h3>My Guesses</h3>
        <BetsList bets={this.props.guesses} />
        <CreateBtn />
      </DefaultPage>
    )
  }
}

const mapStateToProps = state => ({
  myBets: state.dashboard.myBets,
  invites: state.dashboard.invites,
  guesses: state.dashboard.guesses,
  userId: state.signIn.user.uid,
})

const mapDispatchToProps = dispatch => ({
  myBetsUpdate: bets => dispatch(myBetsUpdate(bets)),
  invitesUpdate: bets => dispatch(invitesUpdate(bets)),
  guessesUpdate: bets => dispatch(guessesUpdate(bets)),
})

const enhance = connect(mapStateToProps, mapDispatchToProps)

export default enhance(Dashboard)
