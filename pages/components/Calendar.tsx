import React, { useState, useEffect } from 'react'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import {
  add,
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  isEqual,
  isSameMonth,
  isToday,
  parse
} from 'date-fns'
import { Montserrat } from '@next/font/google'
import Draggable from 'react-draggable'
import { Resizable } from 're-resizable'
import { useDragContext } from '../../context/DragContext'

const montserrat = Montserrat({ subsets: ['latin'], weight: '700' })

function classNames (...classes: any) {
  return classes.filter(Boolean).join(' ')
}

interface CalendarProps {
  setJournalNotes: React.Dispatch<React.SetStateAction<string>>
  setGoals: React.Dispatch<React.SetStateAction<any[]>>
  today: Date
  selectedDay: Date
  setSelectedDay: React.Dispatch<React.SetStateAction<Date>>
  calendarData: any[]
  setSelectedDayMood: React.Dispatch<React.SetStateAction<string>>
  setMood: React.Dispatch<React.SetStateAction<string>>
  daysWithMoods: any[]
}

export default function Calendar ({
  setJournalNotes,
  setGoals,
  today,
  selectedDay,
  setSelectedDay,
  calendarData,
  setSelectedDayMood,
  setMood,
  daysWithMoods
}: CalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(format(today, 'MMM-yyyy'))
  const [moodDayArr, setMoodDayArr] = useState<any[]>([])
  const firstDayCurrentMonth = parse(currentMonth, 'MMM-yyyy', new Date())

  const { dragStatus } = useDragContext()

  const days = eachDayOfInterval({
    start: firstDayCurrentMonth,
    end: endOfMonth(firstDayCurrentMonth)
  })

  function previousMonth () {
    const firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 })
    setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'))
  }

  function nextMonth () {
    const firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 })
    setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'))
  }

  const colStartClasses = [
    '',
    'col-start-2',
    'col-start-3',
    'col-start-4',
    'col-start-5',
    'col-start-6',
    'col-start-7'
  ]

  const moodColors = {
    excited: 'bg-green-400',
    happy: 'bg-green-300',
    content: 'bg-green-100',
    sad: 'bg-blue-300',
    mad: 'bg-red-400',
    undefined: ''
  }

  // match moods to days array
  // const moodDayArr = days.map((day) => {
  //   const mood = daysWithMoods.find((calMood) => isEqual(calMood.date, day))
  //   return { ...day, mood: mood?.mood }
  // })
  useEffect(() => {
    setMoodDayArr(days.map((day) => {
      const mood = daysWithMoods.find((calMood) => isEqual(calMood.date, day))
      return { ...day, mood: mood?.mood }
    }))
    console.log('moods: ', moodDayArr)
    console.log('rerendered calendar component')
  }, [daysWithMoods])

  const handleCalendarClick = (day: any) => {
    setSelectedDay(day)
    const date = day.toISOString()
    const user = JSON.parse(localStorage.getItem('user')) ?? ''
    if (user === '') {
      return
    }
    Promise.all([
      fetch(
        `http://localhost:3000/api/journals/?date=${date}&user_id=${user.userId}`, {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      ),
      fetch(
        `http://localhost:3000/api/goals/?date=${date}&user_id=${user.userId}`, {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      )
    ])
      .then(async ([journalRes, goalsRes]) => {
        return await Promise.all([journalRes.json(), goalsRes.json()])
      })
      .then(([journalData, goalsData]) => {
        setGoals(goalsData)
        if (journalData.length > 0) {
          setJournalNotes(journalData[0].entry)
          setSelectedDayMood(journalData[0].mood)
          setMood('') // reset mood wnen new day is selected
        } else {
          setJournalNotes('')
          setSelectedDayMood('')
          setMood('')
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <Draggable disabled={!dragStatus}>
      <Resizable
        defaultSize={{
          width: '33vw',
          height: '50vh'
        }}
        minWidth={380}
        minHeight={350}
        className="bg-white mx-5 rounded-lg shadow-md border-black border-2"
      >
        <div>
          <div className="text-center">
            <div className="flex items-center text-gray-900 my-5 border-b-2 border-black">
              <button
                type="button"
                onClick={previousMonth}
                className="-m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500 "
              >
                <span className="sr-only">Previous month</span>
                <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
              </button>
              <div className="flex-auto font-semibold lowercase">
                <span className={montserrat.className}>
                  {format(firstDayCurrentMonth, 'MMMM yyyy')}
                </span>
              </div>
              <button
                type="button"
                onClick={nextMonth}
                className="-m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">Next month</span>
                <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 grid grid-cols-7 text-xs leading-6 text-gray-500">
              <div>S</div>
              <div>M</div>
              <div>T</div>
              <div>W</div>
              <div>T</div>
              <div>F</div>
              <div>S</div>
            </div>
            <div className="isolate mt-2 grid grid-cols-7 gap-px rounded-lg text-sm">
              {days.map((day, dayIdx) => (
                <div
                  key={day.toString()}
                  className={classNames(
                    dayIdx === 0 && colStartClasses[getDay(day)],
                    'py-1.5 bg-white'
                  )}
                >
                  <button
                    type="button"
                    onClick={() => {
                      handleCalendarClick(day)
                      // setSelectedDay(day);
                      // handleGetJournal(day);
                      // handleGetGoals(day);
                    }}
                    className={classNames(
                      moodDayArr[dayIdx]?.mood &&
                        moodColors[moodDayArr[dayIdx]?.mood],
                      isEqual(day, selectedDay) && 'text-white bg-gray-900',
                      !isEqual(day, selectedDay) &&
                        isToday(day) &&
                        'text-pink-500', // can change how current day is styled
                      !isEqual(day, selectedDay) &&
                        !isToday(day) &&
                        isSameMonth(day, firstDayCurrentMonth) &&
                        'text-gray-900',
                      !isEqual(day, selectedDay) &&
                        !isToday(day) &&
                        !isSameMonth(day, firstDayCurrentMonth) &&
                        'text-gray-400',
                      isEqual(day, selectedDay) &&
                        !isToday(day) &&
                        'bg-gray-900',
                      !isEqual(day, selectedDay) && 'hover:bg-gray-200',
                      (isEqual(day, selectedDay) || isToday(day)) &&
                        'font-semibold',
                      'mx-auto flex h-8 w-8 items-center justify-center rounded-full'
                    )}
                  >
                    <time dateTime={format(day, 'yyyy-MM-dd')}>
                      {format(day, 'd')}
                    </time>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Resizable>
    </Draggable>
  )
}
