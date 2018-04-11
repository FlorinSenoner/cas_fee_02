import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles'

import store, { history } from './store'
import './index.css'
import App from './screens/App'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#65cccc',
    },
    secondary: {
      main: '#ff72a7',
    },
  },
})

const target = document.getElementById('root')

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <MuiThemeProvider theme={theme}>
        <App />
      </MuiThemeProvider>
    </ConnectedRouter>
  </Provider>,
  target,
)
