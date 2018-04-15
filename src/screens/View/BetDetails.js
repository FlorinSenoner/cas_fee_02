import React, { Fragment } from 'react'
import Typography from 'material-ui/Typography'
import { CardHeader, CardContent } from 'material-ui/Card'
import PropTypes from 'prop-types'
import { format } from 'date-fns'
import { propTypesBet } from '../../customPropTypes'
import WithParticipants from '../WithParticipants'
import Guesses from './Guesses'

class BetDetails extends React.PureComponent {
  static propTypes = {
    bet: propTypesBet.isRequired,
    currentUid: PropTypes.string.isRequired,
    isAdmin: PropTypes.bool.isRequired,
  }

  render() {
    const { bet, currentUid, isAdmin } = this.props

    return (
      <Fragment>
        <CardHeader title={bet.title} subheader={`created: ${format(bet.dateCreated, 'dddd, DD MMM, YYYY')}`} />
        <CardContent>
          <Typography variant="subheading">Status</Typography>
          <Typography variant="body2" gutterBottom>
            {bet.result
              ? `Ended. Result: ${bet.result}`
              : `still running  ${bet.dateEnd ? `, will end on: ${format(bet.dateEnd, 'dddd, DD MMM, YYYY')}` : ''}`}
          </Typography>
          <Typography variant="subheading">Visibility</Typography>
          <Typography variant="body2" gutterBottom>
            {bet.visibility}
          </Typography>
          {bet.description && (
            <Fragment>
              <Typography variant="subheading">Description</Typography>
              <Typography variant="body2" gutterBottom>
                {bet.description}
              </Typography>
            </Fragment>
          )}
          <Typography variant="subheading">Participants</Typography>
          <WithParticipants
            betId={bet.id}
            render={participantUsers => (
              <Guesses
                betId={bet.id}
                result={bet.result}
                currentUid={currentUid}
                showAllGuesses={isAdmin || !!bet.result}
                users={participantUsers}
              />
            )}
          />
        </CardContent>
      </Fragment>
    )
  }
}

export default BetDetails
