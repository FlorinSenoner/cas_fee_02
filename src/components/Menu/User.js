import React from 'react'
import Avatar from 'material-ui/Avatar'
import List, { ListItem, ListItemText } from 'material-ui/List'
import { propTypesUser } from '../../customPropTypes'

const User = ({ user }) => (
  <List>
    <ListItem>
      <Avatar alt="User profile image" src={user.photoURL || '/img/unknown_50x50.jpg'} />
      <ListItemText primary={user.displayName} secondary={user.email} />
    </ListItem>
  </List>
)

User.propTypes = {
  user: propTypesUser.isRequired,
}

export default User
