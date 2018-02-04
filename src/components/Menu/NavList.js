import React from 'react'
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List'
import HomeIcon from 'material-ui-icons/Home'
import DashboardIcon from 'material-ui-icons/ViewStream'
import PropTypes from 'prop-types'
import { push } from 'react-router-redux'
import { connect } from 'react-redux'

const NavList = ({ changePage }) => (
  <List component="nav">
    <ListItem button onClick={() => changePage('/')}>
      <ListItemIcon>
        <HomeIcon />
      </ListItemIcon>
      <ListItemText primary="Home" />
    </ListItem>
    <ListItem button onClick={() => changePage('/dashboard')}>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItem>
  </List>
)

NavList.propTypes = {
  changePage: PropTypes.func.isRequired,
}

const mapDispatchToProps = {
  changePage: push,
}

const enhance = connect(null, mapDispatchToProps)

export default enhance(NavList)
