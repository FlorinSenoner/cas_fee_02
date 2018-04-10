import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'recompose'

import { withStyles } from 'material-ui/styles'
import Button from 'material-ui/Button'
import Snackbar from 'material-ui/Snackbar'
import IconButton from 'material-ui/IconButton'
import Close from 'material-ui-icons/Close'

import { closeSnackbar, deleteBetSnackbar } from './actions'
import { isOpenSelector, textSelector } from './selectors'

const styles = theme => ({
  close: {
    width: theme.spacing.unit * 4,
    height: theme.spacing.unit * 4,
  },
})

class SnackBar extends Component {
  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired,
    close: PropTypes.func.isRequired,
    deleteBet: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
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
        message={<span id="message-id">{text}</span>}
        action={[
          <Button key="undo" color="secondary" size="small" onClick={() => console.log('TODO: delete bet')}>
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
})

const mapDispatchToProps = {
  close: closeSnackbar,
  deleteBet: deleteBetSnackbar,
}

const enhance = compose(connect(mapStateToProps, mapDispatchToProps), withStyles(styles))

export default enhance(SnackBar)
