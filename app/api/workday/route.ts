import { getWorkdayData } from "@/app/about/queries"

interface WorkdayRequest extends Request {}

type WorkdayResponse = Response

export async function GET(req: WorkdayRequest): Promise<WorkdayResponse> {
  const data = await getWorkdayData()
  return new Response(JSON.stringify(data), {
    headers: { "Content-Type": "application/json" },
  })
}
