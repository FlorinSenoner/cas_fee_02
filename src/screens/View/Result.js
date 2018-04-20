import React from 'react'
import PropTypes from 'prop-types'
import { branch, renderNothing } from 'recompose'
import ListItemIcon from 'material-ui/List'
import CorrectIcon from 'material-ui-icons/Check'
import WrongIcon from 'material-ui-icons/SentimentVeryDissatisfied'

const Result = ({ result, guess }) => (
  <ListItemIcon>{result.toLowerCase() === guess.toLowerCase() ? <CorrectIcon /> : <WrongIcon />}</ListItemIcon>
)

Result.propTypes = {
  result: PropTypes.string.isRequired,
  guess: PropTypes.string.isRequired,
}

const enhance = branch(({ result }) => !result, renderNothing)

export default enhance(Result)
