import puppeteer from 'puppeteer'
import devices from 'puppeteer/DeviceDescriptors'
import pixelTest from '../../../../testImages/diffImages'

const iPhone = devices['iPhone 6']
const path = 'testImages/'
const userReturning = {
  email: 'puppeteer@gmail.com',
  password: '123456',
  firstName: 'puppeteer',
  lastName: 'puppeteer',
}

let browser
let page

beforeAll(async () => {
  browser = await puppeteer.launch({ headless: false })
  page = await browser.newPage()
  await page.emulate(iPhone)
})

describe('screenshots are correct', () => {
  test('create bet screen', async () => {
    await page.goto('http://localhost:3000/create')
    await page.waitForSelector('[data-provider-id="password"]')

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

    await page.waitForSelector('[data-test-id="createHeader"]')

    const file = `${path}createScreen.png`
    const testFile = `${path}testCreateScreen.png`
    await page.screenshot({ path: file })
    return pixelTest.compareScreenshots(file, testFile)
  })
})

afterAll(() => {
  browser.close()
})
