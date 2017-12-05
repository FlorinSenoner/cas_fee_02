/** @format */

import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createSelector } from 'reselect'

import { appLocales } from 'fe/i18n'
import { changeLocale } from 'fe/containers/LanguageProvider/actions'
import { makeSelectLocale } from 'fe/containers/LanguageProvider/selectors'
import Dropdown from 'fe/components/Dropdown'
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
