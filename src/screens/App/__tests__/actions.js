import reducer, { initialState } from '../betReducer'
import * as actions from '../betConstants'

const mockBets = [
  {
    admin: 'FRcvKMO5nIcIAeg1GrOzITjRTXn1',
    dateCreated: '2018-04-16T18:40:02.795Z',
    dateEnd: '2019-01-15T07:01:00.000Z',
    description: "bypassing the card won't do anything, we need to transmit the primary SCSI system!",
    participants: {},
    title: 'Can puppeteer generate a bet?',
    visibility: 'public',
    id: 'quYBWT4MDb0EHcKEb7Io',
  },
]

describe('test bets reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(initialState, {})).toEqual({ guesses: [], invites: [], myBets: [] })
  })

  it('should handle MY_BETS_CHANGED', () => {
    const myBetsUpdate = {
      type: actions.MY_BETS_CHANGED,
      payload: mockBets,
    }
    expect(reducer(initialState, myBetsUpdate)).toEqual({ guesses: [], invites: [], myBets: mockBets })
  })

  it('should handle INVITES_CHANGED', () => {
    const invitesUpdate = {
      type: actions.INVITES_CHANGED,
      payload: mockBets,
    }
    expect(reducer(initialState, invitesUpdate)).toEqual({ guesses: [], invites: mockBets, myBets: [] })
  })

  it('should handle GUESSES_CHANGED', () => {
    const guessesUpdate = {
      type: actions.GUESSES_CHANGED,
      payload: mockBets,
    }
    expect(reducer(initialState, guessesUpdate)).toEqual({ guesses: mockBets, invites: [], myBets: [] })
  })
})
