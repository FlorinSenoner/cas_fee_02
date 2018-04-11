import React from 'react'
import PropTypes from 'prop-types'
import Button from 'material-ui/Button'
import { withStyles } from 'material-ui/styles'
import { compose } from 'recompose'
import { Field, reduxForm } from 'redux-form'
import AddIcon from 'material-ui-icons/PersonAdd'

import MuiTextField from '../../components/Input/MuiTextField'

const styles = theme => ({
  button: {
    color: 'white',
    margin: theme.spacing.unit,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
})

const InviteForm = ({ submitting, handleSubmit, classes }) => (
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
        <AddIcon />
      </Button>
    </div>
  </form>
)

InviteForm.propTypes = {
  submitting: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
}

const validate = (values, props) => {
  const errors = {}
  if (!values.participant) {
    errors.participant = 'Field is required'
  }
  if (
    values.participant &&
    props.participants.some(participant => participant.email === values.participant.toLowerCase())
  ) {
    errors.participant = 'participant already added'
  }
  return errors
}

const enhance = compose(reduxForm({ form: 'InviteForm', validate }), withStyles(styles))

export default enhance(InviteForm)
