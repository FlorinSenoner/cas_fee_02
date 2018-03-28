import { db } from '../fire'
const firebase = require('firebase')

export const addBet = (bet, changePage) => {
  db
    .collection('bets')
    .add(bet)
    .then(docRef => {
      changePage(`/bet/${docRef.id}/invite`)
      console.log('Added Bet: ', docRef.id)
    })
}

export const deleteBet = betId => {
  db
    .collection('bets')
    .doc(betId)
    .delete()
    .then(() => {
      console.log('Bet successfully deleted!')
    })
    .catch(error => {
      console.error('Error removing bet: ', error)
    })
}

export const getBetById = async betId => {
  try {
    const doc = await db
      .collection('bets')
      .doc(betId)
      .get()
    if (doc.exists) {
      return doc.data()
    }
    console.log('No document found with id ', this.props.betId)
    return false
  } catch (error) {
    console.log('Error getting bet', error)
    return false
  }
}

export const addParticipant = (betId, uid) => {
  const participants = {}
  participants[uid] = ''
  db
    .collection('bets')
    .doc(betId)
    .set({ participants }, { merge: true })
}

export const removeParticipant = (betId, uid) => {
  const participants = {}
  participants[uid] = firebase.firestore.FieldValue.delete()
  db
    .collection('bets')
    .doc(betId)
    .set({ participants }, { merge: true })
}

export const onMyBetsUpdate = (uid, callback) => {
  db
    .collection('bets')
    .where('admin', '==', uid)
    .onSnapshot(callback)
}

export const onInvitesUpdate = (uid, callback) => {
  db
    .collection('bets')
    .where(`participants.${uid}`, '==', '')
    .onSnapshot(callback)
}

export const onGuessesUpdate = (uid, callback) => {
  db
    .collection('bets')
    .where(`participants.${uid}`, '>', '')
    .onSnapshot(callback)
}
