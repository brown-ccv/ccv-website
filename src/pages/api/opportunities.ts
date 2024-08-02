import type { NextApiRequest, NextApiResponse } from "next";
import Cors from "cors";

// Initializing the cors middleware
// You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
const cors = Cors({
  methods: ["POST", "GET", "HEAD"],
});

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(
  req: NextApiRequest,
  res: NextApiResponse,
  fn: Function,
) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // Run the middleware
  await runMiddleware(req, res, cors);
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append(
    "Cookie",
    "PLAY_SESSION=9365d69619d226b22f74256e51894a0476197a1f-instance=vps-prod-tvvtdnej.prod-vps.pr501.cust.pdx.wd; __cf_bm=zYtKNPBpg6veqmLc2qdk_TeHEGdGWIcSRG9tdtkQNbQ-1721323439-1.0.1.1-TApbCV1fQKTtEauZKvZ5XnXrZQJL7dcML6ixA3AycoiBMROa.iAzMq_K.5E7iaZfCj9.WhQQlmYfAxW8wdwZgQ; __cflb=02DiuHJZe28xXz6hQKLf1exjNbMDM5uxekNnt7kFV7LUC; _cfuvid=hqIGrDcFihah5EiFO0c_HEM4gIPwkeWCOxjMxNqjR20-1721323439159-0.0.1.1-604800000; wd-browser-id=fc0f0b1d-4547-488d-b353-99c751c61dae; wday_vps_cookie=1122671626.53810.0000",
  );

  const raw = JSON.stringify({
    limit: 20,
    offset: 0,
    appliedFacets: {},
    searchText: "180 George Street",
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  const response = await fetch(
    "https://brown.wd5.myworkdayjobs.com/wday/cxs/brown/staff-careers-brown/jobs",
    requestOptions,
  );
  const json = await response.json();
  res.json(json);
}
