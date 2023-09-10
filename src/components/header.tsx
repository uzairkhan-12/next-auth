'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import {useSession,signIn,signOut} from 'next-auth/react'
const Header = () =>
{
    const [isSidebaropen, setIsSidebaropen] = useState<boolean>(false)
    const { data: session } = useSession();
    function handleSidebar()
    {
        setIsSidebaropen(!isSidebaropen)
    }
    return (
        <div>
            <header className="bg-white">
                <nav className="mx-auto flex max-w-7xl items-center justify-between p-3 lg:px-8" aria-label="Global">
                    <div className="flex lg:flex-1">
                        <Link href="/dashboard" className="-m-1.5 p-1.5 text-indigo-600 font-bold text-xl">
                            MERN Task
                        </Link>
                    </div>
                    <div className="flex lg:hidden">
                        <button onClick={handleSidebar} type="button" className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700">
                            <span className="sr-only">Open main menu</span>
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                            </svg>
                        </button>
                    </div>
                   {!session && <div className="hidden lg:flex items-center py-5 gap-x-10 lg:flex-1 lg:justify-end">
                        <Link href="/contact-us" className="-mx-3 text-sm font-semibold leading-6 text-gray-900">Contact us</Link>
                        <Link href="/login" className="text-sm font-semibold leading-6 text-gray-900">Log in <span aria-hidden="true">&rarr;</span></Link>
                        <Link href="/register" className="-mx-3 text-sm font-semibold leading-6 text-gray-900">Register</Link>
                    </div>}
                    {session && <div className="hidden lg:flex items-center gap-x-10 lg:flex-1 lg:justify-end">
                    <Link href="/contact-us" className="-mx-3 text-sm font-semibold leading-6 text-gray-900">Contact us</Link>
                    <p>{session?.user?.name}</p>
                    <button className='px-3 py-1 bg-red-600 text-white rounded-lg' onClick={() => signOut()}>
                    Logout
                    </button>
                    </div>
                    }
                </nav>
                { isSidebaropen && <div className='lg:hidden' role="dialog" aria-modal="true">
                    <div className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                        <div className="flex items-center justify-between">
                            <button onClick={handleSidebar} type="button" className="-m-2.5 rounded-md p-2.5 text-gray-700">
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <div className="mt-6 flow-root">
                            <div className="-my-6 divide-y divide-gray-500/10">
                                <div className="py-6">
                                    <button  onClick={() => signIn()} className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">Log in</button>
                                    <Link href="/register" className="-mx-3 block text-white bg-indigo-600 rounded-lg px-3 py-2.5 text-base leading-7 text-gray-900 hover:bg-indigo-500">Register</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                }
            </header>

        </div>
    )
}

export default Header