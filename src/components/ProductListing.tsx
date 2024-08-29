'use client'

import { Product } from '@/payload-types'
import { useEffect, useState } from 'react'
import { Skeleton } from './ui/skeleton'
import Link from 'next/link'
import { cn, formatPrice } from '@/lib/utils'
import { PRODUCT_CATEGORIES } from '@/config'
import { Button } from './ui/button'

interface ProductListingProps {
  product: Product | null
  index: number
}

const ProductListing = ({
  product,
  index,
}: ProductListingProps) => {
  const [isVisible, setIsVisible] = useState<boolean>(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, index * 75)

    return () => clearTimeout(timer)
  }, [index])

  if (!product || !isVisible) return <ProductPlaceholder />

  const label = PRODUCT_CATEGORIES.find(
    ({ value }) => value === product.category
  )?.label

  const validUrls = product.images
    .map(({ image }) =>
      typeof image === 'string' ? image : image.url
    )
    .filter(Boolean) as string[]

  if (isVisible && product) {
    return (

      <Link
        className={cn(
          'invisible h-full w-full cursor-pointer group/main',
          {
            'visible animate-in fade-in-5': isVisible,
          }
        )}
        href={`/product/${product.id}`}>
        <div key={product.id} className="bg-card text-card-foreground rounded-lg shadow-lg overflow-hidden m-2 w-full sm:w-auto"> {/* Added m-2 for margin and w-full sm:w-auto for responsiveness */}
          <div className="block">
            <img
              src="https://utfs.io/f/693f0e57-5be4-42bd-adad-7591d485d7a2-bdqfc5.png"
              alt={product.name}
              width={400}
              height={300}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-medium mb-2">{product.name}</h3>
              <div className="flex justify-between items-center">
                <p className="font-medium">{formatPrice(product.price)}</p>
                <Button variant="outline" size="sm">
                  View Product
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Link>
    )
  }
}

const ProductPlaceholder = () => {
  return (
    <div className='flex flex-col w-full'>
      <div className='relative bg-zinc-100 aspect-square w-full overflow-hidden rounded-xl'>
        <Skeleton className='h-full w-full' />
      </div>
      <Skeleton className='mt-4 w-2/3 h-4 rounded-lg' />
      <Skeleton className='mt-2 w-16 h-4 rounded-lg' />
      <Skeleton className='mt-2 w-12 h-4 rounded-lg' />
    </div>
  )
}

export default ProductListing
