import PropTypes from 'prop-types'

export const propTypesBet = PropTypes.shape({
  title: PropTypes.string.isRequired,
  author: PropTypes.string,
  dateCreated: PropTypes.string.isRequired,
  visibility: PropTypes.oneOfType(['private', 'public']),
  participant: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      guess: PropTypes.string.isRequired,
    }),
  ),
})

export const propTypesUser = PropTypes.shape({
  email: PropTypes.string.isRequired,
  displayName: PropTypes.string,
})
