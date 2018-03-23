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
import { addBet } from '../../services/bet.service'

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
})

class CreateBet extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    user: propTypesUser.isRequired,
    changePage: PropTypes.func.isRequired,
  }

  handleSubmit = values => {
    addBet(
      {
        title: values.title,
        dateCreated: new Date(),
        admin: this.props.user.uid,
        visibility: ['private', 'public'][Math.round(Math.random())],
      },
      this.props.changePage,
    )
  }
  render() {
    const { changePage, classes } = this.props
    return (
      <DefaultPage>
        <h1>Create a bet</h1>
        <CreateBetForm onSubmit={this.handleSubmit} />
        <Button variant="raised" color="primary" onClick={() => changePage('/')} className={classes.button}>
          cancel
        </Button>
      </DefaultPage>
    )
  }
}

const mapStateToProps = state => ({
  user: state.signIn.user,
})

const mapDispatchToProps = {
  changePage: push,
}

const enhance = compose(withStyles(styles), connect(mapStateToProps, mapDispatchToProps))

export default enhance(CreateBet)
