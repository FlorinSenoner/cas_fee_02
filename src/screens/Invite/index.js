import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import Button from 'material-ui/Button'
import { withStyles } from 'material-ui/styles'
import { compose } from 'recompose'
import { reset } from 'redux-form'

import DefaultPage from '../../components/DefaultPage'
import InviteForm from './InviteForm'
import InviteWithBet from './InviteWithBet'
import Participants from './Participants'
import { userSelector } from '../SignIn/selectors'

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
})

class Invite extends React.PureComponent {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    changePage: PropTypes.func.isRequired,
    resetForm: PropTypes.func.isRequired,
    match: PropTypes.object.isRequired,
  }

  render() {
    const { changePage, classes, match, resetForm } = this.props
    return (
      <DefaultPage>
        <h1>Invite some people</h1>
        <InviteWithBet
          betId={match.params.id}
          resetForm={resetForm}
          render={(bet, handleSubmit) => (
            <Fragment>
              <InviteForm participants={bet.participantUsers} onSubmit={handleSubmit} />
              {bet.participantUsers.length > 0 && <Participants users={bet.participantUsers} />}
            </Fragment>
          )}
        />

        <Button variant="raised" color="primary" onClick={() => changePage('/')} className={classes.button}>
          done
        </Button>
      </DefaultPage>
    )
  }
}

const mapStateToProps = state => ({
  user: userSelector(state),
})

const mapDispatchToProps = {
  changePage: push,
  resetForm: reset,
}

const enhance = compose(withStyles(styles), connect(mapStateToProps, mapDispatchToProps))

export default enhance(Invite)
