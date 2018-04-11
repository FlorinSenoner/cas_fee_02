import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'
import IconButton from 'material-ui/IconButton'
import MenuIcon from 'material-ui-icons/Menu'
import classNames from 'classnames'
import Clear from 'material-ui-icons/Clear'
import ArrowBack from 'material-ui-icons/ArrowBack'

import { drawerWidth } from './PersistentDrawer'

const styles = theme => ({
  appBar: {
    color: 'white',
    position: 'absolute',
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20,
  },
  backButton: {
    marginLeft: 'auto',
  },
  hide: {
    display: 'none',
  },
  gutters: {
    paddingRight: 0,
  },
})

const NavBar = ({ classes, open, handleOpen, goToDashboard, goBack }) => (
  <AppBar
    position="fixed"
    className={classNames(classes.appBar, {
      [classes.appBarShift]: open,
    })}
  >
    <Toolbar disableGutters={!open} classes={{ gutters: classes.gutters }}>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        onClick={handleOpen}
        className={classNames(classes.menuButton, open && classes.hide)}
      >
        <MenuIcon />
      </IconButton>
      <Typography variant="title" color="inherit" noWrap>
        Wettemer
      </Typography>
      {goBack && (
        <IconButton
          color="inherit"
          aria-label="back to dashboard"
          onClick={goBack}
          className={classNames(classes.backButton)}
        >
          <ArrowBack />
        </IconButton>
      )}
      {goToDashboard && (
        <IconButton
          color="inherit"
          aria-label="back to dashboard"
          onClick={goToDashboard}
          className={classNames(classes.backButton)}
        >
          <Clear />
        </IconButton>
      )}
    </Toolbar>
  </AppBar>
)

NavBar.propTypes = {
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  handleOpen: PropTypes.func.isRequired,
  goToDashboard: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]).isRequired,
  goBack: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]).isRequired,
}

const enhance = withStyles(styles)
export default enhance(NavBar)
