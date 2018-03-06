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

const CreateBet = ({ changePage }) => (
  <DefaultPage>
    <h1>Create a bet</h1>
    <Button variant="raised" color="primary" onClick={() => changePage('/')}>
      go home
    </Button>
  </DefaultPage>
)

CreateBet.propTypes = {
  changePage: PropTypes.func.isRequired,
}

const mapDispatchToProps = {
  changePage: push,
}

const enhance = compose(withStyles(styles), connect(null, mapDispatchToProps))

export default enhance(CreateBet)
