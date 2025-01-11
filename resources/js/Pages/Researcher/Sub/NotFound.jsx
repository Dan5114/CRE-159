import React from 'react'
import { Head, Link, router } from '@inertiajs/react';

const NotFound = () => {
  return (
    <div>
       <section class="bg-white dark:bg-gray-900 ">
    <div class="container flex justify-center items-center  px-6 py-12">
        <div>
           <img style={{ "width" : "500px" }} src="https://www.achieversacademyalwar.in/assets/images/no-record-found.png" />
           
            <p class="mt-4 text-gray-500 dark:text-gray-400">Sorry, the record you are looking for doesn't exist or has been moved.</p>

            <div class="flex items-center justify-center mt-6 gap-x-3">
               
               <Link href={route('researcher.index')}>
               <button class="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 transition-colors duration-200 bg-white border rounded-lg gap-x-2 sm:w-auto dark:hover:bg-gray-800 dark:bg-gray-900 hover:bg-gray-100 dark:text-gray-200 dark:border-gray-700">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 rtl:rotate-180">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
                    </svg>

                    <span>Go back</span>
                </button>
               </Link>

               <Link href={route('researcher.create')}>
                <button class="w-1/2 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-blue-500 rounded-lg shrink-0 sm:w-auto hover:bg-blue-600 dark:hover:bg-blue-500 dark:bg-blue-600">
                   Create Application
                </button>
                </Link>
            </div>
        </div>
    </div>
</section>
    </div>
  )
}

export default NotFound