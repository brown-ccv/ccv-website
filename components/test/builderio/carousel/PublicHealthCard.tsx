"use client"

import React from "react"
import { CardProps } from "./types"
import Button from "../Button"

const PublicHealthCard: React.FC<CardProps> = ({
  title,
  organization,
  description,
}) => {
  return (
    <div className="flex flex-col items-center w-full font-semibold max-md:mt-10 max-md:max-w-full">
      <div className="flex flex-col items-start max-w-full text-black w-[284px]">
        <div className="gap-2.5 self-stretch px-1 py-1 text-xs bg-amber-400 min-h-[22px] rounded-[50px]">
          Public Health
        </div>
        <div className="mt-6 text-3xl">{title}</div>
        <div className="flex gap-5 justify-between self-stretch mt-5 text-lg">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/e970205da6cb4116a486efc9f4859fcd/4bfd9ad3c5069392fd42e2a4ce3d0275f7ee78d099f7f52b421d67d49addbab4?apiKey=e970205da6cb4116a486efc9f4859fcd&"
            className="object-contain shrink-0 my-auto w-6 aspect-square"
            alt=""
          />
          <div className="w-full">{organization}</div>
        </div>
      </div>
      <div className="flex flex-wrap gap-10 self-stretch mt-24 text-xl text-neutral-800 max-md:mt-10">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/e970205da6cb4116a486efc9f4859fcd/5035bd160fceb4f5f7dfa0d61a5ca442c9392ed9b67f2596625973765d2baf2f?apiKey=e970205da6cb4116a486efc9f4859fcd&"
          className="object-contain shrink-0 self-start mt-6 aspect-square w-[35px]"
          alt=""
        />
        <div className="flex-auto w-[429px] max-md:max-w-full">
          {description}
        </div>
      </div>
      <div className="flex gap-8 mt-20 max-w-full text-xl text-center w-[340px] max-md:mt-10">
        <Button variant="primary" label="Website" />
        <Button variant="secondary" label="View More" />
      </div>
    </div>
  )
}

export default PublicHealthCard
