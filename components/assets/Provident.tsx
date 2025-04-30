import Image from 'next/image'
import ProvidentImage from '@/assets/FeaturedCarousel/Provident.png'

export default function Provident() {
  return (
    <Image
      src={ProvidentImage}
      alt="Provident Screenshot"
      width={800}
      height={400}
    />
  )
}