import React from 'react'
import PropTypes from 'prop-types'
import { push } from 'react-router-redux'
import { connect } from 'react-redux'

import { propTypesUser } from '../../customPropTypes'
import DefaultPage from '../../components/DefaultPage'
import CreateBetForm from './Form'
import { addBet } from '../../services/bet.service'
import { userSelector } from '../SignIn/selectors'
import { openSnackbar } from '../App/SnackBar/actions'

class CreateBet extends React.Component {
  static propTypes = {
    user: propTypesUser.isRequired,
    changePage: PropTypes.func.isRequired,
    openSnackBar: PropTypes.func.isRequired,
  }

  handleSubmit = async values => {
    const betId = await addBet({
      admin: this.props.user.uid,
      title: values.title,
      description: values.description ? values.description : '',
      dateCreated: new Date(),
      participants: {},
      dateEnd: values.endDate ? new Date(`${values.endDate}${values.endTime ? `T${values.endTime}` : ''}`) : '',
      privacy: values.privacy ? 'public' : 'private',
    })
    console.log('Added Bet: ', betId)
    this.props.changePage(`/bet/${betId}/invite`)
    this.props.openSnackBar({
      text: 'Congratulations you created a new bet 🎉',
      betId,
    })
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
  openSnackBar: openSnackbar,
}

const enhance = connect(mapStateToProps, mapDispatchToProps)

export default enhance(CreateBet)
