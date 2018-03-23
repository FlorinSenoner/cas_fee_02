import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import Button from 'material-ui/Button'
import { withStyles } from 'material-ui/styles'
import { compose } from 'recompose'
import { reset } from 'redux-form'

import DefaultPage from '../../components/DefaultPage'
import InviteForm from './InviteForm'
import Participant from './Participant'
import { addParticipants } from '../../services/bet.service'
import { getUserByEmail, addParticipation, getParticipants } from '../../services/user.service'

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
})

class Invite extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    changePage: PropTypes.func.isRequired,
    resetForm: PropTypes.func.isRequired,
    match: PropTypes.object.isRequired,
  }

  render() {
    const { changePage, classes, match, resetForm } = this.props
    return (
      <DefaultPage>
        <h1>Invite some people</h1>
        <InviteWithBet
          betId={match.params.id}
          resetForm={resetForm}
          render={(bet, handleSubmit) => (
            <Fragment>
              <InviteForm participants={bet.participants} onSubmit={handleSubmit} />
              {bet.participants.map(participant => <Participant key={participant.uid} user={participant} />)}
            </Fragment>
          )}
        />

        <Button variant="raised" color="primary" onClick={() => changePage('/')} className={classes.button}>
          done
        </Button>
      </DefaultPage>
    )
  }
}

class InviteWithBet extends React.PureComponent {
  state = { bet: { participants: [] } }

  async componentDidMount() {
    getParticipants(this.props.betId, querySnapshot => {
      const participants = []
      querySnapshot.forEach(doc => participants.push(doc.data()))
      this.setState({ ...this.state, bet: { ...this.state.bet, participants } })
    })
  }

  handleSubmit = async values => {
    try {
      const participant = await getUserByEmail(values.participant)
      const newPart = {}
      newPart[participant.uid] = 0
      await addParticipants(this.props.betId, { ...this.state.bet.participants, ...newPart })
      const someVar = {}
      someVar[this.props.betId] = 0
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

const mapStateToProps = state => ({
  user: state.signIn.user,
})

const mapDispatchToProps = {
  changePage: push,
  resetForm: reset,
}

const enhance = compose(withStyles(styles), connect(mapStateToProps, mapDispatchToProps))

export default enhance(Invite)
