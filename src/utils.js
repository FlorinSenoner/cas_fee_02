import { mapProps } from 'recompose'
import omit from 'lodash/fp/omit'

export const omitProps = keys => mapProps(props => omit(keys, props))
