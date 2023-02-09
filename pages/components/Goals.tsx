import { useEffect, useState } from "react";
import { Switch } from "@headlessui/react";
import { days } from "../../data/data";
import { Montserrat } from "@next/font/google";
import Draggable from 'react-draggable';
import { Resizable } from 're-resizable';
import { useDragContext } from "../../context/DragContext";

const montserrat = Montserrat({ subsets: ["latin"], weight: "500" });

interface Props {
	date: number;
	goals: any; // change this
	setGoals: any;
	selectedDay: Date;
}

function Goals({ goals, date, setGoals, selectedDay }: Props) {
	const [goal, setGoal] = useState<string>("");
	const [description, setDescription] = useState<string>("");

	const { dragStatus } = useDragContext();

	const handleCreateGoal = (e) => {
		e.preventDefault();
		const user = JSON.parse(localStorage.getItem("user")) ?? "";
		const date = selectedDay.toISOString();
		fetch(
			`http://localhost:3000/api/goals/?date=${date}&user_id=${user.userId}`,
			{
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					name: goal,
					description: description,
					status: false,
				}),
			}
		)
			.then((res) => res.json())
			.then((newGoal) => {
				setGoals((prevGoals: any) => [newGoal, ...prevGoals]);
				setGoal("");
				setDescription("");
			})
			.catch((err) => console.log(err));
	};

	const handleCompleteGoal = (e: any, goal: any) => {
		const user = JSON.parse(localStorage.getItem("user")) ?? "";
		fetch(
			`http://localhost:3000/api/goals/?id=${goal.id}&user_id=${user.userId}`,
			{
				method: "PATCH",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					name: goal.name,
					description: goal.description,
					status: !goal.status,
				}),
			}
		)
			.then((res) => res.json())
			.then((updatedGoal) => {
				setGoals((prevGoals: any) => {
					return prevGoals.map((goal: any) => {
						if (goal.id === updatedGoal.id) {
							return { ...goal, status: updatedGoal.status };
						} else {
							return goal;
						}
					});
				});
			})
			.catch((err) => console.log(err));
	};

	const handleDeleteGoal = (goalId) => {
		const user = JSON.parse(localStorage.getItem("user")) ?? "";
		fetch(
			`http://localhost:3000/api/goals/?id=${goalId}&user_id=${user.userId}`,
			{
				method: "DELETE",
			}
		)
			.then((res) => res.json())
			.then((deletedGoal) => {
				setGoals((prevGoals: any) =>
					prevGoals.filter((goal) => goal.id !== deletedGoal.id)
				);
			})
			.catch((err) => console.log(err));
	};

	return (
		<Draggable disabled={!dragStatus}>
		<Resizable
      defaultSize={{
     		width: '33%',
      	height: 380,
      }}
			minWidth='33%'
      minHeight={380}
      maxWidth={9000}
      // maxHeight={9000}

		 className='bg-white border-2 rounded-md border-black'>
			<div className='text-center text-xl p-2 font-bold border-solid border-opacity-70 border-black border-b-2'>
				<span className={montserrat.className}>goals</span>
			</div>
			<fieldset className='space-y-3 p-2 h-40 overflow-x-auto scrollbar scrollbar-thumb-gray-700 scrollbar-track-gray-100'>
				<legend className='sr-only'>Goals</legend>
				{goals.length > 0
					? goals.map((goal: any, index: number) => {
							let goalClassName = "ml-3 text-sm";
							if (goal.status) {
								goalClassName += " line-through";
							}
							return (
								<div className='relative flex items-start' key={index}>
									<div className='flex h-5 items-center'>
										<input
											id='comments'
											aria-describedby='comments-description'
											name='comments'
											type='checkbox'
											checked={goal.status}
											className='h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500'
											onChange={(event) => handleCompleteGoal(event, goal)}
										/>
									</div>
									<div id={goal.id} className={goalClassName}>
										<label
											htmlFor='comments'
											className='font-medium text-gray-700'
										>
											{goal.name}
										</label>
										<p className='text-gray-500'>{goal.description}</p>
									</div>
									<button
										className='text-red-500 mx-2'
										onClick={() => handleDeleteGoal(goal.id)}
									>
										Delete
									</button>
								</div>
							);
					  })
					: null}
			</fieldset>
			<form
				className='flex flex-col items-center gap-1 mt-6'
				onSubmit={handleCreateGoal}
			>
				<input
					value={goal}
					onChange={(e) => setGoal(e.target.value)}
					className='rounded text-center bg-white border-solid border-2 outline-none w-3/4'
					placeholder='Write a Goal...'
				></input>
				<input
					value={description}
					onChange={(e) => setDescription(e.target.value)}
					className='h-12 text-c  enter rounded bg-white border-solid border-2 outline-none w-3/4'
					placeholder='Write a Description...'
				></input>
				<div className='flex justify-center'>
					<button type='submit' className='my-1 rounded bg-green-400 px-2'>
						Add Goal
					</button>
				</div>
			</form>
		</Resizable>
		</Draggable>
	);
}

export default Goals;
