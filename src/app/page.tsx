import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import ProductReel from '@/components/ProductReel'
import {
  Button,
  buttonVariants,
} from '@/components/ui/button'
import {
  ArrowDownToLine,
  CheckCircle,
  Leaf,
} from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export default function Home() {
  return (
    <>
      {/* <ProductReel
          query={{ sort: 'desc', limit: 4 }}
          href='/products?sort=recent'
          title='Brand new'
        /> */}
      <div className="pt-[72px] overflow-clip md:px-6 px-4">
        <section className="rounded-3xl bg-neutral flex flex-col items-center justify-center px-8 py-8 lg:py-20">
          <div className="mx-auto max-w-5xl w-full mt-16">
            <Image
              alt="Header"
              width={3674}
              height={1172}
              src="https://utfs.io/f/658a81fe-3bef-437e-b2d0-ca9b36930e82-z2e6oo.png"
            />
          </div>
          <p className="text-xl text-center pt-12 mb-10">
            We create and product that makes your life easier. Get started{" "}
            <span className="font-bold underline text-accent">within 5 minutes</span>.
          </p>

          <div className="flex flex-col gap-4 justify-center items-center mb-12 w-full px-4"> {/* Changed gap-1 to gap-4 for better spacing */}
            <p className="text-lg font-bold bg-[#DEF8F2] rounded-xl p-4 translate-y-8">
              Featured Products
            </p>
            <div className="lg:w-5/12 md:w-3/4 w-full bg-[#c7e0dc] aspect-[2.14] rounded-2xl flex flex-wrap justify-center items-center px-4"> {/* Added px-4 for padding */}
              <ProductReel
                query={{ sort: 'desc', limit: 4 }}
                href='/products?sort=recent'
                title='Brand new'
              />
            </div>
          </div>


        </section>

      </div>
    </>
  )
}
