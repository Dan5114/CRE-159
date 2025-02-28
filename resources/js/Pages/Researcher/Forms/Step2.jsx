import React from 'react'
import { Link, useForm, usePage, router } from '@inertiajs/react';
import { useRef, useState } from 'react';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime);
import localizedFormat from "dayjs/plugin/localizedFormat";
dayjs.extend(localizedFormat);


export default function Step2({user, research, panels, user_panels}) {
    const notyf = new Notyf();
    const { data, setData, post,  delete: destroy, errors, reset, processing, progress, recentlySuccessful } =
    useForm({
      research_id : research.id,
      meeting_date: "",
      meeting_id: research.meeting.id,
      steps: "4"
    });


    const submitPanels = (e) => {
        e.preventDefault();
        post(route('researcher.submit.panels'), {
          preserveScroll: true,
          onSuccess: (page) =>  {
            notyf.success(page.props.flash.message);
          },
          onFinish: () =>  {
              console.log("Finishing inserting panels");
              reset();
          },
        });
      }

    const scheduledMeeting = () => {
    post(route('researcher.scheduled.meeting'), {
        onSuccess: (page) =>  {
        notyf.success(page.props.flash.message);
        },
        onFinish: () =>  {
            console.log("Finishing update status");
        },
    });
    }

    const saveMeeting = () => {
      post(route('researcher.save.meeting'), {
          onSuccess: (page) =>  {
          notyf.success(page.props.flash.message);
          },
          onFinish: () =>  {
              console.log("Finishing update status");
          },
      });
      }

  return (
    <>
    
    {
        (user.user_type == "cre") ? 
        <div id="account-details-validation" class="space-y-5" data-stepper-content-item='{ "index": 2 }'>

<div class="px-4 sm:px-0 mb-6">
          <h3 class="text-2xl font-semibold text-base-content">Assigning Researcher Schedule & Panels </h3>
          <p class="mt-1 max-w-full text-base-content/80">Please fill up the fields </p>
        </div>

        <nav class="tabs tabs-lifted mt-3 p-2" aria-label="Tabs" role="tablist" aria-orientation="horizontal">
  <button type="button" class="tab active-tab:tab-active active" id="tabs-lifted-item-11" data-tab="#tabs-lifted-11" aria-controls="tabs-lifted-11" role="tab" aria-selected="true">
    Assigning
  </button>
  <button type="button" class="tab active-tab:tab-active" id="tabs-lifted-item-22" data-tab="#tabs-lifted-22" aria-controls="tabs-lifted-22" role="tab" aria-selected="false">
    Panels
  </button>
</nav>

<div class="mt-3">
  <div id="tabs-lifted-11" role="tabpanel" aria-labelledby="tabs-lifted-item-11">
   
 

    

<div class="">
  <div class="border shadow p-3">
  <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
    <div>
        <label class="label label-text" for="firstName">Meeting Date </label>
        <input type="date" placeholder="" onChange={(e) => setData('meeting_date', e.target.value)} class="input" id="firstName" />
      </div>

      <div class="flex justify-end gap-y-2 mt-6">
        <button type="submit" class="btn btn-info rounded-full" onClick={() => saveMeeting()}>
           Save Meeting
      </button>
    </div>
    </div>
    <br/>
<div class="divider"></div>
    <div class="mt-3">

<form onSubmit={submitPanels}>
    <div class="grid grid-cols-3 gap-6 md:grid-cols-3 mb-6">

<div>
  <label class="label label-text" for="">Panel </label>
  <select      data-select='{
    "placeholder": "Select your Panel",
    "toggleTag": "<button type=\"button\" aria-expanded=\"false\"></button>",
    "toggleClasses": "rounded-md advance-select-toggle",
    "hasSearch": true,
    "dropdownClasses": "advance-select-menu max-h-52 pt-0 vertical-scrollbar rounded-scrollbar",
    "optionClasses": "advance-select-option selected:active",
    "optionTemplate": "<div class=\"flex justify-between items-center w-full\"><span data-title></span><span class=\"icon-[tabler--check] flex-shrink-0 size-4 text-primary hidden selected:block \"></span></div>",
    "extraMarkup": "<span class=\"icon-[tabler--caret-up-down] flex-shrink-0 size-4 text-base-content/90 absolute top-1/2 end-3 -translate-y-1/2 \"></span>"
    }'
    class="hidden" id="favorite-simpson" onChange={(e) => setData('panels', e.target.value)}>
                          <option value="">Please Choose:</option>
                          { user_panels.map((user_panel, index) => (
                             <option key={index} value={user_panel.id}>{user_panel.name}</option>
                          ))}
                       </select>
</div>

<div>
  <label class="label label-text" for="">Role </label>
  <div class="w-96">
  <select class="select" id="favorite-simpson" onChange={(e) => setData('role', e.target.value)}>
    <option value="">Please Choose:</option>
    <option value="lead">Lead</option>
    <option value="member">Member</option>
  </select>
</div>
</div>

<div class="flex justify-end gap-y-2 mt-6">
        <button type="submit" class="btn btn-primary rounded-full">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="#fff" fill-rule="evenodd" clip-rule="evenodd"><path d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12m10-8a8 8 0 1 0 0 16a8 8 0 0 0 0-16"/><path d="M13 7a1 1 0 1 0-2 0v4H7a1 1 0 1 0 0 2h4v4a1 1 0 1 0 2 0v-4h4a1 1 0 1 0 0-2h-4z"/></g></svg>
      </button>
    </div>

</div>
</form>
<label class="text-base-content bg-gray-300  flex justify-left p-2 text-lg font-semibold" for="firstName"> List of Panel Members </label>  
<table class="w-full divide-y divide-gray-200 dark:divide-neutral-700 border border-gray-300 dark:border-neutral-700 rounded-sm">
  <thead class="bg-gray-100 dark:bg-neutral-700">
    <tr>
      <th scope="col" class="px-2 py-2 text-start text-xs font-bold uppercase dark:text-neutral-500 border-b border-gray-300 dark:border-neutral-600">Panel</th>
      <th scope="col" class="px-2 py-2 text-start text-xs font-bold uppercase dark:text-neutral-500 border-b border-gray-300 dark:border-neutral-600">Email</th>
      <th scope="col" class="px-2 py-2 text-start text-xs font-bold uppercase dark:text-neutral-500 border-b border-gray-300 dark:border-neutral-600">Role</th>
      <th scope="col" class="px-2 py-2 text-start text-xs font-bold uppercase dark:text-neutral-500 border-b border-gray-300 dark:border-neutral-600"></th>
    </tr>
  </thead>
  <tbody>
    {panels.map((panel, index) => (
      <tr key={index} class="hover:bg-gray-100 dark:hover:bg-neutral-800">
        <td class="px-2 py-2 text-sm font-medium text-gray-700 dark:text-neutral-200 border-b border-gray-200 dark:border-neutral-600">
          <div class="flex items-center space-x-2">
            <img src="https://cdn.flyonui.com/fy-assets/avatar/avatar-1.png" alt="User Image" class="w-8 h-8 rounded-full" />
            <span>{panel.user_profile.name}</span>
          </div>
        </td>
        <td class="px-2 py-2 text-xs font-medium text-gray-700 dark:text-neutral-200 border-b border-gray-200 dark:border-neutral-600">
          {panel.user_profile.email}
        </td>
        <td class="px-2 py-2 text-xs font-medium text-gray-700 dark:text-neutral-200 border-b border-gray-200 dark:border-neutral-600">
          {panel.role.toUpperCase()}
        </td>
        <td class="px-2 py-2 border-b border-gray-200 dark:border-neutral-600"></td>
      </tr>
    ))}
  </tbody>
</table>

  </div>
  </div>
</div>



 
  </div>
  <div id="tabs-lifted-22" class="hidden" role="tabpanel" aria-labelledby="tabs-lifted-item-22">
  <div class="">
    {/* <div class="p-3 shadow flex items-start">
      <span class="icon-[tabler--calendar] size-6"></span>
      <div class="flex flex-col gap-1">
        <h5 class="text-lg font-semibold">&nbsp;Meeting Date</h5>
        <ul class="mt-1.5 list-inside list-disc">
          <li>{ (research.meeting.meeting_date) ? dayjs(research.meeting.meeting_date).format("LLLL") : "No date added yet"}</li>
        </ul>
      </div>
    </div> */}

    
        <div class="bg-base-100 border text-base-content">
        <label class="text-base-content bg-gray-300  flex justify-left p-2 text-lg font-semibold" for="firstName"> List of Panel Members </label>
        <table class="w-full divide-y divide-gray-200 dark:divide-neutral-700 border border-gray-300 dark:border-neutral-700 rounded-sm">
  <thead class="bg-gray-100 dark:bg-neutral-700">
    <tr>
      <th scope="col" class="px-2 py-2 text-start text-xs font-bold uppercase dark:text-neutral-500 border-b border-gray-300 dark:border-neutral-600">Panel</th>
      <th scope="col" class="px-2 py-2 text-start text-xs font-bold uppercase dark:text-neutral-500 border-b border-gray-300 dark:border-neutral-600">Role</th>
      <th scope="col" class="px-2 py-2 text-start text-xs font-bold uppercase dark:text-neutral-500 border-b border-gray-300 dark:border-neutral-600">Status</th>
      <th scope="col" class="px-2 py-2 text-start text-xs font-bold uppercase dark:text-neutral-500 border-b border-gray-300 dark:border-neutral-600">Endorsement Date</th>
      <th scope="col" class="px-2 py-2 text-start text-xs font-bold uppercase dark:text-neutral-500 border-b border-gray-300 dark:border-neutral-600"></th>
    </tr>
  </thead>

  <tbody>
    {panels.map((panel, index) => (
      <tr key={index} class="hover:bg-gray-100 dark:hover:bg-neutral-800">
        <td class="px-2 py-2 text-sm font-medium text-gray-700 dark:text-neutral-200 border-b border-gray-200 dark:border-neutral-600">
          <div class="flex items-center space-x-2">
            <img src="https://cdn.flyonui.com/fy-assets/avatar/avatar-1.png" alt="User Image" class="w-8 h-8 rounded-full" />
            <span>{panel.user_profile.name}</span>
          </div>
        </td>
        <td class="px-2 py-2 text-xs font-medium text-gray-700 dark:text-neutral-200 border-b border-gray-200 dark:border-neutral-600">
          {panel.role.toUpperCase()}
        </td>
        <td class="px-2 py-2 text-xs font-medium text-gray-700 dark:text-neutral-200 border-b border-gray-200 dark:border-neutral-600">
          {panel.endorsement_status === "yes" ? (
            <span class="text-gray-500 text-xs"><span class="size=6 icon-[tabler--checks] text-success align-bottom"></span> ENDORSED</span>
          ) : (
            <>---</>
          )}
        </td>
        <td class="px-2 py-2 text-sm text-gray-700 dark:text-neutral-200 border-b border-gray-200 dark:border-neutral-600">
          {panel.endorsement_status === "yes" ? dayjs(panel.updated_at).format("LLL") : <>---</>}
        </td>
        <td class="px-2 py-2 border-b border-gray-200 dark:border-neutral-600">
          <div class="flex flex-col items-end gap-x-2 gap-y-0.5">
            {/* Add buttons or actions here if needed */}
          </div>
        </td>
      </tr>
    ))}
  </tbody>
</table>

            

            </div>


            {panels.length === 0 ? (
                   <>
                     <div class="bg-white p-6 shadow-lg rounded-lg border border-gray-200">
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
                         <div class="gap-y-2 mt-6">

{
  (research.meeting.status == "Success") ?
  <>
 <div class="bg-green-50 border-l-4 border-green-500 p-6 shadow-md rounded-lg">
<div class="flex items-start">
<div class="flex-shrink-0">
<svg class="h-6 w-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"></path>
</svg>
</div>
<div class="ml-4">
<h3 class="text-xl font-semibold text-gray-800">Meeting Scheduled</h3>
<p class="mt-2 text-gray-600">Your meeting has been successfully scheduled. <span class="text-lg font-bold">   <span class="icon-[tabler--calendar] size-6"></span> { (research.meeting.meeting_date) ? dayjs(research.meeting.meeting_date).format("LLLL") : "No date added yet"}</span> . Please check your calendar for the details.</p>
<p class="mt-2 text-gray-500">
<strong class="text-green-700">Next Steps:</strong> Review the meeting details and prepare for the scheduled time.
</p>

</div>
</div>
</div>

  </>
  :
  <>
     
<button type="button" onClick={() => scheduledMeeting()} class="btn btn-success rounded-full">
Schedule Appointment
</button>
  </>
}
</div>
                   </>                       
                  }

      

  </div>
  </div>
</div>


      </div>
      :
      <>
       
        {
          (research.meeting.status == "Success") ?
          
         <>
      

        <div class="">
            <div class="">

<div class="mb-8">
      <h2 class="text-3xl font-semibold text-gray-800">Your Upcoming Meeting & Available Panels</h2>
      <p class="mt-2 text-gray-500">You have a scheduled meeting. Here are the details and panels you can access.</p>
    </div>

    <div class="bg-blue-50 border-l-4 border-blue-500 p-6 shadow-md rounded-lg">
        <div class="flex items-start">
          <div class="flex-shrink-0">
            <svg class="h-6 w-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c1.657 0 3 1.343 3 3s-1.343 3-3 3-3-1.343-3-3 1.343-3 3-3zm0 0V3m0 5v3M9 12c-1.657 0-3 1.343-3 3s1.343 3 3 3s3-1.343 3-3-1.343-3-3-3zM12 8c1.657 0 3 1.343 3 3s-1.343 3-3 3zM12 8h-3"></path>
            </svg>
          </div>
          <div class="ml-4">
            <h3 class="text-xl font-semibold text-gray-800">Meeting Scheduled</h3>
            <p class="mt-2 text-gray-600">You have a meeting scheduled with your team. Here are the details:</p>
            <p class="mt-2 text-gray-500">
              <strong class="text-blue-700">Date & Time:</strong> <span class="text-gray-800">{ dayjs(research.meeting.meeting_date).format("LLLL")}</span>
            </p>
            <div class="mt-4">
              <span class="inline-flex items-center px-3 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                Scheduled
              </span>
            </div>
           
          </div>
        </div>
      </div>

      <div class="mt-6">
              <p class="text-lg text-gray-700 font-semibold">Panel Members:</p>
              <ul class="list-disc pl-5 space-y-2 mt-2">

                { panels.map((panel, index) => (
                                    <>
                                       
                    <li class="flex items-center gap-2 px-4 py-2.5 border-t">
                    <img src="https://cdn.flyonui.com/fy-assets/avatar/avatar-1.png" alt="User Image" class="size-10 rounded-full" />
                    <div class="flex grow items-center justify-between gap-y-1">
                        <div class="user-info">
                        <h6 class="text-base">{panel.user_profile.name}</h6>
                        </div>
                        <div class="flex flex-col items-end gap-x-2 gap-y-0.5">
                        <a href="#"><span class="badge badge-xs badge-outline badge-accent">{panel.role}</span></a>
                        </div>
                    </div>
                    </li>
                    </>
                                    ))}

                </ul>
            </div>


         
            </div>
           
        </div>
         </>
          :
          <>

<div class="text-center mb-8">
      <h2 class="text-3xl font-semibold text-gray-800">No Meeting Scheduled Yet & Available Panels</h2>
      <p class="mt-2 text-gray-500">It looks like you haven't scheduled a meeting yet. Here are the panels you can access in the meantime.</p>
    </div>

    <div class="bg-yellow-50 border-l-4 border-yellow-500 p-6 shadow-md rounded-lg">
        <div class="flex items-start">
          <div class="flex-shrink-0">
            <svg class="h-6 w-6 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4v6h4V4H3zm0 6V4l7 7-7 7V10h6l5 5m3 3l-7-7M3 4l7 7 7-7M5 4h2v2H5z"></path>
            </svg>
          </div>
          <div class="ml-4">
            <h3 class="text-xl font-semibold text-gray-800">Meeting Not Scheduled Yet</h3>
            <p class="mt-2 text-gray-600">You haven’t scheduled a meeting yet. Please schedule a meeting at your earliest convenience.</p>
            <p class="mt-2 text-gray-500">
              <strong class="text-yellow-700">Action Needed:</strong> Waiting for CRE to the scheduling panel to set a time for your meeting.
            </p>
            <div class="mt-4">
              <span class="inline-flex items-center px-3 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">
                Pending
              </span>
            </div>
            
            
          </div>
        </div>
      </div>
          
          </>
        }
      </>
      }    </>
  )
}
