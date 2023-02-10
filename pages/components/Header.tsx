import { format } from 'date-fns'
import React, { useState } from 'react'
// import { ThemeContext } from '../app';
// import { useSession } from 'next-auth/react'
// import { Router } from 'next/router';
import { useRouter } from 'next/navigation'
import { Montserrat } from '@next/font/google'
import { Switch, Dialog } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { useDragContext } from '../../context/DragContext'

const montserrat = Montserrat({ subsets: ['latin'], weight: '500' })

function Header ({ user }) {
  // const { theme, toggleTheme } = useContext(ThemeContext);
  // const { data: session, status } = useSession()
  const Router = useRouter()
  // console.log('session', session);
  const { dragStatus, setDragStatus } = useDragContext()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleSignout = () => {
    localStorage.removeItem('user')
    Router.push('/login')
  }
  return (
    <>
      <nav className="flex justify-between items-center w-screen px-5 bg-pink-100 h-11 border-b-2 border-b-black">
        <div className="hidden lg:flex">
          <Switch
            checked={dragStatus}
            onChange={setDragStatus}
            className={`${
              dragStatus ? 'bg-green-600' : 'bg-zinc-400'
            } relative inline-flex h-6 w-11 items-center rounded-full`}
          >
            <span className="sr-only">Enable dragging</span>
            <span
              className={`${
                dragStatus ? 'translate-x-6' : 'translate-x-1'
              } inline-block h-4 w-4 transform rounded-full bg-white transition`}
            />
          </Switch>
          <span className="ml-2 font-bold mx-10">
            {dragStatus ? 'drag enabled' : 'drag disabled'}
          </span>
        </div>
        <div className="font-bold lowercase">
          <span className={montserrat.className}>
            {format(new Date(), 'MMMM do, yyyy')}
          </span>
        </div>
        <div className="hidden lg:flex lg:font-bold">
          {user === ''
            ? (
            <button
              className="font-bold"
              onClick={() => {
                Router.push('/login')
              }}
            >
              sign in
            </button>
              )
            : (
            <div>
              <span className="mx-2">hello, {user.username}</span>
              <button
                className="bg-transparent text-black font-semibold py-1 px-4 border border-black hover:border-gray-600 hover:text-gray-500 rounded"
                onClick={handleSignout}
              >
                sign out
              </button>
            </div>
              )}
          {/* {status === "authenticated" && (
						<>
							<button
								className='font-bold'
								onClick={() => signOut({ callbackUrl: "/" })}
							>
								{session && session.user?.name}, Sign out
							</button>
						</>
					)}
					{status === "unauthenticated" && (
						<>
							<button className='font-bold' onClick={() => Router.push("/login")}>
								Sign in
							</button>
						</>
					)} */}
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => {
              setMobileMenuOpen(true)
            }}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
      </nav>
      <Dialog as="div" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
        <Dialog.Panel className="fixed inset-0 z-10 overflow-y-auto bg-white px-6 py-6 lg:hidden">
          <button
            type="button"
            className="-m-2.5 rounded-md p-2.5 text-gray-700"
            onClick={() => {
              setMobileMenuOpen(false)
            }}
          >
            <span className="sr-only">Close menu</span>
            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  <div className="font-bold">
                    {user === ''
                      ? (
                      <button
                        className="font-bold"
                        onClick={() => {
                          Router.push('/login')
                        }}
                      >
                        Sign in
                      </button>
                        )
                      : (
                      <div>
                        <span className="mx-2">{user.username}</span>
                        <button
                          className="bg-transparent text-black font-semibold py-1 px-4 border border-black hover:border-transparent rounded"
                          onClick={handleSignout}
                        >
                          Sign out
                        </button>
                      </div>
                        )}
                  </div>
                </div>
              </div>
            </div>
          </button>
        </Dialog.Panel>
      </Dialog>
    </>
  )
}

export default Header
