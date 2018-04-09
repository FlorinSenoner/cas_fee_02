import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import List, { ListItem, ListItemText } from 'material-ui/List'
import Avatar from 'material-ui/Avatar'
import Divider from 'material-ui/Divider'

import { propTypesUser } from '../../customPropTypes'

class Guesses extends PureComponent {
  showGuess = user => {
    if (this.props.showAllGuesses || user.uid === this.props.currentUid) {
      return user.participations[this.props.betId] || 'not guessed yet'
    }
    return undefined
  }

  render() {
    const { users } = this.props

    return (
      <List>
        {users.length ? (
          users
            .map(user => (
              <ListItem key={user.uid} dense>
                <Avatar alt="User profile image" src={user.photoURL || '/img/unknown_50x50.jpg'} />
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
  users: PropTypes.arrayOf(propTypesUser).isRequired,
  betId: PropTypes.string.isRequired,
  currentUid: PropTypes.string.isRequired,
  showAllGuesses: PropTypes.bool.isRequired,
}

export default Guesses
