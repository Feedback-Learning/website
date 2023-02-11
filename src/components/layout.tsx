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
      <div className="w-screen h-screen bg-gradient-to-b from-[#ffffff] to-[#e4d1ff]">
        <main className="w-full h-full">{children}</main>
      </div>
    </>
  )
}