import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import PropTypes from 'prop-types'
import Drawer from 'material-ui/Drawer'
import Divider from 'material-ui/Divider'
import ChevronLeftIcon from 'material-ui-icons/ChevronLeft'
import IconButton from 'material-ui/IconButton'
import { withStyles } from 'material-ui/styles'
import User from './User'
import NavList from './NavList'
import { userSelector } from '../../screens/SignIn/selectors'
import { propTypesUser } from '../../customPropTypes'

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
    padding: theme.spacing.unit,
    paddingRight: 0,
    ...theme.mixins.toolbar,
  },
})

class PersistentDrawer extends React.PureComponent {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    open: PropTypes.bool.isRequired,
    handelClose: PropTypes.func.isRequired,
    user: propTypesUser.isRequired,
  }
  render() {
    const { classes, open, handelClose, user } = this.props
    return (
      <Drawer
        variant="persistent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
        open={open}
      >
        <div>
          <div
            className={classes.drawerHeader}
            role="button"
            tabIndex={0}
            onClick={handelClose}
            onKeyDown={handelClose}
          >
            <img src="/img/logo.png" alt="Wettemer Logo" />
            <IconButton>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <User user={user} />
          <Divider />
          <NavList />
        </div>
      </Drawer>
    )
  }
}

const mapStateToProps = state => ({ user: userSelector(state) })

const enhance = compose(withStyles(styles, { withTheme: true }), connect(mapStateToProps))

export default enhance(PersistentDrawer)
