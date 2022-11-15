import { useState } from 'react'
import { Switch } from '@headlessui/react'




function Goals() {

  return (
    <div className='w-4/12 h-90 border-2 rounded-md border-green-400'>
      <div className='text-center font-bold mt-5 bg-gradient-to-r from-red-500 to-blue-800 font-bold bg-clip-text text-transparent stroke-gray-100'>Goals</div>
      <fieldset className="space-y-5 p-2">
        <legend className="sr-only">Notifications</legend>
        <div className="relative flex items-start">
          <div className="flex h-5 items-center">
            <input
              id="comments"
              aria-describedby="comments-description"
              name="comments"
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
          </div>
          <div className="ml-3 text-sm">
            <label htmlFor="comments" className="font-medium text-gray-700">
              Create app
            </label>
            <p id="comments-description" className="text-gray-500">
              
            </p>
          </div>
        </div>
        <div className="relative flex items-start">
          <div className="flex h-5 items-center">
            <input
              id="candidates"
              aria-describedby="candidates-description"
              name="candidates"
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
          </div>
          <div className="ml-3 text-sm">
            <label htmlFor="candidates" className="font-medium text-gray-700">
              Eat banana
            </label>
            <p id="candidates-description" className="text-gray-500">
              
            </p>
          </div>
        </div>
        <div className="relative flex items-start">
          <div className="flex h-5 items-center">
            <input
              id="offers"
              aria-describedby="offers-description"
              name="offers"
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
          </div>
          <div className="ml-3 text-sm">
            <label htmlFor="offers" className="font-medium text-gray-700">
              Find father
            </label>
            <p id="offers-description" className="text-gray-500">
              
            </p>
          </div>
          <div className="relative flex items-start">
            <div className="flex h-5 items-center">
              <input
                id="comments"
                aria-describedby="comments-description"
                name="comments"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="comments" className="font-medium text-gray-700">
                Marry banana
              </label>
              <p id="comments-description" className="text-gray-500">

              </p>
            </div>
          </div>
        </div>
      </fieldset>
    </div>
  )
}

export default Goals;