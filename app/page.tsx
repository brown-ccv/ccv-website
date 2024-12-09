import EventSection from "@/components/EventSection"
import CheckboxGroup from "@/components/CheckboxGroup"

export default function Home() {
  return (
    <main className="bg-white flex min-h-screen flex-col items-center justify-between p-0 lg:p-24">
      <EventSection />
      <CheckboxGroup />
    </main>
  )
}
