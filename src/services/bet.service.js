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

export const getBet = id => {
  console.log('Getting bet :)')
  return db
    .collection('bets')
    .doc(id)
    .get()
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
  console.log(`TODO. add participant ${participant} to the bet ${betId}`)
}

export const onBetsUpdate = callback => {
  db.collection('bets').onSnapshot(callback)
}
