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

export default function Step8({user, research, moa_docs}) {
    const notyf = new Notyf();
    const { data, setData, post, patch, delete: destroy, errors, reset, formState, processing, progress, recentlySuccessful } =
    useForm({
        research_id : research.id,
        document_file: "",
        date_completion: "",
        steps: "8"
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

      const researchCompletionDate = (e) => {
        e.preventDefault();
        patch(route('researcher.completion.date',research.id), {
          preserveScroll: true,
            onSuccess: (page) =>  {
                notyf.success(page.props.flash.message);
            },
            onFinish: () =>  {
                console.log("Finishing updating completion date");
                reset()
            },
        });
    }

  return (
    <>
      {
        (user.user_type == "cre") ? 
        <>
<div class="p-6 bg-white rounded-lg shadow-lg border border-gray-200">
  {/* Section Header */}
  <div class="mb-5">
    <div class="flex items-center gap-3">
     
      <h1 class="text-2xl font-bold text-gray-900">MOA Documents</h1>
    </div>
    <p class="text-gray-600 mt-1 text-sm">Digital process for managing documents and agreements efficiently.</p>
  </div>

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
  
          <form onSubmit={researchCompletionDate}>
            <div class="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3 items-center">
              {/* Extension Date */}
              <div>
                <label for="extension-date" class="block text-sm font-medium text-gray-700">
                  Completion Date <span class="text-gray-400">(optional)</span>
                </label>
                <input type="date" id="extension-date" value={data.date_completion} onChange={(e) => setData('date_completion', e.target.value)}
                  name="extension-date" class="block w-full border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm p-2" />
              </div>
  
              <div class="flex items-end mt-5">
                <button type="submit" class="disable w-full sm:w-auto px-4 py-2 text-sm text-white bg-green-600 hover:bg-green-700 rounded-md shadow-md focus:outline-none">
                  Save Changes
                </button>
              </div>
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

  {/* Upload Form */}
  <form onSubmit={submitFiles} class="bg-gray-50 p-4 rounded-lg border">
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

  {/* Warning Message */}
  <div class="mt-5 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 p-4 rounded-md shadow-sm">
    <strong class="font-semibold">Important:</strong> Please <span class="font-semibold">do not delete or remove any previously uploaded documents</span> as they are crucial for version tracking.
  </div>

  {/* Documents Table */}
  <div class="mt-6">
    <h3 class="text-lg font-semibold text-gray-800 mb-3">Uploaded MOA Versions</h3>
    {moa_docs.length > 0 ? (
      <div class="overflow-x-auto">
        <table class="w-full border rounded-md shadow-sm bg-white">
          <thead class="bg-gray-100 text-gray-700 uppercase text-sm">
            <tr>
              <th class="px-4 py-3 text-left">Version #</th>
              <th class="px-4 py-3 text-left">File</th>
              <th class="px-4 py-3 text-left">Date Created</th>
              <th class="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {moa_docs.map((moa_doc, index) => (
              <tr key={index} class="border-b hover:bg-gray-50">
                <td class="px-4 py-3 text-sm font-medium text-gray-700">V{index + 1}</td>
                <td class="px-4 py-3 text-sm font-medium text-gray-700">{moa_doc.file_name}</td>
                <td class="px-4 py-3 text-xs text-gray-500">{dayjs(moa_doc.created_at).format("LLL")}</td>
                <td class="px-4 py-3 text-right">
                  <button 
                    onClick={() => deleteFile(moa_doc.id)}
                    class="text-red-600 hover:text-red-700"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
                      <path fill="currentColor" d="M7 21q-.825 0-1.412-.587T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413T17 21zM17 6H7v13h10zM9 17h2V8H9zm4 0h2V8h-2zM7 6v13z"/>
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    ) : (
      /* Empty State */
      <div class="bg-white p-6 shadow-lg rounded-lg border border-gray-200 mt-4 text-center">
        <div class="flex justify-center items-center">
          <svg class="h-16 w-16 text-gray-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 4V6H7V4H5v16h14V4h-2z"></path>
          </svg>
        </div>
        <h3 class="text-lg font-semibold text-gray-800 mt-3">Oops, no documents found!</h3>
        <p class="text-gray-500 text-sm mt-1">You haven’t uploaded any documents yet. Start by uploading a new one.</p>
      </div>
    )}
  </div>
</div>

        </>
        :
        <>
          <div class="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
  
  {/* Section Header */}
  <div class="mb-5">
    <h1 class="text-2xl font-bold text-gray-900">MOA Documents</h1>
    <p class="text-gray-600 text-sm mt-1">Manage your documents and agreements efficiently.</p>
  </div>

  {/* Important Message */}
  <div class="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 p-4 rounded-md shadow-sm mb-5">
    <strong class="font-semibold">Important:</strong> Please <span class="font-semibold">do not delete or remove any previously uploaded documents</span> as they are crucial for version tracking.
  </div>

 {/* Documents Table */}
 <div class="mt-6">
    <h3 class="text-lg font-semibold text-gray-800 mb-3">Uploaded MOA Versions</h3>
    {moa_docs.length > 0 ? (
      <div class="overflow-x-auto">
        <table class="w-full border rounded-md shadow-sm bg-white">
          <thead class="bg-gray-100 text-gray-700 uppercase text-sm">
            <tr>
              <th class="px-4 py-3 text-left">Version #</th>
              <th class="px-4 py-3 text-left">File</th>
              <th class="px-4 py-3 text-left">Date Created</th>
              <th class="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {moa_docs.map((moa_doc, index) => (
              <tr key={index} class="border-b hover:bg-gray-50">
                <td class="px-4 py-3 text-sm font-medium text-gray-700">V{index + 1}</td>
                <td class="px-4 py-3 text-sm font-medium text-gray-700">{moa_doc.file_name}</td>
                <td class="px-4 py-3 text-xs text-gray-500">{dayjs(moa_doc.created_at).format("LLL")}</td>
                <td class="px-4 py-3 text-right">
                  <button 
                    onClick={() => deleteFile(moa_doc.id)}
                    class="text-red-600 hover:text-red-700"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
                      <path fill="currentColor" d="M7 21q-.825 0-1.412-.587T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413T17 21zM17 6H7v13h10zM9 17h2V8H9zm4 0h2V8h-2zM7 6v13z"/>
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    ) : (
      /* Empty State */
      <div class="bg-white p-6 shadow-lg rounded-lg border border-gray-200 mt-4 text-center">
        <div class="flex justify-center items-center">
          <svg class="h-16 w-16 text-gray-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 4V6H7V4H5v16h14V4h-2z"></path>
          </svg>
        </div>
        <h3 class="text-lg font-semibold text-gray-800 mt-3">Oops, no documents found!</h3>
        <p class="text-gray-500 text-sm mt-1">You haven’t uploaded any documents yet. Start by uploading a new one.</p>
      </div>
    )}
  </div>
</div>

        </>

     }
    </>
  )
}
