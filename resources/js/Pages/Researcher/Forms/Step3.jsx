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
import FeedbackStep3 from '../Feedback/FeedbackStep3';

export default function Step3({user, research, technical_docs, feedbacks_step3, feedbacks_step3_notif}) {
    const notyf = new Notyf();
    const { data, setData, post,  delete: destroy, errors, reset, formState, processing, progress, recentlySuccessful } =
    useForm({
        research_id : research.id,
        report_date: "",
        document_file: "",
        steps: "3"
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


  return (
    <>
         <nav class="tabs tabs-lifted mt-3 p-2" aria-label="Tabs" role="tablist" aria-orientation="horizontal">
        <button type="button" class="tab active-tab:tab-active active" id="tabs-lifted-item-3" data-tab="#tabs-lifted-3" aria-controls="tabs-lifted-1" role="tab" aria-selected="true">
          Files
        </button>
        <button type="button" class="tab active-tab:tab-active" id="tabs-lifted-item-4" data-tab="#tabs-lifted-4" aria-controls="tabs-lifted-2" role="tab" aria-selected="false">
          Feedback
          {
      (feedbacks_step3_notif == 0) ? 
      ""
      :
      <span class="badge bg-[#FF0000] text-white badge-sm ms-2 rounded-full">+{feedbacks_step3_notif}</span>
    }
        </button>
      </nav>

      <div class="mt-3">
        <div id="tabs-lifted-3" role="tabpanel" aria-labelledby="tabs-lifted-item-3">
        {
        (user.user_type == "cre") ? 
        <>
        <div>
          

   

        <form onSubmit={submitFiles}>
        <div class="grid grid-cols-3 gap-6 md:grid-cols-3 mt-3 mb-3">

        <div>
            <label class="label label-text" for="firstName">Report Date </label>
            <input type="date" placeholder="" onChange={(e) => setData('report_date', e.target.value)} class="input" id="firstName" />
          </div>

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

        <table class="w-full divide-y divide-gray-200 dark:divide-neutral-700 mt-3">
            <thead class="bg-gray-300 dark:bg-neutral-700">
              <tr>
                <th scope="col" class="px-3 py-3  text-start text-xs font-bolder text-base-content uppercase dark:text-neutral-500">File</th>
                <th scope="col" class="px-3 py-3  text-start text-xs font-bolder text-base-content uppercase dark:text-neutral-500">Report Date</th>
                <th scope="col" class="px-3 py-3  text-start text-xs font-bolder text-base-content uppercase dark:text-neutral-500">Date Created</th>
                <th scope="col" class="px-3 py-3  text-start text-xs font-bolder text-base-content uppercase dark:text-neutral-500"></th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 dark:divide-neutral-700">
                { technical_docs.map((technical_doc, index) => (
                  <>
                  {/* <tr class={index % 2 !== 0 ? "bg-gray-50 dark:bg-gray-800 dark:border-gray-700" : "bg-gray-200 dark:bg-gray-800 dark:border-gray-700"}> */}
                       <tr>
                        <td class="px-3 py-3 text-balance whitespace-nowrap text-sm font-medium text-gray-700 dark:text-neutral-200">{technical_doc.file_name}</td>
                        <td class="px-3 py-3 whitespace-nowrap truncate text-xs/5 text-gray-500">{dayjs(technical_doc.report_date).format("LLL")}</td>
                        <td class="px-3 py-3 whitespace-nowrap truncate text-xs/5 text-gray-500">{dayjs(technical_doc.created_at).format("LLL")}</td>
                        <td class="px-3 py-3 whitespace-nowrap text-end text-sm font-medium">
                          
                          <span class="hover:cursor-pointer" onClick={() => deleteFile(technical_doc.id)}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path fill="currentColor" d="M7 21q-.825 0-1.412-.587T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413T17 21zM17 6H7v13h10zM9 17h2V8H9zm4 0h2V8h-2zM7 6v13z"/></svg>
                          </span>
                        </td>
                    </tr>          
                  </>
                ))}
              </tbody>
              </table>

              {technical_docs.length === 0 ? (
                       <>
                        <div class="flex justify-center border-2 border-dotted border-gray-300 p-3">
                        <div class="grid gap-4 w-80 justify-center">
                        <img style={{ "width" : "200px" }} src="https://www.achieversacademyalwar.in/assets/images/no-record-found.png" />
                      
<div class="flex justify-center">

</div>
</div>
                        </div>
                       </>                 
                      )
                        :                               
                       <></>                       
                      }
              
         
        </div>
        </>
        :
        <>
          <div class="">
          <table class="w-full divide-y divide-gray-200 dark:divide-neutral-700 mt-3">
            
            <thead class="bg-gray-300 dark:bg-neutral-700">
              <tr>
                <th scope="col" class="px-3 py-3  text-start text-xs font-bolder text-base-content uppercase dark:text-neutral-500">File</th>
                <th scope="col" class="px-3 py-3  text-start text-xs font-bolder text-base-content uppercase dark:text-neutral-500">Report Date</th>
                <th scope="col" class="px-3 py-3  text-start text-xs font-bolder text-base-content uppercase dark:text-neutral-500">Date Created</th>
                <th scope="col" class="px-3 py-3  text-start text-xs font-bolder text-base-content uppercase dark:text-neutral-500"></th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 dark:divide-neutral-700">
                { technical_docs.map((technical_doc, index) => (
                        <>
                               <tr>
                                                  <td class="px-3 py-3 text-balance whitespace-nowrap text-sm font-medium text-gray-700 dark:text-neutral-200">{technical_doc.file_name}</td>
                                                  <td class="px-3 py-3 whitespace-nowrap truncate text-xs/5 text-gray-500">{dayjs(technical_doc.report_date).format("LLL")}</td>
                                                  <td class="px-3 py-3 whitespace-nowrap truncate text-xs/5 text-gray-500">{dayjs(technical_doc.created_at).format("LLL")}</td>
                                                  <td class="px-3 py-3 whitespace-nowrap text-end text-sm font-medium">
                                                 <span class="hover:cursor-pointer" onClick={() => downloadDoc(technical_doc)}> <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path fill="currentColor" d="m12 16l-5-5l1.4-1.45l2.6 2.6V4h2v8.15l2.6-2.6L17 11zm-6 4q-.825 0-1.412-.587T4 18v-3h2v3h12v-3h2v3q0 .825-.587 1.413T18 20z"/></svg></span>
                                                  </td>
                                 
                                              </tr>          
                
                        </>
                ))}
              </tbody>
              </table>

              {technical_docs.length === 0 ? (
                       <>
                        <div class="flex justify-center border-2 border-dotted border-gray-300 p-3">
                        <div class="grid gap-4 w-80 justify-center">
                        <img style={{ "width" : "200px" }} src="https://www.achieversacademyalwar.in/assets/images/no-record-found.png" />
                      
<div class="flex justify-center">

</div>
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
        </div>
        <div id="tabs-lifted-4" class="hidden" role="tabpanel" aria-labelledby="tabs-lifted-item-4">
          <FeedbackStep3 user={user} research={research} feedbacks_step3={feedbacks_step3} />
        </div>
      </div>
    </>
  )
}
