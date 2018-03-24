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
import Participants from './Participants'
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
              <InviteForm participants={bet.participantUsers} onSubmit={handleSubmit} />
              <Participants users={bet.participantUsers} />
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

const mapStateToProps = state => ({
  user: state.signIn.user,
})

const mapDispatchToProps = {
  changePage: push,
  resetForm: reset,
}

const enhance = compose(withStyles(styles), connect(mapStateToProps, mapDispatchToProps))

export default enhance(Invite)
