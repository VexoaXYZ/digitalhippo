import AddToCartButton from '@/components/AddToCartButton'
import ImageSlider from '@/components/ImageSlider'
import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import ProductReel from '@/components/ProductReel'
import { PRODUCT_CATEGORIES } from '@/config'
import { getPayloadClient } from '@/get-payload'
import { formatPrice } from '@/lib/utils'
import { Check, Shield } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { notFound } from 'next/navigation'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { SVGProps } from 'react'
interface PageProps {
  params: {
    productId: string
  }
}

const BREADCRUMBS = [
  { id: 1, name: 'Home', href: '/' },
  { id: 2, name: 'Products', href: '/products' },
]

const Page = async ({ params }: PageProps) => {
  const { productId } = params

  const payload = await getPayloadClient()

  const { docs: products } = await payload.find({
    collection: 'products',
    limit: 1,
    where: {
      id: {
        equals: productId,
      },
      approvedForSale: {
        equals: 'approved',
      },
    },
  })

  const [product] = products

  if (!product) return notFound()

  const label = PRODUCT_CATEGORIES.find(
    ({ value }) => value === product.category
  )?.label

  const validUrls = (product.images as { image: string | { url: string } }[])
    .map(({ image }: { image: string | { url: string } }) =>
      typeof image === 'string' ? image : image.url
    )
    .filter(Boolean) as string[]

  return (
    <div className="pt-[72px] overflow-clip md:px-6 px-4">
      <section className="rounded-3xl bg-neutral flex flex-col items-center justify-center px-8 py-8 lg:py-20">
        <div className="grid md:grid-cols-2 gap-6 lg:gap-12 items-start max-w-6xl px-4 mx-auto py-6">
          <div className="grid gap-4 md:gap-10 items-start">
            <ImageSlider urls={validUrls} />

            <div className="grid gap-4 text-sm leading-loose">
              <h1 className="text-3xl font-bold">{product.name as string}</h1>
              <p>
                {product.description as string}
              </p>
            </div>
          </div>
          <div className="grid gap-4 md:gap-10 items-start">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold">{formatPrice(product.price as number)}</h2>
                  <Badge variant="outline">In Stock</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <AddToCartButton product={product as any} />
              </CardContent>
            </Card>
            <Collapsible className="grid gap-4">
              <CollapsibleTrigger className="flex items-center justify-between text-lg font-semibold [&[data-state=open]>svg]:rotate-90">
                Reviews
                <ChevronRightIcon className="h-5 w-5 transition-all" />
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="grid gap-6">
                  <div className="flex gap-4">
                    <Avatar className="w-10 h-10 border">
                      <AvatarImage src="/placeholder-user.jpg" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div className="grid gap-4">
                      <div className="flex gap-4 items-start">
                        <div className="grid gap-0.5 text-sm">
                          <h3 className="font-semibold">Sarah Johnson</h3>
                          <time className="text-sm text-muted-foreground">2 days ago</time>
                        </div>
                        <div className="flex items-center gap-0.5 ml-auto">
                          <StarIcon className="w-5 h-5 fill-primary" />
                          <StarIcon className="w-5 h-5 fill-primary" />
                          <StarIcon className="w-5 h-5 fill-primary" />
                          <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
                          <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
                        </div>
                      </div>
                      <div className="text-sm leading-loose text-muted-foreground">
                        <p>
                          Luraph is a high-performance, lightweight, and easy-to-use scripting language for creating
                          interactive and dynamic content. It's designed to be used in web development, video games, and other
                          applications that require real-time interactivity.
                        </p>
                      </div>
                    </div>
                  </div>
                  <Separator />
                  <div className="flex gap-4">
                    <Avatar className="w-10 h-10 border">
                      <AvatarImage src="/placeholder-user.jpg" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div className="grid gap-4">
                      <div className="flex gap-4 items-start">
                        <div className="grid gap-0.5 text-sm">
                          <h3 className="font-semibold">Alex Smith</h3>
                          <time className="text-sm text-muted-foreground">3 weeks ago</time>
                        </div>
                        <div className="flex items-center gap-0.5 ml-auto">
                          <StarIcon className="w-5 h-5 fill-primary" />
                          <StarIcon className="w-5 h-5 fill-primary" />
                          <StarIcon className="w-5 h-5 fill-primary" />
                          <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
                          <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
                        </div>
                      </div>
                      <div className="text-sm leading-loose text-muted-foreground">
                        <p>
                          Luraph is a high-performance, lightweight, and easy-to-use scripting language for creating
                          interactive and dynamic content. It's designed to be used in web development, video games, and other
                          applications that require real-time interactivity.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>
            <Collapsible className="grid gap-4">
              <CollapsibleTrigger className="flex items-center justify-between text-lg font-semibold [&[data-state=open]>svg]:rotate-90">
                FAQ
                <ChevronRightIcon className="h-5 w-5 transition-all" />
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="grid gap-6">
                  <Collapsible className="grid gap-2">
                    <CollapsibleTrigger className="flex items-center justify-between text-base font-medium [&[data-state=open]>svg]:rotate-90">
                      FAQ Question 1?
                      <ChevronRightIcon className="h-5 w-5 transition-all" />
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <p className="text-sm leading-loose text-muted-foreground">
                        The Acme Prism T-Shirt is made with a composition of 60% combed ringspun cotton and 40% polyester
                        jersey, ensuring a soft and breathable fabric that feels gentle against the skin.
                      </p>
                    </CollapsibleContent>
                  </Collapsible>
                  <Collapsible className="grid gap-2">
                    <CollapsibleTrigger className="flex items-center justify-between text-base font-medium [&[data-state=open]>svg]:rotate-90">
                      FAQ Question 2?
                      <ChevronRightIcon className="h-5 w-5 transition-all" />
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <p className="text-sm leading-loose text-muted-foreground">
                        The Acme Prism T-Shirt features a unique prism-inspired pattern that adds a modern and eye-catching
                        touch to the design.
                      </p>
                    </CollapsibleContent>
                  </Collapsible>
                  <Collapsible className="grid gap-2">
                    <CollapsibleTrigger className="flex items-center justify-between text-base font-medium [&[data-state=open]>svg]:rotate-90">
                      FAQ Question 4?
                      <ChevronRightIcon className="h-5 w-5 transition-all" />
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <p className="text-sm leading-loose text-muted-foreground">
                        Yes, the Acme Prism T-Shirt is available in a variety of colors, including black, white, and blue.
                      </p>
                    </CollapsibleContent>
                  </Collapsible>
                </div>
              </CollapsibleContent>
            </Collapsible>
          </div>
        </div>
      </section>

    </div>
  )
}

export default Page



function ChevronRightIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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
      <path d="m9 18 6-6-6-6" />
    </svg>
  )
}


function StarIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  )
}