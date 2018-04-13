import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'

import AddIcon from 'material-ui-icons/Add'
import Button from 'material-ui/Button'
import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import { compose } from 'recompose'

const styles = {
  button: {
    color: 'white',
    zIndex: 1,
  },
  addBtnRightCorner: {
    position: 'absolute',
    bottom: '1rem',
    right: '1rem',
  },
}

const CreateBtn = ({ classes, changePage }) => (
  <Button
    variant="fab"
    color="secondary"
    aria-label="create bet"
    className={classes.addBtnRightCorner}
    onClick={() => changePage('/create')}
  >
    <AddIcon className={classes.button} />
  </Button>
)

CreateBtn.propTypes = {
  changePage: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
}

const mapDispatchToProps = {
  changePage: push,
}

const enhance = compose(connect(null, mapDispatchToProps), withStyles(styles, { withTheme: true }))

export default enhance(CreateBtn)
