import Calendar from "@/components/calendar/Calendar"
import LogoBrown from "@/components/assets/LogoBrown"
import LogoCcv from "@/components/assets/LogoCcv"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <LogoBrown />
      <LogoCcv />
    </main>
  )
}
