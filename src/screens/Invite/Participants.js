import React, { PureComponent } from 'react'
import { compose } from 'recompose'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import List, { ListItem, ListItemSecondaryAction, ListItemText } from 'material-ui/List'
import Avatar from 'material-ui/Avatar'
import IconButton from 'material-ui/IconButton'
import DeleteIcon from 'material-ui-icons/Delete'

import { propTypesUser } from '../../customPropTypes'

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
})

class Participants extends PureComponent {
  render() {
    const { classes, users, betId, removeParticipant } = this.props

    return (
      <div className={classes.root}>
        <List>
          {users.map(user => (
            <ListItem key={user.uid} dense className={classes.listItem}>
              <Avatar alt="User profile image" src={user.photoURL || '/img/unknown_50x50.jpg'} />
              <ListItemText primary={user.displayName} />
              {!user.participations[betId] && (
                <ListItemSecondaryAction>
                  <IconButton
                    aria-label="delete user from participants"
                    onClick={() => removeParticipant(user.uid, betId)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              )}
            </ListItem>
          ))}
        </List>
      </div>
    )
  }
}

Participants.propTypes = {
  users: PropTypes.arrayOf(propTypesUser).isRequired,
  classes: PropTypes.object.isRequired,
  removeParticipant: PropTypes.func.isRequired,
  betId: PropTypes.string.isRequired,
}

const enhance = compose(withStyles(styles))

export default enhance(Participants)
