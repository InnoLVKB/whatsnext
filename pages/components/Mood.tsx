import React from 'react'
import Image from 'next/image'
import { Montserrat } from '@next/font/google'
import Draggable from 'react-draggable'
import { Resizable } from 're-resizable'
import { useDragContext } from '../../context/DragContext'

const montserrat = Montserrat({ subsets: ['latin'], weight: '500' })

interface MoodPropsType {
  mood: string
  setMood: React.Dispatch<React.SetStateAction<string>>
  selectedDayMood: string
  daysWithMoods: any[]
  setDaysWithMoods: React.Dispatch<React.SetStateAction<any[]>>
}

function Mood ({ mood, setMood, selectedDayMood, daysWithMoods, setDaysWithMoods }: MoodPropsType) {
  const { dragStatus } = useDragContext()
  function handleMoodChange (mood) {
    setMood(mood)
    setDaysWithMoods((prev) => {
      const day = prev.find((day) => day.date === selectedDayMood)
      if (day) {
        return prev.map((day) => {
          if (day.date === selectedDayMood) {
            return { ...day, mood: mood }
          } else {
            return day
          }
        })
      } else {
        return [...prev, { date: selectedDayMood, mood: mood }]
      }
    })
  }

  const buttonStyle =
    'rounded-full focus:animate-bounce focus:border-red-900 drop-shadow-sm'
  const imageStyle = 'rounded-full'

  return (
    <Draggable disabled={!dragStatus}>
      <Resizable
        defaultSize={{
          width: '33vw',
          height: '50vh'
        }}
        minWidth={380}
        minHeight={200}
        // maxWidth={9000}
        // maxHeight={9000}
        className="bg-white border-2 rounded-lg shadow-md border-black flex flex-col sm:w-screen"
      >
        <div className="flex justify-center text-center text-xl p-2 font-bold border-solid border-opacity-70 border-black border-b-2">
          <p className={montserrat.className}>mood</p>
        </div>
        <div className="flex align-middle justify-center h-full">
          {/* <h1>{mood}</h1> */}
          <div className="flex space-x-2">
            <button
              className={`${buttonStyle}`}
              id="excited"
              onClick={(e) => {
                handleMoodChange(e.target.id)
              }}
            >
              <Image
                id="excited"
                className={`${imageStyle}`}
                src="/excited.png"
                alt="excited"
                width="80"
                height="100"
              />
            </button>
            <button
              className={`${buttonStyle}`}
              id="happy"
              onClick={(e) => {
                handleMoodChange(e.target.id)
              }}
            >
              <Image
                id="happy"
                className={`${imageStyle}`}
                src="/happy.png"
                alt="happy"
                width="80"
                height="100"
              />
            </button>
            <button
              className={`${buttonStyle}`}
              id="content"
              onClick={(e) => {
                handleMoodChange(e.target.id)
              }}
            >
              <Image
                id="content"
                className={`${imageStyle}`}
                src="/content.png"
                alt="content"
                width="80"
                height="100"
              />
            </button>
            <button
              className={`${buttonStyle}`}
              id="sad"
              onClick={(e) => {
                handleMoodChange(e.target.id)
              }}
            >
              <Image
                id="sad"
                className={`${imageStyle}`}
                src="/sad.png"
                alt="sad"
                width="80"
                height="100"
              />
            </button>
            <button
              className={`${buttonStyle}`}
              id="mad"
              onClick={(e) => {
                handleMoodChange(e.target.id)
              }}
            >
              <Image
                id="mad"
                className={`${imageStyle}`}
                src="/mad.png"
                alt="mad"
                width="80"
                height="100"
              />
            </button>
          </div>
        </div>
        <div className="text-center text-sm font-semibold">
          mood of the day:{' '}
          <b>{selectedDayMood || (mood !== '' ? mood : 'select one above')}</b>
        </div>
      </Resizable>
    </Draggable>
  )
}

export default Mood
