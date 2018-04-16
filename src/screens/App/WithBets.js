import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose, withHandlers, withState } from 'recompose'
import { onMyBetsUpdate, onGuessesUpdate, onInvitesUpdate } from '../../services/bet.service'
import { myBetsUpdate, guessesUpdate, invitesUpdate } from './betActions'
import { propTypesUser } from '../../customPropTypes'

class WithBets extends Component {
  static propTypes = {
    myBetsUpdate: PropTypes.func.isRequired,
    invitesUpdate: PropTypes.func.isRequired,
    guessesUpdate: PropTypes.func.isRequired,
    setLoading: PropTypes.func.isRequired,
    isLoading: PropTypes.arrayOf(PropTypes.string).isRequired,
    user: propTypesUser.isRequired,
  }

  componentDidMount() {
    this.unsubscribeMyBets = onMyBetsUpdate(this.props.user.uid, this.updateMyBets)
    this.unsubscribeInvites = onInvitesUpdate(this.props.user.uid, this.updateInvites)
    this.unsubscribeGuesses = onGuessesUpdate(this.props.user.uid, this.updateGuesses)
  }

  componentWillUnmount() {
    this.unsubscribeMyBets()
    this.unsubscribeInvites()
    this.unsubscribeGuesses()
  }

  extractBets = querySnapshot => querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }))

  updateMyBets = querySnapshot => {
    this.props.myBetsUpdate(this.extractBets(querySnapshot))
    if (!this.props.isLoading.includes('MyBets')) {
      this.props.setLoading('MyBets')
    }
  }

  updateGuesses = querySnapshot => {
    this.props.guessesUpdate(this.extractBets(querySnapshot))
    if (!this.props.isLoading.includes('Guesses')) {
      this.props.setLoading('Guesses')
    }
  }

  updateInvites = querySnapshot => {
    this.props.invitesUpdate(this.extractBets(querySnapshot))
    if (!this.props.isLoading.includes('Invites')) {
      this.props.setLoading('Invites')
    }
  }

  render() {
    return <div style={{ display: 'none' }} data-test-id={`LoadingState_${this.props.isLoading.join('_')}`} />
  }
}

const mapDispatchToProps = dispatch => ({
  myBetsUpdate: bets => dispatch(myBetsUpdate(bets)),
  invitesUpdate: bets => dispatch(invitesUpdate(bets)),
  guessesUpdate: bets => dispatch(guessesUpdate(bets)),
})

const enhance = compose(
  withState('isLoading', 'setIsLoading', []),
  withHandlers({
    setLoading: props => update => props.setIsLoading([...props.isLoading, update].sort()),
  }),
  connect(null, mapDispatchToProps),
)

export default enhance(WithBets)
