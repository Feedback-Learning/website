import { AuthSession } from '@supabase/supabase-js'
import Head from 'next/head'
import Link from 'next/link'
import { PropsWithChildren } from 'react'

export interface Props {
  session: AuthSession | null
}

export function Layout({ session, children }: PropsWithChildren<Props>) {
  return (
    <>
      <Head>
        <title>Next.js + TypeScript + Supabase + TailwindCSS</title>
      </Head>
      <div className="flex flex-col min-h-screen">
        <header className="flex justify-between">
          {/* <h1>
            <Link href="/" legacyBehavior>
              <a className="text-red-800 hover:text-red-700 drop-shadow">
                Next.js + TypeScript + Supabase + TailwindCSS
              </a>
            </Link>
          </h1> */}
        </header>
        <main className="w-full h-full flex flex-1 flex-row justify-center items-center p-4 gap-4">{children}</main>
        <footer className="flex justify-center items-center p-4">
          Bleh!
        </footer>
      </div>
    </>
  )
}