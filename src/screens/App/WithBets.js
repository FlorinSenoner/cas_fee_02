import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { onMyBetsUpdate, onGuessesUpdate, onInvitesUpdate } from '../../services/bet.service'
import { myBetsUpdate, guessesUpdate, invitesUpdate } from './betActions'
import { propTypesUser } from '../../customPropTypes'

class WithBets extends PureComponent {
  static propTypes = {
    myBetsUpdate: PropTypes.func.isRequired,
    invitesUpdate: PropTypes.func.isRequired,
    guessesUpdate: PropTypes.func.isRequired,
    user: propTypesUser.isRequired,
  }

  componentDidMount() {
    onMyBetsUpdate(this.props.user.uid, this.updateMyBets)
    onInvitesUpdate(this.props.user.uid, this.updateInvites)
    onGuessesUpdate(this.props.user.uid, this.updateGuesses)
  }

  extractBets = querySnapshot => querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }))

  updateMyBets = querySnapshot => {
    this.props.myBetsUpdate(this.extractBets(querySnapshot))
  }

  updateGuesses = querySnapshot => {
    this.props.guessesUpdate(this.extractBets(querySnapshot))
  }

  updateInvites = querySnapshot => {
    this.props.invitesUpdate(this.extractBets(querySnapshot))
  }

  render() {
    return <div />
  }
}

const mapDispatchToProps = dispatch => ({
  myBetsUpdate: bets => dispatch(myBetsUpdate(bets)),
  invitesUpdate: bets => dispatch(invitesUpdate(bets)),
  guessesUpdate: bets => dispatch(guessesUpdate(bets)),
})

const enhance = connect(null, mapDispatchToProps)

export default enhance(WithBets)
