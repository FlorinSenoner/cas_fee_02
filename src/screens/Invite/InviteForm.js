import React from 'react'
import PropTypes from 'prop-types'
import Button from 'material-ui/Button'
import { withStyles } from 'material-ui/styles'
import { compose } from 'recompose'
import { Field, reduxForm } from 'redux-form'

import { propTypesParticipant } from '../../customPropTypes'
import MuiTextField from '../../components/Input/MuiTextField'

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
})

const Form = ({ submitting, handleSubmit, classes, participants }) => (
  <form onSubmit={handleSubmit}>
    <div>
      <Field
        name="participant"
        label="email address"
        inputProps={{
          'aria-label': 'Participant email',
        }}
        component={MuiTextField}
        className={classes.textField}
      />
      <Button type="submit" disabled={submitting} variant="raised" color="primary" className={classes.button}>
        Invite
      </Button>
    </div>
  </form>
)

Form.propTypes = {
  submitting: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  participants: PropTypes.arrayOf(propTypesParticipant),
}

const validate = (values, props) => {
  const errors = {}
  if (!values.participant) {
    errors.participant = 'Field is required'
  }
  if (props.participants.some(participant => participant.email === values.participant)) {
    errors.participant = 'participant already added'
  }
  return errors
}

const enhance = compose(reduxForm({ form: 'InviteForm', validate }), withStyles(styles))

export default enhance(Form)
