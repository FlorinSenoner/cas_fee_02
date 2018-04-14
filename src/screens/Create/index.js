/* eslint-disable no-underscore-dangle */
import React from 'react'
import PropTypes from 'prop-types'
import { push } from 'react-router-redux'
import { connect } from 'react-redux'

import { propTypesUser } from '../../customPropTypes'
import DefaultPage from '../../components/DefaultPage'
import CreateBetForm from './Form'
import { addBet, onMyBetsUpdate } from '../../services/bet.service'
import { userSelector } from '../SignIn/selectors'
import { openSnackbar, editSnackbarBetId, editSnackbarText } from '../App/SnackBar/actions'

class CreateBet extends React.Component {
  static propTypes = {
    user: propTypesUser.isRequired,
    changePage: PropTypes.func.isRequired,
    openSnackBar: PropTypes.func.isRequired,
    editText: PropTypes.func.isRequired,
    editBetId: PropTypes.func.isRequired,
  }

  componentDidMount() {
    this.unsubscribeFromBetsUpdate = onMyBetsUpdate(this.props.user.uid, this.updateMyBets)
  }

  componentWillUnmount() {
    this.unsubscribeFromBetsUpdate()
  }

  updateMyBets = querySnapshot => {
    querySnapshot.docChanges.forEach(change => {
      // eslint-disable-next-line no-underscore-dangle
      if (change.type === 'added' && change.doc._document.hasLocalMutations) {
        const betId = change.doc.id
        this.props.changePage(`/bet/${betId}/invite`)
        this.props.openSnackBar()
        this.props.editText({ text: 'Congratulations you created a new bet 🎉' })
        this.props.editBetId({ betId })
      }
    })
  }

  handleSubmit = async values => {
    addBet({
      admin: this.props.user.uid,
      title: values.title,
      description: values.description ? values.description : '',
      dateCreated: new Date(),
      participants: {},
      dateEnd: values.endDate ? new Date(`${values.endDate}${values.endTime ? `T${values.endTime}` : ''}`) : '',
      privacy: values.privacy ? 'public' : 'private',
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
  editText: editSnackbarText,
  editBetId: editSnackbarBetId,
}

const enhance = connect(mapStateToProps, mapDispatchToProps)

export default enhance(CreateBet)
