export const getLocation = async page => page.evaluate(() => location)

export const getLocationProp = async (page, prop) => (await getLocation(page))[prop]

const getHistory = async page => page._client.send('Page.getNavigationHistory')
const getHistoryEntry = async (page, index) => (await getHistory(page)).entries[index]
const getCurrentHistoryEntry = async page => {
  const { entries, currentIndex } = await getHistory(page)
  return entries[currentIndex]
}
