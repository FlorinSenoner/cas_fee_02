import React from 'react'
import PropTypes from 'prop-types'
import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import Button from 'material-ui/Button'
import { withStyles } from 'material-ui/styles'
import { compose } from 'recompose'

import DefaultPage from '../../components/DefaultPage'
import WithBet from './WithBet'

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
})

class View extends React.PureComponent {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    changePage: PropTypes.func.isRequired,
    match: PropTypes.object.isRequired,
  }

  toDashboard = () => this.props.changePage('/')

  render() {
    const { classes, match } = this.props
    return (
      <DefaultPage>
        <WithBet betId={match.params.id} render={bet => <h1>{bet.title}</h1>} />
        <Button variant="raised" color="primary" onClick={this.toDashboard} className={classes.button}>
          back
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

export default enhance(View)
