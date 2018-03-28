import React from 'react'
import PropTypes from 'prop-types'

import { addParticipant, removeParticipant } from '../../services/bet.service'
import { getUserByEmail, addParticipation, removeParticipation, getParticipants } from '../../services/user.service'

class InviteWithBet extends React.PureComponent {
  static propTypes = {
    betId: PropTypes.string.isRequired,
    resetForm: PropTypes.func.isRequired,
    render: PropTypes.func.isRequired,
  }

  state = { bet: { participantUsers: [] } }

  async componentDidMount() {
    getParticipants(this.props.betId, querySnapshot => {
      this.setState({
        ...this.state,
        bet: { ...this.state.bet, participantUsers: querySnapshot.docs.map(doc => doc.data()) },
      })
    })
  }

  removeParticipant(userId, betId) {
    removeParticipant(betId, userId)
    removeParticipation(userId, betId)
  }

  addParticipant = async values => {
    try {
      const participant = await getUserByEmail(values.participant)
      addParticipant(this.props.betId, participant.uid)
      addParticipation(participant.uid, this.props.betId)
      this.props.resetForm('InviteForm')
    } catch (error) {
      console.error('Error adding participant!', error)
    }
  }

  render() {
    return <div>{this.props.render(this.state.bet, this.addParticipant, this.removeParticipant)}</div>
  }
}

export default InviteWithBet
