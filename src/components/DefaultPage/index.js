import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import PropTypes from 'prop-types'

import Menu from '../Menu'

class DefaultPage extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    linkToDashboard: PropTypes.bool,
    goToBetView: PropTypes.string,
    changePage: PropTypes.func.isRequired,
  }

  goToDashboardHandler = () => this.props.changePage('/')
  goToBetHandler = () => this.props.changePage(this.props.goToBetView)

  render() {
    return (
      <Menu
        goToDashboard={this.props.linkToDashboard ? this.goToDashboardHandler : false}
        goBack={this.props.goToBetView ? this.goToBetHandler : false}
      >
        {this.props.children}
      </Menu>
    )
  }
}

const mapDispatchToProps = {
  changePage: push,
}

const enhance = connect(null, mapDispatchToProps)

export default enhance(DefaultPage)
