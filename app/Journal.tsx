"use client"

import { useState, useEffect } from 'react'
import { days } from '../data/data';

type JournalPropsType = {
  journalNotes: string;
  mood: string;
  setJournalNotes: React.Dispatch<React.SetStateAction<string>>;
  selectedDay: Date;
}

function Journal({ journalNotes, setJournalNotes, mood, selectedDay }: JournalPropsType) {
  const [isEditting, setIsEditting] = useState<boolean>(false);
 

  const handleCreateAndUpdateJournal = () => {
    fetch('http://localhost:3000/journal/new', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        date: selectedDay.toISOString(),
        entry: journalNotes,
        mood: mood,
        user_id: 1
      })
    })
    .then(response => {
      return response.json();
    })
    .then(data => {
      setJournalNotes(data.entry);
      setIsEditting(!isEditting)
    })
  }

  return (
    <div className="flex flex-col bg-slate-50 h-[22rem] m-6 shadow rounded-lg border-solid border-green-400 border-2 relative">

        <button className="rounded absolute top-0 right-0 bg-green-400 px-2" onClick={() => setIsEditting(!isEditting)}>Edit</button>

        {isEditting && <button className="rounded absolute top-0 right-10 bg-green-400 px-2 mr-2" onClick={handleCreateAndUpdateJournal}>Save</button>}

        <div className="flex justify-center mt-2 text-2xl">Journal</div>

        {isEditting ? (
          <textarea className="h-[19rem] mx-8 mt-3 mb-3 bg-pink-100 rounded-lg text-black px-2 focus:border border-gray-400 outline-none" onChange={(e) => setJournalNotes(e.target.value)}>{journalNotes}</textarea>
        ) : (
          <p className="h-[19rem] mx-8 mt-3 mb-3 bg-pink-100 rounded-lg text-black px-2">{journalNotes}</p>
        )}
      </div>
  )
}

export default Journal;