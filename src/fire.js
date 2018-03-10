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

/**
 * OFFLINE MODE: TO ACTIVATE READ HERE
 * https://cloud.google.com/firestore/docs/manage-data/enable-offline
 */
const app = firebase.initializeApp(config)
const db = firebase.firestore(app)
const auth = firebase.auth()
export const isAuthenticated = () => !!auth.currentUser
export { auth, db }
