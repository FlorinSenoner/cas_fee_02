/**
 * Loads the component for the HomePage asynchronously
 */

import Loadable from 'react-loadable'

import LoadingIndicator from 'fe/components/LoadingIndicator'

export default Loadable({
  loader: () => import('./index'),
  loading: LoadingIndicator,
})
