import { useState, createContext, useEffect } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Calendar from '../components/Calendar'
import Goals from '../components/Goals'
import Header from '../components/Header'
import Journal from '../components/Journal'
import Mood from '../components/Mood'
// import JournalPage from './journal/page'
import { startOfToday } from 'date-fns'
import { getProviders, signIn, useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';



// export const ThemeContext = createContext(null);

export default function Home() {
  const [date, setDate] = useState<number>(15);
  const [journalNotes, setJournalNotes] = useState<string>('');
  const [goals, setGoals] = useState<any[]>([]);
  const [mood, setMood] = useState<string>('');
  const [calendarData, setCalendarData] = useState<any[]>([]);
  const today = startOfToday();
  const [selectedDay, setSelectedDay] = useState(today);
  const [selectedDayMood, setSelectedDayMood] = useState<string>('');

  const { data: session, status } = useSession()
  const Router = useRouter()


  console.log('session: ', session)
  console.log('status: ', status)

  useEffect(() => {
      fetch('http://localhost:3000/api/journals/',
        {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          date: today,
          user_id: 1
          })
        })
        .then(response => {
          return response.json();
        })
        .then(data => {
          setJournalNotes(data.entry);
          setMood(data.mood);
        })
    // Promise.all([
    //   fetch('http://localhost:3000/api/journals',
    //     {
    //     method: 'POST',
    //     headers: {'Content-Type': 'application/json'},
    //     body: JSON.stringify({
    //       date: today,
    //       user_id: 1
    //       })
    //     }),
    //   fetch('http://localhost:3000/goals/date',
    //     {
    //     method: 'POST',
    //     headers: {'Content-Type': 'application/json'},
    //     body: JSON.stringify({
    //       date: today,
    //       user_id: 1
    //       })
    //     }),
    //   fetch('http://localhost:3000/calendar',
    //     {
    //     method: 'POST',
    //     headers: {'Content-Type': 'application/json'},
    //     body: JSON.stringify({
    //       user_id: 1
    //       })
    //     })
    //   ])
    //   .then(([journalResponse, goalResponse, calResponse]) => {
    //     return Promise.all([journalResponse.json(), goalResponse.json(), calResponse.json()])
    //   })
    //   .then(([journalData, goalData, calData]) => {
    //     setJournalNotes(journalData.entry);
    //     setGoals(goalData);
    //     setMood(journalData.mood);
    //     setCalendarData(calData);
    //   })
  }, []);

  if (!session) {
    return (
			<>
				<main
					className='min-h-full bg-cover bg-top sm:bg-top'
					style={{
						backgroundImage:
							'url("https://images.unsplash.com/photo-1545972154-9bb223aac798?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=3050&q=80&exp=8&con=-15&sat=-75")',
					}}
				>
					<div className='mx-auto max-w-7xl py-16 px-6 text-center sm:py-24 lg:px-8 lg:py-48'>
						<p className='text-base font-semibold text-black text-opacity-50'>
							401
						</p>
						<h1 className='mt-2 text-4xl font-bold tracking-tight text-white sm:text-5xl'>
							Uh oh! I think you’re lost.
						</h1> 
						<p className='mt-2 text-lg font-medium text-black text-opacity-50'>
							Please log in to view your journal.
						</p>
						<div className='mt-6' onClick={() => Router.push('/')}>
							<a
								href='#'
								className='inline-flex items-center rounded-md border border-transparent bg-white bg-opacity-75 px-4 py-2 text-sm font-medium text-black text-opacity-75 sm:bg-opacity-25 sm:hover:bg-opacity-50'
							>
								Log in
							</a>
						</div>
					</div>
				</main>
			</>
		);
  }


  return (
    <div>
      <Header />
      {/* <h1>{session ? session.user?.name : "No name"}</h1> */}
      {/* <h1>{session.user?.name}</h1> */}
      <div className='flex justify-around h-1/3 space-x-8 m-6'>
        <Mood mood={mood} setMood={setMood} selectedDayMood={selectedDayMood} />
        <Calendar today={today} selectedDay={selectedDay} calendarData={calendarData} setSelectedDay={setSelectedDay} setJournalNotes={setJournalNotes} setGoals={setGoals} setSelectedDayMood={setSelectedDayMood} setMood={setMood}/>
        <Goals goals={goals} selectedDay={selectedDay} date={date} setGoals={setGoals} />
      </div>
      <Journal selectedDay={selectedDay} journalNotes={journalNotes} setJournalNotes={setJournalNotes} mood={mood} />
    </div>
  )
}
