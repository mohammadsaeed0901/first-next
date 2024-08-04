"use client";
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  const { data: session, status } = useSession();

  return (
    <div className='flex p-5 bg-slate-200 space-x-3'>
        <Link href='/'>Home</Link>
        <Link href='/users'>Users</Link>
        {status === "loading" && <div>Loading...</div>}
        {status === "authenticated" && 
        <div>
          {session.user?.name}
          <Link href={'/api/auth/signout'} className='ml-2'>Sign out</Link>
        </div>}
        {status === "unauthenticated" && <Link href='/api/auth/signin'>Login</Link>}
    </div>
  )
}

export default Navbar