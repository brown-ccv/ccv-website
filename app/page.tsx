import EventSection from "@/components/EventSection"
import RadioButton from "@/components/RadioButton"

const group = [
  { id: 'option 1' },
  { id: 'option 2' },
  { id: 'test'}
]
export default function Home() {
  return (
    <main className="bg-white flex min-h-screen flex-col items-center justify-between p-0 lg:p-24">
      <EventSection />
      <RadioButton options={ group }></RadioButton>
    </main>
  )
}
