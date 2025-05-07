import React from "react"
import { JSX } from "react"

export function Acknowledgement({}): JSX.Element {
  return (
    <section className="content-wrapper m-0 py-4 bg-cream flex items-center justify-center">
      <div className="max-w-[1000px]">
        <p className="text-lg italic text-center text-neutral-500">
          Research reported on this site is supported by an Institutional
          Development Award (IDeA) from the National Institute of General
          Medical Sciences of the National Institutes of Health under grant
          number P20GM109035.
        </p>
      </div>
    </section>
  )
}

export default Acknowledgement
