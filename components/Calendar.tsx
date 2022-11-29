import { useState } from 'react';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@heroicons/react/20/solid'
import {
  add,
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  isEqual,
  isSameMonth,
  isToday,
  parse,
} from 'date-fns'

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}

type CalendarProps = {
  setJournalNotes: React.Dispatch<React.SetStateAction<string>>;
  setGoals: React.Dispatch<React.SetStateAction<any[]>>;
  today: Date;
  selectedDay: Date;
  setSelectedDay: React.Dispatch<React.SetStateAction<Date>>;
  calendarData: any[];
  setSelectedDayMood: React.Dispatch<React.SetStateAction<string>>;
  setMood: React.Dispatch<React.SetStateAction<string>>;
}

export default function Calendar({ setJournalNotes, setGoals, today, selectedDay, setSelectedDay, calendarData, setSelectedDayMood, setMood }: CalendarProps) {

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
    'excited': 'bg-green-400',
    'happy': 'bg-green-300',
    'content': 'bg-green-100',
    'sad': 'bg-blue-300',
    'angry': 'bg-red-400',
  }

  // combine moods and dates rom calendar data
  const calMoods: Array<any> = [];
  for (let i = 0; i < calendarData.length; i++) {
    calMoods.push({date: new Date(calendarData[i].date), mood: calendarData[i].mood})
  }
  // match moods to days array
  const daysWithMoods = days.map((day) => {
    const mood = calMoods.find((calMood) => isEqual(calMood.date, day))
    return { ...day, mood: mood?.mood }
  })

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
        setSelectedDayMood(journalData.mood)
        setMood(''); // reset mood wnen new day is selected
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
          <div className="isolate mt-2 grid grid-cols-7 gap-px rounded-lg text-sm">
             {days.map((day, dayIdx) => (
                <div
                  key={day.toString()}
                  className={classNames(
                    dayIdx === 0 && colStartClasses[getDay(day)],
                    'py-1.5 bg-white',
                  )}
                >
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedDay(day)
                      handleGetJournal(day)}}
                    className={classNames(
                      moodColors[daysWithMoods[dayIdx].mood],
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
    </div>
  )
}
