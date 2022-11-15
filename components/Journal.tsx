import { useState } from 'react'

function Journal() {
  const [isEditting, setIsEditting] = useState<boolean>(false);
  const [journalNotes, setJournalNotes] = useState<string>('');

  return (
    <div className="flex flex-col bg-slate-50 h-[22rem] m-8 shadow rounded-lg border border-gray-400 relative">

        <button className="rounded absolute top-0 right-0 bg-green-400 px-2" onClick={() => setIsEditting(!isEditting)}>Edit</button>

        {isEditting && <button className="rounded absolute top-0 right-10 bg-green-400 px-2 mr-2" onClick={() => setIsEditting(!isEditting)}>Save</button>}

        <div className="flex justify-center text-2xl">Journal</div>

        {isEditting ? (
          <textarea className="h-3/4 m-8 bg-white text-black px-2 rounded border border-gray-400" onChange={(e) => setJournalNotes(e.target.value)}>{journalNotes}</textarea>
        ) : (
          <p className="h-3/4 m-8 text-black px-2">{journalNotes}</p>
        )}
      </div>
  )
}

export default Journal;