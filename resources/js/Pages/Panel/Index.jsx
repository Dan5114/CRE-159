import React from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router, useForm, usePage } from '@inertiajs/react';
import Pagination from "@/Components/Pagination";
import InputError from '@/Components/InputError';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime);
import localizedFormat from "dayjs/plugin/localizedFormat";
dayjs.extend(localizedFormat);

export default function Index(props) {
  const { data: techpanels } = props.techpanels_data;
  const totalRecords = props.techpanels_data ? props.techpanels_data.total : 0;
  const notyf = new Notyf();
 
   const { data, setData, post, delete: destroy, errors, reset, processing, progress, recentlySuccessful } =
    useForm({});

    const submitPanel = (e) => {
      e.preventDefault();

      post(route('panels.store'), {
          onSuccess: (page) =>  {
              reset();
              notyf.success(page.props.flash.message);
              router.visit(route('panels.index'), {
                preserveState: false,
                method: 'get',
            });
          },
          onFinish: () =>  {
            
          },
      });
  }

  const deletePanel = (id) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this panel?");
    if (isConfirmed) {
        destroy(route('panels.destroy', id), {
            preserveScroll: true,
            onSuccess: (page) => {
              notyf.success(page.props.flash.message)
              router.visit(route('panels.index'), {
                  preserveState: false,
                  method: 'get',
              });
            },
            onError: () => console.log("Error deleting"),
            onFinish: () =>  console.log("finish request")
        });
    } else {
        console.log("Deletion canceled");
    }
  };


  return (
       <AuthenticatedLayout
                header={
                    <div class='flex text-white'>
                     <h2 className="text-xl text-white font-extrabold leading-none tracking-tight">
                        Manage Faculty
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
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-3">

<div class="bg-white p-6 rounded-lg shadow-md">
<header class="mb-6">
<h2 className="text-xl font-semibold text-gray-700 mb-4">Faculty Information</h2>

                <p className="mt-1 text-sm text-gray-600">
                    Update your account's profile information and email address.
                </p>
            </header>
            <form onSubmit={submitPanel}>

              <div class="flex space-x-3">
              <div class="mb-4">
      <label for="name" class=" text-sm font-medium text-gray-600">First Name<span class="text-red-500">*</span></label>
      <input type="text" onChange={(e) => setData('first_name', e.target.value)} class="w-full mt-2 p-3 border rounded-md" placeholder="" />
     <InputError message={errors.first_name} className="mt-2" />
    </div>

    <div class="mb-4">
      <label for="name" class=" text-sm font-medium text-gray-600">Last Name<span class="text-red-500">*</span></label>
      <input type="text" onChange={(e) => setData('last_name', e.target.value)} class="w-full mt-2 p-3 border rounded-md" placeholder="" />
      <InputError message={errors.last_name} className="mt-2" />
    </div>
              </div>


    <div class="mb-4">
      <label for="email" class="block text-sm font-medium text-gray-600">Email Address<span class="text-red-500">*</span></label>
      <input type="email" id="email" onChange={(e) => setData('email', e.target.value)} class="w-full mt-2 p-3 border rounded-md" placeholder="" />
      <InputError message={errors.email} className="mt-2" />          
    </div>

    <div class="mb-4">
      <label for="phone" class="block text-sm font-medium text-gray-600">Password<span class="text-red-500">*</span></label>
      <input type="password" id="phone" onChange={(e) => setData('password', e.target.value)} class="w-full mt-2 p-3 border rounded-md" placeholder="" />
      <InputError message={errors.password} className="mt-2" />          
    </div>

    <button type="submit" class="btn btn-primary float-end rounded-md">Create Panel</button>
  </form>
</div>

<div className="md:col-span-2 rounded-lg">
  
  <div class="card p-2">
  <table className="min-w-full table-auto shadow-lg border border-gray-300 dark:border-neutral-700">

  <thead class="bg-gray-400 dark:bg-neutral-700">
  <tr class="bg-gray-800 text-white dark:bg-neutral-900">
  <th scope="col" class="px-4 py-3 text-left text-sm font-semibold uppercase">LAST NAME</th>
  <th scope="col" class="px-4 py-3 text-left text-sm font-semibold uppercase">FIRST NAME</th>
  <th scope="col" class="px-4 py-3 text-left text-sm font-semibold uppercase">EMAIL</th>
  <th scope="col" class="px-4 py-3 text-left text-sm font-semibold uppercase">CREATED AT</th>
  <th scope="col" class="px-4 py-3 w-24"></th>
</tr>

  </thead>
  <tbody>
    {techpanels.map((techpanel, index) => {
      const fullName = techpanel.name ?? "NA"; // Handle null values
      const [firstName, ...lastNameParts] = fullName.split(" ");
      const lastName = lastNameParts.length > 0 ? lastNameParts.join(" ") : "N/A"; // Handle cases with no last name

      return (
      <tr key={techpanel.id} className={index % 2 !== 0 ? "bg-gray-50 dark:bg-gray-800 dark:border-gray-700" : "bg-gray-200 dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-neutral-800"}>
        <td className="px-2 truncate max-w-xs whitespace-nowrap text-sm font-medium text-gray-700 dark:text-neutral-200 border-b border-gray-300 dark:border-neutral-600">{lastName}</td>
        <td className="px-2 truncate max-w-xs whitespace-nowrap text-sm font-medium text-gray-700 dark:text-neutral-200 border-b border-gray-300 dark:border-neutral-600">{firstName}</td>
        <td className="px-2 whitespace-nowrap text-sm font-medium text-gray-700 dark:text-neutral-200 border-b border-gray-300 dark:border-neutral-600">{techpanel.email}</td>
        <td className="px-2 whitespace-nowrap text-sm font-medium text-gray-700 dark:text-neutral-200 border-b border-gray-300 dark:border-neutral-600">{dayjs(techpanel.created_at).format("LLL")}</td>
        <td className="px-2 border-b border-gray-300 dark:border-neutral-600">
          <div className="flex flex-col items-end gap-x-2 gap-y-0.5 m-3">
            <span className="text-base-content/50 text-sm text-gray hover:cursor-pointer" onClick={() => deletePanel(techpanel.id)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                <path fill="none" stroke="#ff001a" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 7h16m-10 4v6m4-6v6M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2l1-12M9 7V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3" />
              </svg>
            </span>
          </div>
        </td>
      </tr>);
    })}
  </tbody>
  <tfoot>
    <tr className="bg-gray-100 dark:bg-neutral-800">
      <td colSpan="5" className="px-4 py-2 border-t text-left">
        <span className="text-sm text-gray-500">Total Records:</span>&nbsp;
        <span id="total-records" className="text-lg font-semibold text-blue-600">{totalRecords}</span>
      </td>
    </tr>
  </tfoot>
</table>

    {techpanels.length === 0 ? (
                        <>
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
                        </>               
                      )
                        :                               
                        <>
                        <Pagination data={props.techpanels_data} />   
                        <br/>         
                        </>            
                      }
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
