/**
 * This component is the entry to the App.
 * It should only contain  code that's seen on all pages. (e.g. header, footer)
 */

import React from 'react'
import { Helmet } from 'react-helmet'
import styled from 'styled-components'
import { Switch, Route } from 'react-router-dom'

import HomePage from '../HomePage/Loadable'
import NotFoundPage from '../NotFoundPage/Loadable'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

const AppWrapper = styled.div`
  max-width: calc(768px + 16px * 2);
  margin: 0 auto;
  display: flex;
  min-height: 100%;
  padding: 0 16px;
  flex-direction: column;
`

const App = () => (
  <AppWrapper>
    <Helmet titleTemplate="%s - Wettemer" defaultTitle="Wettemer">
      <meta name="description" content="A betting application" />
    </Helmet>
    <Header />
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route path="" component={NotFoundPage} />
    </Switch>
    <Footer />
  </AppWrapper>
)

export default App
