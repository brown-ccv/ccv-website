import Image from "next/image"
import BrownLogoBuildingTogetherImage from "../../content/images/BrownLogoBuildingTogether.webp"

export default function BrownLogoBuildingTogether() {
  return (
    <Image
      src={BrownLogoBuildingTogetherImage}
      alt="Browser Window"
      width={200}
      height={100}
    />
  )
}
