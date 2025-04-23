import {React, useEffect} from 'react'
import { Link, useForm, usePage, router } from '@inertiajs/react';
import { useRef, useState } from 'react';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime);
import localizedFormat from "dayjs/plugin/localizedFormat";
import ProgressExtensionModal from '../SubForms/ProgressExtensionModal';
dayjs.extend(localizedFormat);
import FeedbackStep9 from '../Feedback/FeedbackStep9';

export default function Step9({user, research, progress_report, feedbacks_step9, feedbacks_step9_notif}) {
    const notyf = new Notyf();
    const [state, setState] = useState([]);
    const { data, setData, post,  delete: destroy, patch, errors, reset, formState, processing, progress, recentlySuccessful } =
    useForm({
        research_id : research.id,
        date_scheduled: "",
        date_due: "",
        steps: "9",
        document_file: "",
        type: ""
    });

    useEffect(() => {
        setData("id", state)
      }, [data.type, data.document_file]);

    const submitFiles = (e) => {
        e.preventDefault();
        post(route('cre.progress.report.date'), {
            onSuccess: (page) =>  {
                notyf.success(page.props.flash.message);
            },
            onFinish: () =>  {
                console.log("Finishing scheduling progress date");
                reset()
            },
        });
    }

    const submitFiles2 = () => {
        post(route('researcher.progress.report.files'), {
            onSuccess: (page) =>  {
                notyf.success(page.props.flash.message);
            },
            onFinish: () =>  {
                console.log("Finishing scheduling progress date");
                reset()
            },
        });
    }

    const researchExtensionDate = (e) => {
      e.preventDefault();
      patch(route('researcher.extension.date',research.id), {
        preserveScroll: true,
          onSuccess: (page) =>  {
              notyf.success(page.props.flash.message);
          },
          onFinish: () =>  {
              console.log("Finishing updating extension date");
              reset()
          },
      });
  }

    const downloadFile = (file) => {
      fetch(route('researcher.file.download', file.id))
       .then((response) => response.blob())
       .then((blob) => {
         const url = window.URL.createObjectURL(new Blob([blob]));
         const link = document.createElement("a");
         link.href = url;
         link.download = file.file_name || "downloaded-file";
         document.body.appendChild(link);
 
         link.click();
 
         document.body.removeChild(link);
         window.URL.revokeObjectURL(url);
       })
       .catch((error) => {
         console.error("Error fetching the file:", error);
       });
  }

  const acceptProgressReport = (id) => {
    patch(route('accept.progress.report', id), {
        preserveScroll: true,
        onSuccess: (page) => {
          notyf.success(page.props.flash.message);
        },
    });
  };


  return (
    <>

<nav class="tabs tabs-lifted mt-3 p-2" aria-label="Tabs" role="tablist" aria-orientation="horizontal">
  <button type="button" class="tab active-tab:tab-active active" id="tabs-progress-item-1" data-tab="#tabs-progress-1" aria-controls="tabs-lifted-1" role="tab" aria-selected="true">
    Progress Report
  </button>
  <button type="button" onClick={() => {
    if (user.user_type === "researcher") {
      markAsRead(research.id);
    } else {
      console.log("You do not have permission to perform this action.");
    }
  }} class="tab active-tab:tab-active" id="tabs-progress-item-2" data-tab="#tabs-progress-2" aria-controls="tabs-progress-2" role="tab" aria-selected="false">
    Feedback
    {
      (feedbacks_step9_notif == 0) ? 
      ""
      :
      <span class="badge bg-[#FF0000] text-white badge-sm ms-2 rounded-full">+{feedbacks_step9_notif}</span>
    }
    
  </button>
</nav>


<div class="">
  <div id="tabs-progress-1" role="tabpanel" aria-labelledby="tabs-progress-item-1">
  {
        (user.user_type == "cre") ? 
        <>
                <div>
          
          <div class="card p-3">

            <div class="bg-green-50 border-l-4 border-green-500 p-4 shadow-md rounded-lg mb-3">
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
    
    {/* Form Section */}
    <div class="flex items-start">
      {/* Icon */}
      <div class="flex-shrink-0">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 20 20">
          <g fill="gray" fill-rule="evenodd" clip-rule="evenodd">
            <path d="M5.75 11.5a.75.75 0 0 1 .75-.75h7a.75.75 0 0 1 0 1.5h-7a.75.75 0 0 1-.75-.75m0 3a.75.75 0 0 1 .75-.75h7a.75.75 0 0 1 0 1.5h-7a.75.75 0 0 1-.75-.75"/>
            <path d="M2.5 2.5c0-1.102.898-2 2-2h6.69c.562 0 1.092.238 1.465.631l.006.007l4.312 4.702c.359.383.527.884.527 1.36v10.3c0 1.102-.898 2-2 2h-11c-1.102 0-2-.898-2-2zm8.689 0H4.5v15h11V7.192l-4.296-4.685l-.003-.001z"/>
            <path d="M11.19.5a1 1 0 0 1 1 1v4.7h4.31a1 1 0 1 1 0 2h-5.31a1 1 0 0 1-1-1V1.5a1 1 0 0 1 1-1"/>
          </g>
        </svg>
      </div>

      {/* Form */}
      <div class="ml-3 w-full">
        <h3 class="text-lg font-semibold text-gray-800">Research Application</h3>

        <form onSubmit={researchExtensionDate}>
          <div class="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3 items-center">
            {/* Extension Date */}
            <div>
              <label for="extension-date" class="block text-sm font-medium text-gray-700">
                Extension Date <span class="text-gray-400">(optional)</span>
              </label>
              <input type="date" id="extension-date" onChange={(e) => setData('date_extension', e.target.value)}
                name="extension-date" class="block w-full border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm p-2" />
            </div>

            {/* Button */}
            {
              research.date_extension ?
              <></>
              :
              <div class="flex items-end mt-5">
              <button type="submit" class="disable w-full sm:w-auto px-4 py-2 text-sm text-white bg-green-600 hover:bg-green-700 rounded-md shadow-md focus:outline-none">
                Save Changes
              </button>
            </div>
            }
          </div>
        </form>
      </div>
    </div>

    {/* Schedule Summary */}
    <div class="p-4 bg-gray-50 rounded-lg shadow-md border border-gray-200">
      <h3 class="text-lg font-semibold text-gray-900">📅 Schedule Summary</h3>

      {/* Completion Date */}
      <div class="mt-3 flex items-center gap-2">
        <p class="text-sm font-medium text-gray-700">Completion Date:</p>
        <p class={`text-sm font-semibold ${research.date_completion ? "text-green-700" : "text-gray-400"}`}>
          {research.date_completion ? dayjs(research.date_completion).format("LL") : "---"}
        </p>
      </div>

      {/* Extension Date */}
      <div class="mt-2 flex items-center gap-2">
        <p class="text-sm font-medium text-gray-700">Extension Date:</p>
        <p class={`text-sm font-semibold ${research.date_extension ? "text-red-600" : "text-gray-400"}`}>
          {research.date_extension ? dayjs(research.date_extension).format("LL") : "---"}
        </p>
      </div>
    </div>

  </div>
</div>




<div class="bg-blue-50 border-l-4 border-blue-500 p-4 shadow-md rounded-lg">
  <div class="flex items-start">
    
    {/* Icon */}
    <div class="flex-shrink-0">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
        <path fill="currentColor" d="M19 19H5V8h14m-3-7v2H8V1H6v2H5c-1.11 0-2 .89-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2h-1V1m-1 11h-5v5h5z"/>
      </svg>
    </div>

    <div class="ml-3 w-full">
      <h3 class="text-lg font-semibold text-gray-800">Set Progress Report Schedule</h3>
      
      <form onSubmit={submitFiles} class="mt-4 mb-3">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          
          {/* Scheduled Date */}
          <div>
            <label for="followup-date" class="block text-sm font-medium text-gray-700">
              Scheduled Date <span class="text-red-500">*</span>
            </label>
            <input type="date" id="followup-date" onChange={(e) => setData('date_scheduled', e.target.value)}
              name="followup-date" class="block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm p-2" />
          </div>

          {/* Extension Date */}
          {/* <div>
            <label for="extension-date" class="block text-sm font-medium text-gray-700">
              Extension Date <span class="text-gray-400">(optional)</span>
            </label>
            <input type="date" id="extension-date" onChange={(e) => setData('date_due', e.target.value)}
              name="extension-date" class="block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm p-2" />
          </div> */}

          {/* Submit Button */}
          <div class="flex justify-start">
            <button type="submit" class="px-4 py-2 text-sm text-white bg-green-600 hover:bg-green-700 rounded-md shadow-md focus:outline-none">
              Add Schedule
            </button>
          </div>

        </div>
      </form>
    </div>
  </div>
</div>



      <div class="space-y-4 mt-3">
      <h4 class="mt-5 text-2xl font-semibold text-gray-800 border-b pb-2 border-gray-300">
    🗓️ Progress Report Dates
  </h4>
        { progress_report.map((report, index) => (
            <div class="p-6 rounded-lg  border border-gray-200">
              <div className="flex justify-between bg-gray-100 p-2 rounded items-center w-full text-md sm:text-md font-semibold text-blue-700">
  <div className="flex items-center gap-2">
    📅 <span className="text-gray-800">{dayjs(report.date_scheduled).format("LL")}</span>
  </div>

  {report.date_due ?
  <>
   <span class="text-red-600">Extension Date: {dayjs(report.date_due).format("LL")  }</span>
  </>
:
  <p className="text-gray-600">
    <span className="ml-2">
     <ProgressExtensionModal id={report.id} />
    </span>
  </p>
}
</div>





                <div class="grid grid-cols-2 gap-4 mt-2">
                {report.details.map((report_detail, indexes) => (
  <div id={`listings-${indexes}`} class="border-l-4 border-green-400 pl-3 py-2 bg-white rounded-md shadow-md p-3">
    
    {/* Enhanced Header */}
    <div class="flex items-center justify-between bg-green-50 px-3 py-2 rounded-md">
      <h4 class="text-gray-700 text-base sm:text-md font-semibold">
        {report_detail.type === "1" ? "📌 Progress Report" : report_detail.type === "2" ? "📊 Liquidation Report" : "📂 Others"}
      </h4>
      <span class="text-xs text-gray-600">
        {dayjs(report_detail.files.created_at).format("LLL")} 
        (<time dateTime={report_detail.files.created_at}>
          {dayjs().from(dayjs(report_detail.files.created_at), true)} ago
        </time>)
      </span>
    </div>

    {/* File Attachment Section */}
    <ul role="list" class="divide-y divide-gray-200 mt-2 text-xs border border-gray-200 rounded-md">
      <li class="flex items-center justify-between py-2 px-3">
        <div class="flex w-0 flex-1 items-center gap-2">
          <span class="icon-[tabler--paperclip] size-5 flex-shrink-0 text-gray-600"></span>
          <span class="truncate font-medium text-gray-800">{report_detail.files.file_name}</span>
        </div>
        <div class="flex-shrink-0">
          <a href="#" onClick={() => downloadFile(report_detail.files)} class="text-green-600 hover:text-green-700">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
              <path fill="currentColor" d="m12 16l-5-5l1.4-1.45l2.6 2.6V4h2v8.15l2.6-2.6L17 11zm-6 4q-.825 0-1.412-.587T4 18v-3h2v3h12v-3h2v3q0 .825-.587 1.413T18 20z"/>
            </svg>
          </a>
        </div>
      </li>
    </ul>

    
    
  </div>
))}

</div>
{report.status !== "accepted" ? (
    <div className="mt-3 flex justify-end">
      <button
        type="button"
        onClick={() => acceptProgressReport(report.id)}
        className="px-4 py-2 text-sm text-white bg-blue-600 hover:bg-blue-700 rounded-md shadow-md focus:outline-none"
      >
        Accept Progress Report
      </button>
    </div>
) : (
    <div className="mt-3 text-center text-green-600 font-semibold">
      ✅ The progress report has already been accepted.
    </div>
)}




{report.details.length === 0 ? (
                       <>
                        <div class="bg-white p-6 mt-3 shadow-lg rounded-lg border border-gray-200">
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
        ))}
        
        {progress_report.length === 0 ? (
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

        

       
            
            </div>
            </div>
        </>
        :
        <>
              <div>
          
          <div class="card p-3">
  
            <div class="mb-4">
                <h1 class="text-3xl font-bold text-gray-900">Progress Report</h1>
                <p class="text-gray-500 mt-2">An overview of the ongoing research and key progress milestones.</p>
            </div>

            <div class="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-6 mt-3 rounded-md">
                <strong class="font-semibold">Important:</strong> 
                &nbsp;Please <span class="font-semibold">do not delete or remove any previously uploaded documents</span> as they are crucial for version tracking.
            </div>
            
            { progress_report.map((report, index) => (
                <div class="p-6 mb-3 border-t-2 border-blue-500 rounded-lg shadow-lg">
                     <div className="flex justify-between bg-gray-100 p-2 rounded items-center w-full text-md sm:text-md font-semibold text-blue-700">
  <div className="flex items-center gap-2">
    📅 <span className="text-gray-800">{dayjs(report.date_scheduled).format("LL")}</span>
  </div>
  <p className="text-red-600">
    Extension Date:
    <span className="ml-2">
      {report.date_due ? dayjs(report.date_due).format("LL") : "(Not Set)"}
    </span>
  </p>
</div>

{report.status !== "accepted" ? (
   <form class="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
   <div class="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
 
     {/* Type Selection */}
     <div>
       <label class="text-sm font-semibold text-gray-700 block mb-1">Type</label>
       <select 
         onChange={(e) => {
           setData('type', e.target.value);
           setState(report.id);
         }} 
         class="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
       >
         <option disabled selected>Please select type</option>
         <option value="1">Progress Report</option>
         <option value="2">Liquidation</option>
         <option value="3">Others</option>
       </select>
     </div>
 
     {/* File Upload - Compact */}
     <div>
       <label class="text-sm font-semibold text-gray-700 block mb-1">Document File</label>
       <div class="relative w-full">
         <input 
           type="file" 
           onChange={(e) => {
             setState(report.id);
             setData('document_file', e.target.files[0]);
           }} 
           class="w-full px-3 py-[6px] text-sm border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
         />
       </div>
      
     </div>
 
     {/* Upload Button - Properly Aligned */}
     <div>
       <button 
         type="button" 
         onClick={() => submitFiles2()} 
         class="w-full bg-blue-500 text-white text-sm font-medium px-3 py-2 rounded-lg shadow-md hover:bg-blue-600 transition duration-200 flex items-center justify-center gap-2"
       >
         <span class="icon-[tabler--upload] text-white size-4"></span>
         Upload
       </button>
     </div>
 
   </div>
 </form>
 
 
 
) : (
    <div className="mt-3 text-center text-green-600 font-semibold">
      ✅ The progress report has already been accepted.
    </div>
)}






        <div class="grid grid-cols-2 gap-4 mt-2">
                {report.details.map((report_detail, indexes) => (
  <div id={`listings-${indexes}`} class="border-l-4 border-green-400 pl-3 py-2 bg-white rounded-md shadow-md p-3">
    
    {/* Enhanced Header */}
    <div class="flex items-center justify-between bg-gray-100 px-3 py-2 rounded-md">
      <h4 class="text-gray-700 text-base sm:text-md font-semibold">
        {report_detail.type === "1" ? "📌 Progress Report" : report_detail.type === "2" ? "📊 Liquidation Report" : "📂 Others"}
      </h4>
      <span class="text-xs text-gray-600">
        {dayjs(report_detail.files.created_at).format("LLL")} 
        (<time dateTime={report_detail.files.created_at}>
          {dayjs().from(dayjs(report_detail.files.created_at), true)} ago
        </time>)
      </span>
    </div>


    {/* File Attachment Section */}
    <ul role="list" class="divide-y divide-gray-200 mt-2 text-xs border border-gray-200 rounded-md">
      <li class="flex items-center justify-between py-2 px-3">
        <div class="flex w-0 flex-1 items-center gap-2">
          <span class="icon-[tabler--paperclip] size-5 flex-shrink-0 text-gray-600"></span>
          <span class="truncate font-medium text-gray-800">{report_detail.files.file_name}</span>
        </div>
        <div class="flex-shrink-0">
        
        </div>
      </li>
    </ul>
    
  </div>
))}

</div>


{report.details.length === 0 ? (
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
            ))}


        {progress_report.length === 0 ? (
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
            </div>
        </>
        }
  </div>

    <div id="tabs-progress-2" class="hidden" role="tabpanel" aria-labelledby="tabs-progress-item-2">
      <div class="vertical-scrollbar rounded-scrollbar max-h-screen w-full p-4">
           <FeedbackStep9 user={user} research={research} feedbacks_step9={feedbacks_step9} />
      </div>
    </div>
</div>

  
    </>
  )
}
