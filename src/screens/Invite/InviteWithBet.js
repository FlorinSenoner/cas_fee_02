import React from 'react'
import PropTypes from 'prop-types'

import { addParticipants } from '../../services/bet.service'
import { getUserByEmail, addParticipation, getParticipants } from '../../services/user.service'

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

  handleSubmit = async values => {
    try {
      const participant = await getUserByEmail(values.participant)
      const newPart = {}
      newPart[participant.uid] = ''
      await addParticipants(this.props.betId, { ...this.state.bet.participants, ...newPart })
      const someVar = {}
      someVar[this.props.betId] = ''
      await addParticipation(participant.uid, { ...participant.participations, ...someVar })
      this.props.resetForm('InviteForm')
    } catch (error) {
      console.error('Error adding participant!', error)
    }
  }

  render() {
    return <div>{this.props.render(this.state.bet, this.handleSubmit)}</div>
  }
}

export default InviteWithBet
