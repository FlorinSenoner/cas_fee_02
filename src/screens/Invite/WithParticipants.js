import React from 'react'
import PropTypes from 'prop-types'

import { getParticipants } from '../../services/user.service'

class WithParticipants extends React.PureComponent {
  static propTypes = {
    betId: PropTypes.string.isRequired,
    render: PropTypes.func.isRequired,
  }

  state = { participantUsers: [] }

  componentDidMount() {
    getParticipants(this.props.betId, querySnapshot => {
      this.setState({
        ...this.state,
        participantUsers: querySnapshot.docs.map(doc => doc.data()),
      })
    })
  }

  render() {
    return <div>{this.props.render(this.state.participantUsers)}</div>
  }
}

export default WithParticipants
