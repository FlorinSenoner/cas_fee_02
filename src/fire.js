const firebase = require('firebase')
require('firebase/firestore')
require('firebase/auth')

const config = {
  apiKey: 'AIzaSyBjgLM53YcdHFY0gg2V14XOp9pfG78J08w',
  authDomain: 'wettemer.firebaseapp.com',
  databaseURL: 'https://wettemer.firebaseio.com',
  projectId: 'wettemer',
  storageBucket: 'wettemer.appspot.com',
  messagingSenderId: '34791821550',
}

const app = firebase.initializeApp(config)
const auth = firebase.auth()
const db = firebase.firestore(app)
/**
 * OFFLINE MODE: TO ACTIVATE READ HERE
 * https://cloud.google.com/firestore/docs/manage-data/enable-offline
 *
 * PROBLEMS:
 * - after creating a bet, .then() is not called even though the bet will be created with a valid ID.
 *   this leeds to a not working 'create bet' function
 */
firebase
  .firestore()
  .enablePersistence()
  .then(() => {
    console.log('offlinemode acctivated')
  })
  .catch(err => {
    if (err.code === 'failed-precondition') {
      console.error('no offline mode available due a failed precondition (i.e. multiple tabs are open, etc.)')
    } else if (err.code === 'unimplemented') {
      console.error('no offline mode available due the current browser support')
    }
    console.log('no offline mode available')
  })

export const isAuthenticated = () => !!auth.currentUser
export { auth, db }
