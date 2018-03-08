import React from 'react'
import PropTypes from 'prop-types'
import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { withStyles } from 'material-ui/styles'
import AddIcon from 'material-ui-icons/Add'
import Button from 'material-ui/Button'
import DefaultPage from '../../components/DefaultPage'

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  btnCreate: {
    position: 'absolute',
    bottom: '1rem',
    right: '1rem',
  },
})

const Dashboard = ({ changePage, classes }) => (
  <DefaultPage>
    <h1>Dashboard</h1>
    <Button variant="raised" color="primary" onClick={() => changePage('/')} className={classes.button}>
      go home
    </Button>
    <Button
      variant="fab"
      color="secondary"
      aria-label="create bet"
      className={classes.btnCreate}
      onClick={() => changePage('/create')}>
      <AddIcon />
    </Button>
  </DefaultPage>
)

Dashboard.propTypes = {
  changePage: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
}

const mapDispatchToProps = {
  changePage: push,
}

const enhance = compose(withStyles(styles), connect(null, mapDispatchToProps))

export default enhance(Dashboard)
