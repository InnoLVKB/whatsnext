import { useState } from "react";

type JournalPropsType = {
	journalNotes: string;
	mood: string;
	setJournalNotes: React.Dispatch<React.SetStateAction<string>>;
	selectedDay: Date;
};

function Journal({
	journalNotes,
	setJournalNotes,
	mood,
	selectedDay,
}: JournalPropsType) {
	const [isEditting, setIsEditting] = useState<boolean>(false);

	const handleCreateAndUpdateJournal = (e: any) => {
		e.preventDefault();
		const journalForm = new FormData(e.target);
		const date = selectedDay.toISOString();
		const user = JSON.parse(localStorage.getItem("user")) ?? "";
		if (user === "") {
			return;
		}
		fetch(
			`http://localhost:3000/api/journals/?date=${date}&user_id=${user.userId}`,
			{
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					entry: journalForm.get("journal-notes") ?? "",
					mood: mood,
				}),
			}
		)
			.then((res) => res.json())
			.then((data) => {
				setJournalNotes(data.entry);
				setIsEditting(!isEditting);
			})
			.catch((err) => console.log(err));
	};

	return (
		<div className='flex flex-col bg-slate-50 h-[22rem] m-6 shadow rounded-lg border-solid border-green-400 border-2 relative'>
			<button
				className='rounded absolute top-0 right-0 bg-green-400 px-2'
				onClick={() => setIsEditting(!isEditting)}
			>
				Edit
			</button>

			<div className='flex justify-center mt-2 text-2xl'>Journal</div>

			{isEditting ? (
				<form onSubmit={handleCreateAndUpdateJournal}>
					<textarea
						id='journal-notes'
						name='journal-notes'
						className='h-[18rem] w-11/12 mx-8 mt-3 mb-3 bg-pink-100 rounded-lg text-black px-2 focus:border border-gray-400 outline-none'
					>
						{journalNotes}
					</textarea>
					<button
						type='submit'
						className='rounded absolute top-0 right-10 bg-green-400 px-2 mr-2'
					>
						Save
					</button>
				</form>
			) : (
				<p className='h-[19rem] mx-8 mt-3 mb-3 bg-pink-100 rounded-lg text-black px-2'>
					{journalNotes}
				</p>
			)}
		</div>
	);
}

export default Journal;
