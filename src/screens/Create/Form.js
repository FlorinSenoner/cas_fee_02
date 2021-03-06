import React from 'react'
import PropTypes from 'prop-types'
import Button from 'material-ui/Button'
import { withStyles } from 'material-ui/styles'
import { compose } from 'recompose'
import { Field, reduxForm, formValueSelector } from 'redux-form'
import Typography from 'material-ui/Typography'
import Create from 'material-ui-icons/Create'
import { connect } from 'react-redux'

import MuiTextField from '../../components/Input/MuiTextField'
import MuiSwitch from '../../components/Input/MuiSwitch'

const styles = theme => ({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  button: {
    color: 'white',
    margin: theme.spacing.unit,
  },
  textField: {
    marginBottom: theme.spacing.unit * 4,
    maxWidth: 320,
    width: '100%',
  },
  switch: {
    marginBottom: theme.spacing.unit * 4,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  endDateTimeWrapper: {
    display: 'flex',
    marginBottom: theme.spacing.unit * 4,
    maxWidth: 320,
    width: '100%',
  },
  date: {
    marginRight: theme.spacing.unit * 4,
    minWidth: 120,
  },
  time: {
    minWidth: 120,
  },
  visibilityWrapper: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing.unit * 4,
    maxWidth: 320,
    width: '100%',
  },
})

const Form = ({ submitting, handleSubmit, classes, visibilityValue }) => (
  <form onSubmit={handleSubmit}>
    <div className={classes.wrapper}>
      <Field
        name="title"
        label="Title"
        inputProps={{
          'aria-label': 'Title',
        }}
        component={MuiTextField}
        className={classes.textField}
        data-test-id="betTitle"
      />
      <Field
        name="description"
        label="Description"
        inputProps={{
          'aria-label': 'Description',
        }}
        multiline
        component={MuiTextField}
        className={classes.textField}
        data-test-id="betDescription"
      />
      <div className={classes.endDateTimeWrapper}>
        <Field
          name="endDate"
          label="End Date"
          type="date"
          inputProps={{
            'aria-label': 'End Date',
          }}
          InputLabelProps={{
            shrink: true,
          }}
          component={MuiTextField}
          className={classes.date}
          data-test-id="betEndDate"
        />
        <Field
          name="endTime"
          label="End Time"
          type="time"
          inputProps={{
            'aria-label': 'End Time',
          }}
          InputLabelProps={{
            shrink: true,
          }}
          component={MuiTextField}
          className={classes.time}
          data-test-id="betEndTime"
        />
      </div>
      <div className={classes.visibilityWrapper}>
        <Field
          name="visibility"
          label="Visibility"
          inputProps={{
            'aria-label': 'Visibility',
          }}
          color="primary"
          component={MuiSwitch}
          data-test-id="betVisibility"
        />
        <Typography color="inherit" component="span" noWrap>
          {visibilityValue ? 'public' : 'private'}
        </Typography>
      </div>

      <Button
        type="submit"
        aria-label="create bet"
        disabled={submitting}
        variant="raised"
        color="primary"
        className={classes.button}
        data-test-id="betSubmit"
      >
        Create
        <Create className={classes.rightIcon} />
      </Button>
    </div>
  </form>
)

Form.propTypes = {
  submitting: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  visibilityValue: PropTypes.bool.isRequired,
}

const validate = values => {
  const errors = {}
  if (!values.title) {
    errors.title = 'Field is required'
  }
  if (values.endTime && !values.endDate) {
    errors.endDate = 'Field is required if an end Time is defined'
  }
  return errors
}

const mapStateToProps = state => ({
  visibilityValue: formValueSelector('CreateBetForm')(state, 'visibility'),
})

const enhance = compose(
  reduxForm({
    form: 'CreateBetForm',
    initialValues: {
      visibility: false,
    },
    validate,
  }),
  connect(mapStateToProps),
  withStyles(styles),
)

export default enhance(Form)
