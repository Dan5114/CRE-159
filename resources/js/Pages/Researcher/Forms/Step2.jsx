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
    const { data, setData, post, errors, reset, processing, progress, recentlySuccessful } =
    useForm({
      research_id : research.id,
      meeting_date: "",
      panels1: "",
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
          onSuccess: (page) =>  {
            notyf.success(page.props.flash.message);
            router.get(route('researcher.show', research.reference));
          },
          onFinish: () =>  {
              console.log("Finishing inserting panels");
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


  return (
    <>
    
    {
        (user.user_type == "cre") ? 
        <div id="account-details-validation" class="space-y-5" data-stepper-content-item='{ "index": 2 }'>

<div class="px-4 sm:px-0 mb-6">
          <h3 class="text-2xl font-semibold text-base-content">Assigning Researcher Schedule & Panels </h3>
          <p class="mt-1 max-w-full text-base-content/80">Please fill up the fields </p>
        </div>

 <form onSubmit={submitPanels}>

    <h4 class="text-2xl font-eight-bold">Schedule</h4>
      <div class="grid grid-cols-1 gap-6 md:grid-cols-2 mb-3">
        <div>
            <label class="label label-text" for="firstName">Meeting Date </label>
            <input type="date" placeholder="" onChange={(e) => setData('meeting_date', e.target.value)} class="input" id="firstName" />
          </div>
        </div>
        <br/>
        <h4 class="text-2xl font-eight-bold">List of Panel Members</h4>
        <div class="grid grid-cols-2 gap-6 md:grid-cols-2">
        <div>
            <label class="label label-text" for="firstName">Panel Member 1 </label>
            <input type="text" placeholder="" class="input" onChange={(e) => setData('panels1', e.target.value )} id="firstName"  />
          </div>
          <div>
            <label class="label label-text" for="firstName">Panel Member 2 </label>
            <input type="text" placeholder="" class="input" onChange={(e) => setData('panels2', e.target.value)} id="firstName"  />
          </div>
         
        </div>
        <div class="grid grid-cols-2 gap-6 md:grid-cols-2">
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
        <div class="flex justify-end gap-y-2 mt-3">
        <button type="submit" class="btn btn-info rounded-full">
            Save Draft
       </button>
       &nbsp;
        <button type="button" onClick={() => scheduledMeeting()} class="btn btn-success rounded-full">
            Schedule Appointment
       </button>
        </div>
        </form>
      </div>
      :
      <>
       
        {
          (research.meeting.status == "Success") ?
          
         <>
         <div class="px-4 sm:px-0 mb-6">
          <h3 class="text-2xl font-semibold text-base-content">Researcher Schedule & Panels </h3>
          {/* <p class="mt-1 max-w-full text-base-content/80">The requirements for application for research funding under the FRP as follows: </p> */}
        </div>

        <div class="">
            <div class="">
            {/* <label class="text-base-content text-lg font-semibold" for="firstName"> Meeting Date </label>
            <div>{ dayjs(research.meeting.meeting_date).format("LLL")}</div> */}
            <div class="alert alert-soft alert-primary flex items-start mb-6">
  <span class="icon-[tabler--calendar] size-6"></span>
  <div class="flex flex-col gap-1">
    <h5 class="text-lg font-semibold">Meeting Date</h5>
    <ul class="mt-1.5 list-inside list-disc">
      <li>{ dayjs(research.meeting.meeting_date).format("LLL")}</li>
    </ul>
  </div>
</div>

<label class="text-base-content p-2 m-3 text-lg font-semibold mt-3" for="firstName"> List of Panel Members </label>
            <div class="bg-base-100 text-base-content mt-3">
                <ul class="space-y-0.5">

                { panels.map((panel, index) => (
                                    <>
                                       
                                   
                    <li class="flex items-center gap-2 px-4 py-2.5 border-t">
                    <img src="https://cdn.flyonui.com/fy-assets/avatar/avatar-1.png" alt="User Image" class="size-10 rounded-full" />
                    <div class="flex grow items-center justify-between gap-y-1">
                        <div class="user-info">
                        <h6 class="text-base">{panel.name}</h6>
                        <small class="text-base-content/80 text-xs">{panel.name}@usls.edu.ph</small>
                        </div>
                        <div class="flex flex-col items-end gap-x-2 gap-y-0.5">
                        <span class="text-base-content/50 text-sm text-gray">Panel</span>
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
          <div class="alert alert-soft alert-warning flex items-start gap-4">
  <span class="icon-[tabler--info-circle] size-6"></span>
  <div class="flex flex-col gap-1">
    <h5 class="text-lg font-semibold">Attention! </h5>
    <p>No schedule provided yet from CRE.
    </p>
  </div>
</div>
          </>
        }
      </>
      }    </>
  )
}
