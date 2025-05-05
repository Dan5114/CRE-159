import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime';
import localizedFormat from "dayjs/plugin/localizedFormat";
import 'notyf/notyf.min.css';

dayjs.extend(relativeTime);
dayjs.extend(localizedFormat);

export default function Index(props) {
  const cards = Array.from({ length: 13 }, (_, i) => ({
    id: i + 1,
    title: `Step ${i + 1}`,
    description: `This is a description for step ${i + 1}.`,
    status: 'Active',
  }));

  return (
    <AuthenticatedLayout
      header={
        <div className="flex text-white">
          <h2 className="text-xl text-white font-extrabold leading-none tracking-tight">
            Manage Instructions
          </h2>
        </div>
      }
    >
      <Head title="Application Tracking" />

      <div className="py-2">
        <div className="mx-auto sm:px-6 lg:px-8">
          <div className="overflow-x-auto card p-2">
             <table className="min-w-full table-auto shadow-lg border border-gray-300 dark:border-neutral-700">
           
             <thead class="bg-gray-400 dark:bg-neutral-700">
                <tr class="bg-gray-800 text-white dark:bg-neutral-900">
                    <th scope="col" class="px-4 py-3 text-left text-sm font-semibold uppercase">Instructions</th>
                    <th scope="col" class="px-4 py-3 text-left text-sm font-semibold uppercase">Description</th>
                    <th scope="col" class="px-4 py-3 w-24"></th>
                </tr>
             </thead>
             <tbody>
                 {cards.map((card, index) => {
                  
             
                   return (
                   <tr key={card.id} className={index % 2 !== 0 ? "bg-gray-50 dark:bg-gray-800 dark:border-gray-700" : "bg-gray-200 dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-neutral-800"}>
                     <td className="px-2 truncate max-w-xs whitespace-nowrap text-sm font-medium text-gray-700 dark:text-neutral-200 border-b border-gray-300 dark:border-neutral-600">{card.title}</td>
                     <td className="px-2 truncate max-w-xs whitespace-nowrap text-sm font-medium text-gray-700 dark:text-neutral-200 border-b border-gray-300 dark:border-neutral-600">{card.description}</td>
                    
                     <td className="px-2 border-b border-gray-300 dark:border-neutral-600">
                       <div className="flex flex-col items-end gap-x-2 gap-y-0.5 m-3">
                       <Link href={route('instructions.show', card.id)}>
                            <button class="btn btn-xs bg-gray-500 text-white rounded-md text-xs">
                            <span class="icon-[tabler--eye]"></span>
                            </button>
                        </Link>
                       </div>
                     </td>
                   </tr>);
                 })}
               </tbody>
           </table>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
