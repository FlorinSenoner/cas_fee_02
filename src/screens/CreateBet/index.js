import React from 'react'
import PropTypes from 'prop-types'
import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import Button from 'material-ui/Button'
import { withStyles } from 'material-ui/styles'
import { compose } from 'recompose'

import DefaultPage from '../../components/DefaultPage'

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
})

const CreateBet = ({ changePage, classes }) => (
  <DefaultPage>
    <h1>Create a bet</h1>
    <Button variant="raised" color="primary" onClick={() => changePage('/')} className={classes.button}>
      go home
    </Button>
  </DefaultPage>
)

CreateBet.propTypes = {
  classes: PropTypes.object.isRequired,
  changePage: PropTypes.func.isRequired,
}

const mapDispatchToProps = {
  changePage: push,
}

const enhance = compose(withStyles(styles), connect(null, mapDispatchToProps))

export default enhance(CreateBet)