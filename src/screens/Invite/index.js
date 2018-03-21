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
import { addParticipant, getBet } from '../../services/bet.service'

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
        {console.log('Match? ', match)}
        <h1>Invite some people</h1>
        <InviteWithBet
          betId={match.params.id}
          resetForm={resetForm}
          render={(bet, handleSubmit) => (
            <Fragment>
              <InviteForm participants={bet.participants} onSubmit={handleSubmit} />
              {bet.participants &&
                bet.participants.map(participant => <Participant key={participant.id} user={participant} />)}
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
  state = { bet: {} }

  async componentWillMount() {
    try {
      const doc = await getBet(this.props.betId)
      if (doc.exists) {
        this.setState({ ...this.state, bet: doc.data() })
      } else {
        console.log('No document found with id ', this.props.betId)
      }
    } catch (error) {
      console.log('Error getting bet', error)
    }
  }

  handleSubmit = async values => {
    // console.log(this.props.reset)
    await addParticipant(this.props.betId, this.state.bet.participants, values.participant)
    this.setState({
      ...this.state,
      bet: { ...this.state.bet, participants: [...this.state.bet.participants, { id: values.participant }] },
    })
    this.props.resetForm('InviteForm')
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
