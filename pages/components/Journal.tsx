import React, { useState } from 'react'
import { Montserrat } from '@next/font/google'
import Draggable from 'react-draggable'
import { Resizable } from 're-resizable'
import { useDragContext } from '../../context/DragContext'

const montserrat = Montserrat({ subsets: ['latin'], weight: '500' })

interface JournalPropsType {
  journalNotes: string
  mood: string
  setJournalNotes: React.Dispatch<React.SetStateAction<string>>
  selectedDay: Date
  setDaysWithMoods: React.Dispatch<React.SetStateAction<any[]>>
}

function Journal ({
  journalNotes,
  setJournalNotes,
  mood,
  selectedDay,
  setDaysWithMoods
}: JournalPropsType) {
  const [isEditting, setIsEditting] = useState<boolean>(false)
  const { dragStatus } = useDragContext()
  const handleCreateAndUpdateJournal = (e: any) => {
    e.preventDefault()
    const journalForm = new FormData(e.target)
    const date = selectedDay.toISOString()
    const user = JSON.parse(localStorage.getItem('user')) ?? ''
    if (user === '') {
      return
    }
    fetch(
      `http://localhost:3000/api/journals/?date=${date}&user_id=${user.userId}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${user.token}` },
        body: JSON.stringify({
          entry: journalForm.get('journal-notes') ?? '',
          mood
        })
      }
    )
      .then(async (res) => await res.json())
      .then((data) => {
        setJournalNotes(data.entry)
        setIsEditting(!isEditting)
        setDaysWithMoods((prev) => {
          const newDaysWithMoods = [...prev]
          const index = newDaysWithMoods.findIndex(
            (day) => day.date === selectedDay.toISOString()
          )
          if (index !== -1) {
            newDaysWithMoods[index].mood = data.mood
          } else {
            newDaysWithMoods.push({
              date: selectedDay.toISOString(),
              mood: data.mood
            })
          }
          return newDaysWithMoods
        })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <Draggable disabled={!dragStatus}>
      <Resizable
        defaultSize={{
          width: '90vw',
          height: '20rem'
        }}
        minWidth={380}
        minHeight={200}
        className="shadow rounded-lg border-solid border-black border-2 relative bg-white m-2"
      >
        <div className="flex flex-col bg-white m-6">
          <button
            className="rounded absolute top-2 right-2 bg-pink-100 py-1 px-3 shadow-sm"
            onClick={() => {
              setIsEditting(!isEditting)
            }}
          >
            {isEditting ? 'cancel' : 'edit'}
          </button>

          <div className="flex justify-center mt-2 text-xl">
            <h1 className={montserrat.className}>journal</h1>
          </div>

          {isEditting
            ? (
            <form onSubmit={handleCreateAndUpdateJournal}>
              <textarea
                id="journal-notes"
                name="journal-notes"
                className="min-h-[5rem] w-11/12 mx-8 mt-3 mb-3 bg-pink-100 rounded-lg text-black px-2 focus:border border-gray-400 outline-none"
              >
                {journalNotes}
              </textarea>
              <button
                type="submit"
                className="rounded absolute top-2 right-20 bg-pink-100 py-1 px-3"
              >
                save
              </button>
            </form>
              )
            : (
            <p className="min-h-[5rem] mx-8 mt-3 mb-3 bg-white rounded-lg text-black px-2">
              {journalNotes}
            </p>
              )}
        </div>
      </Resizable>
    </Draggable>
  )
}

export default Journal
