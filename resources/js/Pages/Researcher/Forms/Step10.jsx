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
import FeedbackStep10 from '../Feedback/FeedbackStep10';

export default function Step10({user, research, tpl_docs, feedbacks_step10, feedbacks_step10_notif,}) {
    const notyf = new Notyf();
    const { data, setData, post,  delete: destroy, patch, errors, reset, formState, processing, progress, recentlySuccessful } =
    useForm({
        research_id : research.id,
        document_file: "",
        steps: "10"
    });

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
      }

    const deleteFile = (id) => {
        destroy(route('researcher.delete.doc', id), {
          preserveScroll: true,
          onSuccess: (page) =>  notyf.success(page.props.flash.message),
          onError: () => console.log("Error deleting"),
          onFinish: () => reset(),
        });
      }

      const markAsRead = (id) => {
        patch(route('researcher.mark.read', id), {
            onSuccess: (page) =>  {
              console.log("Finishing read status");
            },
            onFinish: () =>  {
                console.log("Finishing update status");
            },
        });
      }


  return (
    <>

<nav class="tabs tabs-lifted mt-3 p-2" aria-label="Tabs" role="tablist" aria-orientation="horizontal">
  <button type="button" class="tab active-tab:tab-active active" id="tabs-lifted-item-techpanel10" data-tab="#tabs-lifted-techpanel10" aria-controls="tabs-lifted-1" role="tab" aria-selected="true">
    Files
  </button>
  <button type="button" onClick={() => {
    if (user.user_type === "cre") {
      markAsRead(research.id);
    } else {
      console.log("You do not have permission to perform this action.");
    }
  }} class="tab active-tab:tab-active" id="tabs-lifted-item-techpanelfeedback10" data-tab="#tabs-lifted-techpanelfeedback10" aria-controls="tabs-lifted-2" role="tab" aria-selected="false">
    Feedback
    {
      (feedbacks_step10_notif == 0) ? 
      ""
      :
      <span class="badge bg-[#FF0000] text-white badge-sm ms-2 rounded-full">+{feedbacks_step10_notif}</span>
    }
  
  </button>
</nav>


<div id="tabs-lifted-techpanel10" role="tabpanel" aria-labelledby="tabs-lifted-item-techpanel10">

{
            (user.user_type == "researcher") ? 
            <>
                    <div>
                      
                    <div class="">
                    <form onSubmit={submitFiles}>
                      <div class="grid grid-cols-2 gap-6 md:grid-cols-2 mb-6 mt-3">
                       
                      <div>
                        <label class="label label-text" for="firstName">Document File </label>
                        <input type="file" placeholder="" onChange={(e) => setData('document_file', e.target.files[0])} class="input" id="firstName" />
                        <div className="mb-4 mt-1 text-xs text-gray-500">
                          <p>You can upload PDF, DOC, or DOCX files</p>
                        </div>
                      </div>
            
                        <div class="flex justify-end gap-y-2 mt-7">
                    
                        <button type="submit" class="btn btn-default rounded-full">
                          <span class="icon-[tabler--upload] text-base-content/80 size-6"></span>Upload
                          </button>
                        </div>
                      </div>
                    </form>
                    <div class="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-6 mt-3 rounded-md">
                    <strong class="font-semibold">Important:</strong> 
                    &nbsp;Please <span class="font-semibold">do not delete or remove any previously uploaded documents</span> as they are crucial for version tracking.
                </div>
                    <table class="w-full divide-y divide-gray-200 dark:divide-neutral-700 mt-3">
                        <thead class="bg-gray-100 dark:bg-neutral-700">
                        <tr>
                          <th scope="col" class="px-3 py-3  text-start text-xs font-bolder uppercase dark:text-neutral-500">Version #</th>
                            <th scope="col" class="px-3 py-3  text-start text-xs font-bolder uppercase dark:text-neutral-500">File</th>
                            <th scope="col" class="px-3 py-3  text-start text-xs font-bolder uppercase dark:text-neutral-500">Date Created</th>
                            <th scope="col" class="px-3 py-3  text-start text-xs font-bolder uppercase dark:text-neutral-500"></th>
                            <th scope="col" class="px-3 py-3  text-start text-xs font-bolder uppercase dark:text-neutral-500"></th>
                          </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-200 dark:divide-neutral-700">
                            { tpl_docs.map((tpl_doc, index) => (
                              <>
                                     <tr class="border-b hover:bg-gray-50">
                                        <td class="px-3 py-3 text-balance whitespace-nowrap text-sm font-medium text-gray-700 dark:text-neutral-200">V{index+1}</td>
                                        <td class="px-3 py-3 text-balance whitespace-nowrap text-sm font-medium text-gray-700 dark:text-neutral-200">{tpl_doc.file_name}</td>                                         
                                        <td class="px-3 py-3 whitespace-nowrap truncate text-xs/5 text-gray-500">{dayjs(tpl_doc.created_at).format("LLL")}</td>
                                        <td class="px-3 py-3 whitespace-nowrap text-end text-sm font-medium">
                                          
                                          <span class="hover:cursor-pointer" onClick={() => deleteFile(tpl_doc.id)}>
                                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path fill="currentColor" d="M7 21q-.825 0-1.412-.587T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413T17 21zM17 6H7v13h10zM9 17h2V8H9zm4 0h2V8h-2zM7 6v13z"/></svg>
                                          </span>
                                        </td>
                                    </tr>          
                              </>
                            ))}
                        </tbody>
                      </table>
            
                      {tpl_docs.length === 0 ? (
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


                <div class="p-3">
           
                   <div class="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-6 mt-3 rounded-md">
                   <strong class="font-semibold">Important:</strong> 
                   &nbsp;Please <span class="font-semibold">do not delete or remove any previously uploaded documents</span> as they are crucial for version tracking.
               </div>
                     <table class="w-full divide-y divide-gray-200 dark:divide-neutral-700">
                       <thead class="bg-gray-100 dark:bg-neutral-700">
                       <tr>
                       <th scope="col" class="px-3 py-3  text-start text-xs font-bolder uppercase dark:text-neutral-500">Version #</th>
                           <th scope="col" class="px-3 py-3  text-start text-xs font-bolder uppercase dark:text-neutral-500">File</th>
                           <th scope="col" class="px-3 py-3  text-start text-xs font-bolder uppercase dark:text-neutral-500">Date Created</th>
                           <th scope="col" class="px-3 py-3  text-start text-xs font-bolder uppercase dark:text-neutral-500"></th>
                         </tr>
                       </thead>
                       <tbody class="divide-y divide-gray-200 dark:divide-neutral-700">
                           { tpl_docs.map((tpl_doc, index) => (
                                <>
                                    <tr class="border-b hover:bg-gray-50">
                                    <td class="px-3 py-3 text-balance whitespace-nowrap text-sm font-medium text-gray-700 dark:text-neutral-200">V{index+1}</td>
                                                        <td class="px-3 py-3 text-balance whitespace-nowrap text-sm font-medium text-gray-700 dark:text-neutral-200">{tpl_doc.file_name}</td>
                                                        <td class="px-3 py-3 whitespace-nowrap truncate text-xs/5 text-gray-500">{dayjs(tpl_doc.created_at).format("LLL")}</td>
                                                        <td class="px-3 py-3 whitespace-nowrap text-end text-sm font-medium">
                                                            
                                                        <span class="hover:cursor-pointer" onClick={() => downloadDoc(tpl_doc)}> <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path fill="currentColor" d="m12 16l-5-5l1.4-1.45l2.6 2.6V4h2v8.15l2.6-2.6L17 11zm-6 4q-.825 0-1.412-.587T4 18v-3h2v3h12v-3h2v3q0 .825-.587 1.413T18 20z"/></svg></span>
                                                        </td>
                                                    </tr>          
                                </>
                            ))}
                         </tbody>
                         </table>

                        

                         {tpl_docs.length === 0 ? (
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
                                    <div class="mt-3">
                                    <button type="button"  class="btn btn-success rounded-full">
                                      Endorse Paper for Technical Clearance
                                      </button>
                                    </div>
                                  </>                       
                                 }
           
                     </div>
            </>
        } 

</div>

<div id="tabs-lifted-techpanelfeedback10" class="hidden" role="tabpanel" aria-labelledby="tabs-lifted-item-techpanelfeedback10">
  <FeedbackStep10 user={user} research={research} feedbacks_step10={feedbacks_step10} />
</div>
    </>
  )
}
