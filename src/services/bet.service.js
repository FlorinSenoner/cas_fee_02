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

export const addParticipants = (betId, participants) => {
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
    .where(`participants.${uid}`, '==', 0)
    .onSnapshot(callback)
}

export const onGuessesUpdate = (uid, callback) => {
  db
    .collection('bets')
    .where(`participants.${uid}`, '>', 0)
    .onSnapshot(callback)
}
