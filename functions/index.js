// const functions = require('firebase-functions')
//
// TODO: This function calculates the participants_count on a bet. This would be needed to query the bets according to participants.
// TODO: As this feature was removed for simplicity this function is no longer needed.
// TODO: A problem is also, that this function runs, when a bet gets deleted straight after creation. This is a firestore bug.
// exports.updateParticipantsCount = functions.firestore.document('bets/{betId}').onUpdate(event => {
//   const bet = event.data.exists ? event.data.data() : null
//   if (bet) {
//     const participantsCount = bet.participants ? Object.keys(bet.participants).length : 0
//     return event.data.ref.set({ participants_count: participantsCount }, { merge: true })
//   }
//   return null
// })
