"use client"

import { useEffect, useState } from 'react'
import { Switch } from '@headlessui/react'
import { days } from '../data/data';

interface Props {
  date: number,
  goals: any, // change this
  setGoals: any,
  selectedDay: Date,
}


function Goals({ goals, date, setGoals, selectedDay }: Props) {
  // const [completed, setCompleted] = useState<boolean>(false);

  const [goal, setGoal] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  
  const handleGoalCheckbox = (e: any, name: string, id: number, index: number) => { // replace with actual type for event
    // if goal is checked or unchecked, update the state
    // setCompleted(e.target.checked);

    // convert id to string
    const idString = id.toString();
    // cross out the text if the goal is checked 
    (e.target.checked) ? document.getElementById(idString)?.classList.add('line-through') : document.getElementById(idString)?.classList.remove('line-through');
    // move the goal to the bottom of the list if the goal is checked
    // if (e.target.checked) {
    //   const temp = goals[index];
    //   goals.splice(index, 1);
    //   goals.push(temp);
    //   setGoal(goals);
    // }
  }

  const handleCreateGoal = () => {
    fetch('http://localhost:4000/goals/new', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        name: goal,
        date: selectedDay.toISOString(),
        description: description,
        status: false,
        user_id: 1
      })
    })
      .then(res => res.json())
      .then(goalData => {
        setGoals((prevGoals: any) => [...prevGoals, ...goalData])
        setGoal('')
        setDescription('')
      })
      .catch(err => console.log(err))
  }

  return (
    <div className='w-4/12 h-full border-2 rounded-md border-green-400'>
      <div className='text-center mt-5 font-bold border-solid border-opacity-70 border-green-400 border-b-2'>Goals</div>
      <fieldset className="space-y-3 p-2 h-40 overflow-x-auto scrollbar scrollbar-thumb-gray-700 scrollbar-track-gray-100">
        <legend className="sr-only">Goals</legend>
        {goals.map((goal: any, index: number) => (
          <div className="relative flex items-start" key={index}>
            <div className="flex h-5 items-center">
              <input
                id="comments"
                aria-describedby="comments-description"
                name="comments"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                onChange={(event) => handleGoalCheckbox(event, goal.name, goal.id, index)}
              />
            </div>
            <div id={goal.id} className="ml-3 text-sm">
              <label htmlFor="comments" className="font-medium text-gray-700">
                {goal.name}
              </label>
              <p className="text-gray-500">
                {goal.description}
              </p>
            </div>
          </div>
        ))}
      </fieldset>
      <div className = "flex flex-col items-center gap-1 mt-6">
            <input value={goal} onChange = {(e) => setGoal(e.target.value)} className='rounded text-center bg-white border-solid border-2 outline-none w-3/4' placeholder='Write a Goal...'></input>
            <input value={description} onChange = {(e) => setDescription(e.target.value)} className='h-12 text-c  enter rounded bg-white border-solid border-2 outline-none w-3/4' placeholder='Write a Description...'></input>
          </div>
          <div className = "flex justify-center">
          <button className="my-1 rounded bg-green-400 px-2" onClick={handleCreateGoal}>
            Add Goal
          </button>
          </div>
    </div>
  )
}

export default Goals;