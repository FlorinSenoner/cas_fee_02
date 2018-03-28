import React from 'react'
import PropTypes from 'prop-types'
import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import Button from 'material-ui/Button'
import { withStyles } from 'material-ui/styles'
import { compose, branch, renderNothing } from 'recompose'
import { propTypesBet } from '../../customPropTypes'

import DefaultPage from '../../components/DefaultPage'
import { userSelector } from '../SignIn/selectors'
import { betIdSelector } from '../App/selectors'

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
})

class View extends React.PureComponent {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    changePage: PropTypes.func.isRequired,
    bet: propTypesBet.isRequired,
  }

  toDashboard = () => this.props.changePage('/')

  render() {
    const { classes, bet } = this.props
    return (
      <DefaultPage>
        <h1>{bet.title}</h1>
        <Button variant="raised" color="primary" onClick={this.toDashboard} className={classes.button}>
          back
        </Button>
      </DefaultPage>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  user: userSelector(state),
  bet: betIdSelector(state, ownProps.match.params.id),
})

const mapDispatchToProps = {
  changePage: push,
}

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  branch(({ bet }) => !bet, renderNothing),
  withStyles(styles),
)

export default enhance(View)
