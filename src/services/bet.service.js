import { db } from '../fire'
const firebase = require('firebase')

export const addBet = bet => {
  db
    .collection('bets')
    .add(bet)
    .catch(console.error)
}

export const deleteBet = betId => {
  db
    .collection('bets')
    .doc(betId)
    .delete()
    .then(() => {
      console.log(`Bet with Id: ${betId} successfully deleted!`)
    })
    .catch(error => {
      console.error('Error removing bet: ', error)
    })
}

export const endBet = (betId, result) => {
  db
    .collection('bets')
    .doc(betId)
    .set({ result }, { merge: true })
}

export const addGuess = updateParticipant

export const addParticipant = (betId, uid) => {
  updateParticipant(betId, uid, '')
}

export const removeParticipant = (betId, uid) => {
  updateParticipant(betId, uid, firebase.firestore.FieldValue.delete())
}

function updateParticipant(betId, uid, value) {
  const participants = {}
  participants[uid] = value
  db
    .collection('bets')
    .doc(betId)
    .set({ participants }, { merge: true })
}

export const onMyBetsUpdate = (uid, callback) =>
  db
    .collection('bets')
    .where('admin', '==', uid)
    .onSnapshot(callback)

export const onInvitesUpdate = (uid, callback) =>
  db
    .collection('bets')
    .where(`participants.${uid}`, '==', '')
    .onSnapshot(callback)

export const onGuessesUpdate = (uid, callback) =>
  db
    .collection('bets')
    .where(`participants.${uid}`, '>', '')
    .onSnapshot(callback)
