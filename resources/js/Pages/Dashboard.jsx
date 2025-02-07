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

             
                </div>
            }
        >
            <Head title="Dashboard" />

            <div className="py-2">
            <div class="max-w-7xl mx-auto py-2 px-2 sm:px-6 lg:px-8">
   
            <div class="container mx-auto p-6">
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
    
    <div class="bg-white p-6 rounded-lg shadow-md">
      <h3 class="text-xl font-semibold text-gray-700">Proposal Overview</h3>
      <p class="text-gray-500 mt-2">Total Proposals: 12</p>
      <p class="text-gray-500 mt-2">Pending: 5</p>
      <p class="text-gray-500 mt-2">Approved: 7</p>
      <a href="#" class="text-blue-500 hover:text-blue-700 mt-4 block">View All Proposals</a>
    </div>

    <div class="bg-white p-6 rounded-lg shadow-md">
      <h3 class="text-xl font-semibold text-gray-700">Proposal Status</h3>
      <div class="mt-4">
        <div class="flex items-center justify-between">
          <p class="text-gray-600">Proposal 1</p>
          <span class="bg-yellow-400 text-white text-xs font-semibold px-3 py-1 rounded-full">In Progress</span>
        </div>
        <div class="flex items-center justify-between mt-2">
          <p class="text-gray-600">Proposal 2</p>
          <span class="bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded-full">Approved</span>
        </div>
        <div class="flex items-center justify-between mt-2">
          <p class="text-gray-600">Proposal 3</p>
          <span class="bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded-full">Rejected</span>
        </div>
      </div>
    </div>

    <div class="bg-white p-6 rounded-lg shadow-md">
      <h3 class="text-xl font-semibold text-gray-700">Upcoming Deadlines</h3>
      <ul class="mt-4">
        <li class="flex justify-between py-2 border-b">
          <p class="text-gray-600">Proposal 4 Submission</p>
          <span class="text-gray-500">Feb 14, 2025</span>
        </li>
        <li class="flex justify-between py-2 border-b">
          <p class="text-gray-600">Proposal 7 Review</p>
          <span class="text-gray-500">Feb 20, 2025</span>
        </li>
        <li class="flex justify-between py-2">
          <p class="text-gray-600">Proposal 12 Final Review</p>
          <span class="text-gray-500">Feb 28, 2025</span>
        </li>
      </ul>
    </div>

    <div class="bg-white p-6 rounded-lg shadow-md">
      <h3 class="text-xl font-semibold text-gray-700">Recent Activity</h3>
      <ul class="mt-4">
        <li class="flex justify-between py-2 border-b">
          <p class="text-gray-600">Proposal 1 updated</p>
          <span class="text-gray-500">Feb 7, 2025</span>
        </li>
        <li class="flex justify-between py-2 border-b">
          <p class="text-gray-600">Proposal 5 approved</p>
          <span class="text-gray-500">Feb 6, 2025</span>
        </li>
        <li class="flex justify-between py-2">
          <p class="text-gray-600">Proposal 8 submission confirmed</p>
          <span class="text-gray-500">Feb 5, 2025</span>
        </li>
      </ul>
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
