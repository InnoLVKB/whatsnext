import { useState, createContext, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Calendar from "./components/Calendar";
import Goals from "./components/Goals";
import Header from "./components/Header";
import Journal from "./components/Journal";
import Mood from "./components/Mood";
// import JournalPage from './journal/page'
import { startOfToday } from "date-fns";
import { getProviders, signIn, useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

// export const ThemeContext = createContext(null);

export default function Home() {
	const [date, setDate] = useState<number>(15);
	const [journalNotes, setJournalNotes] = useState<string>("");
	const [goals, setGoals] = useState<any[]>([]);
	const [mood, setMood] = useState<string>("");
	const [calendarData, setCalendarData] = useState<any[]>([]);
	const today = startOfToday();
	const [selectedDay, setSelectedDay] = useState(today);
	const [selectedDayMood, setSelectedDayMood] = useState<string>("");

	// const { data: session, status } = useSession();
	const Router = useRouter();

	// console.log("session: ", session);
	// console.log("status: ", status);

	const fetchJournal = (userId) => {
		fetch(
			`http://localhost:3000/api/journals/?date=${today.toISOString()}&user_id=${userId}`
		)
			.then((res) => res.json())
			.then((journal) => {
				if (journal.length === 0) {
					return;
				}
				setJournalNotes(journal[0].entry);
				setMood(journal[0].mood);
			})
			.catch((err) => console.log(err));
	};

	const fetchGoals = (userId) => {
		fetch(
			`http://localhost:3000/api/goals/?date=${today.toISOString()}&user_id=${userId}`
		)
			.then((res) => res.json())
			.then((goals) => {
				setGoals(goals);
			});
	};

	useEffect(() => {
		// use Promise.all here
		const user_id = localStorage.getItem("user_id") ?? "";
		if (user_id === "") {
			return;
		}
		fetchJournal(user_id);
		fetchGoals(user_id);
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

	return (
		<div>
			<Header />
			{/* <h1>{session ? session.user?.name : "No name"}</h1> */}
			{/* <h1>{session.user?.name}</h1> */}
			<div className='flex justify-around h-1/3 space-x-8 m-6'>
				<Mood mood={mood} setMood={setMood} selectedDayMood={selectedDayMood} />
				<Calendar
					today={today}
					selectedDay={selectedDay}
					calendarData={calendarData}
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
			<Journal
				selectedDay={selectedDay}
				journalNotes={journalNotes}
				setJournalNotes={setJournalNotes}
				mood={mood}
			/>
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
	);
}
