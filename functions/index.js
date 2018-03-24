const functions = require('firebase-functions')

exports.updateParticipantsCount = functions.firestore.document('bets/{betId}').onWrite(event => {
  const bet = event.data.exists ? event.data.data() : null
  if (bet) {
    const participantsCount = bet.participants ? Object.keys(bet.participants).length : 0
    return event.data.ref.set({ participants_count: participantsCount }, { merge: true })
  }
  return null
})
