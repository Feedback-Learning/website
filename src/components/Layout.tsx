import { AuthSession } from '@supabase/supabase-js'
import Head from 'next/head'
import Link from 'next/link'
import { PropsWithChildren, ReactNode } from 'react'

export function Layout({ children }: {children: ReactNode}) {
  return (
    <>
      <Head>
        <title>Next.js + TypeScript + Supabase + TailwindCSS</title>
      </Head>
      <div className="w-screen h-screen bg-gradient-to-b from-[#ffffff] to-[#e4d1ff]">
        <main className="h-full p-6">{children}</main>
      </div>
    </>
  )
}