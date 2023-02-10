import React, { useState, useEffect } from 'react'
import Calendar from './components/Calendar'
import Goals from './components/Goals'
import Header from './components/Header'
import Journal from './components/Journal'
import Mood from './components/Mood'
// import JournalPage from './journal/page'
import { startOfToday } from 'date-fns'
// import { getProviders, signIn, useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'

// export const ThemeContext = createContext(null);

export default function Home () {
  const [date, setDate] = useState<number>(15)
  const [journalNotes, setJournalNotes] = useState<string>('')
  const [goals, setGoals] = useState<any[]>([])
  const [mood, setMood] = useState<string>('')
  const [calendarData, setCalendarData] = useState<any[]>([])
  const [daysWithMoods, setDaysWithMoods] = useState<any[]>([])
  const today = startOfToday()
  const [selectedDay, setSelectedDay] = useState(today)
  const [selectedDayMood, setSelectedDayMood] = useState<string>('')
  const [user, setUser] = useState('')

  const Router = useRouter()
  // const { data: session, status } = useSession();
  // console.log("session: ", session);
  // console.log("status: ", status);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user')) ?? ''
    setUser(user)
    if (user === '') {
      return
    }
    Promise.all([
      fetch(
        `http://localhost:3000/api/journals/?date=${today.toISOString()}&user_id=${
          user.userId
        }`, {
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${user.token}` }
        }
      ),
      fetch(
        `http://localhost:3000/api/goals/?date=${today.toISOString()}&user_id=${
          user.userId
        }`, {
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${user.token}` }
        }
      ),
      fetch(
        `http://localhost:3000/api/calendar/?user_id=${user.userId}`, {
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${user.token}` }
        }
      )
    ])
      .then(async ([journalRes, goalsRes, calendarData]) => {
        return await Promise.all([journalRes.json(), goalsRes.json(), calendarData.json()])
      })
      .then(([journalData, goalsData, calendarData]) => {
        setGoals(goalsData)
        if (journalData.length === 0) {
          return
        }
        setJournalNotes(journalData[0].entry)
        setMood(journalData[0].mood)
        const calMoods: any[] = []
        if (calendarData.length === 0) {
          setDaysWithMoods([])
        } else {
          for (let i = 0; i < calendarData.length; i++) {
            calMoods.push({
              date: new Date(calendarData[i].date),
              mood: calendarData[i].mood
            })
          }
          setDaysWithMoods(calMoods)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  return (
    <div className="bg-[#E0F6E3]">
      <Header user={user} />
      {/* <h1>{session ? session.user?.name : "No name"}</h1> */}
      {/* <h1>{session.user?.name}</h1> */}
      <div className="sm:grid sm:grid-cols-1 lg:flex lg:justify-around lg:space-x-1 lg:m-6">
        <Mood
          mood={mood}
          setMood={setMood}
          selectedDayMood={selectedDayMood}
          daysWithMoods={daysWithMoods}
          setDaysWithMoods={setDaysWithMoods} />
        <Calendar
          today={today}
          selectedDay={selectedDay}
          calendarData={calendarData}
          daysWithMoods={daysWithMoods}
          setSelectedDay={setSelectedDay}
          setJournalNotes={setJournalNotes}
          setGoals={setGoals}
          setSelectedDayMood={setSelectedDayMood}
          setMood={setMood}
        />
        <Goals
          goals={goals}
          selectedDay={selectedDay}
          date={date}
          setGoals={setGoals}
        />
      </div>
      <div className="flex justify-center">
      {user === ''
        ? (
        <h1 className="flex justify-center text-2xl font-bold text-gray-900">
          Sign in to start your journal
        </h1>
          )
        : (
        <Journal
          selectedDay={selectedDay}
          journalNotes={journalNotes}
          setJournalNotes={setJournalNotes}
          mood={mood}
          setDaysWithMoods={setDaysWithMoods}
        />
          )}
      {/* {session ? (
				<Journal
					selectedDay={selectedDay}
					journalNotes={journalNotes}
					setJournalNotes={setJournalNotes}
					mood={mood}
				/>
			) : (
				<h1 className='flex justify-center items-center text-2xl font-bold tracking-tight text-gray-900'>
					Please log in to see your journals
				</h1>
			)} */}
      </div>
    </div>
  )
}
