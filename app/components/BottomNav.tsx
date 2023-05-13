'use client'
import React from 'react'
import Link from 'next/link';


const BottomNav = () => {

    return (
        <>
            <div className="px-10 md:mt-0">
                <div className="fixed z-50 w-[95%] md:w-full h-16 max-w-lg -translate-x-1/2  border border-gray-200 rounded-full bottom-4 left-1/2 bg-dark.purple bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-90 shadow-md shadow-white/30">
                    <div className="grid h-full max-w-lg grid-cols-3 mx-auto">
                        {/* home */}
                        <Link href="/" data-tooltip-target="tooltip-home" type="button" className="inline-flex flex-col items-center justify-center px-5 rounded-l-full group">
                            <svg className="w-6 h-6 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-[#9969FF] dark:group-hover:text-[#9969FF]" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
                            </svg>
                            <span className="sr-only">Home</span>
                        </Link>
                        <div id="tooltip-home" role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                            Home
                            <div className="tooltip-arrow" data-popper-arrow></div>
                        </div>
                        {/* create new event */}
                        <div className="flex items-center justify-center">
                            {/* <button data-tooltip-target="tooltip-new" type="button" className="inline-flex items-center justify-center w-10 h-10 font-medium bg-[#9969FF] rounded-full hover:bg-purple-600 group focus:ring-4 focus:ring-purple-300 focus:outline-none dark:focus:ring-purple-800"> */}
                            <Link href="/create-teasr" data-tooltip-target="tooltip-home" type="button" className="inline-flex items-center justify-center w-6 h-6 font-medium hover:bg-[#9969FF] bg-gray-400 rounded-full hover:border-[#9969FF] group focus:ring-none focus:outline-none">
                                <svg className="w-5 h-5 text-gray-900 " fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                    <path clipRule="evenodd" fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"></path>
                                </svg>
                                <span className="sr-only">New item</span>
                                {/* </button> */}
                            </Link>
                        </div>
                        <div id="tooltip-new" role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                            Create new item
                            <div className="tooltip-arrow" data-popper-arrow></div>
                        </div>
                        {/* profile */}
                            <Link href='/' data-tooltip-target="tooltip-profile" type="button" className="inline-flex flex-col items-center justify-center px-5 rounded-r-full group">
                                <svg className="w-6 h-6 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-[#9969FF] dark:group-hover:text-[#9969FF]" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                    <path clipRule="evenodd" fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"></path>
                                </svg>
                                <span className="sr-only">Profile</span>
                                {/* </button> */}
                            </Link>
                        <div id="tooltip-profile" role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                            Profile
                            <div className="tooltip-arrow" data-popper-arrow></div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default BottomNav