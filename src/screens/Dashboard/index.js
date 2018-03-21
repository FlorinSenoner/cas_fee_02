import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import BetsList from './BetList'
import CreateBtn from './CreateBtn'
import { betsUpdate } from './actions'
import { propTypesBet } from '../../customPropTypes'
import DefaultPage from '../../components/DefaultPage'
import { onBetsUpdate } from '../../services/bet.service'

class Dashboard extends PureComponent {
  static propTypes = {
    betsUpdate: PropTypes.func.isRequired,
    bets: PropTypes.arrayOf(propTypesBet.isRequired).isRequired,
  }

  componentDidMount() {
    onBetsUpdate(this.updateBets)
  }

  updateBets = querySnapshot => {
    console.log('App, CreateBetForm.js: updating bets with snapshot: ', querySnapshot)
    const bets = []
    querySnapshot.forEach(doc => {
      bets.push({ ...doc.data(), id: doc.id })
    })
    this.props.betsUpdate(bets)
  }

  render() {
    return (
      <DefaultPage>
        <h1>Dashboard</h1>
        <BetsList bets={this.props.bets} />
        <CreateBtn />
      </DefaultPage>
    )
  }
}

const mapStateToProps = state => ({ bets: state.dashboard.bets })

const mapDispatchToProps = dispatch => ({
  betsUpdate: bets => dispatch(betsUpdate(bets)),
})

const enhance = connect(mapStateToProps, mapDispatchToProps)

export default enhance(Dashboard)
