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

import puppeteer from 'puppeteer'
import faker from 'faker'
import format from 'date-fns/format'

const timeout = 16000

const waitFor = async ms => new Promise(resolve => setTimeout(resolve, ms))

const isDebugging = () => {
  const debuggingMode = {
    headless: false,
    slowMo: 15,
    devtools: true,
  }

  return process.env.MODE === 'debug' ? debuggingMode : {}
}

let browser
let page
beforeAll(async () => {
  browser = await puppeteer.launch(isDebugging())
  page = await browser.newPage()
  await page.goto('http://localhost:3000/')
  page.setViewport({ width: 360, height: 640 })
})

describe('login page loads successfully', () => {
  test(
    'h1 loads correctly',
    async () => {
      const html = await page.$eval('[data-test-id="h1"]', e => e.innerHTML)

      expect(html).toBe('Welcome<span role="img" aria-label="vulcan welcome">🖖</span>')
    },
    timeout,
  )
})

const userNew = {
  email: faker.internet.email(),
  password: '123456',
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
}
describe('successful login new user', () => {
  test.skip(
    'test email login',
    async () => {
      const emailButton = await page.$('[data-provider-id="password"]')
      await emailButton.click()

      await page.waitForSelector('.firebaseui-id-email')

      const email = await page.$('.firebaseui-id-email')
      await email.type(userNew.email)

      const next = await page.$('.firebaseui-id-submit')
      await next.click()

      await page.waitForSelector('.firebaseui-id-name')

      const name = await page.$('.firebaseui-id-name')
      await name.type(`${userNew.firstName} ${userNew.lastName}`)

      const password = await page.$('.firebaseui-id-new-password')
      await password.type(userNew.password)

      const submit = await page.$('.firebaseui-id-submit')
      await submit.click()
    },
    timeout,
  )
})

const userReturning = {
  email: 'puppeteer@gmail.com',
  password: '123456',
}
describe('successful login returning user', () => {
  test(
    'test email login',
    async () => {
      const emailButton = await page.$('[data-provider-id="password"]')
      await emailButton.click()

      await page.waitForSelector('.firebaseui-id-email')

      const email = await page.$('.firebaseui-id-email')
      await email.type(userReturning.email)

      const next = await page.$('.firebaseui-id-submit')
      await next.click()

      await page.waitForSelector('.firebaseui-id-password')

      const password = await page.$('.firebaseui-id-password')
      await password.type(userReturning.password)

      const submit = await page.$('.firebaseui-id-submit')
      await submit.click()
    },
    timeout,
  )
})

const newBet = {
  title: 'Can puppeteer generate a bet?',
  description: faker.hacker.phrase(),
  endDate: format(faker.date.future(), 'DD.MM.YYYY'),
  endTime: format(faker.date.future(), 'HH:mm'),
  private: faker.random.boolean(),
}

const participant = {
  valid: 'puppeteer@gmail.com',
  invalid: 'fake@fake.com',
}
describe('test bets', () => {
  test(
    'should create a bet and check that the number of bet is increased by one',
    async () => {
      await page.waitForSelector('[data-test-id="LoadingState_Guesses_Invites_MyBets"]')

      const currentBets = await page.$$('[data-test-id="myBetList"] [data-test-id="betCard"]')
      const currentNumberOfBets = currentBets.length

      const createButton = await page.$('[data-test-id="createBtn"]')
      await createButton.click()

      await page.waitForSelector('[data-test-id="createHeader"]')

      const betTitle = await page.$('[data-test-id="betTitle"] [name="title"]')
      await betTitle.type(newBet.title)

      const betDescription = await page.$('[data-test-id="betDescription"] [name="description"]')
      await betDescription.type(newBet.description)

      const betEndDate = await page.$('[data-test-id="betEndDate"] [name="endDate"]')
      await betEndDate.type(newBet.endDate)

      const betEndTime = await page.$('[data-test-id="betEndTime"] [name="endTime"]')
      await betEndTime.type(newBet.endTime)

      if (newBet.endTime) {
        const betVisibility = await page.$('[data-test-id="betVisibility"]')
        await betVisibility.click()
      }

      const betSubmit = await page.$('[data-test-id="betSubmit"]')
      await betSubmit.click()

      await page.waitForSelector('[data-test-id="snackBarMessage"]')
      const snackBarMessage = await page.$eval('[data-test-id="snackBarMessage"]', e => e.innerHTML)
      expect(snackBarMessage).toBe('Congratulations you created a new bet 🎉')

      await page.goto('http://localhost:3000/')
      await page.waitForSelector('[data-test-id="betCard"]')

      const newBets = await page.$$('[data-test-id="myBetList"] [data-test-id="betCard"]')
      const newNumberOfBets = newBets.length

      expect(newNumberOfBets).toBe(currentNumberOfBets + 1)
    },
    timeout,
  )

  test(
    'add valid participant to the first bet on the dashboard. should remove all current participants, for consistency and add one new participant',
    async () => {
      await page.waitForSelector('[data-test-id="LoadingState_Guesses_Invites_MyBets"]')
      // there needs to be at least one bet to work
      await page.waitForSelector('[data-test-id="betCard"]')

      const betCard = await page.$('[data-test-id="betCard"]')
      await betCard.click()

      await page.waitForSelector('[data-test-id="invitePeople"]')

      const invitePeople = await page.$('[data-test-id="invitePeople"]')
      await invitePeople.click()

      await page.waitForSelector('[data-test-id="LoadingState_Participants"]')

      const currentParticipants = await page.$$('[data-test-id="betParticipant"]')
      const currentNumberOfParticipants = currentParticipants.length

      if (currentNumberOfParticipants > 0) {
        const deleteParticipants = await page.$$('[data-test-id="deleteParticipant"]')
        await Promise.all(
          deleteParticipants.map(async deleteParticipantButton => {
            await deleteParticipantButton.click()
          }),
        )
      }

      const betParticipantField = await page.$('[data-test-id="betParticipantField"] [name="participant"]')
      await betParticipantField.type(participant.valid)

      const betSubmit = await page.$('[data-test-id="betSubmit"]')
      await betSubmit.click()

      await page.waitForSelector('[data-test-id="betParticipant"]')

      const newParticipants = await page.$$('[data-test-id="betParticipant"]')
      const newNumberOfParticipants = newParticipants.length

      await page.goto('http://localhost:3000/')

      expect(newNumberOfParticipants).toBe(1)
    },
    timeout,
  )

  test(
    'add invalid participant to the first bet on the dashboard. should trigger an error message and the number of participants should remain the same',
    async () => {
      await page.waitForSelector('[data-test-id="LoadingState_Guesses_Invites_MyBets"]')
      // there needs to be at least one bet to work
      await page.waitForSelector('[data-test-id="betCard"]')

      const betCard = await page.$('[data-test-id="betCard"]')
      await betCard.click()

      await page.waitForSelector('[data-test-id="invitePeople"]')

      const invitePeople = await page.$('[data-test-id="invitePeople"]')
      await invitePeople.click()

      await page.waitForSelector('[data-test-id="LoadingState_Participants"]')

      const currentParticipants = await page.$$('[data-test-id="betParticipant"]')
      const currentNumberOfParticipants = currentParticipants.length

      const betParticipantField = await page.$('[data-test-id="betParticipantField"] [name="participant"]')
      await betParticipantField.type(participant.invalid)

      const betSubmit = await page.$('[data-test-id="betSubmit"]')
      await betSubmit.click()

      await page.waitForSelector('[data-test-id="snackBarMessage"]')
      const snackBarMessage = await page.$eval('[data-test-id="snackBarMessage"]', e => e.innerHTML)
      expect(snackBarMessage).toBe('No user with that email found 🤷')

      const newParticipants = await page.$$('[data-test-id="betParticipant"]')
      const newNumberOfParticipants = newParticipants.length

      await page.goto('http://localhost:3000/')

      expect(newNumberOfParticipants).toBe(currentNumberOfParticipants)
    },
    timeout,
  )

  test(
    'remove first bet on dashboard if number of participants is 0. otherwise remove participants and remove bet',
    async () => {
      await page.waitForSelector('[data-test-id="LoadingState_Guesses_Invites_MyBets"]')
      // there needs to be at least one bet to work
      await page.waitForSelector('[data-test-id="betCard"]')

      const currentBets = await page.$$('[data-test-id="myBetList"] [data-test-id="betCard"]')
      const currentNumberOfBets = currentBets.length

      const betCard = await page.$('[data-test-id="betCard"]')
      await betCard.click()

      await page.waitForSelector('[data-test-id="LoadingState_Participants"]')

      // check for number of guesses
      const currentGuesses = await page.$$('[data-test-id="betGuess"]')
      const currentNumberOfGuesses = currentGuesses.length

      if (currentNumberOfGuesses > 0) {
        const deleteBet = await page.$('[data-test-id="deleteBet"]')
        await deleteBet.click()

        await page.waitForSelector('[data-test-id="snackBarMessage"]')
        const snackBarMessage = await page.$eval('[data-test-id="snackBarMessage"]', e => e.innerHTML)
        expect(snackBarMessage).toBe('please remove participants before deleting the bet')

        await page.waitForSelector('[data-test-id="invitePeople"]')
        const invitePeople = await page.$('[data-test-id="invitePeople"]')
        await invitePeople.click()

        await page.waitForSelector('[data-test-id="deleteParticipant"]')

        const deleteParticipants = await page.$$('[data-test-id="deleteParticipant"]')
        await Promise.all(
          deleteParticipants.map(async deleteParticipantButton => {
            await deleteParticipantButton.click()
          }),
        )

        const goBackButton = await page.$('[data-test-id="goBackButton"]')
        await goBackButton.click()
        // this is needed because of bug in puppeteer where waitForNetwork until networidle0 is ont working on SPA
        await waitFor(100)
      }

      await page.waitForSelector('[data-test-id="deleteBet"]')
      const deleteBet = await page.$('[data-test-id="deleteBet"]')
      await deleteBet.click()
      // this is needed because of bug in puppeteer where waitForNetwork until networidle0 is ont working on SPA
      await waitFor(100)

      const newBets = await page.$$('[data-test-id="myBetList"] [data-test-id="betCard"]')
      const newNumberOfBets = newBets.length

      expect(newNumberOfBets).toBe(currentNumberOfBets - 1)
    },
    timeout,
  )
})

afterAll(() => {
  if (isDebugging()) {
    browser.close()
  }
})
