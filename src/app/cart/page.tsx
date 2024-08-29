'use client'

import { Button } from '@/components/ui/button'
import { PRODUCT_CATEGORIES } from '@/config'
import { useCart } from '@/hooks/use-cart'
import { cn, formatPrice } from '@/lib/utils'
import { trpc } from '@/trpc/client'
import { Check, Loader2, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { SVGProps, useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from '@/components/ui/separator'
import { Input } from "@/components/ui/input"

const Page = () => {
  const { items, removeItem } = useCart()

  const router = useRouter()

  const { mutate: createCheckoutSession, isLoading } =
    trpc.payment.createSession.useMutation({
      onSuccess: ({ url }) => {
        if (url) router.push(url)
      },
      onError: (err) => {
        console.log(err)
      },
    })

  const productIds = items.map(({ product }) => product.id)

  const [isMounted, setIsMounted] = useState<boolean>(false)
  useEffect(() => {
    setIsMounted(true)
  }, [])


  const cartTotal = items.reduce(
    (total, { product }) => total + product.price,
    0
  )
  // now we need to calculate the tax 
  const tax = cartTotal * 0.2
  const fee = 1


  return (

    <>
      <div className="pt-[72px] overflow-clip md:px-6 px-4">
        <section className="rounded-3xl bg-neutral flex flex-col items-center justify-center px-8 py-8 lg:py-20">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_350px] gap-8 max-w-6xl mx-auto py-12 px-4 md:px-0">
            <div className="grid gap-6">
              <div className="grid gap-4">
                <h1 className="text-2xl font-bold">Your Cart</h1>
                <div className="grid gap-4">
                  {isMounted &&
                    items.map(({ product }) => {
                      const label = PRODUCT_CATEGORIES.find(
                        (c) => c.value === product.category
                      )?.label

                      const { image } = product.images[0]

                      return (
                        <Card className="pt-5">
                          <CardContent className="grid gap-4">
                            <div className="flex items-center gap-4">
                              {typeof image !== 'string' &&
                                image.url ? (
                                <Image
                                  src={image.url}
                                  alt='product image'
                                  width={100}
                                  height={40}
                                  className="rounded-md object-cover"
                                />
                              ) : null}
                              <div className="flex-1 grid gap-1">
                                <Link
                                  href={`/product/${product.id}`}
                                  className='font-medium text-gray-700 hover:text-gray-800'>
                                  <h3 className="font-medium">{product.name}</h3>
                                </Link>
                                <div className="font-medium">$12.99</div>
                                <div className="text-sm text-muted-foreground">Digital Download</div>
                              </div>
                              <Button
                                aria-label='remove product'
                                onClick={() =>
                                  removeItem(product.id)
                                }
                                variant='ghost' size="icon" className="shrink-0">
                                <TrashIcon className="h-5 w-5" />
                                <span className="sr-only">Remove</span>
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      )
                    })}
                </div>
              </div>
              <div className="grid gap-4">
                <h2 className="text-xl font-bold">Account Information</h2>
                <Card className="pt-5">
                  <CardContent className="grid gap-2">
                    <div className="flex items-center gap-2 hidden">
                      <Avatar>
                        <AvatarImage src="/placeholder-user.jpg" />
                        <AvatarFallback>JD</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-medium">John Doe</h3>
                        <p className="text-sm text-muted-foreground">john@example.com</p>
                      </div>
                    </div>
                    <span className='text-xs max-w-xs'>We've disabled this feature at this concurrent time, click your profile on the navbar to check your account.</span>
                  </CardContent>
                </Card>
              </div>
            </div>
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4">
                  <div className="grid gap-2 w-full">
                    <div className="flex items-center justify-between">
                      <span>Subtotal</span>
                      <span>{formatPrice(cartTotal)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Tax (20%)</span>
                      {isMounted ? (
                        <span>{formatPrice(tax)}</span>
                      ) : (
                        <Loader2 className='h-4 w-4 animate-spin text-muted-foreground' />
                      )}
                    </div>
                    {/* <div className="flex items-center justify-between">
                      <span>Discount</span>
                      <span className="text-green-500">-$5.00</span>
                    </div> */}
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between font-medium">
                    <span>Total</span>
                    {isMounted ? (
                      <span>{formatPrice(cartTotal + fee)}</span>
                    ) : (
                      <Loader2 className='h-4 w-4 animate-spin text-muted-foreground' />
                    )}
                  </div>
                </CardContent>
                <CardFooter>
                  <div className="grid gap-2 w-full">
                    <div className="flex items-center gap-2">
                      <Input type="text" placeholder="Enter coupon code" className="flex-1" disabled />
                      <Button variant="outline" size="sm" disabled>
                        Apply
                      </Button>
                    </div>
                    <span className='text-xs'>Discount Codes are not available at this concurrent time.</span>
                    <Button
                      disabled={items.length === 0 || isLoading}
                      onClick={() =>
                        createCheckoutSession({ productIds })
                      }
                      className='w-full'
                      size='lg'>
                      {isLoading ? (
                        <Loader2 className='w-4 h-4 animate-spin mr-1.5' />
                      ) : null}
                      Checkout | {formatPrice(cartTotal + fee)}
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>

      </div>
    </>
  )
}


function TrashIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
  )
}


export default Page
