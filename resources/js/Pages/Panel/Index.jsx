import React from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router, usePage } from '@inertiajs/react';

export default function Index() {
  return (
       <AuthenticatedLayout
                header={
                    <div class='flex text-white'>
                     <h2 className="text-xl text-white font-extrabold leading-none tracking-tight">
                        List of Panels
                      </h2>
                    </div>
                }
            >
        <Head title="Application Tracking" />

        <div className="py-2">
            <div className="mx-auto sm:px-6 lg:px-8">
                <div class="w-full">
                      <div class="flex flex-col">
                        <div class=" mt-1">
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">

<div class="bg-white p-6 rounded-lg shadow-md">
  <h2 class="text-xl font-semibold text-gray-700 mb-4">Create Panel</h2>
  <form action="#" method="POST" x-data="{ name: '', email: '', phone: '' }">
    <div class="mb-4">
      <label for="name" class="block text-sm font-medium text-gray-600">Name</label>
      <input type="text" id="name" name="name" x-model="name" class="w-full mt-2 p-3 border rounded-md" placeholder="Enter your name" />
    </div>

    <div class="mb-4">
      <label for="email" class="block text-sm font-medium text-gray-600">Email</label>
      <input type="email" id="email" name="email" x-model="email" class="w-full mt-2 p-3 border rounded-md" placeholder="Enter your email" />
    </div>

    <div class="mb-4">
      <label for="phone" class="block text-sm font-medium text-gray-600">Phone</label>
      <input type="text" id="phone" name="phone" x-model="phone" class="w-full mt-2 p-3 border rounded-md" placeholder="Enter your phone" />
    </div>

    <button type="submit" class="btn btn-primary float-end rounded-full">Create Panel</button>
  </form>
</div>

<div class="md:col-span-2 bg-white p-6 rounded-lg shadow-md">
  <h2 class="text-xl font-semibold text-gray-700 mb-4">Panel Profile List</h2>
  <div class="mb-6">

<div class="grid grid-cols-1">



<div class="">
<div class="float-right">
<div class="relative max-w-xs">
    <label for="hs-table-search" class="sr-only">Search</label>
    <input type="search" name="hs-table-search" id="hs-table-search" class="py-2 px-3 ps-9 block w-full border-gray-400 rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" placeholder="Search Panel" />
    <div class="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-3">
      <svg class="size-4 text-gray-400 dark:text-neutral-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="11" cy="11" r="8"></circle>
        <path d="m21 21-4.3-4.3"></path>
      </svg>
    </div>
  </div>
</div>
</div>

</div>


 
</div>
  <div class="">
          <table class="min-w-full table-auto">
          <thead class="bg-gray-400 dark:bg-neutral-700">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-xs text-white">NAME</th>
                <th class="px-6 py-3 text-left text-xs font-xs text-white">EMAIL</th>
                <th class="px-6 py-3 text-left text-xs font-xs text-white">USERNAME</th>
                <th class="px-6 py-3 text-left text-xs font-xs text-white">COLLEGE</th>
                <th class="px-6 py-3 text-left text-xs font-xs text-white">DEPARTMENT</th>
                <th class="px-6 py-3 text-left text-xs font-xs text-white">STATUS</th>
              </tr>
            </thead>
            <tbody>
            
               
            </tbody>
            
          </table>
          <div class="bg-white p-6 shadow-lg border border-gray-200">
  <div class="flex justify-center items-center">
    <svg class="h-16 w-16 text-gray-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 4V6H7V4H5v16h14V4h-2z"></path>
    </svg>
  </div>
  
  <div class="text-center mt-4">
    <h3 class="text-xl font-semibold text-gray-800">Oops, no items found!</h3>
    
    <p class="mt-2 text-gray-500">It seems like the list is empty. Would you like to add new data or try again later?</p>
  </div>
</div>
        </div>
</div>

</div>

                            </div>
                            </div>
                            </div>
            </div>
        </div>
        </AuthenticatedLayout>
  )
}
