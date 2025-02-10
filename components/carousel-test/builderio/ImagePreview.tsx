import React from "react"

interface ImagePreviewProps {
  imageSrc: string
}

const ImagePreview: React.FC<ImagePreviewProps> = ({ imageSrc }) => {
  return (
    <div className="flex flex-col pb-4 w-full bg-white rounded-xl shadow-sm max-md:max-w-full">
      <div className="flex flex-wrap gap-2 py-2.5 pr-20 pl-6 rounded-xl bg-stone-50 max-md:px-5">
        <div className="flex shrink-0 rounded-full bg-neutral-500 h-[15px] w-[15px]" />
        <div className="flex shrink-0 bg-amber-400 rounded-full h-[15px] w-[15px]" />
        <div className="flex shrink-0 bg-teal-600 rounded-full h-[15px] w-[15px]" />
      </div>
      <img
        loading="lazy"
        src={imageSrc}
        className="object-contain self-center mt-2 max-w-full aspect-[1.46] w-[567px]"
        alt="Preview of the PROVIDENT web app"
      />
    </div>
  )
}

export default ImagePreview
