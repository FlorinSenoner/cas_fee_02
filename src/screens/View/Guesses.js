import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'recompose'
import { withStyles } from 'material-ui/styles'
import List, { ListItem, ListItemText } from 'material-ui/List'
import Avatar from 'material-ui/Avatar'
import Divider from 'material-ui/Divider'

import { propTypesUser } from '../../customPropTypes'

const styles = () => ({
  userAvatarCurrent: {
    border: '4px turquoise solid',
  },
})

class Guesses extends PureComponent {
  showGuess = user => {
    if (this.props.showAllGuesses || this.isCurrentUser(user.uid)) {
      return user.participations[this.props.betId] || 'not guessed yet'
    }
    return undefined
  }

  isCurrentUser = userId => this.props.currentUid === userId

  render() {
    const { users, classes } = this.props

    return (
      <List>
        {users.length ? (
          users
            .map(user => (
              <ListItem key={user.uid} dense>
                <Avatar
                  className={this.isCurrentUser(user.uid) ? classes.userAvatarCurrent : undefined}
                  alt="User profile image"
                  src={user.photoURL || '/img/unknown_50x50.jpg'}
                />
                <ListItemText primary={user.displayName} secondary={this.showGuess(user)} />
              </ListItem>
            ))
            .reduce((prev, curr) => [
              prev,
              <li key={`divider-${prev.uid}`}>
                <Divider inset />
              </li>,
              curr,
            ])
        ) : (
          <ListItem dense>
            <Avatar aria-label="no bet yet">:/</Avatar>
            <ListItemText primary="This bet has no participants" secondary="go ahead and invite some" />
          </ListItem>
        )}
      </List>
    )
  }
}

Guesses.propTypes = {
  classes: PropTypes.object.isRequired,
  users: PropTypes.arrayOf(propTypesUser).isRequired,
  betId: PropTypes.string.isRequired,
  currentUid: PropTypes.string.isRequired,
  showAllGuesses: PropTypes.bool.isRequired,
}
const enhance = compose(withStyles(styles))

export default enhance(Guesses)
