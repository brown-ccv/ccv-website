import Image from 'next/image'
import BrownLogoBuildingTogetherImage from '@/assets/BrownLogoBuildingTogether.png'

export default function BrownLogoBuildingTogether() {
  return (
    <Image
      src={BrownLogoBuildingTogetherImage}
      alt="BrowserWindow"
      width={200}
      height={100}
    />
  )
}