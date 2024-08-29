// components/Navbar.js
import Link from 'next/link';
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import UserAccountNav from './UserAccountNav';

export default function Header({
    className,
    fullWidth = false,
}: {
    className?: string;
    fullWidth?: boolean;
}) {
    // const [open, setOpen] = useState<boolean>(false)
    // const pathname = usePathname()

    // useEffect(() => {
    //     setOpen(false)
    // }, [pathname])


    return (
        <>

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
                    <div className="flex lg:hidden">
                        <button
                            type="button"
                            // onClick={() => setOpen(!open)}
                            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5"
                        >
                            <span className="sr-only">Open main menu</span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="w-6 h-6 text-base-content"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                                />
                            </svg>
                        </button>
                    </div>
                    <div className="hidden lg:flex lg:justify-center lg:gap-12 lg:items-center">
                        <Links />
                    </div>
                    <div className="hidden lg:flex lg:justify-end lg:flex-1">
                        <Link href="/sign-in">
                            <Button className="btn btn-primary rounded-full animateBtn">
                                Login
                            </Button>
                        </Link>
                    </div>
                </nav>
                {/* Mobile menu */}

            </header>
        </>
    );
}


function Links() {
    const links = [
        { href: '/products', label: 'Products' },
        { href: '/commission', label: 'Commissions' },
        { href: '/reviews', label: 'Reviews' },
    ];

    return (
        <>
            {links.map((link) => (
                <Link key={link.label} href={`${link.href}`}>
                    <p
                        className={`link link-hover`}
                        title={link.href}
                    >
                        {link.label}
                    </p>
                </Link>
            ))}
        </>
    );
}


const Navbar = () => {
    const currentPath = usePathname();

    const links = [
        { href: '/products', label: 'Products' },
        { href: '/commission', label: 'Commissions' },
        { href: '/reviews', label: 'Reviews' },
    ];

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
                <div className="flex lg:hidden">
                    <button
                        type="button"
                        className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5"
                    >
                        <span className="sr-only">Open main menu</span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-6 h-6 text-base-content"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                            />
                        </svg>
                    </button>
                </div>
                <div className="hidden lg:flex lg:justify-center lg:gap-12 lg:items-center">
                    {links.map(({ href, label }) => (
                        <div className="flex items-center relative" key={href}>
                            <Link href={href}>
                                <p
                                    className={`link link-hover font-bold ${currentPath === href ? 'underline' : ''
                                        }`}
                                    title={label}
                                >
                                    {label}
                                </p>
                            </Link>
                            {currentPath === href && (
                                <svg
                                    className="absolute w-6 h-6 opacity-60 text-[#ffd78e] -right-3 -top-1 transform rotate-180"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M12 .587l3.668 7.431L24 9.412l-6 5.845 1.417 8.228L12 18.896l-7.417 4.59L6 15.257 0 9.412l8.332-1.394L12 .587z"
                                        fill="currentColor"
                                    />
                                </svg>
                            )}
                        </div>
                    ))}
                </div>
                <div className="hidden lg:flex lg:justify-end lg:flex-1">
                    <Link href={"/sign-in"} className="btn btn-primary rounded-full animateBtn">
                        Login
                    </Link>
                </div>
            </nav>
            {/* Mobile menu */}
            <div className="relative z-50 hidden">
                <div className="fixed inset-y-0 right-0 z-10 w-full px-8 py-4 overflow-y-auto bg-base-200 sm:max-w-sm sm:ring-1 sm:ring-neutral/10 transform origin-right transition ease-in-out duration-300">
                    <div className="flex items-center justify-between">
                        <Link href="/">
                            <p className="flex items-center gap-2 shrink-0" title="Creative Store homepage">
                            </p>
                        </Link>
                        <button type="button" className="-m-2.5 rounded-md p-2.5">
                            <span className="sr-only">Close menu</span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="w-6 h-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>
                    <div className="flow-root mt-6">
                        <div className="py-4">
                            <div className="flex flex-col gap-y-4 items-start">
                                {links.map(({ href, label }) => (
                                    <Link href={href} key={href}>
                                        <p className="link link-hover" title={label}>
                                            {label}
                                        </p>
                                    </Link>
                                ))}
                            </div>
                        </div>
                        <div className="divider" />
                        <div className="flex flex-col">
                            <Link href={"/sign-up"} className="btn btn-primary rounded-full animateBtn">
                                Sign up
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

// export default Navbar;
