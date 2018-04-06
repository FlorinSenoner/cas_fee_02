import React from 'react'
import PropTypes from 'prop-types'
import Button from 'material-ui/Button'
import TextField from 'material-ui/TextField'
import Dialog, { DialogActions, DialogContent, DialogContentText, DialogTitle } from 'material-ui/Dialog'

export default class EndBet extends React.PureComponent {
  static propTypes = {
    handleEndBet: PropTypes.func.isRequired,
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
    this.props.handleEndBet(document.getElementById('result').value)
    this.handleClose()
  }

  render() {
    return (
      <div>
        <Button variant="raised" color="secondary" onClick={this.handleClickOpen}>
          End bet
        </Button>
        <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">End this bet</DialogTitle>
          <DialogContent>
            <DialogContentText>How did it end? Type in your result below!</DialogContentText>
            <TextField autoFocus margin="dense" id="result" label="Bet result" fullWidth />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleSubmit} variant="raised" color="secondary">
              End bet
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}
