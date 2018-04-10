import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import PropTypes from 'prop-types'

import Menu from '../Menu'

class DefaultPage extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    linkToDashboard: PropTypes.bool,
    changePage: PropTypes.func.isRequired,
  }

  clickHandler = () => this.props.changePage('/')

  render() {
    return <Menu goToDashboard={this.props.linkToDashboard ? this.clickHandler : false}>{this.props.children}</Menu>
  }
}

const mapDispatchToProps = {
  changePage: push,
}

const enhance = connect(null, mapDispatchToProps)

export default enhance(DefaultPage)
