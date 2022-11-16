import { Fragment } from 'react'
import {
  CalendarIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  EllipsisHorizontalIcon,
  MapPinIcon,
} from '@heroicons/react/20/solid'
import { Menu, Transition } from '@headlessui/react'

type DateType = {
  date: string;
  isCurrentMonth?: boolean;
  isToday?: boolean;
  isSelected?: boolean;
}

const days: DateType[] = [
  { date: '2022-10-30' },
  { date: '2022-10-31' },
  { date: '2022-11-01', isCurrentMonth: true },
  { date: '2022-11-02', isCurrentMonth: true },
  { date: '2022-11-03', isCurrentMonth: true },
  { date: '2022-11-04', isCurrentMonth: true },
  { date: '2022-11-05', isCurrentMonth: true },
  { date: '2022-11-06', isCurrentMonth: true },
  { date: '2022-11-07', isCurrentMonth: true },
  { date: '2022-11-08', isCurrentMonth: true },
  { date: '2022-11-09', isCurrentMonth: true },
  { date: '2022-11-10', isCurrentMonth: true },
  { date: '2022-11-11', isCurrentMonth: true },
  { date: '2022-11-12', isCurrentMonth: true },
  { date: '2022-11-13', isCurrentMonth: true },
  { date: '2022-11-14', isCurrentMonth: true },
  { date: '2022-11-15', isCurrentMonth: true, isToday: true },
  { date: '2022-11-16', isCurrentMonth: true },
  { date: '2022-11-17', isCurrentMonth: true },
  { date: '2022-11-18', isCurrentMonth: true },
  { date: '2022-11-19', isCurrentMonth: true },
  { date: '2022-11-20', isCurrentMonth: true },
  { date: '2022-11-21', isCurrentMonth: true },
  { date: '2022-11-22', isCurrentMonth: true },
  { date: '2022-11-23', isCurrentMonth: true },
  { date: '2022-11-24', isCurrentMonth: true },
  { date: '2022-11-25', isCurrentMonth: true },
  { date: '2022-11-26', isCurrentMonth: true },
  { date: '2022-11-27', isCurrentMonth: true },
  { date: '2022-11-28', isCurrentMonth: true },
  { date: '2022-11-29', isCurrentMonth: true },
  { date: '2022-11-30', isCurrentMonth: true },
  { date: '2022-12-01' },
  { date: '2022-12-02' },
  { date: '2022-12-03' },
  // { date: '2022-12-04' },
  // { date: '2022-12-05' },
  // { date: '2022-12-06' },
  // { date: '2022-12-07' },
  // { date: '2022-12-08' },
  // { date: '2022-12-09' },
  // { date: '2022-12-10' }
]

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}

type CalendarProps = {
  calDate: number;
  calDateHook: React.Dispatch<React.SetStateAction<number>>;
}

export default function Calendar({calDate, calDateHook}: CalendarProps) {
  const newDays = days.map((day, dayIdx) => {
    if (calDate - 1 === dayIdx) {
      return {
        ...day,
        isSelected: true
      }
    } else {
      return day;
    }
  })

  return (
    <div className="w-[480px] px-10 bg-pink-100 rounded-lg">
      <div>
        <div className="text-center">
          <div className="flex items-center text-gray-900 my-5">
            <button
              type="button"
              className="-m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500 "
            >
              <span className="sr-only">Previous month</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </button>
            <div className="flex-auto font-semibold">November</div>
            <button
              type="button"
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
            {newDays.map((day, dayIdx) => (
              <button
                key={day.date}
                type="button"
                className={classNames(
                  'py-1.5 hover:bg-gray-100 focus:z-10',
                  day.isCurrentMonth ? 'bg-white' : 'bg-gray-50',
                  (day.isSelected || day.isToday) && 'font-semibold',
                  day.isSelected && 'text-white',
                  !day.isSelected && day.isCurrentMonth && !day.isToday && 'text-gray-900',
                  !day.isSelected && !day.isCurrentMonth && !day.isToday && 'text-gray-400',
                  day.isToday && !day.isSelected && 'text-indigo-600',
                  dayIdx === 0 && 'rounded-tl-lg',
                  dayIdx === 6 && 'rounded-tr-lg',
                  dayIdx === days.length - 7 && 'rounded-bl-lg',
                  dayIdx === days.length - 1 && 'rounded-br-lg'
                )}
                onClick={() => {
                  calDateHook(dayIdx + 1);
                }
              }
              >
                <time
                  dateTime={day.date}
                  className={classNames(
                    'mx-auto flex h-7 w-7 items-center justify-center rounded-full',
                    day.isSelected && day.isToday && 'bg-indigo-600',
                    day.isSelected && !day.isToday && 'bg-gray-900'
                  )}
                >
                  {day.date.split('-').pop().replace(/^0/, '')}
                </time>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
