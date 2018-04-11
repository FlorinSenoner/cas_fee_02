import React from 'react'
import PropTypes from 'prop-types'
import { push, replace } from 'react-router-redux'
import { connect } from 'react-redux'
import Button from 'material-ui/Button'
import Group from 'material-ui-icons/Group'
import { withStyles } from 'material-ui/styles'
import { compose, branch, renderNothing } from 'recompose'
import { propTypesBet, propTypesUser } from '../../customPropTypes'
import WithParticipants from '../WithParticipants'
import Guesses from './Guesses'
import TakeAGuess from './TakeAGuess'
import EndBet from './EndBet'
import { takeAGuess } from '../../services/user.service'
import { addGuess, endBet, deleteBet } from '../../services/bet.service'
import DefaultPage from '../../components/DefaultPage'
import { openSnackbar, editSnackbarText } from '../App/SnackBar/actions'
import { userSelector } from '../SignIn/selectors'
import { betIdSelector } from '../App/selectors'

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
    color: 'white',
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
})

class View extends React.PureComponent {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    pushPage: PropTypes.func.isRequired,
    replacePage: PropTypes.func.isRequired,
    open: PropTypes.func.isRequired,
    editText: PropTypes.func.isRequired,
    bet: propTypesBet.isRequired,
    user: propTypesUser.isRequired,
  }

  goToInvite = () => this.props.pushPage(`/bet/${this.props.bet.id}/invite`)
  addGuess = guess => {
    takeAGuess(this.props.user.uid, this.props.bet.id, guess)
    addGuess(this.props.bet.id, this.props.user.uid, guess)
  }
  endTheBet = result => {
    endBet(this.props.bet.id, result)
  }
  isAdmin = () => this.props.user.uid === this.props.bet.admin
  canTakeGuess = () =>
    this.props.bet.participants && !this.props.bet.result && !this.props.bet.participants[this.props.user.uid]
  canEndBet = () => this.isAdmin() && !this.props.bet.result

  deleteBetHandler = () => {
    if (Object.keys(this.props.bet.participants).length === 0) {
      deleteBet(this.props.bet.id)
      this.props.replacePage('/')
    } else {
      this.props.open()
      this.props.editText({ text: 'please remove participants before deleting the bet' })
    }
  }

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
              result={bet.result}
              currentUid={user.uid}
              showAllGuesses={this.isAdmin() || !!bet.result}
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
              onClick={this.goToInvite}
              className={classes.button}
            >
              Manage Invites <Group className={classes.rightIcon} />
            </Button>
          )}
        {this.isAdmin() && (
          <Button color="primary" aria-label="delete bet" onClick={this.deleteBetHandler}>
            DELETE
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
  pushPage: push,
  replacePage: replace,
  open: openSnackbar,
  editText: editSnackbarText,
}

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  branch(({ bet }) => !bet, renderNothing),
  withStyles(styles),
)

export default enhance(View)
