import React from 'react'
import PropTypes from 'prop-types'
import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import Button from 'material-ui/Button'

import DefaultPage from '../../components/DefaultPage'

const Home = ({ changePage }) => (
  <DefaultPage>
    <h1>Home</h1>
    <Button variant="raised" color="secondary" onClick={() => changePage('/dashboard')}>
      dashboard
    </Button>
  </DefaultPage>
)

Home.propTypes = {
  changePage: PropTypes.func.isRequired,
}

const mapDispatchToProps = {
  changePage: push,
}

const enhance = connect(null, mapDispatchToProps)

export default enhance(Home)
