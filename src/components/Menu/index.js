import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import classNames from 'classnames'
import { compose, withState, withHandlers } from 'recompose'

import PersistentDrawer, { drawerWidth } from './PersistentDrawer'
import NavBar from './NavBar'
import { omitProps } from '../../utils'

const styles = theme => ({
  root: {
    width: '100%',
    height: '100vh',
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
    overflow: 'auto',
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 2,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
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

const Menu = ({ classes, isDrawerOpen, openDrawer, closeDrawer, children, goToDashboard, goBack }) => (
  <div className={classes.root}>
    <div className={classes.appFrame}>
      <NavBar open={isDrawerOpen} handleOpen={openDrawer} goToDashboard={goToDashboard} goBack={goBack} />
      <PersistentDrawer open={isDrawerOpen} handelClose={closeDrawer} />
      <div
        role="button"
        tabIndex="0"
        onKeyPress={closeDrawer}
        onClick={closeDrawer}
        className={classNames(classes.content, {
          [classes.contentShift]: isDrawerOpen,
        })}
      >
        {children}
      </div>
    </div>
  </div>
)

Menu.propTypes = {
  classes: PropTypes.object.isRequired,
  isDrawerOpen: PropTypes.bool.isRequired,
  openDrawer: PropTypes.func.isRequired,
  closeDrawer: PropTypes.func.isRequired,
  goToDashboard: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]).isRequired,
  goBack: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]).isRequired,
  children: PropTypes.node.isRequired,
}

const enhance = compose(
  withState('isDrawerOpen', 'setIsDrawerOpen', false),
  withHandlers({
    openDrawer: props => () => props.setIsDrawerOpen(true),
    closeDrawer: props => () => props.setIsDrawerOpen(false),
  }),
  omitProps(['setIsDrawerOpen']),
  withStyles(styles, { withTheme: true }),
)

export default enhance(Menu)
