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
import Modal from '@/Components/Modal';
import FeedbackStep4 from '../Feedback/FeedbackStep4';

export default function Step4({user, research, revised_docs, feedbacks_step4, feedbacks_step4_notif, endorsement_status, tech_doc}) {
  const notyf = new Notyf();
  const [confirmingModal, setConfirmingModal] = useState(false);
  const { data, setData, post,  delete: destroy, patch, errors, reset, formState, processing, progress, recentlySuccessful } =
  useForm({
      research_id : research.id,
      document_file: "",
      tech_file: "",
      t_steps: "tech",
      date_endorsement: "",
      steps: "4"
  });

  const confirmModalDisplay = () => {
    setConfirmingModal(true);
  };

  const closeModal = () => {
    setConfirmingModal(false);
    clearErrors();
    reset();
  };

  const submitFiles = (e) => {
    e.preventDefault();
    post(route('researcher.technical.review.files'), {
        onSuccess: (page) =>  {
            notyf.success(page.props.flash.message);
        },
        onFinish: () =>  {
            console.log("Finishing uploading files");
            reset()
        },
    });
  }

  const downloadDoc = (file) => {
    fetch(route('researcher.doc.download', file.id))
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

     patch(route('tpl.dowload.doc.status', file.id), {
      onSuccess: (page) =>  {
          notyf.success(page.props.flash.message);
      },
      onFinish: () =>  {
          console.log("Finishing updating status");
      },
  });
  }

  const deleteFile = (id) => {
    destroy(route('researcher.delete.doc', id), {
      preserveScroll: true,
      onSuccess: (page) =>  notyf.success(page.props.flash.message),
      onError: () => console.log("Error deleting"),
      onFinish: () => reset(),
    });
  }

  const acceptApplication = (e) => {
    e.preventDefault();
    post(route('tpl.endorse.application'), {
      onSuccess: (page) =>  {
          notyf.success(page.props.flash.message);
          closeModal();
      },
      onFinish: () =>  {
          console.log("Finishing accept application");
          reset()
      },
  });
  }

  return (
    <>
    
<nav class="tabs tabs-lifted mt-3 p-2" aria-label="Tabs" role="tablist" aria-orientation="horizontal">
  <button type="button" class="tab active-tab:tab-active active" id="tabs-lifted-item-5" data-tab="#tabs-lifted-5" aria-controls="tabs-lifted-1" role="tab" aria-selected="true">
    Files
  </button>
  <button type="button" class="tab active-tab:tab-active" id="tabs-lifted-item-6" data-tab="#tabs-lifted-6" aria-controls="tabs-lifted-2" role="tab" aria-selected="false">
    Feedback
    {
      (feedbacks_step4_notif == 0) ? 
      ""
      :
      <span class="badge bg-[#FF0000] text-white badge-sm ms-2 rounded-full">+{feedbacks_step4_notif}</span>
    }
  </button>
  <button type="button" class="tab active-tab:tab-active" id="tabs-lifted-item-tech" data-tab="#tabs-lifted-tech" aria-controls="tabs-lifted-1" role="tab" aria-selected="true">
  Tech Review
  </button>
</nav>

<div class="mt-3 mb-3">
  <div id="tabs-lifted-5" role="tabpanel" aria-labelledby="tabs-lifted-item-5">
  {
        (user.user_type == "researcher") ? 
        <>
        <div>
          
        <div class="">
        <form onSubmit={submitFiles}>
          <div class="grid grid-cols-2 gap-6 md:grid-cols-2 mb-3 mt-3">
           
          <div>
            <label class="label label-text" for="firstName">Document File </label>
            <input type="file" placeholder="" onChange={(e) => setData('document_file', e.target.files[0])} class="input" id="firstName" />
          </div>

            <div class="flex justify-end gap-y-2 mt-7">
        
            <button type="submit" class="btn btn-default rounded-full">
              <span class="icon-[tabler--upload] text-base-content/80 size-6"></span>Upload
              </button>
            </div>
          </div>
        </form>

        <div class="flex">
  <h5 class="text-base-content font-semibold">Note: </h5>&nbsp;
  <p class="text-[#FF0000] text-xs mt-1">
   <em> Do not delete/remove previously uploaded documents for version bactracking.</em>
  </p>
</div>
        <table class="w-full divide-y divide-gray-200 dark:divide-neutral-700 mt-3">
            <thead class="bg-gray-300 dark:bg-neutral-700">
            <tr>
              <th scope="col" class="px-3 py-3  text-start text-xs font-bolder uppercase dark:text-neutral-500">Version #</th>
                <th scope="col" class="px-3 py-3  text-start text-xs font-bolder uppercase dark:text-neutral-500">File</th>
                <th scope="col" class="px-3 py-3  text-start text-xs font-bolder uppercase dark:text-neutral-500">Date Created</th>
                <th scope="col" class="px-3 py-3  text-start text-xs font-bolder uppercase dark:text-neutral-500"></th>
                <th scope="col" class="px-3 py-3  text-start text-xs font-bolder uppercase dark:text-neutral-500"></th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 dark:divide-neutral-700">
                { revised_docs.map((revised_doc, index) => (
                  <>
                         <tr>
                            <td class="px-3 py-3 text-balance whitespace-nowrap text-sm font-medium text-gray-700 dark:text-neutral-200">V{index+1}</td>
                            <td class="px-3 py-3 text-balance whitespace-nowrap text-sm font-medium text-gray-700 dark:text-neutral-200">{revised_doc.file_name}</td>                                         
                            <td class="px-3 py-3 whitespace-nowrap truncate text-xs/5 text-gray-500">{dayjs(revised_doc.created_at).format("LLL")}</td>
                            <td class="px-3 py-3 whitespace-nowrap truncate text-xs/5 text-gray-500">{(revised_doc.seen_status == 1) ?
                          <>
                          <div class="chat-footer text-base-content/50">
                           <span class="icon-[tabler--checks] text-success align-bottom"></span>&nbsp;
                            Seen
                            at <span>{dayjs(revised_doc.seen_date).format("LLL")}</span>
                          </div>
                          </>  
                          :
                          <></>
                          }</td>
                            <td class="px-3 py-3 whitespace-nowrap text-end text-sm font-medium">
                              
                              <span class="hover:cursor-pointer" onClick={() => deleteFile(revised_doc.id)}>
                              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path fill="currentColor" d="M7 21q-.825 0-1.412-.587T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413T17 21zM17 6H7v13h10zM9 17h2V8H9zm4 0h2V8h-2zM7 6v13z"/></svg>
                              </span>
                            </td>
                        </tr>          
                  </>
                ))}
            </tbody>
          </table>

          {revised_docs.length === 0 ? (
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
        :
        <>
          <div class="">
          <div class="flex mb-3">
  <h5 class="text-base-content font-semibold">Note: </h5>&nbsp;
  <p class="text-[#FF0000] text-xs mt-1">
   <em> Do not delete/remove previously uploaded documents for version bactracking.</em>
  </p>
</div>
          <table class="w-full divide-y divide-gray-200 dark:divide-neutral-700">
            <thead class="bg-gray-300 dark:bg-neutral-700">
            <tr>
                <th scope="col" class="px-3 py-3  text-start text-xs font-bolder uppercase dark:text-neutral-500">Version #</th>
                <th scope="col" class="px-3 py-3  text-start text-xs font-bolder uppercase dark:text-neutral-500">File</th>               
                <th scope="col" class="px-3 py-3  text-start text-xs font-bolder uppercase dark:text-neutral-500">Date Created</th>
                <th scope="col" class="px-3 py-3  text-start text-xs font-bolder uppercase dark:text-neutral-500"></th>
                <th scope="col" class="px-3 py-3  text-start text-xs font-bolder uppercase dark:text-neutral-500"></th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 dark:divide-neutral-700">
            { revised_docs.map((revised_doc, index) => (
                  <>
                          <tr>
                            <td class="px-3 py-3 text-balance whitespace-nowrap text-sm font-medium text-gray-700 dark:text-neutral-200">V{index+1}</td>
                            <td class="px-3 py-3 text-balance whitespace-nowrap text-sm font-medium text-gray-700 dark:text-neutral-200">{revised_doc.file_name}</td>                                         
                            <td class="px-3 py-3 whitespace-nowrap truncate text-xs/5 text-gray-500">{dayjs(revised_doc.created_at).format("LLL")}</td>
                            <td class="px-3 py-3 whitespace-nowrap truncate text-xs/5 text-gray-500">{(revised_doc.seen_status == 1) ?
                          <>
                          <div class="chat-footer text-base-content/50">
                           <span class="icon-[tabler--checks] text-success align-bottom"></span>&nbsp;
                            Seen
                            at <span>{dayjs(revised_doc.seen_date).format("LLL")}</span>
                          </div>
                          </>  
                          :
                          <>
                          </>
                          }</td>
                            <td class="px-3 py-3 whitespace-nowrap text-end text-sm font-medium">
                              
                            <span class="hover:cursor-pointer" onClick={() => downloadDoc(revised_doc)}> <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path fill="currentColor" d="m12 16l-5-5l1.4-1.45l2.6 2.6V4h2v8.15l2.6-2.6L17 11zm-6 4q-.825 0-1.412-.587T4 18v-3h2v3h12v-3h2v3q0 .825-.587 1.413T18 20z"/></svg></span>
                            </td>
                        </tr>          
                  </>
                ))}
              </tbody>
              </table>

             

              {revised_docs.length === 0 ? (
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
          
        </>

     }
<div class="mt-6">
   {
    (user.user_type == "tpl") ?
    <>
      {
        (endorsement_status == null) ?
        <button type="button"  onClick={confirmModalDisplay} class="btn btn-success rounded-full">
      Endorse Paper for Technical Clearance
      </button>
      :
      <>
        <div class="w-full">
        <div class="bg-green-50 border-l-4 border-green-500 p-6 shadow-md rounded-lg">
        <div class="flex items-start">
          <div class="flex-shrink-0">
            <svg class="h-6 w-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <div class="ml-4">
            <h3 class="text-xl font-semibold text-gray-800">Your Application Has Been Endorsed!</h3>
            <p class="mt-2 text-gray-600">We are pleased to inform you that your application has been successfully endorsed. You may now proceed with the next phase of the process.</p>
            <p class="mt-2 text-gray-500">
              <strong class="text-green-700">What’s next:</strong> You will receive further instructions shortly to complete the next steps.
            </p>
            <div class="mt-4">
              <span class="inline-flex items-center px-3 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                Endorsement Complete
              </span>
            </div>
          </div>
        </div>
      </div>
        </div>
      </>
      }
    </>
    :
    <></>
   }
</div>

  </div>
  <div id="tabs-lifted-6" class="hidden" role="tabpanel" aria-labelledby="tabs-lifted-item-6">
      <div class="vertical-scrollbar rounded-scrollbar max-h-screen w-full p-4">
        <FeedbackStep4 user={user} research={research} feedbacks_step4={feedbacks_step4} />
       </div>
  </div>

  <div id="tabs-lifted-tech" class="hidden" role="tabpanel" aria-labelledby="tabs-lifted-item-tech">
   {
    (user.user_type != "cre" && endorsement_status != null) ?
      <>
        <div class="bg-blue-50 border-l-4 border-blue-500 p-6 shadow-md rounded-lg">
        <div class="flex items-start">
          <div class="flex-shrink-0">
            <svg class="h-6 w-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c1.657 0 3 1.343 3 3s-1.343 3-3 3-3-1.343-3-3 1.343-3 3-3zm0 0V3m0 5v3M9 12c-1.657 0-3 1.343-3 3s1.343 3 3 3s3-1.343 3-3-1.343-3-3-3zM12 8c1.657 0 3 1.343 3 3s-1.343 3-3 3zM12 8h-3"></path>
            </svg>
          </div>
          <div class="ml-4">
            <h3 class="text-xl font-semibold text-gray-800">Endorsement Scheduled</h3>
            <p class="mt-2 text-gray-600">Your endorsement has been scheduled for the following date. Please upload the necessary documents for the endorsement.</p>
            <p class="mt-2 text-gray-500">
              <strong class="text-blue-700">Endorsement Date:</strong> <span class="text-gray-800">{ dayjs(endorsement_status.date_endorse).format("LLLL")}</span>
            </p>
            <div class="mt-4">
              <span class="inline-flex items-center px-3 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                Scheduled
              </span>
            </div>
          </div>
        </div>
      </div>
       {
          (tech_doc != null) ?
         <>
         {/* <div class="card p-3 mt-3">
         <h5 class="text-lg font-semibold mt-3 flex justify-start"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 16 16"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"><path d="M11.25 1.75h-8.5v11.5h2.5m3.5-3.5l-.5 4.5l2.25-1l2.25 1l-.5-4.5"/><circle cx="10.5" cy="7.5" r="2.75"/></g></svg>&nbsp;Tech Review Cert</h5>
          <ul role="list" class="divide-y text-sm divide-base-content/25 rounded-md border border-base-content/25 mt-3">
          <li class="flex items-center justify-between py-2 ps-2 pe-2">
              <div class="flex w-0 flex-1 items-center">
                <span class="icon-[tabler--paperclip] size-5 flex-shrink-0"></span>
                <div class="ms-4 flex min-w-0 flex-1 gap-2">
                  <span class="truncate font-medium">{tech_doc.file_name}</span>
                  <span class="flex-shrink-0 text-xs text-base-content/50">{dayjs(tech_doc.created_at).format("LLL")} (<time datetime="2023-01-23T13:23Z">{dayjs().from(dayjs(tech_doc.created_at), true)} ago</time>)</span>
                </div>
              </div>
              <div class="ms-4 flex-shrink-0">
                <a onClick={() => downloadDoc(tech_doc)} class="link link-primary"><svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 48 48"><g fill="#1565c0"><path d="M24 37.1L13 24h22zM20 4h8v4h-8zm0 6h8v4h-8z"/><path d="M20 16h8v11h-8zM6 40h36v4H6z"/></g></svg></a>
              </div>
            </li>
          </ul>
         </div> */}

<div class="bg-green-50 border-l-4 border-green-500 p-6 shadow-md rounded-lg mt-3">
        <div class="flex items-start">
          <div class="flex-shrink-0">
            <svg class="h-6 w-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
            </svg>
          </div>
          <div class="ml-4">
            <h3 class="text-xl font-semibold text-gray-800">Download Tech Review Certificate</h3>
            <p class="mt-2 text-gray-600">Your certificate has been successfully generated. Click below to download the certificate file in PDF format.</p>
            <div class="mt-4">
            <ul role="list" class="divide-y text-sm divide-base-content/25 rounded-md border border-base-content/25 mt-3">
          <li class="flex items-center justify-between py-2 ps-2 pe-2">
              <div class="flex w-0 flex-1 items-center">
                <span class="icon-[tabler--paperclip] size-5 flex-shrink-0"></span>
                <div class="ms-4 flex min-w-0 flex-1 gap-2">
                  <span class="truncate font-medium">{tech_doc.file_name}</span>
                  <span class="flex-shrink-0 text-xs text-base-content/50">{dayjs(tech_doc.created_at).format("LLL")} (<time datetime="2023-01-23T13:23Z">{dayjs().from(dayjs(tech_doc.created_at), true)} ago</time>)</span>
                </div>
              </div>
              <div class="ms-4 flex-shrink-0">
                <a onClick={() => downloadDoc(tech_doc)} class="link link-primary"><svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 48 48"><g fill="#1565c0"><path d="M24 37.1L13 24h22zM20 4h8v4h-8zm0 6h8v4h-8z"/><path d="M20 16h8v11h-8zM6 40h36v4H6z"/></g></svg></a>
              </div>
            </li>
          </ul>
            </div>

        
          </div>
        </div>
      </div>
         </>
          :
          <>
         
        {/* <div class="flex text-sm justify-center text-warning mt-3"><em>Waiting for CRE to upload Tech Review Cert</em></div> */}

        <div class="text-center mb-8 mt-6">
      <h2 class="text-3xl font-semibold text-gray-800">Waiting for File Upload</h2>
      <p class="mt-2 text-gray-500">You are currently waiting for CRE to upload a file. Please check back later.</p>
    </div>

    <div class="bg-yellow-50 border-l-4 border-yellow-500 p-6 shadow-md rounded-lg">
        <div class="flex items-start">
          <div class="flex-shrink-0">
            <svg class="h-6 w-6 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 2l4 4m0 0l4-4m-4 4l-4 4M18 6v14a2 2 0 01-2 2H8a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2z"></path>
            </svg>
          </div>
          <div class="ml-4">
            <h3 class="text-xl font-semibold text-gray-800">Waiting for File Upload</h3>
            <p class="mt-2 text-gray-600">You are currently waiting for another user to upload the required file. Please check back later or contact the user to proceed.</p>
            <p class="mt-2 text-gray-500">
              <strong class="text-yellow-700">Action Needed:</strong> Wait for the CRE to upload the file, then you can proceed with the next steps.
            </p>
            <div class="mt-4">
              <span class="inline-flex items-center px-3 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">
                Waiting
              </span>
            </div>
          </div>
        </div>
      </div>

          </>
        }
        
      </>
      :
      <>

      {
        (endorsement_status != null) ?
        <>
        <div class="text-center mb-8">
      <h2 class="text-3xl font-semibold text-gray-800">Endorsement Date & File Upload</h2>
      <p class="mt-2 text-gray-500">Your endorsement is scheduled, and you can upload any relevant documents.</p>
    </div>
      
        <div class="bg-blue-50 border-l-4 border-blue-500 p-6 shadow-md rounded-lg">
        <div class="flex items-start">
          <div class="flex-shrink-0">
            <svg class="h-6 w-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c1.657 0 3 1.343 3 3s-1.343 3-3 3-3-1.343-3-3 1.343-3 3-3zm0 0V3m0 5v3M9 12c-1.657 0-3 1.343-3 3s1.343 3 3 3s3-1.343 3-3-1.343-3-3-3zM12 8c1.657 0 3 1.343 3 3s-1.343 3-3 3zM12 8h-3"></path>
            </svg>
          </div>
          <div class="ml-4">
            <h3 class="text-xl font-semibold text-gray-800">Endorsement Scheduled</h3>
            <p class="mt-2 text-gray-600">Your endorsement has been scheduled for the following date. Please upload the necessary documents for the endorsement.</p>
            <p class="mt-2 text-gray-500">
              <strong class="text-blue-700">Endorsement Date:</strong> <span class="text-gray-800">{ dayjs(endorsement_status.date_endorse).format("LLLL")}</span>
            </p>
            <div class="mt-4">
              <span class="inline-flex items-center px-3 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                Scheduled
              </span>
            </div>
          </div>
        </div>
      </div>

        <div class="divider"></div>

        <form onSubmit={submitFiles}>
          <div class="grid grid-cols-2 gap-6 md:grid-cols-2 mb-3 mt-6">
           
          <div>
            <label class="label label-text" for="firstName">Document File </label>
            <input type="file" placeholder="" onChange={(e) => setData('tech_file', e.target.files[0])} class="input" id="firstName" />
          </div>

            <div class="flex justify-end gap-y-2 mt-7">
        
            <button type="submit" class="btn btn-default rounded-full">
              <span class="icon-[tabler--upload] text-base-content/80 size-6"></span>Upload
              </button>
            </div>
          </div>
        </form>
        </>
        :
        <>
          {/* <div class="flex text-sm justify-center text-warning mt-3"><em>Waiting for Technical Panel to Endorsed Paper</em></div> */}

          <div class="text-center mb-8">
      <h2 class="text-3xl font-semibold text-gray-800">Waiting for Technical Panel Endorsement</h2>
      <p class="mt-2 text-gray-500">Your paper is under review by the Technical Panel. Please be patient as the endorsement process takes place.</p>
    </div>

    <div class="bg-blue-50 border-l-4 border-blue-500 p-6 shadow-md rounded-lg">
        <div class="flex items-start">
          <div class="flex-shrink-0">
            <svg class="h-6 w-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c1.657 0 3 1.343 3 3s-1.343 3-3 3-3-1.343-3-3 1.343-3 3-3zm0 0V3m0 5v3M9 12c-1.657 0-3 1.343-3 3s1.343 3 3 3s3-1.343 3-3-1.343-3-3-3zM12 8c1.657 0 3 1.343 3 3s-1.343 3-3 3zM12 8h-3"></path>
            </svg>
          </div>
          <div class="ml-4">
            <h3 class="text-xl font-semibold text-gray-800">Waiting for Technical Panel Endorsement</h3>
            <p class="mt-2 text-gray-600">Your paper is currently under review by the Technical Panel. Please wait while they finalize their endorsement.</p>
            <p class="mt-2 text-gray-500">
              <strong class="text-blue-700">Action Needed:</strong> Await endorsement from the Technical Panel to proceed with the next steps.
            </p>
            <div class="mt-4">
              <span class="inline-flex items-center px-3 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                Pending Endorsement
              </span>
            </div>

            <div class="mt-6">
              <p class="text-sm text-gray-700 font-semibold">Next Steps:</p>
              <ul class="list-disc pl-5 space-y-2 mt-2">
                <li class="text-gray-600">Monitor the endorsement process and wait for confirmation.</li>
                <li class="text-gray-600">Once endorsed, you'll be notified about the next steps for submission.</li>
                <li class="text-gray-600">If no response is received in time, please contact the panel for an update.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

        </>
      }
       

        {
          (tech_doc != null) ?

          <>
            <div class="bg-green-50 border-l-4 border-green-500 p-6 shadow-md rounded-lg mt-6">
        <div class="flex items-start">
          <div class="flex-shrink-0">
            <svg class="h-6 w-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
            </svg>
          </div>
          <div class="ml-4">
            <h3 class="text-xl font-semibold text-gray-800">Uploaded Tech Review Certificate</h3>
            <p class="mt-2 text-gray-600">Your certificate has been successfully uploaded. Click below to delete the certificate file.</p>
            <div class="mt-4">
            <ul role="list" class="divide-y text-sm divide-base-content/25 rounded-md border border-base-content/25 mt-6">
          <li class="flex items-center justify-between py-2 ps-2 pe-2">
              <div class="flex w-0 flex-1 items-center">
                <span class="icon-[tabler--paperclip] size-5 flex-shrink-0"></span>
                <div class="ms-4 flex min-w-0 flex-1 gap-2">
                  <span class="truncate font-medium">{tech_doc.file_name}</span>
                  <span class="flex-shrink-0 text-xs text-base-content/50">{dayjs(tech_doc.created_at).format("LLL")} (<time datetime="2023-01-23T13:23Z">{dayjs().from(dayjs(tech_doc.created_at), true)} ago</time>)</span>
                </div>
              </div>
              <div class="ms-4 flex-shrink-0">
                <a onClick={() => deleteFile(tech_doc.id)} class="link link-primary"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="none" stroke="#ff001a" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7h16m-10 4v6m4-6v6M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2l1-12M9 7V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3"/></svg></a>
              </div>
            </li>
          </ul>
            </div>

        
          </div>
        </div>
      </div>
          </>

         
          :
          <></>
        }
      </>
   }
  </div>
</div>


  <Modal show={confirmingModal} onClose={closeModal}>
  <div class="modal-content">
      <div class="modal-header">
        <h3 class="modal-title">Endorse Paper for Technical Clearance</h3>
        <button type="button" onClick={closeModal} class="btn btn-text btn-circle btn-sm absolute end-3 top-3" aria-label="Close" data-overlay="#form-modal"><span class="icon-[tabler--x] size-4"></span></button>
      </div>
      <form onSubmit={acceptApplication}>
        <div class="modal-body pt-0">
          <div class="mb-4">
            <label class="label label-text" for="fullName"> Date of Endorsement </label>
            <input type="date" placeholder="" onChange={(e) => setData('date_endorsement', e.target.value)} class="input" id="fullName" />
          </div>
         
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-soft btn-secondary" onClick={closeModal} data-overlay="#form-modal">Cancel</button>
          <button type="submit" class="btn btn-primary">Save changes</button>
        </div>
      </form>
    </div>
  </Modal>

            
    </>
  )
}
