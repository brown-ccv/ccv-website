async function getCCVData(time) {
  const response = await fetch(
    `https://events.brown.edu/live/json/events/description_long/true/group/Center%20for%20Computation%20and%20Visualization%20%28CCV%29/start_date/${time}/`
  )
  const data = await response.json()
  return data
}

async function getDscovData(time) {
  const description_long = true
  const group = "Data%20Science%20Institute"
  const response = await fetch(
    `https://events.brown.edu/live/json/events/description_long/${description_long}/group/${group}/start_date/${time}/`
  )
  const data = await response.json()

  // Filter for only DSCOV events
  const filteredData = data.filter((event) =>
    event.title.toLowerCase().includes("dscov")
  )

  return filteredData
}

function compareDate2Utc(a, b) {
  const dateA = new Date(a.date2_utc)
  const dateB = new Date(b.date2_utc)
  const validA = !isNaN(dateA.getTime())
  const validB = !isNaN(dateB.getTime())

  if (!validA && !validB) return 0
  if (!validA) return 1 // a is invalid, push to end
  if (!validB) return -1 // b is invalid, push to end
  return dateA - dateB
}

export async function getEventData(time) {
  const [ccvData, dscovData] = await Promise.all([
    getCCVData(time),
    getDscovData(time),
  ])

  const combinedData = [...ccvData, ...dscovData]
  combinedData.sort(compareDate2Utc)

  return combinedData
}
