import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import Button from 'material-ui/Button'
import { withStyles } from 'material-ui/styles'
import { compose } from 'recompose'
import { reset } from 'redux-form'
import Done from 'material-ui-icons/Done'

import DefaultPage from '../../components/DefaultPage'
import InviteForm from './InviteForm'
import WithParticipants from '../WithParticipants'
import Participants from './Participants'
import { userSelector } from '../SignIn/selectors'
import { addParticipant, removeParticipant } from '../../services/bet.service'
import { getUserByEmail, addParticipation, removeParticipation } from '../../services/user.service'

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
})

class Invite extends React.PureComponent {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    changePage: PropTypes.func.isRequired,
    resetForm: PropTypes.func.isRequired,
    match: PropTypes.object.isRequired,
  }

  removeParticipant = (userId, betId) => {
    removeParticipant(betId, userId)
    removeParticipation(userId, betId)
  }

  addParticipant = async values => {
    try {
      const participant = await getUserByEmail(values.participant)
      addParticipant(this.props.match.params.id, participant.uid)
      addParticipation(participant.uid, this.props.match.params.id)
      this.props.resetForm('InviteForm')
    } catch (error) {
      console.error('Error adding participant!', error)
    }
  }

  render() {
    const { changePage, classes, match } = this.props
    return (
      <DefaultPage linkToDashboard>
        <h1>Invite some people</h1>
        <WithParticipants
          betId={match.params.id}
          render={participantUsers => (
            <Fragment>
              <InviteForm participants={participantUsers} onSubmit={this.addParticipant} />
              {participantUsers.length > 0 && (
                <Participants
                  users={participantUsers}
                  betId={match.params.id}
                  removeParticipant={this.removeParticipant}
                />
              )}
            </Fragment>
          )}
        />

        <Button variant="raised" color="primary" onClick={() => changePage('/')} className={classes.button}>
          done
          <Done className={classes.rightIcon} />
        </Button>
      </DefaultPage>
    )
  }
}

const mapStateToProps = state => ({
  user: userSelector(state),
})

const mapDispatchToProps = {
  changePage: push,
  resetForm: reset,
}

const enhance = compose(withStyles(styles), connect(mapStateToProps, mapDispatchToProps))

export default enhance(Invite)
