import React, { PureComponent } from 'react'
import { compose } from 'recompose'
import { withStyles } from 'material-ui/styles'

import { propTypesParticipant } from '../../customPropTypes'

const styles = {}

class Participant extends PureComponent {
  render() {
    const { user } = this.props
    return (
      <div>
        <h3>{user.email}</h3>
      </div>
    )
  }
}

Participant.propTypes = {
  user: propTypesParticipant.isRequired,
}

const enhance = compose(withStyles(styles))

export default enhance(Participant)
