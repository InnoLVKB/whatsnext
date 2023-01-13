"use client"

import { format } from 'date-fns';
import { useContext } from 'react';
import { ThemeContext } from '../app';

function Header() {
  // const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <div className='flex justify-between items-center w-screen px-5 bg-green-300 h-11'>
      <div className='font-bold'>whatsnext</div>
      <div className='font-bold'>{format(new Date(), 'MMMM do, yyyy')}</div>
      <div className='font-bold'>Themes</div>

    </div>
  )
}

export default Header;
