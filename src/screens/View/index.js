import React from 'react'
import PropTypes from 'prop-types'
import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import Button from 'material-ui/Button'
import AddMoreIcon from 'material-ui-icons/GroupAdd'
import { withStyles } from 'material-ui/styles'
import { compose, branch, renderNothing } from 'recompose'
import { propTypesBet, propTypesUser } from '../../customPropTypes'
import WithParticipants from '../WithParticipants'
import Guesses from './Guesses'
import TakeAGuess from './TakeAGuess'
import EndBet from './EndBet'
import { takeAGuess } from '../../services/user.service'
import { addGuess, endBet } from '../../services/bet.service'
import DefaultPage from '../../components/DefaultPage'
import { userSelector } from '../SignIn/selectors'
import { betIdSelector } from '../App/selectors'

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
})

class View extends React.PureComponent {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    changePage: PropTypes.func.isRequired,
    bet: propTypesBet.isRequired,
    user: propTypesUser.isRequired,
  }

  toInvite = () => this.props.changePage(`/bet/${this.props.bet.id}/invite`)
  isAdmin = () => this.props.user.uid === this.props.bet.admin
  addGuess = guess => {
    takeAGuess(this.props.user.uid, this.props.bet.id, guess)
    addGuess(this.props.bet.id, this.props.user.uid, guess)
  }
  endTheBet = result => {
    endBet(this.props.bet.id, result)
  }
  canTakeGuess = () => this.props.bet.participants && !this.props.bet.participants[this.props.user.uid]
  canEndBet = () => this.isAdmin() && !this.props.bet.result

  render() {
    const { classes, bet, user } = this.props
    return (
      <DefaultPage linkToDashboard>
        <h1>{bet.title}</h1>
        <p>{bet.result ? `Ended. Result: ${bet.result}` : 'still running'}</p>
        <WithParticipants
          betId={bet.id}
          render={participantUsers => (
            <Guesses
              betId={bet.id}
              currentUid={user.uid}
              showAllGuesses={this.isAdmin() || bet.result}
              users={participantUsers}
            />
          )}
        />
        {this.canTakeGuess() && <TakeAGuess handleGuess={this.addGuess} />}
        {this.canEndBet() && <EndBet handleEndBet={this.endTheBet} />}
        {this.isAdmin() &&
          !bet.result && (
            <Button
              variant="raised"
              color="primary"
              aria-label="invite more people"
              onClick={this.toInvite}
              className={classes.button}
            >
              Invite <AddMoreIcon className={classes.rightIcon} />
            </Button>
          )}
      </DefaultPage>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  user: userSelector(state),
  bet: betIdSelector(state, ownProps.match.params.id),
})

const mapDispatchToProps = {
  changePage: push,
}

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  branch(({ bet }) => !bet, renderNothing),
  withStyles(styles),
)

export default enhance(View)
