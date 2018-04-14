import React from 'react'
import { compose } from 'recompose'
import PropTypes from 'prop-types'
import firebase from 'firebase'
import * as firebaseui from 'firebaseui'
import { withStyles } from 'material-ui/styles'
import { FirebaseAuth } from 'react-firebaseui'
import Grid from 'material-ui/Grid'
import Paper from 'material-ui/Paper'
import { auth } from '../../fire'

const styles = theme => ({
  root: {
    flexGrow: 1,
    margin: theme.spacing.unit,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  logo: {
    maxWidth: '100%',
  },
  container: {
    width: '100%',
  },
})

class SignInScreen extends React.PureComponent {
  uiConfig = {
    signInFlow: 'popup',
    callbacks: {
      signInSuccess: () => false, // to tell react-firebaseui that we take care of the successful login
    },
    signInOptions: [
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
      // user must have 3rd party cookie enabled if he joins from wettemer.com
      // see: https://stackoverflow.com/questions/48757757/use-google-firebase-authentication-without-3rd-party-cookies
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      // user must leave the "share email" checked. Otherwise we do not have the users email address.
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    ],
    credentialHelper: firebaseui.auth.CredentialHelper.NONE,
  }

  render() {
    const { classes } = this.props

    return (
      <div className={classes.root}>
        <Grid className={classes.container} container justify="center">
          <Grid item xs={12}>
            <img className={classes.logo} src="/img/logo.png" alt="Wettemer Logo" />
          </Grid>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <h1 data-testid="h1">
                Welcome
                <span role="img" aria-label="vulcan welcome">
                  🖖
                </span>
              </h1>
              Wettemer is the most awesome platform to challenge your friends to anything. Right now, in realtime, even
              offline! OMG! Right. Sign in to join the gang!
            </Paper>
          </Grid>
        </Grid>
        <FirebaseAuth uiConfig={this.uiConfig} firebaseAuth={auth} />
      </div>
    )
  }
}

SignInScreen.propTypes = {
  classes: PropTypes.object.isRequired,
}

const enhance = compose(withStyles(styles))

export default enhance(SignInScreen)
