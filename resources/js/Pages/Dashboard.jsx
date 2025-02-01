import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css'; 

export default function Dashboard() {

    const notyf = new Notyf();
    

    return (
        <AuthenticatedLayout
            header={
                <div class='flex text-white'>
                 <h2 className="text-xl text-white font-extrabold leading-none tracking-tight">
                    Dashboard
                </h2>

                <div class="navbar-end w-full">
                    <div class="breadcrumbs">
                    <ul>
   
    
                    </ul>
                    </div>
                    </div>
                </div>
            }
        >
            <Head title="Dashboard" />

            <div className="py-2">
            <div class="max-w-7xl mx-auto py-2 px-4 sm:px-6 lg:px-8">
    <div class="text-center mb-8">
      <h2 class="text-3xl font-semibold text-gray-800">Research Proposals Dashboard</h2>
      <p class="mt-2 text-gray-500">Manage and track the status of research proposals.</p>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      
      <div class="bg-white p-6 text-xs shadow-lg rounded-lg border-l-4 border-blue-500">
        <div class="flex items-center">
          <svg class="h-8 w-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 0l2-2m-2 2l-2-2m-5 8h14a2 2 0 002-2v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2z"></path>
          </svg>
          <div class="ml-4">
            <h3 class="text-xl font-semibold text-gray-800">Pending Proposals</h3>
            <p class="text-gray-500">Proposals awaiting review and approval.</p>
          </div>
        </div>
        <div class="mt-4 text-center">
          <h4 class="text-3xl font-bold text-blue-600">12</h4>
          <p class="text-gray-500">Pending</p>
        </div>
      </div>

      <div class="bg-white p-6 text-xs shadow-lg rounded-lg border-l-4 border-green-500">
        <div class="flex items-center">
          <svg class="h-8 w-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
          </svg>
          <div class="ml-4">
            <h3 class="text-xl font-semibold text-gray-800">Approved Proposals</h3>
            <p class="text-gray-500">Proposals that have been approved.</p>
          </div>
        </div>
        <div class="mt-4 text-center">
          <h4 class="text-3xl font-bold text-green-600">25</h4>
          <p class="text-gray-500">Approved</p>
        </div>
      </div>

      <div class="bg-white p-6 text-xs shadow-lg rounded-lg border-l-4 border-red-500">
        <div class="flex items-center">
          <svg class="h-8 w-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 6L6 18M6 6l12 12"></path>
          </svg>
          <div class="ml-4">
            <h3 class="text-xl font-semibold text-gray-800">Rejected Proposals</h3>
            <p class="text-gray-500">Proposals that have been rejected.</p>
          </div>
        </div>
        <div class="mt-4 text-center">
          <h4 class="text-3xl font-bold text-red-600">5</h4>
          <p class="text-gray-500">Rejected</p>
        </div>
      </div>

      <div class="bg-white p-6 text-xs shadow-lg rounded-lg border-l-4 border-yellow-500">
        <div class="flex items-center">
          <svg class="h-8 w-8 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 2v20m-8-8h16"></path>
          </svg>
          <div class="ml-4">
            <h3 class="text-xl font-semibold text-gray-800">Ongoing Reviews</h3>
            <p class="text-gray-500">Proposals that are currently under review.</p>
          </div>
        </div>
        <div class="mt-4 text-center">
          <h4 class="text-3xl font-bold text-yellow-600">8</h4>
          <p class="text-gray-500">Ongoing</p>
        </div>
      </div>

    </div>

    <div class="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      
   

    </div>    
    
    {/* <main class="container mx-auto p-6 space-y-8">
           
            <section class="flex items-center justify-between mb-6">
                <div class="w-full max-w-xs">
                    <input type="text" id="search" placeholder="Search proposals..."
                        class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
            </section>

            <section>
              
                <div class="overflow-x-auto bg-white rounded-lg shadow-md">
                    <table class="min-w-full table-auto" id="proposals-table">
                        <thead class="bg-gray-200 text-sm text-gray-600">
                            <tr>
                                <th class="px-6 py-3 text-left">Proposal Title</th>
                                <th class="px-6 py-3 text-left">Submitted By</th>
                                <th class="px-6 py-3 text-left">Status</th>
                                <th class="px-6 py-3 text-left">Submission Date</th>
                            </tr>
                        </thead>
                        <tbody id="table-body">
                            <tr class="border-b proposal-row">
                                <td class="px-6 py-4 text-sm font-medium text-gray-800">AI for Healthcare</td>
                                <td class="px-6 py-4 text-sm text-gray-600">Dr. Jane Doe</td>
                                <td class="px-6 py-4 text-sm text-gray-600">
                                    <span class="bg-green-100 text-green-800 px-2 py-1 rounded-md text-xs">Approved</span>
                                </td>
                                <td class="px-6 py-4 text-sm text-gray-600">2025-01-15</td>
                               
                            </tr>

                            <tr class="border-b proposal-row">
                                <td class="px-6 py-4 text-sm font-medium text-gray-800">Quantum Computing for Finance</td>
                                <td class="px-6 py-4 text-sm text-gray-600">Dr. John Smith</td>
                                <td class="px-6 py-4 text-sm text-gray-600">
                                    <span class="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-md text-xs">Pending</span>
                                </td>
                                <td class="px-6 py-4 text-sm text-gray-600">2025-01-20</td>
                               
                            </tr>

                            <tr class="border-b proposal-row">
                                <td class="px-6 py-4 text-sm font-medium text-gray-800">Blockchain for Supply Chain</td>
                                <td class="px-6 py-4 text-sm text-gray-600">Dr. Alice Cooper</td>
                                <td class="px-6 py-4 text-sm text-gray-600">
                                    <span class="bg-red-100 text-red-800 px-2 py-1 rounded-md text-xs">Rejected</span>
                                </td>
                                <td class="px-6 py-4 text-sm text-gray-600">2025-02-05</td>
                                
                            </tr>
                        </tbody>
                    </table>
                  
                </div>
                <div class="flex justify-between items-center mt-4 p-3">
        <button class="px-4 py-2 bg-blue-500 text-white rounded-lg">Previous</button>
        <span class="text-sm text-gray-600">Page 1 of 5</span>
        <button class="px-4 py-2 bg-blue-500 text-white rounded-lg">Next</button>
    </div>
            </section>
        </main> */}
  </div>


  
            </div>
        </AuthenticatedLayout>
    );
}
