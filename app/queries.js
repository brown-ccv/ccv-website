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

export async function getEventData(time) {
  const [ccvData, dscovData] = await Promise.all([
    getCCVData(time),
    getDscovData(time),
  ])

  const combinedData = [...ccvData, ...dscovData]

  return combinedData
}
