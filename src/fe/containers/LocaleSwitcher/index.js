/** @format */

import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createSelector } from 'reselect'

import { appLocales } from 'fe/i18n'
import Dropdown from 'fe/components/Dropdown'
import { makeSelectLocale } from './selectors'
import { changeLocale } from './actions'
import Wrapper from './Wrapper'
import messages from './messages'

const LocaleSwitcher = ({ locale, onLocaleSwitch }) => (
  <Wrapper>
    <Dropdown
      value={locale}
      values={appLocales}
      messages={messages}
      onToggle={onLocaleSwitch}
    />
  </Wrapper>
)

LocaleSwitcher.propTypes = {
  onLocaleSwitch: PropTypes.func,
  locale: PropTypes.string,
}

const mapStateToProps = createSelector(makeSelectLocale(), locale => ({
  locale,
}))

const mapDispatchToProps = {
  onLocaleSwitch: event => changeLocale(event.target.value),
}

const enhance = connect(mapStateToProps, mapDispatchToProps)

export default enhance(LocaleSwitcher)
