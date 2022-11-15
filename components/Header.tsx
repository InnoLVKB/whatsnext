import { format } from 'date-fns';
import { useContext } from 'react';
import { ThemeContext } from '../pages';

function Header() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <div className='flex justify-between items-center w-screen h-8 px-5 bg-green-300 h-11'>
      <div>The Otis Project</div>
      <div>{format(new Date(), 'MMMM do, yyyy')}</div>
      <div>Themes</div>
        
    </div>
  )
}

export default Header;