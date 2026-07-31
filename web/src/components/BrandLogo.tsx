import lawmateLogo from '@/assets/lawmate-logo.webp'
import { cn } from '@/lib/cn'

type BrandLogoProps = {
  className?: string
  imgClassName?: string
  alt?: string
}

export function BrandLogo({
  className,
  imgClassName,
  alt = 'LawMate',
}: BrandLogoProps) {
  return (
    <span className={cn('inline-flex items-center', className)}>
      <img
        src={lawmateLogo}
        alt={alt}
        className={cn('h-auto w-auto object-contain', imgClassName)}
        draggable={false}
      />
    </span>
  )
}
