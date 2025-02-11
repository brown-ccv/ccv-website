import React from "react"

const CloseButton: React.FC = () => {
  return (
    <button
      className="object-contain shrink-0 self-start w-5 aspect-square"
      onClick={() => console.log("Close button clicked")}
      aria-label="Close service disruption banner"
    >
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/e970205da6cb4116a486efc9f4859fcd/45d29d6c5c99f07786c4df8a27ef20a71b947ab96988d7ef9e13073ff9ad7db1?apiKey=e970205da6cb4116a486efc9f4859fcd&"
        alt=""
        className="w-full h-full"
      />
    </button>
  )
}

export default CloseButton
