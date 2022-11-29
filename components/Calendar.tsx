import { Fragment, useState } from 'react';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@heroicons/react/20/solid'
import { Menu, Transition } from '@headlessui/react'
import {
  add,
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  isEqual,
  isSameDay,
  isSameMonth,
  isToday,
  parse,
  parseISO,
  startOfToday,
} from 'date-fns'
import { days } from '../data/data';

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}

type CalendarProps = {
  setJournalNotes: React.Dispatch<React.SetStateAction<string>>;
  setGoals: any; // plz change
  today: Date;
  selectedDay: Date;
  setSelectedDay: React.Dispatch<React.SetStateAction<Date>>;
}

export default function Calendar({ setJournalNotes, setGoals, today, selectedDay, setSelectedDay }: CalendarProps) {

  const [currentMonth, setCurrentMonth] = useState(format(today, 'MMM-yyyy'))
  const firstDayCurrentMonth = parse(currentMonth, 'MMM-yyyy', new Date())

  const days = eachDayOfInterval({
    start: firstDayCurrentMonth,
    end: endOfMonth(firstDayCurrentMonth),
  })

  function previousMonth() {
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 })
    setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'))
  }

  function nextMonth() {
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 })
    setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'))
  }

  const colStartClasses = [
  '',
  'col-start-2',
  'col-start-3',
  'col-start-4',
  'col-start-5',
  'col-start-6',
  'col-start-7',
  ]

  const moodColors = {
    'excited': 'bg-yellow-400',
    'happy': 'bg-green-400',
    'content': 'bg-gray-400',
    'sad': 'bg-blue-400',
    'angry': 'bg-red-400',
  }

  // map mood

  const handleGetJournal = (day: Date) => {
    Promise.all([
    fetch('http://localhost:4000/journal/date', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        date: day.toISOString(),
        user_id: 1
      })
    }),
    fetch('http://localhost:4000/goals/date', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        date: day.toISOString(),
        user_id: 1
      })
    })
    ])
      .then(([journalResponse, goalResponse]) => {
        return Promise.all([journalResponse.json(), goalResponse.json()])
      })
      .then(([journalData, goalData]) => {
        setJournalNotes(journalData.entry);
        setGoals(goalData);
      })
  }

  return (
    <div className="w-[480px] px-10 bg-pink-100 rounded-lg">
      <div>
        <div className="text-center">
          <div className="flex items-center text-gray-900 my-5">
            <button
              type="button"
              onClick={previousMonth}
              className="-m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500 "
            >
              <span className="sr-only">Previous month</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </button>
            <div className="flex-auto font-semibold">{format(firstDayCurrentMonth, 'MMMM yyyy')}</div>
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
          <div className="isolate mt-2 grid grid-cols-7 gap-px rounded-lg bg-gray-200 text-sm shadow ring-1 ring-gray-200">
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
                      setSelectedDay(day)
                      handleGetJournal(day)}}
                    className={classNames(
                      isEqual(day, selectedDay) && 'text-white',
                      !isEqual(day, selectedDay) &&
                        isToday(day) &&
                        'text-green-500',
                      !isEqual(day, selectedDay) &&
                        !isToday(day) &&
                        isSameMonth(day, firstDayCurrentMonth) &&
                        'text-gray-900',
                      !isEqual(day, selectedDay) &&
                        !isToday(day) &&
                        !isSameMonth(day, firstDayCurrentMonth) &&
                        'text-gray-400',
                      isEqual(day, selectedDay) && isToday(day) && 'bg-green-300',
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
    </div>
  )
}
