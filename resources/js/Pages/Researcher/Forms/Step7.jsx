import {React, useEffect} from 'react'
import { Link, useForm, usePage, router } from '@inertiajs/react';
import { useRef, useState } from 'react';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime);
import localizedFormat from "dayjs/plugin/localizedFormat";
dayjs.extend(localizedFormat);

export default function Step7({user, research}) {
    const notyf = new Notyf();
    const { data, setData, post, errors, reset, formState, processing, progress, recentlySuccessful } =
      useForm({
          research_id : research.id,
          approved_by: user.name,
          date_approved: "",
          remarks_approved: "Approved",
          remarks_disapproved: "Disapproved",
          steps: "7"
      });

    const approvedApplication = (e) => {
        e.preventDefault();
        post(route('urb.approved.application'), {
            onSuccess: (page) =>  {
                notyf.success(page.props.flash.message);
            },
            onFinish: () =>  {
                console.log("Finishing approving application");
                reset()
            },
        });
    }

    const DisapprovedApplication = () => {
        post(route('urb.disapproved.application'), {
            onSuccess: (page) =>  {
                notyf.success(page.props.flash.message);
            },
            onFinish: () =>  {
                console.log("Finishing approving application");
                reset()
            },
        });
      }

  return (
        <>
          {
            (user.user_type == "cre") ? 
            <>
            <div>
                <div class="card p-3">

                <div class="text-center mb-8">
      <h2 class="text-3xl font-semibold text-gray-800">URB Approval</h2>
      <p class="mt-2 text-gray-500">Please review the application and select whether it is approved or disapproved. Additionally, you can select a approval date for the next steps.</p>
    </div>

<div class="bg-blue-50 border-l-4 border-blue-500 p-6 shadow-md rounded-lg">
        <div class="flex items-start">
        
          <div class="flex-shrink-0">
            <svg class="h-6 w-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m6-6H6"></path>
            </svg>
          </div>
          <div class="ml-4">
            <h3 class="text-xl font-semibold text-gray-800">URB Approval Pending</h3>
            <p class="mt-2 text-gray-600">Your application is under review by the Urban Review Board (URB). Select the appropriate approval status and provide a follow-up date if necessary.</p>
            
            <form onSubmit={approvedApplication}>
            <div class="mt-6">
              <label for="followup-date" class="block text-sm font-medium text-gray-700">Approval Date</label>
              <input type="date" onChange={(e) => setData('date_approved', e.target.value)} id="followup-date" name="followup-date" class="mt-1 block w-60 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
            </div>

            <div class="mt-6 flex space-x-4">
              <button type="submit" class="inline-flex items-center btn btn-sm text-xs text-white bg-green-600 hover:bg-green-700 rounded-md shadow-md focus:outline-none">
                Approve
              </button>

              <button type="button" onClick={() => 
                DisapprovedApplication()
              } class="inline-flex items-center btn btn-sm text-xs text-white bg-red-600 hover:bg-red-700 rounded-md shadow-md focus:outline-none">
                Disapprove
              </button>
            </div>
            </form>

            <div class="mt-6">
              <p class="text-sm text-gray-700 font-semibold">Suggested Next Steps:</p>
              <ul class="list-disc pl-5 space-y-2 mt-2">
                <li class="text-gray-600">Wait for the URB to complete their review of your application.</li>
                <li class="text-gray-600">If approval or disapproval is needed, select the corresponding option above.</li>
                <li class="text-gray-600">Once the review is complete, further instructions will be provided based on the approval status.</li>
              </ul>
            </div>

          </div>
        </div>
      </div>
                    
                
                
                </div>
            </div>
            </>
            :
            <>
              <div class="card p-3">

              
<div class="text-center mb-8">
      <h2 class="text-3xl font-semibold text-gray-800">Waiting for URB Approval</h2>
      <p class="mt-2 text-gray-500">Your application has been submitted and is now waiting for the CRE (Committee for Review and Evaluation) to review it. Please be patient while the review process takes place.</p>
    </div>

    <div class="bg-yellow-50 border-l-4 border-yellow-500 p-6 shadow-md rounded-lg">
        <div class="flex items-start">
          <div class="flex-shrink-0">
            <svg class="h-6 w-6 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c1.657 0 3 1.343 3 3s-1.343 3-3 3-3-1.343-3-3 1.343-3 3-3zm0 0V3m0 5v3M9 12c-1.657 0-3 1.343-3 3s1.343 3 3 3s3-1.343 3-3-1.343-3-3-3zM12 8c1.657 0 3 1.343 3 3s-1.343 3-3 3zM12 8h-3"></path>
            </svg>
          </div>
          <div class="ml-4">
            <h3 class="text-xl font-semibold text-gray-800">Waiting for CRE Review</h3>
            <p class="mt-2 text-gray-600">Your application is currently under review by the CRE (Committee for Review and Evaluation). We appreciate your patience as this process may take some time.</p>
            <p class="mt-2 text-gray-500">
              <strong class="text-yellow-700">Action Needed:</strong> Please wait while the CRE reviews your application. You will be notified once the review is complete.
            </p>
            <div class="mt-4">
              <span class="inline-flex items-center px-3 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">
                Pending Review
              </span>
            </div>

            <div class="mt-6">
              <p class="text-sm text-gray-700 font-semibold">Next Steps:</p>
              <ul class="list-disc pl-5 space-y-2 mt-2">
                <li class="text-gray-600">Await feedback or results from the CRE review process.</li>
                <li class="text-gray-600">If there is no update within the given time frame, you may follow up with the CRE team.</li>
                <li class="text-gray-600">Once the review is completed, you will be notified with next steps or further instructions.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
  


              </div>
            </>
    
         }
        </>
  )
}
