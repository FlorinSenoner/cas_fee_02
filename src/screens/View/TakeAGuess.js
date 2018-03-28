import React from 'react'
import PropTypes from 'prop-types'
import Button from 'material-ui/Button'
import TextField from 'material-ui/TextField'
import Dialog, { DialogActions, DialogContent, DialogContentText, DialogTitle } from 'material-ui/Dialog'

export default class TakeAGuess extends React.PureComponent {
  static propTypes = {
    handleGuess: PropTypes.func.isRequired,
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
        <Button color="primary" onClick={this.handleClickOpen}>
          Make a Guess
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
            <Button onClick={this.handleSubmit} color="primary">
              Guess
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}
