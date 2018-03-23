import React from 'react'
import PropTypes from 'prop-types'
import Button from 'material-ui/Button'
import { withStyles } from 'material-ui/styles'
import { compose } from 'recompose'
import { Field, reduxForm } from 'redux-form'

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

const Form = ({ submitting, handleSubmit, classes }) => (
  <form onSubmit={handleSubmit}>
    <div>
      <Field
        name="title"
        label="Title"
        inputProps={{
          'aria-label': 'Title',
        }}
        component={MuiTextField}
        className={classes.textField}
      />
      <Button type="submit" disabled={submitting} variant="raised" color="primary" className={classes.button}>
        Create
      </Button>
    </div>
  </form>
)

Form.propTypes = {
  submitting: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
}

const validate = values => {
  const errors = {}
  if (!values.title) {
    errors.title = 'Field is required'
  }
  return errors
}

const enhance = compose(reduxForm({ form: 'CreateBetForm', validate }), withStyles(styles))

export default enhance(Form)
