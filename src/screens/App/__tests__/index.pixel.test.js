import puppeteer from 'puppeteer'
import devices from 'puppeteer/DeviceDescriptors'
import pixelTest from '../../../../testImages/diffImages'

const iPhone = devices['iPhone 6']
const path = 'testImages/'

let browser
let page

beforeAll(async () => {
  browser = await puppeteer.launch({ headless: false })
  page = await browser.newPage()
  await page.emulate(iPhone)
  await page.goto('http://localhost:3000/')
})

describe('screenshots are correct', () => {
  test('login screen', async () => {
    const file = `${path}loginScreen.png`
    const testFile = `${path}testLoginScreen.png`
    await page.screenshot({ path: file })
    return pixelTest.compareScreenshots(file, testFile)
  })
})

afterAll(() => {
  browser.close()
})
