// export const getLocation = async page => page.evaluate(() => location)
//
// export const getLocationProp = async (page, prop) => (await getLocation(page))[prop]
//
// const getHistory = async page => page._client.send('Page.getNavigationHistory')
// const getHistoryEntry = async (page, index) => (await getHistory(page)).entries[index]
// const getCurrentHistoryEntry = async page => {
//   const { entries, currentIndex } = await getHistory(page)
//   return entries[currentIndex]
// }
//
//
// const pathname = await getLocationProp(page, 'pathname')
// const re = /(?<=bet\/)(.*)(?=\/invite)/
// const betId = pathname.match(re)[1]
// console.log(`A new bet with id: ${betId} was successfully created`)
//
// await page.goto('http://localhost:3000/')
// await page.goto(`http://localhost:3000/bet/${betId}/invites`)
