import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { getBetById } from '../../services/bet.service'

class WithBet extends PureComponent {
  static propTypes = {
    betId: PropTypes.string.isRequired,
    render: PropTypes.func.isRequired,
  }

  state = { bet: {} }

  async componentWillMount() {
    const bet = await getBetById(this.props.betId)
    this.setState({
      ...this.state,
      bet,
    })
  }

  render() {
    return <div>{this.props.render(this.state.bet)}</div>
  }
}

const mapStateToProps = state => ({
  bet: state.signIn.user,
})

const enhance = connect(mapStateToProps)

export default enhance(WithBet)
