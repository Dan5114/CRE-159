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

export default function Step9({user, research, progress_report}) {
    const notyf = new Notyf();
    const [state, setState] = useState([]);
    const { data, setData, post,  delete: destroy, errors, reset, formState, processing, progress, recentlySuccessful } =
    useForm({
        research_id : research.id,
        date_scheduled: "",
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


  return (
    <>
      {
        (user.user_type == "cre") ? 
        <>
                <div>
          
          <div class="card p-3">
  
            <div class="mb-4">
                <h1 class="text-3xl font-bold text-gray-900">Schedule Progress Report</h1>
                <p class="mt-2 text-gray-600 text-sm">See details below</p>
            </div>

            <div class="bg-blue-50 border-l-4 border-blue-500 p-6 shadow-md rounded-lg">
        <div class="flex items-start">
        
          <div class="flex-shrink-0">
          <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24"><path fill="currentColor" d="M19 19H5V8h14m-3-7v2H8V1H6v2H5c-1.11 0-2 .89-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2h-1V1m-1 11h-5v5h5z"/></svg>
          </div>
          <div class="ml-4">
            <h3 class="text-xl font-semibold text-gray-800">Set Progress Report Schedule</h3>
           
            
            <form onSubmit={submitFiles}>
            <div class="mt-6 flex space-x-3">
              <label for="followup-date" class="block text-sm font-medium text-gray-700">Scheduled Date</label>
              <input type="date" id="followup-date" onChange={(e) => setData('date_scheduled', e.target.value)} name="followup-date" class="block w-60 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
              <button type="submit" class="btn text-sm text-white bg-green-600 hover:bg-green-700 rounded-md shadow-md focus:outline-none">
                Scheduled
              </button>
            </div>

            <div class="mt-6 flex space-x-1">
             

            </div>
            </form>
          </div>
        </div>
      </div>

      <div class="space-y-4 mt-3">
        { progress_report.map((report, index) => (
            <div class="p-6 rounded-lg shadow-lg border border-gray-200">
                <div class="flex items-center justify-between">
                <div class="text-xl font-medium text-gray-700"> Progress Report {index+1} - { dayjs(report.date_scheduled).format("LL")}
                
                </div>
                </div>

{ report.details.map((report_detail, indexes) => (
                   <div id="listings-1" class="mt-2 space-y-4">
                   <div class="border-l-4 border-green-400 pl-4 py-3 bg-white rounded-md shadow-md p-3">
                       <div class="flex items-center justify-between">
                           <h4 class="font-semibold text-gray-800">{(report_detail.type == "1") ? "Progress Report" : "Liquidation Report"} </h4>
                           <span class="flex-shrink-0 text-xs text-base-content/50">{dayjs(report_detail.files.created_at).format("LLL")} (<time datetime="2023-01-23T13:23Z">{dayjs().from(dayjs(report_detail.files.created_at), true)} ago</time>)</span>
                       </div>
                       <ul role="list" class="divide-y mt-2 text-sm divide-base-content/25 rounded-md border border-base-content/25">
                                     <li class="flex items-center justify-between py-2 ps-2 pe-2">
                                         <div class="flex w-0 flex-1 items-center">
                                           <span class="icon-[tabler--paperclip] size-5 flex-shrink-0"></span>
                                           <div class="ms-4 flex min-w-0 flex-1 gap-2">
                                             <span class="truncate font-medium">{report_detail.files.file_name}</span>
                                            
                                           </div>
                                         </div>
                                         <div class="ms-4 flex-shrink-0">
                                         <a href="#" onClick={() => downloadFile(report_detail.files)} class="link link-primary">
                                           <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path fill="currentColor" d="m12 16l-5-5l1.4-1.45l2.6 2.6V4h2v8.15l2.6-2.6L17 11zm-6 4q-.825 0-1.412-.587T4 18v-3h2v3h12v-3h2v3q0 .825-.587 1.413T18 20z"/></svg>
                                           </a>
                                         </div>
                                       </li>
                                     </ul>
                   </div>
               </div>
                ))}

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
                <p class="mt-2 text-gray-600 text-sm">See details below</p>
            </div>

            <div class="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-6 mt-3 rounded-md">
                <strong class="font-semibold">Important:</strong> 
                &nbsp;Please <span class="font-semibold">do not delete or remove any previously uploaded documents</span> as they are crucial for version tracking.
            </div>
            
            { progress_report.map((report, index) => (
                <div class="p-6 mb-3 border-t-2 border-blue-500 rounded-lg shadow-lg">
                    <div class="flex items-center justify-between">
                    <div class="text-xl font-medium text-gray-700"> Progress Report {index+1} - { dayjs(report.date_scheduled).format("LL")}
                    
                    </div>
                    </div>

                    
        <form >
        <div class="grid grid-cols-3 gap-6 md:grid-cols-3 mt-3 mb-6">

        <div>
            <label class="label label-text" for="firstName">Type </label>
            <select onChange={(e) => {setData('type', e.target.value);
                 setState(report.id);
            }} class="select max-w-sm appearance-none" aria-label="select">
            <option disabled selected>Please select type</option>
            <option value="1">Progress Report</option>
            <option value="2">Liquidation</option>
            </select>
          </div>

           <div>
            <label class="label label-text" for="firstName">Document File </label>
            <input type="file" placeholder="" onChange={(e) => {
                setState(report.id);
                setData('document_file', e.target.files[0]);}} class="input" id="firstName" />
                 <div className="mb-4 mt-1 text-xs text-gray-500">
              <p>You can upload PDF, DOC, or DOCX files</p>
            </div>
          </div>

          <div class="flex justify-end gap-y-2 mt-7">
          <button type="button" onClick={() => 
            submitFiles2()}
            class="btn btn-default rounded-full">
              <span class="icon-[tabler--upload] text-base-content/80 size-6"></span>Upload
              </button>
          </div>
        </div>
        </form>


        { report.details.map((report_detail, indexes) => (
                   <div id="listings-1" class="mt-2 space-y-4">
                   <div class="border-l-4 border-green-400 pl-4 py-3 bg-white rounded-md shadow-md p-3">
                       <div class="flex items-center justify-between">
                           <h4 class="font-semibold text-gray-800">{(report_detail.type == "1") ? "Progress Report" : "Liquidation Report"} </h4>
                           <span class="flex-shrink-0 text-xs text-base-content/50">{dayjs(report_detail.files.created_at).format("LLL")} (<time datetime="2023-01-23T13:23Z">{dayjs().from(dayjs(report_detail.files.created_at), true)} ago</time>)</span>
                       </div>
                       <ul role="list" class="divide-y mt-2 text-sm divide-base-content/25 rounded-md border border-base-content/25">
                                     <li class="flex items-center justify-between py-2 ps-2 pe-2">
                                         <div class="flex w-0 flex-1 items-center">
                                           <span class="icon-[tabler--paperclip] size-5 flex-shrink-0"></span>
                                           <div class="ms-4 flex min-w-0 flex-1 gap-2">
                                             <span class="truncate font-medium">{report_detail.files.file_name}</span>
                                            
                                           </div>
                                         </div>
                                         <div class="ms-4 flex-shrink-0">
                                         {/* Delete */}
                                         </div>
                                       </li>
                                     </ul>
                   </div>
               </div>
                ))}


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
    </>
  )
}
