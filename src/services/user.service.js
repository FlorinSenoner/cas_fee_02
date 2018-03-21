import { db } from '../fire'

export const updateUser = user => {
  db
    .collection('users')
    .doc(user.uid)
    .set(user)
    .then(() => console.log('user updated'))
}
