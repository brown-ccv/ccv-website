export async function getWorkdayData() {
  try {
    const myHeaders = new Headers()
    myHeaders.append("Content-Type", "application/json")
    myHeaders.append(
      "Cookie",
      "PLAY_SESSION=9365d69619d226b22f74256e51894a0476197a1f-instance=vps-prod-tvvtdnej.prod-vps.pr501.cust.pdx.wd; __cf_bm=zYtKNPBpg6veqmLc2qdk_TeHEGdGWIcSRG9tdtkQNbQ-1721323439-1.0.1.1-TApbCV1fQKTtEauZKvZ5XnXrZQJL7dcML6ixA3AycoiBMROa.iAzMq_K.5E7iaZfCj9.WhQQlmYfAxW8wdwZgQ; __cflb=02DiuHJZe28xXz6hQKLf1exjNbMDM5uxekNnt7kFV7LUC; _cfuvid=hqIGrDcFihah5EiFO0c_HEM4gIPwkeWCOxjMxNqjR20-1721323439159-0.0.1.1-604800000; wd-browser-id=fc0f0b1d-4547-488d-b353-99c751c61dae; wday_vps_cookie=1122671626.53810.0000"
    )

    const raw = JSON.stringify({
      limit: 20,
      offset: 0,
      appliedFacets: {},
      searchText: "180 George Street",
    })

    const response = await fetch(
      "https://brown.wd5.myworkdayjobs.com/wday/cxs/brown/staff-careers-brown/jobs",
      {
        method: "POST",
        headers: myHeaders,
        body: raw,
      }
    )

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    return data.jobPostings || []
  } catch (error) {
    console.error("Error fetching Workday data:", error)
    // Return empty array as fallback to prevent component crashes
    return []
  }
}
