import React from 'react'
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List'
import Divider from 'material-ui/Divider'
import DashboardIcon from 'material-ui-icons/ViewStream'
import SignOutIcon from 'material-ui-icons/PowerSettingsNew'
import PropTypes from 'prop-types'
import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import { signOut } from '../../screens/SignIn/actions'

const NavList = ({ changePage, singingOut }) => (
  <List component="nav">
    <ListItem button onClick={() => changePage('/')}>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItem>
    <Divider />
    <ListItem button onClick={singingOut}>
      <ListItemIcon>
        <SignOutIcon />
      </ListItemIcon>
      <ListItemText primary="SignOut" />
    </ListItem>
  </List>
)

NavList.propTypes = {
  changePage: PropTypes.func.isRequired,
  singingOut: PropTypes.func.isRequired,
}

const mapDispatchToProps = {
  changePage: push,
  singingOut: signOut,
}

const enhance = connect(null, mapDispatchToProps)

export default enhance(NavList)
