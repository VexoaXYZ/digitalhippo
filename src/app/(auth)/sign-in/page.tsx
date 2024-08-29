'use client'

import { Icons } from '@/components/Icons'
import {
  Button,
  buttonVariants,
} from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowRight, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'

import {
  AuthCredentialsValidator,
  TAuthCredentialsValidator,
} from '@/lib/validators/account-credentials-validator'
import { trpc } from '@/trpc/client'
import { toast } from 'sonner'
import { ZodError } from 'zod'
import { useRouter, useSearchParams } from 'next/navigation'

const Page = () => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const isSeller = searchParams.get('as') === 'seller'
  const origin = searchParams.get('origin')

  const continueAsSeller = () => {
    router.push('?as=seller')
  }

  const continueAsBuyer = () => {
    router.replace('/sign-in', undefined)
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TAuthCredentialsValidator>({
    resolver: zodResolver(AuthCredentialsValidator),
  })

  const { mutate: signIn, isLoading } =
    trpc.auth.signIn.useMutation({
      onSuccess: async () => {
        toast.success('Signed in successfully')

        router.refresh()

        if (origin) {
          router.push(`/${origin}`)
          return
        }

        if (isSeller) {
          router.push('/sell')
          return
        }

        router.push('/')
      },
      onError: (err) => {
        if (err.data?.code === 'UNAUTHORIZED') {
          toast.error('Invalid email or password.')
        }
      },
    })

  const onSubmit = ({
    email,
    password,
  }: TAuthCredentialsValidator) => {
    signIn({ email, password })
  }

  return (
    <>
      <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-md space-y-6">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold text-foreground">Welcome back</h1>
            <p className="text-muted-foreground">Sign in to your account to continue</p>
          </div>
          <div className="space-y-4">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-muted" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                </div>
              </div>
              <div className="space-y-2 mb-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  {...register('email')}
                  className={`bg-white` + cn({
                    'focus-visible:ring-red-500 bg-white':
                      errors.email,
                  })}
                  placeholder='you@example.com'
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link href="#" className="text-sm text-primary hover:underline" prefetch={false}>
                    Forgot password?
                  </Link>

                </div>

                <Input
                  {...register('password')}
                  type='password'
                  className={`bg-white` + cn({
                    'focus-visible:ring-red-500 bg-white':
                      errors.password,
                  })}
                  placeholder='Password'
                />
                {errors?.password && (
                  <p className='text-sm text-red-500'>
                    {errors.password.message}
                  </p>
                )}
              </div>
              <Button disabled={isLoading} className='mt-5 w-full'>
                {isLoading && (
                  <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                )}
                Sign in
              </Button>
            </form>
          </div>
          <div className="hidden mt-4 text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link href="/sign-up" className="font-medium text-primary hover:underline" prefetch={false}>
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default Page
