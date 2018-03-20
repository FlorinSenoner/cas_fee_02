import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import DefaultPage from '../../components/DefaultPage'
import BetsList from './BetsList'
import { onBetsUpdate } from '../../services/bet.service'
import { betsUpdate } from './actions'
import CreateBtn from './CreateBtn'

class Dashboard extends PureComponent {
  static propTypes = {
    betsUpdate: PropTypes.func.isRequired,
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
        <BetsList />
        <CreateBtn />
      </DefaultPage>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  betsUpdate: bets => dispatch(betsUpdate(bets)),
})

const enhance = connect(null, mapDispatchToProps)

export default enhance(Dashboard)
