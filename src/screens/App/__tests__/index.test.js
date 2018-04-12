// import React from 'react'
// import { mountWithRouter } from '../../../utils'
//
// import App from '../index'
//
// const renderedComponent = mountWithRouter(<App />)
//
// describe('<App />', () => {
//   xit('renders without crashing', () => {
//     console.log(renderedComponent.debug())
//     expect(renderedComponent.find('App').length).toBe(1)
//   })
//   xit('renders an App', () => {
//     expect(renderedComponent).toMatchSnapshot()
//   })
// })

const puppeteer = require('puppeteer')
const faker = require('faker')

const user = {
  email: faker.internet.email(),
  password: '123456',
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
}

const isDebugging = () => {
  const debuggingMode = {
    headless: false,
    slowMo: 5,
    devtools: true,
  }

  // return process.env.NODE_ENV === 'test' ? debuggingMode : {}
  return true ? debuggingMode : {}
}

let browser
let page
beforeAll(async () => {
  browser = await puppeteer.launch(isDebugging())
  page = await browser.newPage()
  await page.goto('http://localhost:3000/')
  page.setViewport({ width: 500, height: 2400 })
})

describe('login page loads successfully', () => {
  test(
    'h1 loads correctly',
    async () => {
      const html = await page.$eval('[data-testid="h1"]', e => e.innerHTML)

      expect(html).toBe('Welcome')
    },
    16000,
  )
})

describe('successful login ', () => {
  test(
    'test email login',
    async () => {
      const emailButton = await page.$('[data-provider-id="password"]')
      await emailButton.click()

      await page.waitForSelector('.firebaseui-id-email')

      const email = await page.$('.firebaseui-id-email')
      await email.type(user.email)

      const next = await page.$('.firebaseui-id-submit')
      await next.click()

      await page.waitForSelector('.firebaseui-id-name')

      const name = await page.$('.firebaseui-id-name')
      await name.type(`${user.firstName} ${user.lastName}`)

      const password = await page.$('.firebaseui-id-new-password')
      await password.type(user.password)

      const submit = await page.$('.firebaseui-id-submit')
      await submit.click()
    },
    16000,
  )
})

afterAll(() => {
  if (isDebugging()) {
    browser.close()
  }
})
