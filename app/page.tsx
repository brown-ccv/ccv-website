import Footer from "@/components/Footer"
import EventSection from "@/components/EventSection"

export default function Home() {
  return (
    <main className="bg-white flex min-h-screen flex-col items-center justify-between p-0 lg:p-24">
      <EventSection />
      <Footer />
    </main>
  )
}
