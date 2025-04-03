import {React, useEffect} from 'react'
import { Link, useForm, usePage, router } from '@inertiajs/react';
import { useRef, useState } from 'react';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime);
import localizedFormat from "dayjs/plugin/localizedFormat";
import TurnitinScoreModal from '../SubForms/TurnitinModal';
dayjs.extend(localizedFormat);

export default function Step10({user, research, turnitin_docs}) {
  const notyf = new Notyf();
  const { data, setData, post, delete: destroy, errors, reset, processing, progress, recentlySuccessful } =
      useForm({
        research_id : research.id,
        document_file: "",
        steps: "turnitin"
      });
  
  const submitFilesTurnitin = (e) => {
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

  const downloadDocResult = (file) => {
    fetch(route('researcher.doc.download.result', file.id))
     .then((response) => response.blob())
     .then((blob) => {
       const url = window.URL.createObjectURL(new Blob([blob]));
       const link = document.createElement("a");
       link.href = url;
       link.download = file.turnitin_file || "downloaded-file";
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
       {
        (user.user_type == "cre") ? 
        <>
              <div>
            <div class="card p-3">
                <div class="p-2 mt-5">
                    <h3 class="text-2xl font-semibold text-gray-900">Turnitin Uploading</h3>
                    <p class="text-gray-700 mt-2">Turnitin's helps in detecting potential plagiarism and ensures originality in academic writing. It is widely used by institutions to verify the authenticity of submitted content.</p>
                </div> 

          

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
                <th scope="col" class="px-3 py-3  text-start text-xs font-bolder uppercase dark:text-neutral-500">Score</th>
                <th scope="col" class="px-3 py-3  text-start text-xs font-bolder uppercase dark:text-neutral-500">Status</th>
                <th scope="col" class="px-3 py-3  text-start text-xs font-bolder uppercase dark:text-neutral-500">Result</th>
                <th scope="col" class="px-3 py-3  text-start text-xs font-bolder uppercase dark:text-neutral-500"></th>
              </tr>
            </thead>
                   <tbody class="divide-y divide-gray-200 dark:divide-neutral-700">
                        { turnitin_docs.map((turnitin_doc, index) => (
                            <>
                            <tr class="border-b hover:bg-gray-50">
                            <td class="px-3 py-3 text-balance whitespace-nowrap text-xs font-mono text-gray-700 dark:text-neutral-200">V.{index+1}</td>
                                <td class="px-3 py-3 text-balance whitespace-nowrap text-sm font-medium text-gray-700 dark:text-neutral-200">{turnitin_doc.file_name}</td>
                                <td class="px-3 py-3 whitespace-nowrap truncate text-xs/5 text-gray-500">{dayjs(turnitin_doc.created_at).format("LLL")}</td>
                                <td class="px-3 py-3 whitespace-nowrap text-sm font-medium">{(turnitin_doc.turnitin_score == null) ? "---" : turnitin_doc.turnitin_score}</td>
                                <td className={`px-3 py-3 whitespace-nowrap text-xs font-medium
  ${(turnitin_doc.turnitin_status?.toLowerCase() === "fail") ? "text-red-600" : 
  (turnitin_doc.turnitin_status?.toLowerCase() === "pass") ? "text-green-600" : ""}`}>
  {(turnitin_doc.turnitin_status == null) ? "---" : turnitin_doc.turnitin_status.toUpperCase()}
</td>
                                <td class="px-3 py-3 whitespace-nowrap text-sm font-medium">
                                  <div class="flex gap-1">
                                  {(turnitin_doc.turnitin_status == null) ? "---" :
                                  <>
                                  
                                  <span class=" text-xs font-mono text-gray-700 rounded-full">
                                  ✅ Uploaded
        </span>                                  </>
                                }

                                  {/* {
                                    (turnitin_doc.turnitin_file != null) ? 
                                    <>
                                     <span class="hover:cursor-pointer text-primary"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path fill="currentColor" d="m12 16l-5-5l1.4-1.45l2.6 2.6V4h2v8.15l2.6-2.6L17 11zm-6 4q-.825 0-1.412-.587T4 18v-3h2v3h12v-3h2v3q0 .825-.587 1.413T18 20z"/></svg></span>
                                    </>
                                    :
                                    <></>
                                  } */}
                                  </div>
                                </td>
                                <td class="px-3 py-3 whitespace-nowrap text-end text-sm font-medium">

                                <div class="flex justify-start gap-1">
                         <span class="hover:cursor-pointer">
                          {
                            (turnitin_doc.turnitin_score != null) ?
                            <></>
                            :
                            <>
                            <TurnitinScoreModal file_id={turnitin_doc.id} research={research} className="max-w-xl" />
                            </>
                          }
                          </span>
                          <span class="hover:cursor-pointer" onClick={() => downloadDoc(turnitin_doc)}> <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path fill="currentColor" d="m12 16l-5-5l1.4-1.45l2.6 2.6V4h2v8.15l2.6-2.6L17 11zm-6 4q-.825 0-1.412-.587T4 18v-3h2v3h12v-3h2v3q0 .825-.587 1.413T18 20z"/></svg></span>
                         
                          
                         </div>
                                </td>
                            </tr>          
                            </>
                        ))}
                    </tbody>
            </table>
            {turnitin_docs.length === 0 ? (
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
          <div>
            <div class="card p-3">
                <div class="p-2 mt-5">
                    <h3 class="text-2xl font-semibold text-gray-900">Turnitin Uploading</h3>
                    <p class="text-gray-700 mt-2">Turnitin's helps in detecting potential plagiarism and ensures originality in academic writing. It is widely used by institutions to verify the authenticity of submitted content.</p>
                </div> 

                  {/* File Upload Form */}
  <form onSubmit={submitFilesTurnitin} class="bg-gray-50 p-4 rounded-lg border">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label class="block text-sm font-medium text-gray-700">Document File</label>
        <input 
          type="file" 
          onChange={(e) => setData('document_file', e.target.files[0])} 
          class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2"
        />
        <p class="mt-1 text-xs text-gray-500">Accepted formats: PDF, DOC, DOCX</p>
      </div>
    </div>

    <div class="flex justify-end mt-4">
      <button type="submit" class="flex items-center gap-2 text-sm text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md shadow-md focus:outline-none">
        <span class="icon-[tabler--upload] size-5"></span>Upload
      </button>
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
                <th scope="col" class="px-3 py-3  text-start text-xs font-bolder uppercase dark:text-neutral-500">Score</th>
                <th scope="col" class="px-3 py-3  text-start text-xs font-bolder uppercase dark:text-neutral-500">Status</th>
                <th scope="col" class="px-3 py-3  text-start text-xs font-bolder uppercase dark:text-neutral-500">Result</th>
                <th scope="col" class="px-3 py-3  text-start text-xs font-bolder uppercase dark:text-neutral-500"></th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 dark:divide-neutral-700">
                { turnitin_docs.map((turnitin_doc, index) => (
                    <>
                    <tr class="border-b hover:bg-gray-50">
                        <td class="px-3 py-3 text-balance whitespace-nowrap text-xs font-mono text-gray-700 dark:text-neutral-200">V.{index+1}</td>
                        <td class="px-3 py-3 text-balance whitespace-nowrap text-sm font-medium text-gray-700 dark:text-neutral-200">{turnitin_doc.file_name}</td>
                        <td class="px-3 py-3 whitespace-nowrap truncate text-xs/5 text-gray-500">{dayjs(turnitin_doc.created_at).format("LLL")}</td>
                        <td class="px-3 py-3 whitespace-nowrap text-sm font-medium">{(turnitin_doc.turnitin_score == null) ? "---" : turnitin_doc.turnitin_score}</td>
                        <td className={`px-3 py-3 whitespace-nowrap text-xs font-medium
  ${(turnitin_doc.turnitin_status?.toLowerCase() === "fail") ? "text-red-600" : 
  (turnitin_doc.turnitin_status?.toLowerCase() === "pass") ? "text-green-600" : ""}`}>
  {(turnitin_doc.turnitin_status == null) ? "---" : turnitin_doc.turnitin_status.toUpperCase()}
</td>

                                <td class="px-3 py-3 whitespace-nowrap text-sm font-medium">
                                  <div class="flex gap-1">
                                  {(turnitin_doc.turnitin_status == null) ? "---" : ""}

                                  {
                                    (turnitin_doc.turnitin_file != null) ? 
                                    <>
                                     <span class="hover:cursor-pointer text-primary" onClick={() => downloadDocResult(turnitin_doc)}><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path fill="currentColor" d="m12 16l-5-5l1.4-1.45l2.6 2.6V4h2v8.15l2.6-2.6L17 11zm-6 4q-.825 0-1.412-.587T4 18v-3h2v3h12v-3h2v3q0 .825-.587 1.413T18 20z"/></svg></span>
                                    </>
                                    :
                                    <></>
                                  }
                                  </div>
                                </td>
                        <td class="px-3 py-3 whitespace-nowrap text-end text-sm font-medium">
                         <div class="flex justify-start gap-1">
                            <span class="hover:cursor-pointer" onClick={() => deleteFile(turnitin_doc.id)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path fill="currentColor" d="M7 21q-.825 0-1.412-.587T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413T17 21zM17 6H7v13h10zM9 17h2V8H9zm4 0h2V8h-2zM7 6v13z"/></svg>
                            </span>
                         </div>
                        </td>
                    </tr>          
                    </>
                ))}
            </tbody>
            </table>
            {turnitin_docs.length === 0 ? (
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
