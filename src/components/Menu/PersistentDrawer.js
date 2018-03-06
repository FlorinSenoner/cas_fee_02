import React from 'react'
import PropTypes from 'prop-types'
import Drawer from 'material-ui/Drawer'
import Divider from 'material-ui/Divider'
import ChevronLeftIcon from 'material-ui-icons/ChevronLeft'
import IconButton from 'material-ui/IconButton'
import { withStyles } from 'material-ui/styles'

import NavList from './NavList'

export const drawerWidth = 240

const styles = theme => ({
  drawerPaper: {
    position: 'relative',
    height: '100%',
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
})

const PersistentDrawer = ({ classes, open, handelClose }) => (
  <Drawer
    variant="persistent"
    classes={{
      paper: classes.drawerPaper,
    }}
    anchor="left"
    open={open}>
    <div>
      <div className={classes.drawerHeader} role="button" tabIndex={0} onClick={handelClose} onKeyDown={handelClose}>
        <IconButton>
          <ChevronLeftIcon />
        </IconButton>
      </div>
      <Divider />
      <NavList />
    </div>
  </Drawer>
)

PersistentDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  handelClose: PropTypes.func.isRequired,
}

const enhance = withStyles(styles, { withTheme: true })

export default enhance(PersistentDrawer)
