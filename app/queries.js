export async function getEventData(time) {
  const response = await fetch(
    `https://events.brown.edu/live/json/events/description_long/true/group/Center%20for%20Computation%20and%20Visualization%20%28CCV%29/start_date/${time}/`
  )
  const data = await response.json()
  return data
}
