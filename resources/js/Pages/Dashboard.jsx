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
            <div class="max-w-7xl mx-auto py-2 px-2 sm:px-6 lg:px-8">
   
            <div class="p-6 bg-gray-100 min-h-screen">
  <div class="max-w-7xl mx-auto">
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
      
      <div class="space-y-6">
        <div class="bg-white shadow-lg rounded-lg p-6 flex flex-col justify-between">
          <h3 class="text-lg font-semibold text-gray-800 mb-4">Total Research Papers</h3>
          <div class="text-3xl font-bold text-gray-800">1,250</div>
          <div class="mt-4 flex items-center">
            <span class="text-sm text-green-500">+15%</span>
            <span class="ml-2 text-sm text-gray-500">Since last month</span>
          </div>
        </div>

        <div class="bg-white shadow-lg rounded-lg p-6 flex flex-col justify-between">
          <h3 class="text-lg font-semibold text-gray-800 mb-4">Average Citations</h3>
          <div class="text-3xl font-bold text-gray-800">35</div>
          <div class="mt-4 flex items-center">
            <span class="text-sm text-blue-500">+10%</span>
            <span class="ml-2 text-sm text-gray-500">Since last year</span>
          </div>
        </div>

        <div class="bg-white shadow-lg rounded-lg p-6 flex flex-col justify-between">
          <h3 class="text-lg font-semibold text-gray-800 mb-4">New Papers This Month</h3>
          <div class="text-3xl font-bold text-gray-800">45</div>
          <div class="mt-4 flex items-center">
            <span class="text-sm text-yellow-500">+5%</span>
            <span class="ml-2 text-sm text-gray-500">Compared to last month</span>
          </div>
        </div>
      </div>

      <div class="space-y-6">
        <div class="bg-white shadow-lg rounded-lg p-6">
          <h3 class="text-lg font-semibold text-gray-800 mb-4">Recent Research</h3>
          <ul class="space-y-2">
            <li class="p-2 bg-gray-50 rounded-md flex justify-between items-center">
              <span class="text-sm text-gray-600">Research Paper 1</span>
              <span class="text-sm text-gray-400">12/04/2025</span>
            </li>
            <li class="p-2 bg-gray-50 rounded-md flex justify-between items-center">
              <span class="text-sm text-gray-600">Research Paper 2</span>
              <span class="text-sm text-gray-400">11/23/2025</span>
            </li>
          </ul>
          <button class="text-blue-600 hover:underline text-sm mt-4">View More</button>
        </div>

      </div>
    </div>
  </div>
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
