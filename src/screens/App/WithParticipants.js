import React from 'react'
import PropTypes from 'prop-types'
import { compose, withHandlers, withState } from 'recompose'

import { getParticipants } from '../../services/user.service'

class WithParticipants extends React.PureComponent {
  static propTypes = {
    betId: PropTypes.string.isRequired,
    render: PropTypes.func.isRequired,
    setLoading: PropTypes.func.isRequired,
    isLoading: PropTypes.arrayOf(PropTypes.string).isRequired,
  }

  state = { participantUsers: [] }

  componentDidMount() {
    this.unsubscribeParticipants = getParticipants(this.props.betId, querySnapshot => {
      this.setState({
        ...this.state,
        participantUsers: querySnapshot.docs.map(doc => doc.data()),
      })
      if (!this.props.isLoading.includes('Participants')) {
        this.props.setLoading('Participants')
      }
    })
  }

  componentWillUnmount() {
    this.unsubscribeParticipants()
  }

  render() {
    return (
      <div data-test-id={`LoadingState_${this.props.isLoading.join('_')}`}>
        {this.props.render(this.state.participantUsers)}
      </div>
    )
  }
}

const enhance = compose(
  withState('isLoading', 'setIsLoading', []),
  withHandlers({
    setLoading: props => update => props.setIsLoading([...props.isLoading, update].sort()),
  }),
)

export default enhance(WithParticipants)
