import React from 'react'
import PropTypes from 'prop-types'
import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import Button from 'material-ui/Button'
import RunIcon from 'material-ui-icons/DirectionsRun'
import { withStyles } from 'material-ui/styles'
import { compose } from 'recompose'

import DefaultPage from '../../components/DefaultPage'

const styles = theme => ({
  button: {
    color: 'white',
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
})

const NotFound = ({ changePage, classes }) => (
  <DefaultPage>
    <h1>
      Captain, we are lost!
      <span role="img" aria-label="astro cat">
        🐱‍🚀
      </span>
    </h1>
    <Button variant="raised" color="secondary" onClick={() => changePage('/')} className={classes.button}>
      escape <RunIcon className={classes.rightIcon} />
    </Button>
  </DefaultPage>
)

NotFound.propTypes = {
  changePage: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
}

const mapDispatchToProps = {
  changePage: push,
}

const enhance = compose(connect(null, mapDispatchToProps), withStyles(styles))

export default enhance(NotFound)
