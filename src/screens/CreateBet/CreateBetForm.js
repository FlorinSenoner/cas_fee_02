import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import Input from 'material-ui/Input'
import Button from 'material-ui/Button'
import { withStyles } from 'material-ui/styles'
import { compose } from 'recompose'
import { addBetService } from '../../services/bet.service'

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
})

class CreateBetForm extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    changePage: PropTypes.func.isRequired,
  }

  state = {
    bet: {
      title: '',
    },
  }

  addBet = () => {
    addBetService(this.state.bet)
    this.props.changePage('/dashboard')
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
            'aria-label': 'bet title',
          }}
        />
        <Button variant="raised" color="primary" className={this.props.classes.button} onClick={this.addBet}>
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
