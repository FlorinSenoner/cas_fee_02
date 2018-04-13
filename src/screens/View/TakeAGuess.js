import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'recompose'
import { withStyles } from 'material-ui/styles'
import GuessIcon from 'material-ui-icons/SmsFailed'
import Button from 'material-ui/Button'
import TextField from 'material-ui/TextField'
import Dialog, { DialogActions, DialogContent, DialogContentText, DialogTitle } from 'material-ui/Dialog'

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
})

class TakeAGuess extends React.PureComponent {
  static propTypes = {
    handleGuess: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
  }

  state = {
    open: false,
  }

  handleClickOpen = () => {
    this.setState({ open: true })
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  handleSubmit = () => {
    this.props.handleGuess(document.getElementById('guess').value)
    this.handleClose()
  }

  render() {
    const { classes } = this.props
    return (
      <Fragment>
        <Button className={classes.button} variant="raised" color="primary" onClick={this.handleClickOpen}>
          Participate <GuessIcon className={classes.rightIcon} />
        </Button>
        <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Your guess</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please enter your guess here. Beware! You cannot change it afterwards.
            </DialogContentText>
            <TextField autoFocus margin="dense" id="guess" label="Your guess" fullWidth />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleSubmit} className={classes.button} variant="raised" color="primary">
              Guess
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    )
  }
}

const enhance = compose(withStyles(styles))

export default enhance(TakeAGuess)
