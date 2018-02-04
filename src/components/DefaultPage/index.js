import React from 'react'
import PropTypes from 'prop-types'
import Menu from '../Menu'

const DefaultPage = ({ children }) => <Menu>{children}</Menu>

DefaultPage.propTypes = {
  children: PropTypes.node.isRequired,
}

export default DefaultPage
