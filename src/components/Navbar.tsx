import Link from 'next/link'
import MaxWidthWrapper from './MaxWidthWrapper'
import { Icons } from './Icons'
import NavItems from './NavItems'
import { buttonVariants } from './ui/button'
import Cart from './Cart'
import { getServerSideUser } from '@/lib/payload-utils'
import { cookies } from 'next/headers'
import UserAccountNav from './UserAccountNav'
import MobileNav from './MobileNav'
import Image from 'next/image'
import { ShoppingBag, ShoppingCart } from 'lucide-react'

const Navbar = async () => {
    const nextCookies = cookies()
    const { user } = await getServerSideUser(nextCookies)

    return (
        <header className="absolute top-8 w-screen z-overlay mb-20">
            <nav
                className="container flex items-center justify-between px-8 py-4 mx-auto bg-base-100 rounded-full shadow-lg"
                aria-label="Global"
            >
                <div className="flex lg:flex-1">
                    <Link href="/">
                        <p className="flex items-center gap-2 shrink-0" title="Creative Store homepage">
                            <Image
                                alt="Creative Store logo"
                                src="https://utfs.io/f/693f0e57-5be4-42bd-adad-7591d485d7a2-bdqfc5.png"
                                width={30}
                                height={32}
                            />
                            Creative Store
                        </p>
                    </Link>
                </div>
                <div className="hidden lg:flex lg:justify-center lg:gap-12 lg:items-center">
                    <NavItems />
                </div>
                <div className="hidden lg:flex lg:justify-end lg:flex-1">
                    {user ? null : (
                        <Link
                            href='/sign-in'
                            className={buttonVariants({
                                variant: 'ghost',
                            })}>
                            Sign in
                        </Link>
                    )}

                    {user ? null : (
                        <span
                            className='h-6 w-px bg-gray-200'
                            aria-hidden='true'
                        />
                    )}

                    {user ? (
                        <UserAccountNav user={user} />
                    ) : (
                        <Link
                            href='/sign-up'
                            className={buttonVariants({
                                variant: 'ghost',
                            })}>
                            Create account
                        </Link>
                    )}

                    {/* {user ? (
                        <span
                            className='h-6 w-px bg-gray-200'
                            aria-hidden='true'
                        />
                    ) : null} */}

                    {/* {user ? null : (
                        <div className='flex lg:ml-6'>
                            <span
                                className='h-6 w-px bg-gray-200'
                                aria-hidden='true'
                            />
                        </div>
                    )} */}

                    <div className='flex justify-center items-center ml-3'>
                        {/* <Cart /> */}
                        <Link href='/cart'>
                            <ShoppingCart className='w-5 h-4 text-gray-700' />
                        </Link>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Navbar
