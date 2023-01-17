"use client"

import { format } from 'date-fns';
import { useContext } from 'react';
// import { ThemeContext } from '../app';
import { useSession, signIn, signOut } from 'next-auth/react';

function Header() {
  // const { theme, toggleTheme } = useContext(ThemeContext);
  const { data: session, status } = useSession();

  return (
    <div className='flex justify-between items-center w-screen px-5 bg-green-300 h-11'>
      <div className='font-bold'>whatsnext</div>
      <div className='font-bold'>{format(new Date(), 'MMMM do, yyyy')}</div>
      <div className='font-bold'>
        {status === 'authenticated' && (
          <>
            <div className='font-bold'>{session?.user?.name}</div>
            <button
              className='font-bold'
              onClick={() => signOut({ callbackUrl: '/' })}
            >
              Sign out
            </button>
          </>
        )}
        {status === 'unauthenticated' && (
          <button className='font-bold' onClick={() => signIn()}>
            Sign in
          </button>
        )}
      </div>

    </div>
  )
}

export default Header;
