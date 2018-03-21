import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import Button from 'material-ui/Button'
import { withStyles } from 'material-ui/styles'
import { compose } from 'recompose'
import { Field, reduxForm } from 'redux-form'

import MuiTextField from '../../components/Input/MuiTextField'

import { addBet } from '../../services/bet.service'
import { propTypesUser } from '../../customPropTypes'

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
})

class InviteForm extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    changePage: PropTypes.func.isRequired,
    user: propTypesUser.isRequired,
  }

  state = theme => ({
    bet: {
      title: '',
    },
    textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
      width: 200,
    },
  })

  handleSubmit = () => {
    addBet({
      ...this.state.bet,
      dateCreated: new Date(),
      admin: this.props.user.email,
      visibility: ['private', 'public'][Math.round(Math.random())],
      participant: [{ id: 'bla@gmail.com', guess: 'asdsaas' }, { id: 'test@gmail.com', guess: 'adasdasd' }],
    })
    this.props.changePage('/')
  }

  handleTitleChange = event => {
    this.setState({ bet: { ...this.state.bet, title: event.target.value } })
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <Field
            name="Bet Title"
            inputProps={{
              'aria-label': 'Bet Title',
            }}
            component={MuiTextField}
            placeholder="Title"
            onChange={this.handleTitleChange}
          />
          <Button type="submit" variant="raised" color="primary" className={this.props.classes.button}>
            Create
          </Button>
        </div>
      </form>
    )
  }
}

const mapDispatchToProps = {
  changePage: push,
}

const enhance = compose(
  reduxForm({
    form: 'InviteForm', // a unique identifier for this form
  }),
  withStyles(styles),
  connect(null, mapDispatchToProps),
)

export default enhance(InviteForm)
