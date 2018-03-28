import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import List, { ListItem, ListItemText } from 'material-ui/List'
import Avatar from 'material-ui/Avatar'
import Divider from 'material-ui/Divider'

import { propTypesUser } from '../../customPropTypes'

class Guesses extends PureComponent {
  showGuess = guess => (this.props.showGuesses ? guess || 'not guessed yet' : undefined)

  render() {
    const { users, betId } = this.props

    return (
      <div>
        {users.length && (
          <List>
            {users
              .map(user => (
                <ListItem key={user.uid} dense>
                  <Avatar alt="User profile image" src={user.photoURL || '/img/unknown_50x50.jpg'} />
                  <ListItemText primary={user.displayName} secondary={this.showGuess(user.participations[betId])} />
                </ListItem>
              ))
              .reduce((prev, curr) => [
                prev,
                <li key={`divider-${prev.uid}`}>
                  <Divider inset />
                </li>,
                curr,
              ])}
          </List>
        )}
      </div>
    )
  }
}

Guesses.propTypes = {
  users: PropTypes.arrayOf(propTypesUser).isRequired,
  betId: PropTypes.string.isRequired,
  showGuesses: PropTypes.bool.isRequired,
}

export default Guesses
