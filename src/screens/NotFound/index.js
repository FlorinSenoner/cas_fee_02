import React from 'react'
import PropTypes from 'prop-types'
import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import Button from 'material-ui/Button'
import RunIcon from 'material-ui-icons/DirectionsRun'

import DefaultPage from '../../components/DefaultPage'

const NotFound = ({ changePage }) => (
  <DefaultPage>
    <h1>
      Captain, we are lost!
      <span role="img" aria-label="astro cat">
        🐱‍🚀
      </span>
    </h1>
    <Button variant="raised" color="secondary" onClick={() => changePage('/')}>
      escape <RunIcon />
    </Button>
  </DefaultPage>
)

NotFound.propTypes = {
  changePage: PropTypes.func.isRequired,
}

const mapDispatchToProps = {
  changePage: push,
}

const enhance = connect(null, mapDispatchToProps)

export default enhance(NotFound)
