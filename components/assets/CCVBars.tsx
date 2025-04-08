import Image from 'next/image'
import CCVBarsImage from '@/assets/CCVBars.png'

export default function CCVBars() {
  return (
    <Image
      src={CCVBarsImage}
      alt="CCVBars"
      width={100}
      height={50}
    />
  )
}