import { useState, createContext } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Calendar from '../components/Calendar'
import Goals from '../components/Goals'
import Header from '../components/Header'
import Journal from '../components/Journal'
import Mood from '../components/Mood'

export const ThemeContext = createContext(null);

export default function Home() {
  const [theme, setTheme] = useState<string>('light');
  const [date, setDate] = useState<number>(2);
  const toggleTheme = () => {
    setTheme((prevState) => prevState === 'light' ? 'dark': 'light');
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div>
        <Header />
        <div className='flex justify-around h-1/3 space-x-8 m-8'>
          <Mood />
          <Calendar />
          <Goals />
        </div>
        <Journal />
      </div>
    </ThemeContext.Provider>
  )
}
