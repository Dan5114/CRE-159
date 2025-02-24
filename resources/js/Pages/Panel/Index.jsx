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
                        <div class="-m-1.5 overflow-x-auto card p-3 mt-1 shadow-lg">
                            Lists
                            </div>
                            </div>
                            </div>
            </div>
        </div>
        </AuthenticatedLayout>
  )
}
