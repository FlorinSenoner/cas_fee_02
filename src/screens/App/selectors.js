import { createSelector } from 'reselect'

export const myBetsSelector = state => state.bets.myBets
export const invitesSelector = state => state.bets.invites
export const guessesSelector = state => state.bets.guesses

const getBetId = (state, id) => id

export const betsSelector = createSelector(
  myBetsSelector,
  invitesSelector,
  guessesSelector,
  (myBets, invites, guesses) => [...myBets, ...invites, ...guesses],
)

export const betIdSelector = createSelector(betsSelector, getBetId, (bets, id) => bets.find(bet => bet.id === id))
