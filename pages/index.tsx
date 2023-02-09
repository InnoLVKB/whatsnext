import { useState, createContext, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Calendar from "./components/Calendar";
import Goals from "./components/Goals";
import Header from "./components/Header";
import Journal from "./components/Journal";
import Mood from "./components/Mood";
import Test from "./components/test";
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
	const [user, setUser] = useState("");

	const Router = useRouter();
	// const { data: session, status } = useSession();
	// console.log("session: ", session);
	// console.log("status: ", status);

	useEffect(() => {
		const user = JSON.parse(localStorage.getItem("user")) ?? "";
		setUser(user);
		if (user === "") {
			return;
		}
		Promise.all([
			fetch(
				`http://localhost:3000/api/journals/?date=${today.toISOString()}&user_id=${
					user.userId
				}`
			),
			fetch(
				`http://localhost:3000/api/goals/?date=${today.toISOString()}&user_id=${
					user.userId
				}`
			),
		])
			.then(([journalRes, goalsRes]) => {
				return Promise.all([journalRes.json(), goalsRes.json()]);
			})
			.then(([journalData, goalsData]) => {
				setGoals(goalsData);
				if (journalData.length === 0) {
					return;
				}
				setJournalNotes(journalData[0].entry);
				setMood(journalData[0].mood);
			})
			.catch((err) => console.log(err));
	}, []);

	return (
		<div className="bg-green-100">
			<Header user={user} />
			{/* <h1>{session ? session.user?.name : "No name"}</h1> */}
			{/* <h1>{session.user?.name}</h1> */}
			<div className='sm:grid sm:grid-cols-1 sm:justify-center sm:items-center lg:flex lg:justify-around lg:h-1/3 lg:space-x-8 lg:m-6'>
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
			{user === "" ? (
				<h1 className='flex justify-center text-2xl font-bold text-gray-900'>
					Sign in to start your journal
				</h1>
			) : (
				<Journal
					selectedDay={selectedDay}
					journalNotes={journalNotes}
					setJournalNotes={setJournalNotes}
					mood={mood}
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
	);
}
