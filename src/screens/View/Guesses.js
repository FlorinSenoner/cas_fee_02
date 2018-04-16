import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'recompose'
import { withStyles } from 'material-ui/styles'
import List, { ListItem, ListItemText } from 'material-ui/List'
import Avatar from 'material-ui/Avatar'
import Divider from 'material-ui/Divider'

import Result from './Result'
import { propTypesUser } from '../../customPropTypes'

const styles = () => ({
  userAvatarCurrent: {
    border: '4px turquoise solid',
    boxShadow: '0 0 5px turquoise',
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
    const { users, classes, result } = this.props

    return (
      <List>
        {users.length ? (
          users
            .map(user => (
              <ListItem key={user.uid} data-test-id="betGuess" dense>
                <Avatar
                  className={this.isCurrentUser(user.uid) ? classes.userAvatarCurrent : undefined}
                  alt="User profile image"
                  src={user.photoURL || '/img/unknown_50x50.jpg'}
                />
                <ListItemText primary={user.displayName} secondary={this.showGuess(user)} />
                <Result result={result} guess={user.participations[this.props.betId]} />
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
  result: PropTypes.string,
  currentUid: PropTypes.string.isRequired,
  showAllGuesses: PropTypes.bool.isRequired,
}
const enhance = compose(withStyles(styles))

export default enhance(Guesses)
