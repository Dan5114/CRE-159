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


export default function Step2({user, research, panels}) {
    const notyf = new Notyf();
    const { data, setData, post,  delete: destroy, errors, reset, processing, progress, recentlySuccessful } =
    useForm({
      research_id : research.id,
      meeting_date: "",
      panels1: "",
      leadPanel1: false,
      panels2: "",
      panels3: "",
      panels4: "",
      panels5: "",
      panels6: "",
      panels7: "",
      panels8: "",
      meeting_id: research.meeting.id,
    });


    const submitPanels = (e) => {
        e.preventDefault();
        post(route('researcher.submit.panels'), {
          preserveScroll: true,
          onSuccess: (page) =>  {
            notyf.success(page.props.flash.message);
            // router.get(route('researcher.show', research.reference));
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

    const deletePanel = (id) => {
      destroy(route('researcher.delete.panel', id), {
        preserveScroll: true,
        onSuccess: (page) =>  notyf.success(page.props.flash.message),
        onError: () => console.log("Error deleting"),
        onFinish: () => reset(),
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
   
 <form onSubmit={submitPanels}>

    

<div class="">
  <div class="border shadow p-3">
  <div class="grid grid-cols-1 gap-6 md:grid-cols-2">

    <div>
        <label class="label label-text" for="firstName">Meeting Date </label>
        <input type="date" placeholder="" onChange={(e) => setData('meeting_date', e.target.value)} class="input" id="firstName" />
      </div>
    </div>
    <br/>

    <div class="grid grid-cols-2 gap-6 md:grid-cols-2">
    <div>
        <label class="label label-text" for="firstName">Panel Member 1 </label>
        <input type="text" placeholder="" class="input" onChange={(e) => setData('panels1', e.target.value )} id="firstName"  />
        <div class="flex items-center">
<input type="checkbox" class="checkbox checkbox-primary checkbox-xs" onChange={(e) => setData('leadPanel1', e.target.checked )} id="checkboxExtraSmall" />
<label class="label label-text text-xs" for="checkboxExtraSmall"> Lead Panel </label>
</div>
      </div>
      <div>
        <label class="label label-text" for="firstName">Panel Member 2 </label>
        <input type="text" placeholder="" class="input" onChange={(e) => setData('panels2', e.target.value)} id="firstName"  />
      </div>
     
    </div>
    <div class="grid grid-cols-2 gap-6 md:grid-cols-2 mt-3">
    <div>
        <label class="label label-text" for="firstName">Panel Member 3 </label>
        <input type="text" placeholder="" class="input" onChange={(e) => setData('panels3', e.target.value)} id="firstName"  />
      </div>

      <div>
        <label class="label label-text" for="firstName">Panel Member 4 </label>
        <input type="text" placeholder="" class="input" id="firstName" onChange={(e) => setData('panels4', e.target.value)}  />
      </div>

      <div>
        <label class="label label-text" for="firstName">Panel Member 5 </label>
        <input type="text" placeholder="" class="input" id="firstName" onChange={(e) => setData('panels5', e.target.value)}  />
      </div>

      <div>
        <label class="label label-text" for="firstName">Panel Member 6 </label>
        <input type="text" placeholder="" class="input" id="firstName" onChange={(e) => setData('panels6', e.target.value)}  />
      </div>

      <div>
        <label class="label label-text" for="firstName">Panel Member 7 </label>
        <input type="text" placeholder="" class="input" id="firstName" onChange={(e) => setData('panels7', e.target.value)}  />
      </div>

      <div>
        <label class="label label-text" for="firstName">Panel Member 8 </label>
        <input type="text" placeholder="" class="input" id="firstName" onChange={(e) => setData('panels8', e.target.value)}  />
      </div>

    
   
      </div>
      <div class="flex justify-end gap-y-2 mt-6">
    <button type="submit" class="btn btn-info rounded-full">
        Save Draft
   </button>
    </div>
  </div>
</div>



 
    </form>
  </div>
  <div id="tabs-lifted-22" class="hidden" role="tabpanel" aria-labelledby="tabs-lifted-item-22">
  <div class="">
    <div class="p-3 shadow flex items-start">
      <span class="icon-[tabler--calendar] size-6"></span>
      <div class="flex flex-col gap-1">
        <h5 class="text-lg font-semibold">&nbsp;Meeting Date</h5>
        <ul class="mt-1.5 list-inside list-disc">
          <li>{ (research.meeting.meeting_date) ? dayjs(research.meeting.meeting_date).format("LLLL") : "No date added yet"}</li>
        </ul>
      </div>
    </div>

    
        <div class="bg-base-100 border text-base-content">
        <label class="text-base-content bg-gray-300  flex justify-center p-1 text-lg font-semibold" for="firstName"> List of Panel Members </label>
            <ul class="space-y-0.5">

            { panels.map((panel, index) => (
                                <>
                                   
                               
                <li class="flex items-center gap-2 px-4 py-2.5 border-t">
                <img src="https://cdn.flyonui.com/fy-assets/avatar/avatar-1.png" alt="User Image" class="size-10 rounded-full" />
                <div class="flex grow items-center justify-between gap-y-1">
                    <div class="user-info">
                    <h6 class="text-base">{panel.name}</h6>
                    <a href="#"><span class="badge badge-xs badge-outline badge-accent">{panel.role}</span></a>
                    
                    </div>
                    <div class="flex flex-col items-end gap-x-2 gap-y-0.5">
                    <span class="text-base-content/50 text-sm text-gray hover:cursor-pointer" onClick={() => deletePanel(panel.id)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="none" stroke="#ff001a" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7h16m-10 4v6m4-6v6M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2l1-12M9 7V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3"/></svg>
                    </span>
                    </div>
                </div>
                </li>
                </>
                                ))}

            </ul>
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
                   <></>                       
                  }
            </div>

            <div class="flex justify-end gap-y-2 mt-6">
   
    <button type="button" onClick={() => scheduledMeeting()} class="btn btn-success rounded-full">
        Schedule Appointment
   </button>
    </div>

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
                        <h6 class="text-base">{panel.name}</h6>
                        <small class="text-base-content/80 text-xs">Technical Panel</small>
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
