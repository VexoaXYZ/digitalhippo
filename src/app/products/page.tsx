import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import ProductReel from '@/components/ProductReel'
import { PRODUCT_CATEGORIES } from '@/config'
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuCheckboxItem } from "@/components/ui/dropdown-menu"
import { Button } from '@/components/ui/button'
import { SVGProps } from 'react'

type Param = string | string[] | undefined

interface ProductsPageProps {
  searchParams: { [key: string]: Param }
}

const parse = (param: Param) => {
  return typeof param === 'string' ? param : undefined
}

const ProductsPage = ({
  searchParams,
}: ProductsPageProps) => {
  const sort = parse(searchParams.sort)
  const category = parse(searchParams.category)

  const label = PRODUCT_CATEGORIES.find(
    ({ value }) => value === category
  )?.label

  return (
    <div className="pt-[72px] overflow-clip md:px-6 px-4">
      <section className="rounded-3xl bg-neutral flex flex-col items-center justify-center px-8 py-8 lg:py-20">

        <div className="container px-4 md:px-6 py-12 md:py-24 lg:py-32">
          <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-8">
            <div className="bg-background rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4">Filters</h2>
              <div className="grid gap-6">
                <div>
                  <h3 className="text-base font-medium mb-2">Category</h3>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="secondary" className="w-full flex items-center justify-between">
                        <span>Category</span>
                        <ChevronDownIcon className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-full">
                      <DropdownMenuCheckboxItem
                      >
                        Scripts
                      </DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem
                      >
                        MLOs
                      </DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem
                      >
                        Websites
                      </DropdownMenuCheckboxItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <div>
                  <h3 className="text-base font-medium mb-2">Tags</h3>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="secondary" className="w-full flex items-center justify-between">
                        <span>Tags</span>
                        <ChevronDownIcon className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-full">
                      <DropdownMenuCheckboxItem
                      >
                        New
                      </DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem
                      >
                        Popular
                      </DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem
                      >
                        Sale
                      </DropdownMenuCheckboxItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* {filteredProducts.map((product) => (
                <Card key={product.id} className="bg-background rounded-lg shadow-sm overflow-hidden">
                  <img
                    src="/placeholder.svg"
                    alt={product.title}
                    width={400}
                    height={400}
                    className="w-full h-48 object-cover"
                  />
                  <CardContent className="p-4">
                    <h3 className="text-lg font-semibold">{product.title}</h3>
                    <p className="text-sm text-muted-foreground">{product.description}</p>
                    <div className="flex items-center justify-between mt-4">
                      <span className="text-lg font-semibold">${product.price.toFixed(2)}</span>
                    </div>
                  </CardContent>
                </Card>
              ))} */}
              <ProductReel
                title={label ?? 'Browse high-quality assets'}
                query={{
                  category,
                  limit: 40,
                  sort:
                    sort === 'desc' || sort === 'asc'
                      ? sort
                      : undefined,
                }}
              />
            </div>
          </div>
        </div>

      </section>

    </div>
  )
}

export default ProductsPage



function ChevronDownIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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
      <path d="m6 9 6 6 6-6" />
    </svg>
  )
}