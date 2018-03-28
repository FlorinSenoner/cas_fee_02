import { db } from '../fire'
const firebase = require('firebase')

export const updateUser = user => {
  db
    .collection('users')
    .doc(user.uid)
    .set(user, { merge: true })
    .then(() => console.log('user updated'))
}

export const getUserByEmail = email =>
  db
    .collection('users')
    .where('email', '==', email)
    .limit(1)
    .get()
    .then(querySnapshot => {
      const doc = querySnapshot.docs[0]
      if (doc) {
        return doc.data()
      }
      throw new Error(`No user with email ${email} found`)
    })
    .catch(error => console.error(error))

export const getParticipants = (betId, callback) => {
  db
    .collection('users')
    .where(`participations.${betId}`, '>=', '')
    .onSnapshot(callback)
}

export const addParticipation = (uid, betId) => {
  const participations = {}
  participations[betId] = ''
  db
    .collection('users')
    .doc(uid)
    .set({ participations }, { merge: true })
}

export const removeParticipation = (uid, betId) => {
  const participations = {}
  participations[betId] = firebase.firestore.FieldValue.delete()
  db
    .collection('users')
    .doc(uid)
    .set({ participations }, { merge: true })
}
