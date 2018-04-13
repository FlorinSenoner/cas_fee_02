import React from 'react'
import PropTypes from 'prop-types'
import { push, replace } from 'react-router-redux'
import { connect } from 'react-redux'
import Button from 'material-ui/Button'
import GroupIcon from 'material-ui-icons/Group'
import DeleteIcon from 'material-ui-icons/Delete'
import Card, { CardActions } from 'material-ui/Card'
import { withStyles } from 'material-ui/styles'
import { compose, branch, renderNothing } from 'recompose'
import { propTypesBet, propTypesUser } from '../../customPropTypes'

import TakeAGuess from './TakeAGuess'
import EndBet from './EndBet'
import { takeAGuess } from '../../services/user.service'
import { addGuess, endBet, deleteBet } from '../../services/bet.service'
import DefaultPage from '../../components/DefaultPage'
import { openSnackbar, editSnackbarText } from '../App/SnackBar/actions'
import { userSelector } from '../SignIn/selectors'
import { betIdSelector } from '../App/selectors'
import BetDetails from './BetDetails'

const styles = theme => ({
  button: {
    color: 'white',
    [theme.breakpoints.down('xs')]: {
      marginTop: theme.spacing.unit,
    },
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit,
    },
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  deleteBtn: {
    color: 'purple',
    [theme.breakpoints.up('sm')]: {
      marginLeft: 'auto',
    },
  },
  cardActions: {
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
      alignItems: 'stretch',
    },
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
        <Card>
          <BetDetails bet={bet} isAdmin={this.isAdmin()} currentUid={user.uid} />
          <CardActions className={classes.cardActions} disableActionSpacing>
            {this.canEndBet() && <EndBet handleEndBet={this.endTheBet} />}
            {this.isAdmin() &&
              !bet.result && (
                <Button
                  className={classes.button}
                  variant="raised"
                  color="primary"
                  aria-label="invite more people"
                  onClick={this.goToInvite}
                >
                  Manage Invites <GroupIcon className={classes.rightIcon} />
                </Button>
              )}
            {this.canTakeGuess() && <TakeAGuess handleGuess={this.addGuess} />}
            {this.isAdmin() && (
              <Button className={classes.deleteBtn} aria-label="delete bet" onClick={this.deleteBetHandler}>
                Delete bet<DeleteIcon />
              </Button>
            )}
          </CardActions>
        </Card>
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
