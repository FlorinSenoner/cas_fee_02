import { createSelector } from 'reselect'

const myBetsSelector = state => state.bets.myBets
const invitesSelector = state => state.bets.invites
const guessesSelector = state => state.bets.guesses

export const myBetsSelectorEnded = (state, ended) => state.bets.myBets.filter(bet => ended || !bet.result)
export const invitesSelectorEnded = (state, ended) => state.bets.invites.filter(bet => ended || !bet.result)
export const guessesSelectorEnded = (state, ended) => state.bets.guesses.filter(bet => ended || !bet.result)

const getBetId = (state, id) => id

export const betsSelector = createSelector(
  myBetsSelector,
  invitesSelector,
  guessesSelector,
  (myBets, invites, guesses) => [...myBets, ...invites, ...guesses],
)

export const betIdSelector = createSelector(betsSelector, getBetId, (bets, id) => bets.find(bet => bet.id === id))
