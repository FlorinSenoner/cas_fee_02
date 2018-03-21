import PropTypes from 'prop-types'

export const propTypesUser = PropTypes.shape({
  email: PropTypes.string.isRequired,
  displayName: PropTypes.string,
})

export const propTypesParticipant = PropTypes.shape({
  id: PropTypes.string.isRequired,
  guess: PropTypes.string.isRequired,
})

export const propTypesBet = PropTypes.shape({
  title: PropTypes.string.isRequired,
  author: PropTypes.string,
  dateCreated: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]).isRequired,
  visibility: PropTypes.oneOf(['private', 'public']),
  participants: PropTypes.arrayOf(propTypesParticipant),
})
