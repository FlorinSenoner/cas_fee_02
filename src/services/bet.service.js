import { db } from '../fire'
const firebase = require('firebase')

export const addBet = async bet => {
  try {
    const doc = await db.collection('bets').add(bet)
    return doc.id
  } catch (error) {
    console.log('Error adding bet', error)
    return false
  }
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

// export const getBetById = async betId => {
//   try {
//     const doc = await db
//       .collection('bets')
//       .doc(betId)
//       .get()
//     if (doc.exists) {
//       return doc.data()
//     }
//     console.log('No document found with id ', this.props.betId)
//     return false
//   } catch (error) {
//     console.log('Error getting bet', error)
//     return false
//   }
// }

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
