import React from "react"
import { LogoProps } from "@/components/assets/types"

export function CCVBars({ width = 120 }: LogoProps) {
  return (
    <>
      <svg width={width} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 24">
        <path className="fill-keppel-700" d="M0,.01h8.27v8.25H0V.01Z" />
        <path className="fill-keppel-700" d="M17.88.05v8.23h-8.29V.05h8.29Z" />
        <path className="fill-keppel-700" d="M19.18,0h8.26v8.28h-8.26V0Z" />
        <path
          className="fill-keppel-700"
          d="M28.77,8.29V.04h8.27v8.25h-8.27Z"
        />
        <path className="fill-keppel-700" d="M38.41,0h8.25v8.25h-8.25V0Z" />
        <path className="fill-keppel-700" d="M48.01,0h8.25v8.25h-8.25V0Z" />
        <path className="fill-keppel-700" d="M65.86.02v8.24h-8.26V.02h8.26Z" />
        <path className="fill-sunglow-400" d="M75.48.05v8.23h-8.29V.05h8.29Z" />
        <path
          className="fill-sunglow-400"
          d="M85.06,8.31h-8.26V.02h8.26v8.28Z"
        />
        <path className="fill-sunglow-400" d="M94.68.04v8.24h-8.29V.04h8.29Z" />
      </svg>
    </>
  )
}
