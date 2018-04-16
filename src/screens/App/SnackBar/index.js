import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { withStyles } from 'material-ui/styles'
import Button from 'material-ui/Button'
import Snackbar from 'material-ui/Snackbar'
import IconButton from 'material-ui/IconButton'
import Close from 'material-ui-icons/Close'
import { replace } from 'react-router-redux'

import { deleteBet } from '../../../services/bet.service'
import { closeSnackbar, openSnackbar, editSnackbarText, editSnackbarBetId } from './actions'
import { isOpenSelector, textSelector, betIdSelector } from './selectors'

const styles = theme => ({
  close: {
    width: theme.spacing.unit * 4,
    height: theme.spacing.unit * 4,
  },
  undoHidden: {
    display: 'none',
  },
})

class SnackBar extends Component {
  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired,
    betId: PropTypes.string.isRequired,
    close: PropTypes.func.isRequired,
    editText: PropTypes.func.isRequired,
    editBetId: PropTypes.func.isRequired,
    open: PropTypes.func.isRequired,
    changePage: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
  }

  deleteHandler = () => {
    this.props.close()
    this.props.open()
    this.props.editBetId({ betId: '' })
    deleteBet(this.props.betId)
      .then(() => {
        this.props.editText({ text: 'bet has been deleted 🙂' })
      })
      .catch(() => {
        this.props.editText({ text: 'could not delete bet 🤔' })
      })
    this.props.changePage('/')
  }

  render() {
    const { classes, isOpen, close, text } = this.props
    return (
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={isOpen}
        autoHideDuration={6000}
        onClose={close}
        SnackbarContentProps={{
          'aria-describedby': 'message-id',
        }}
        message={
          <span id="message-id" data-test-id="snackBarMessage">
            {text}
          </span>
        }
        action={[
          <Button
            key="undo"
            color="secondary"
            size="small"
            onClick={this.deleteHandler}
            className={this.props.betId || classes.undoHidden}
          >
            UNDO
          </Button>,
          <IconButton key="close" aria-label="Close" color="inherit" className={classes.close} onClick={close}>
            <Close />
          </IconButton>,
        ]}
      />
    )
  }
}

const mapStateToProps = state => ({
  isOpen: isOpenSelector(state),
  text: textSelector(state),
  betId: betIdSelector(state),
})

const mapDispatchToProps = {
  close: closeSnackbar,
  open: openSnackbar,
  editText: editSnackbarText,
  editBetId: editSnackbarBetId,
  changePage: replace,
}

const enhance = compose(connect(mapStateToProps, mapDispatchToProps), withStyles(styles))

export default enhance(SnackBar)
