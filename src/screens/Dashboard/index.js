import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Switch from 'material-ui/Switch'

import BetsList from './BetList'
import CreateBtn from './CreateBtn'
import { propTypesBet } from '../../customPropTypes'
import DefaultPage from '../../components/DefaultPage'
import { myBetsSelector, invitesSelector, guessesSelector } from '../App/selectors'

class Dashboard extends PureComponent {
  static propTypes = {
    myBets: PropTypes.arrayOf(propTypesBet).isRequired,
    invites: PropTypes.arrayOf(propTypesBet).isRequired,
    guesses: PropTypes.arrayOf(propTypesBet).isRequired,
  }

  state = {
    showEnded: true,
  }

  handleShowEnded = event => {
    this.setState({ showEnded: event.target.checked })
  }

  render() {
    return (
      <DefaultPage>
        Show ended bets?
        <Switch checked={this.state.showEnded} onChange={this.handleShowEnded} color="primary" />
        <h3>Invites</h3>
        <BetsList bets={this.props.invites} showEnded={this.state.showEnded} />
        <h3>My Bets</h3>
        <BetsList bets={this.props.myBets} showEnded={this.state.showEnded} />
        <h3>My Guesses</h3>
        <BetsList bets={this.props.guesses} showEnded={this.state.showEnded} />
        <CreateBtn />
      </DefaultPage>
    )
  }
}

const mapStateToProps = state => ({
  myBets: myBetsSelector(state),
  invites: invitesSelector(state),
  guesses: guessesSelector(state),
})

const enhance = connect(mapStateToProps)

export default enhance(Dashboard)
