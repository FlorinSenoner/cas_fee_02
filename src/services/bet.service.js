import { db } from '../fire'

export const addBetService = bet => {
  db
    .collection('bets')
    .add(bet)
    .then(docRef => {
      console.log('Added Bet: ', docRef.id)
    })
}

export const deleteBetService = betId => {
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

export const onBetsUpdate = callback => {
  db.collection('bets').onSnapshot(callback)
}
