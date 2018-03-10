import { db } from '../fire'

export const addBet = bet => {
  db
    .collection('bets')
    .add(bet)
    .then(docRef => {
      console.log('Added Bet: ', docRef.id)
    })
}

export const onBetsUpdate = callback => {
  db.collection('bets').onSnapshot(callback)
}
