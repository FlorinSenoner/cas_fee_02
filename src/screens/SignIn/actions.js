import pick from 'lodash/fp/pick'
import { USER_CHANGED, SIGNOUT } from './constants'
import { updateUser } from '../../services/user.service'
import { auth } from '../../fire'

export const userChanged = firebaseUser => {
  const newUser = pick(['displayName', 'email', 'emailVerified', 'photoURL', 'uid'], firebaseUser)
  updateUser(newUser)
  return { type: USER_CHANGED, payload: newUser }
}
export const signOut = () => {
  auth
    .signOut()
    .then(() => console.log('sign out successful!'))
    .catch(error => console.error('problem while signout: ', error))
  return { type: SIGNOUT }
}
