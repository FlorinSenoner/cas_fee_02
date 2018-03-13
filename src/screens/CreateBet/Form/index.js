import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import Input from 'material-ui/Input'
import Button from 'material-ui/Button'
import { withStyles } from 'material-ui/styles'
import { compose } from 'recompose'
import { addBet } from '../../../services/bet.service'

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
})

class CreateBetForm extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
  }
  constructor() {
    super()
    this.state = {
      bet: {
        title: '',
      },
    }
    this.addBet = this.addBet.bind(this)
  }

  addBet() {
    // TODO
    console.log('Got Form with state: ', this.state)
    addBet(this.state.bet)
  }

  handleTitleChange = event => {
    this.setState({ bet: { ...this.state.bet, title: event.target.value } })
  }

  render() {
    return (
      <div>
        <Input
          placeholder="Title"
          value={this.state.title}
          onChange={this.handleTitleChange}
          className={this.props.classes.input}
          inputProps={{
            'aria-label': 'Title',
          }}
        />
        <Button
          type="submit"
          variant="raised"
          color="primary"
          className={this.props.classes.button}
          onClick={this.addBet}>
          Create
        </Button>
      </div>
    )
  }
}

const mapDispatchToProps = {
  changePage: push,
}

const enhance = compose(withStyles(styles), connect(null, mapDispatchToProps))

export default enhance(CreateBetForm)
