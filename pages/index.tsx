import { useState, createContext, useEffect } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Calendar from '../components/Calendar'
import Goals from '../components/Goals'
import Header from '../components/Header'
import Journal from '../components/Journal'
import Mood from '../components/Mood'
import { days } from '../data/data';

export const ThemeContext = createContext(null);

export default function Home() {
  const [date, setDate] = useState<number>(15);
  const [journalNotes, setJournalNotes] = useState<string>('');
  const [goals, setGoals] = useState([]);
  const [mood, setMood] = useState<string>('');

  useEffect(() => {
    Promise.all([
      fetch('http://localhost:4000/journal/date',
        {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          date: days[date - 1].date,
          user_id: 1
          })
        }),
      fetch('http://localhost:4000/goals/date',
        {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          date: days[date - 1].date,
          user_id: 1
          })
        })
      ])
      .then(([journalResponse, goalResponse]) => {
        return Promise.all([journalResponse.json(), goalResponse.json()])
      })
      .then(([journalData, goalData]) => {
        console.log('data in index', journalData)
        setJournalNotes(journalData.entry);
        setGoals(goalData);
        setMood(journalData.mood);
      })
  },[]);

  return (
    <div>
      <Header />
      <div className='flex justify-around h-1/3 space-x-8 m-6'>
        <Mood mood={mood} setMood={setMood} />
        <Calendar calDate={date} calDateHook={setDate} setJournalNotes={setJournalNotes} setGoals={setGoals}/>
        <Goals goals={goals} date={date} setGoals={setGoals} />
      </div>
      <Journal date={date} journalNotes={journalNotes} setJournalNotes={setJournalNotes} mood={mood} />
    </div>
  )
}
