import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import DefaultPage from '../../components/DefaultPage'
import BetsList from '../../components/Dashboard/BetsList'
import CreateBtn from '../../components/Dashboard/CreateBtn'
import { onBetsUpdate } from '../../services/bet.service'
import { betsUpdate } from '../../actions'

class Dashboard extends React.Component {
  static propTypes = {
    betsUpdate: PropTypes.func.isRequired,
  }

  constructor() {
    super()
    this.updateBets = this.updateBets.bind(this)
  }

  componentDidMount() {
    onBetsUpdate(this.updateBets)
  }

  updateBets(querySnapshot) {
    console.log('App, index.js: updating bets with snapshot: ', querySnapshot)
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

const mapDispatchToProps = dispatch => {
  return {
    betsUpdate: bets => dispatch(betsUpdate(bets)),
  }
}

export default connect(null, mapDispatchToProps)(Dashboard)
