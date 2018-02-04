import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import classNames from 'classnames'
import { compose, withState } from 'recompose'

import PersistentDrawer, { drawerWidth } from './PersistentDrawer'
import NavBar from './NavBar'

const styles = theme => ({
  root: {
    width: '100%',
    height: 430,
    zIndex: 1,
    overflow: 'hidden',
  },
  appFrame: {
    position: 'relative',
    display: 'flex',
    width: '100%',
    height: '100%',
  },
  content: {
    width: '100%',
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    height: 'calc(100% - 56px)',
    marginTop: 56,
    marginLeft: -drawerWidth,
    [theme.breakpoints.up('sm')]: {
      height: 'calc(100% - 64px)',
      marginTop: 64,
    },
  },
  contentShift: {
    marginLeft: 0,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
})

const Menu = ({ classes, isDrawerOpen, setIsDrawerOpen, children }) => (
  <div className={classes.root}>
    <div className={classes.appFrame}>
      <NavBar open={isDrawerOpen} handleOpen={() => setIsDrawerOpen(true)} />
      <PersistentDrawer open={isDrawerOpen} handelClose={() => setIsDrawerOpen(false)} />
      <main
        className={classNames(classes.content, {
          [classes.contentShift]: isDrawerOpen,
        })}>
        {children}
      </main>
    </div>
  </div>
)

Menu.propTypes = {
  classes: PropTypes.object.isRequired,
  isDrawerOpen: PropTypes.bool.isRequired,
  setIsDrawerOpen: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
}

const enhance = compose(withState('isDrawerOpen', 'setIsDrawerOpen', false), withStyles(styles, { withTheme: true }))

export default enhance(Menu)
