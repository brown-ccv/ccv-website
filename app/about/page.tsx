import { Opportunities } from "@/components/Opportunities"
import { getWorkdayData } from "@/app/about/queries"
import { UserPlusIcon } from "@heroicons/react/24/solid"
import SectionHeader from "@/components/SectionHeader"
import Spinner from "@/components/assets/Spinner"
import Link from "next/link"
import React, { Suspense } from "react"

export default async function About() {
  try {
    const data = getWorkdayData()
    return (
      <div>
        <SectionHeader
          href={"#opportunities"}
          title={"Opportunities"}
          icon={<UserPlusIcon className="h-7 w-7" />}
        />
        <Suspense fallback={<Spinner />}>
          <Opportunities data={data} />
        </Suspense>
      </div>
    )
  } catch (err: any) {
    console.error(err)
    return (
      <div>
        <SectionHeader
          href={"#opportunities"}
          title={"Opportunities"}
          icon={<UserPlusIcon className="h-7 w-7" />}
        />
        <p>{err}</p>
      </div>
    )
  }
}
