import React from 'react'
import PropTypes from 'prop-types'
import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import Button from 'material-ui/Button'
import { withStyles } from 'material-ui/styles'
import { compose } from 'recompose'

import { propTypesUser } from '../../customPropTypes'
import DefaultPage from '../../components/DefaultPage'
import CreateBetForm from './Form'

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
})

const CreateBet = ({ changePage, classes, user }) => (
  <DefaultPage>
    <h1>Create a bet</h1>
    <CreateBetForm user={user} />
    <Button variant="raised" color="primary" onClick={() => changePage('/')} className={classes.button}>
      cancel
    </Button>
  </DefaultPage>
)

CreateBet.propTypes = {
  classes: PropTypes.object.isRequired,
  user: propTypesUser.isRequired,
  changePage: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  user: state.signIn.user,
})

const mapDispatchToProps = {
  changePage: push,
}

const enhance = compose(withStyles(styles), connect(mapStateToProps, mapDispatchToProps))

export default enhance(CreateBet)
