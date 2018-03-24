import PropTypes from 'prop-types'

export const propTypesUser = PropTypes.shape({
  uid: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  displayName: PropTypes.string,
  photoURL: PropTypes.string,
  emailVerified: PropTypes.boolean,
})

export const propTypesBet = PropTypes.shape({
  title: PropTypes.string.isRequired,
  author: PropTypes.string,
  dateCreated: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]).isRequired,
  visibility: PropTypes.oneOf(['private', 'public']),
  participants: PropTypes.object,
})
