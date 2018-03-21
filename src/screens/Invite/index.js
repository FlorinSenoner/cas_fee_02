import React from 'react'
import PropTypes from 'prop-types'
import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import Button from 'material-ui/Button'
import { withStyles } from 'material-ui/styles'
import { compose } from 'recompose'

import { propTypesBet } from '../../customPropTypes'
import DefaultPage from '../../components/DefaultPage'
import InviteForm from './InviteForm'
import Participant from './Participant'
import { addParticipant, getBet } from '../../services/bet.service'

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
})

const handleSubmit = (betId, participant) => {
  addParticipant(betId, participant)
}

const Invite = ({ changePage, classes, match }) => (
  <DefaultPage>
    {console.log('Match? ', match)}
    <h1>Invite some people</h1>
    <InviteWithBet
      betId={match.params.id}
      render={bet => (
        <div>
          <InviteForm bet={bet} onSubmit={handleSubmit} />
          {bet.participants &&
            bet.participants.map(participant => <Participant key={participant.id} user={participant} />)}
        </div>
      )}
    />

    <Button variant="raised" color="primary" onClick={() => changePage('/')} className={classes.button}>
      cancel
    </Button>
  </DefaultPage>
)

class InviteWithBet extends React.PureComponent {
  state = { bet: {} }

  componentDidMount() {
    getBet(this.props.betId)
      .then(doc => {
        if (doc.exists) {
          this.setState({ ...this.state, bet: doc.data() })
        } else {
          console.log('No document found with id ', this.props.betId)
        }
      })
      .catch(error => {
        console.log('Error getting bet', error)
      })
  }

  render() {
    return <div>{this.props.render(this.state.bet)}</div>
  }
}

Invite.propTypes = {
  classes: PropTypes.object.isRequired,
  changePage: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  user: state.signIn.user,
})

const mapDispatchToProps = {
  changePage: push,
}

const enhance = compose(withStyles(styles), connect(mapStateToProps, mapDispatchToProps))

export default enhance(Invite)
