import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import DefaultPage from '../../components/DefaultPage'
import BetsList from './BetsList'
import { onBetsUpdate } from '../../services/bet.service'
import { betsUpdate } from './actions'
import CreateBtn from './CreateBtn'

// const mockBets = [
//   {
//     title: 'lalalala',
//     id: 1,
//   },
//   {
//     title: 'boooo',
//     id: 2,
//   },
//   {
//     title: 'sali',
//     id: 3,
//   },
//   {
//     title: 'wettemer',
//     id: 4,
//   },
// ]

class Dashboard extends Component {
  componentDidMount() {
    onBetsUpdate(this.updateBets)
    // this.props.betsUpdate(mockBets)
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

Dashboard.propTypes = {
  betsUpdate: PropTypes.func.isRequired,
}

const mapDispatchToProps = dispatch => ({
  betsUpdate: bets => dispatch(betsUpdate(bets)),
})

const enhance = connect(null, mapDispatchToProps)

export default enhance(Dashboard)
