/**
 * @format
 *
 * This component is the entry to the App.
 * It should only contain  code that's seen on all pages. (e.g. header, footer)
 *
 */

import React from 'react'
import { Helmet } from 'react-helmet'
import { Switch, Route } from 'react-router-dom'

import HomePage from 'fe/containers/HomePage/Loadable'
import NotFoundPage from 'fe/containers/NotFoundPage/Loadable'
import Header from 'fe/components/Header'
import Footer from 'fe/components/Footer'
import Wrapper from './Wrapper'

const App = () => (
  <Wrapper>
    <Helmet titleTemplate="%s - Wettemer" defaultTitle="Wettemer">
      <meta name="description" content="A betting application" />
    </Helmet>
    <Header />
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route path="" component={NotFoundPage} />
    </Switch>
    <Footer />
  </Wrapper>
)

export default App
