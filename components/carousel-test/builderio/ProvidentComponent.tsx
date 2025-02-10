import React from "react"
import PublicHealthCard from "./PublicHealthCard"
import ImagePreview from "./ImagePreview"

const ProvidentComponent: React.FC = () => {
  return (
    <div className="flex flex-col">
      <div className="px-12 pt-8 pb-16 w-full bg-white max-md:px-5 max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col">
          <div className="flex flex-col w-2/5 max-md:ml-0 max-md:w-full">
            <PublicHealthCard
              title="PROVIDENT"
              organization="Brown School of Public Health RI Department of Health"
              description="A web app to support the PROVIDENT research study looking to prevent drug-related deaths in neighborhoods across Rhode Island. The dashboard showcases a predictive analytics model that identifies neighborhoods where future overdose deaths are most likely to occur."
            />
          </div>
          <div className="flex flex-col ml-5 w-3/5 max-md:ml-0 max-md:w-full">
            <div className="flex flex-wrap gap-5 self-stretch my-auto max-md:mt-10 max-md:max-w-full">
              <div className="flex flex-col grow shrink-0 basis-0 w-fit max-md:max-w-full">
                <ImagePreview imageSrc="https://cdn.builder.io/api/v1/image/assets/e970205da6cb4116a486efc9f4859fcd/59fb9c0af062ed0cee2c23a05586fcc5d685e03963d1d18515014ba06d8e4909?apiKey=e970205da6cb4116a486efc9f4859fcd&" />
              </div>
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/e970205da6cb4116a486efc9f4859fcd/4760ea678662c077f0de098bab2f9f898b48236436aaa27ee06e5411d3a66762?apiKey=e970205da6cb4116a486efc9f4859fcd&"
                className="object-contain shrink-0 my-auto aspect-square w-[35px]"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProvidentComponent
