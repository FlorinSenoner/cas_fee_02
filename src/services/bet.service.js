import { db } from '../fire'

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

export const addParticipant = (betId, participant) => {
  db
    .collection('bets')
    .doc(betId)
    .collection('participants')
    .doc(participant.uid)
    .set(participant)
}

export const onBetUpdate = (id, callback) =>
  db
    .collection('bets')
    .doc(id)
    .onSnapshot(doc => callback(doc.data()))

export const onParticipantsUpdate = (id, callback) => {
  db
    .collection('bets')
    .doc(id)
    .collection('participants')
    .onSnapshot(callback)
}

export const onBetsUpdate = callback => {
  // TODO query einschränken auf wo ich admin oder participant bin
  db.collection('bets').onSnapshot(callback)
}
