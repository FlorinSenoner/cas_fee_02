import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Switch from 'material-ui/Switch'
import { compose, withState, withHandlers } from 'recompose'

import BetsList from './BetList'
import CreateBtn from './CreateBtn'
import { propTypesBet } from '../../customPropTypes'
import DefaultPage from '../../components/DefaultPage'
import { myBetsSelectorEnded, invitesSelectorEnded, guessesSelectorEnded } from '../App/selectors'

class Dashboard extends PureComponent {
  static propTypes = {
    myBets: PropTypes.arrayOf(propTypesBet).isRequired,
    invites: PropTypes.arrayOf(propTypesBet).isRequired,
    guesses: PropTypes.arrayOf(propTypesBet).isRequired,
    showEnded: PropTypes.bool.isRequired,
    toggleEnded: PropTypes.func.isRequired,
  }

  render() {
    return (
      <DefaultPage>
        Show ended bets?
        <Switch checked={this.props.showEnded} onChange={this.props.toggleEnded} color="primary" />
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

const mapStateToProps = (state, ownProps) => ({
  myBets: myBetsSelectorEnded(state, ownProps.showEnded),
  invites: invitesSelectorEnded(state, ownProps.showEnded),
  guesses: guessesSelectorEnded(state, ownProps.showEnded),
})

const enhance = compose(
  withState('showEnded', 'setShowEnded', false),
  withHandlers({
    toggleEnded: props => () => props.setShowEnded(!props.showEnded),
  }),
  connect(mapStateToProps),
)

export default enhance(Dashboard)
