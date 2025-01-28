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

            <div className="py-5">
            <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
    <div class="text-center mb-8">
      <h2 class="text-3xl font-semibold text-gray-800">Research Proposals Dashboard</h2>
      <p class="mt-2 text-gray-500">Manage and track the status of research proposals.</p>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      
      <div class="bg-white p-6 shadow-lg rounded-lg border-l-4 border-blue-500">
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

      <div class="bg-white p-6 shadow-lg rounded-lg border-l-4 border-green-500">
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

      <div class="bg-white p-6 shadow-lg rounded-lg border-l-4 border-red-500">
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

      <div class="bg-white p-6 shadow-lg rounded-lg border-l-4 border-yellow-500">
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
      
      <div class="bg-white p-6 shadow-lg rounded-lg">
        <h3 class="text-xl font-semibold text-gray-800">Proposal 1: Climate Research</h3>
        <div class="mt-2">
          <p class="text-gray-500">Status: <span class="font-medium text-green-500">Approved</span></p>
          <p class="mt-2 text-gray-500">Review Stage: <span class="font-medium text-yellow-500">Final Review</span></p>
          <p class="mt-2 text-gray-600">Submitted on: <span class="font-medium text-gray-800">2024-05-20</span></p>
        </div>
      </div>

      <div class="bg-white p-6 shadow-lg rounded-lg">
        <h3 class="text-xl font-semibold text-gray-800">Proposal 2: AI Research in Healthcare</h3>
        <div class="mt-2">
          <p class="text-gray-500">Status: <span class="font-medium text-red-500">Rejected</span></p>
          <p class="mt-2 text-gray-500">Review Stage: <span class="font-medium text-red-500">Rejected</span></p>
          <p class="mt-2 text-gray-600">Submitted on: <span class="font-medium text-gray-800">2024-06-15</span></p>
        </div>
      </div>

      <div class="bg-white p-6 shadow-lg rounded-lg">
        <h3 class="text-xl font-semibold text-gray-800">Proposal 3: Renewable Energy</h3>
        <div class="mt-2">
          <p class="text-gray-500">Status: <span class="font-medium text-yellow-500">Pending</span></p>
          <p class="mt-2 text-gray-500">Review Stage: <span class="font-medium text-yellow-500">Initial Review</span></p>
          <p class="mt-2 text-gray-600">Submitted on: <span class="font-medium text-gray-800">2024-07-10</span></p>
        </div>
      </div>

    </div>    
  </div>


  
            </div>
        </AuthenticatedLayout>
    );
}
