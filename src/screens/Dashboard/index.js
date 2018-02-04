import React from 'react'
import PropTypes from 'prop-types'
import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import Button from 'material-ui/Button'

import DefaultPage from '../../components/DefaultPage'

const Dashboard = ({ changePage }) => (
  <DefaultPage>
    <h1>Dashboard</h1>
    <Button raised color="primary" onClick={() => changePage('/')}>
      go home
    </Button>
  </DefaultPage>
)

Dashboard.propTypes = {
  changePage: PropTypes.func.isRequired,
}

const mapDispatchToProps = {
  changePage: push,
}

const enhance = connect(null, mapDispatchToProps)

export default enhance(Dashboard)
