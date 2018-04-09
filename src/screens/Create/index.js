import React from 'react'
import PropTypes from 'prop-types'
import { push } from 'react-router-redux'
import { connect } from 'react-redux'

import { propTypesUser } from '../../customPropTypes'
import DefaultPage from '../../components/DefaultPage'
import CreateBetForm from './Form'
import { addBet } from '../../services/bet.service'
import { userSelector } from '../SignIn/selectors'

class CreateBet extends React.Component {
  static propTypes = {
    user: propTypesUser.isRequired,
    changePage: PropTypes.func.isRequired,
  }

  handleSubmit = values => {
    addBet(
      {
        admin: this.props.user.uid,
        title: values.title,
        description: values.description ? values.description : '',
        dateCreated: new Date(),
        dateEnd: values.endDate ? new Date(`${values.endDate}${values.endTime ? `T${values.endTime}` : ''}`) : '',
        privacy: values.privacy ? 'public' : 'private',
      },
      this.props.changePage,
    )
  }
  render() {
    return (
      <DefaultPage linkToDashboard>
        <h1>Create a bet</h1>
        <CreateBetForm onSubmit={this.handleSubmit} />
      </DefaultPage>
    )
  }
}

const mapStateToProps = state => ({
  user: userSelector(state),
})

const mapDispatchToProps = {
  changePage: push,
}

const enhance = connect(mapStateToProps, mapDispatchToProps)

export default enhance(CreateBet)
