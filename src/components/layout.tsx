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
      <div className="flex flex-col justify-end items-center bg-gradient-to-b from-[#ffffff] to-[#e4d1ff]">
        {/* <header className="flex justify-between">
        </header> */}
        <main className="w-full pl-10 pb-10 pr-10 flex flex-col justify-end h-screen overflow-hidden">{children}</main>
        {/* <footer className="flex justify-center items-center p-4">
          Bleh!
        </footer> */}
      </div>
    </>
  )
}