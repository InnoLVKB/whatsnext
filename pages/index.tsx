import { useState, createContext, useEffect } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Calendar from '../components/Calendar'
import Goals from '../components/Goals'
import Header from '../components/Header'
import Journal from '../components/Journal'
import Mood from '../components/Mood'
import { startOfToday } from 'date-fns'

export const ThemeContext = createContext(null);

export default function Home() {
  const [date, setDate] = useState<number>(15);
  const [journalNotes, setJournalNotes] = useState<string>('');
  const [goals, setGoals] = useState([]);
  const [mood, setMood] = useState<string>('');
  const [calendarData, setCalendarData] = useState([]);
  const today = startOfToday();
  const [selectedDay, setSelectedDay] = useState(today)
  const [selectedDayMood, setSelectedDayMood] = useState('')

  useEffect(() => {
    Promise.all([
      fetch('http://localhost:4000/journal/date',
        {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          date: today,
          user_id: 1
          })
        }),
      fetch('http://localhost:4000/goals/date',
        {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          date: today,
          user_id: 1
          })
        }),
      fetch('http://localhost:4000/calendar',
        {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          user_id: 1
          })
        })
      ])
      .then(([journalResponse, goalResponse, calResponse]) => {
        return Promise.all([journalResponse.json(), goalResponse.json(), calResponse.json()])
      })
      .then(([journalData, goalData, calData]) => {
        setJournalNotes(journalData.entry);
        setGoals(goalData);
        setMood(journalData.mood);
        setCalendarData(calData);
      })
  }, []);

  return (
    <div>
      <Header />
      <div className='flex justify-around h-1/3 space-x-8 m-6'>
        <Mood mood={mood} setMood={setMood} selectedDayMood={selectedDayMood} />
        <Calendar today={today} selectedDay={selectedDay} calendarData={calendarData} setSelectedDay={setSelectedDay} setJournalNotes={setJournalNotes} setGoals={setGoals} setSelectedDayMood={setSelectedDayMood} setMood={setMood}/>
        <Goals goals={goals} selectedDay={selectedDay} date={date} setGoals={setGoals} />
      </div>
      <Journal selectedDay={selectedDay} journalNotes={journalNotes} setJournalNotes={setJournalNotes} mood={mood} />
    </div>
  )
}
