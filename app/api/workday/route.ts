import { getWorkdayData } from "@/app/about/queries"

export async function GET(req: Request): Promise<Response> {
  const data = await getWorkdayData()
  return new Response(JSON.stringify(data), {
    headers: { "Content-Type": "application/json" },
  })
}
