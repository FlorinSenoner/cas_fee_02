import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'recompose'
import { withStyles } from 'material-ui/styles'
import GuessIcon from 'material-ui-icons/SmsFailed'
import Button from 'material-ui/Button'
import TextField from 'material-ui/TextField'
import Dialog, { DialogActions, DialogContent, DialogContentText, DialogTitle } from 'material-ui/Dialog'

const styles = () => ({
  addBtnRightCorner: {
    position: 'absolute',
    bottom: '1rem',
    right: '1rem',
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
    return (
      <div>
        <Button
          className={this.props.classes.addBtnRightCorner}
          variant="fab"
          color="primary"
          onClick={this.handleClickOpen}
        >
          <GuessIcon />
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
            <Button onClick={this.handleSubmit} variant="raised" color="primary">
              Guess
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}

const enhance = compose(withStyles(styles))

export default enhance(TakeAGuess)
