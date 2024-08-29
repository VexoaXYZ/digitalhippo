import Balancer from "react-wrap-balancer";
import { Section, Container } from "@/components/craft";
import Image from "next/image";
import Link from "next/link";
import { Button } from '@/components/ui/button';

export default function Footer() {
    return (
        <footer>
            <Section>
                <Container className="grid gap-6">
                    <div className="not-prose flex flex-col gap-6">
                        <Link href="/">
                            <h3 className="sr-only">brijr/components</h3>
                            <Image
                                src="https://utfs.io/f/693f0e57-5be4-42bd-adad-7591d485d7a2-bdqfc5.png"
                                alt="Logo"
                                width={40}
                                height={27.27}
                                className="transition-all hover:opacity-75 dark:invert"
                            ></Image>
                        </Link>
                        <p>
                            <Balancer>
                                Creative Store is a store built with Next.js, React, Typescript
                                components for selling assets.
                            </Balancer>
                        </p>
                    </div>
                    <div className="mb-4 flex flex-col gap-4 md:mb-0 md:flex-row">
                        <Link className="hover:underline" href="/privacy-policy">Privacy Policy</Link>
                        <Link className="hover:underline" href="/terms-of-service">Terms of Service</Link>
                        <Link className="hover:underline" href="/cookie-policy">Cookie Policy</Link>
                    </div>
                </Container>
                <Container className="not-prose flex flex-col justify-between gap-6 border-t md:flex-row md:items-center md:gap-2">
                    <div className="flex gap-2">
                        <Button variant="outline" size="icon">
                            <p>Github</p>
                        </Button>
                    </div>
                    <p className="text-muted-foreground">
                        ©{" "}
                        <a href="https://www.inkwell.dev/">Creative Store</a>.
                        All rights reserved. 2024-present.
                    </p>
                </Container>
            </Section>
        </footer>
    )
}