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

export default function Step13({user, research, completion_cert_docs}) {
    const notyf = new Notyf();
    const { data, setData, post,  delete: destroy, errors, reset, formState, processing, progress, recentlySuccessful } =
    useForm({
        research_id : research.id,
        document_file: "",
        steps: "13"
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
      {
        (user.user_type == "researcher") ? 
        <>
       <div class="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
  
  {/* Section Header */}
  <div class="mb-5">
    <h1 class="text-2xl font-bold text-gray-900">Completion Certificate</h1>
    <p class="text-gray-600 text-sm mt-1">
      A detailed breakdown of the projected costs and funding required for the proposed research project.
    </p>
  </div>

  {/* Important Note */}
  <div class="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 p-4 rounded-md shadow-sm mt-5">
    <strong class="font-semibold">Important:</strong> Please <span class="font-semibold">do not delete or remove any previously uploaded documents</span> as they are crucial for version tracking.
  </div>

  {/* Documents Table */}
  {completion_cert_docs.length > 0 ? (
    <div class="mt-4 overflow-x-auto">
      <table class="w-full border rounded-md shadow-sm bg-white">
        <thead class="bg-gray-100 text-gray-700 uppercase text-sm">
          <tr>
            <th class="px-4 py-3 text-left">Version #</th>
            <th class="px-4 py-3 text-left">File</th>
            <th class="px-4 py-3 text-left">Date Created</th>
            <th class="px-4 py-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200">
          {completion_cert_docs.map((completion_cert_doc, index) => (
            <tr key={index} class="border-b hover:bg-gray-50">
              <td class="px-4 py-3 text-sm font-medium text-gray-700">V{index + 1}</td>
              <td class="px-4 py-3 text-sm font-medium text-gray-700">{completion_cert_doc.file_name}</td>
              <td class="px-4 py-3 text-xs text-gray-500">{dayjs(completion_cert_doc.created_at).format("LLL")}</td>
              <td class="px-4 py-3 text-right">
                <button 
                  onClick={() => downloadDoc(completion_cert_doc)}
                  class="text-gray-600 hover:text-gray-700"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path fill="currentColor" d="m12 16l-5-5l1.4-1.45l2.6 2.6V4h2v8.15l2.6-2.6L17 11zm-6 4q-.825 0-1.412-.587T4 18v-3h2v3h12v-3h2v3q0 .825-.587 1.413T18 20z"/></svg>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ) : (
    /* Empty State */
    <div class="bg-white p-6 shadow-lg rounded-lg border border-gray-200 mt-5 text-center">
      <div class="flex justify-center items-center">
        <svg class="h-16 w-16 text-gray-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 4V6H7V4H5v16h14V4h-2z"></path>
        </svg>
      </div>
      <h3 class="text-lg font-semibold text-gray-800 mt-3">No documents uploaded yet</h3>
      <p class="text-gray-500 text-sm mt-1">Start by uploading a new document.</p>
    </div>
  )}
</div>

        </>
        :
        <>
          <div class="card p-3">

          <div class="mb-4">
        <h1 class="text-3xl font-bold text-gray-900">Completion Certificate</h1>
        <p class="text-gray-600 mt-3">
        A detailed breakdown of the projected costs and funding required for the proposed research project.
      </p>
    </div>

     {/* File Upload Form */}
     <form onSubmit={submitFiles} className="bg-gray-50 p-6 rounded-lg border shadow-md">
  {/* Form Grid Layout */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

    {/* 📄 Document Upload */}
    <div>
      <label className="block text-sm font-medium text-gray-700">File</label>
      <input 
        type="file" 
        onChange={(e) => setData('document_file', e.target.files[0])} 
        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2"
      />
      <p className="mt-1 text-xs text-gray-500">Accepted formats: PDF, DOC, DOCX</p>
    </div>

    {/* 📆 Academic Year (AY) of Research */}
    <div>
      <label className="block text-sm font-medium text-gray-700">Academic Year (AY) of Research</label>
      <input 
        type="text" 
        placeholder="e.g., 2024-2025" 
        onChange={(e) => setData('academic_year', e.target.value)} 
        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2"
      />
    </div>

    {/* 📅 Date Completed */}
    <div>
      <label className="block text-sm font-medium text-gray-700">Date Completed</label>
      <input 
        type="date" 
        onChange={(e) => setData('date_completed', e.target.value)} 
        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2"
      />
    </div>

    {/* 🎓 Date Certificate Issued */}
    <div>
      <label className="block text-sm font-medium text-gray-700">Date Certificate Issued</label>
      <input 
        type="date" 
        onChange={(e) => setData('date_certificate_issued', e.target.value)} 
        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2"
      />
    </div>

  </div>

  {/* Submit Button */}
  <div className="flex justify-end mt-6">
    <button 
      type="submit" 
      className="flex items-center gap-2 text-sm text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md shadow-md focus:outline-none transition-all"
    >
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="20" 
        height="20" 
        viewBox="0 0 24 24" 
        className="fill-current"
      >
        <path d="M5 20h14v-2H5zm7-2l5-5h-3V4h-4v9H7z" />
      </svg>
      Upload
    </button>
  </div>
</form>



        <div class="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-6 mt-3 rounded-md">
        <strong class="font-semibold">Important:</strong> 
        &nbsp;Please <span class="font-semibold">do not delete or remove any previously uploaded documents</span> as they are crucial for version tracking.
    </div>
        {/* Documents Table */}
  {completion_cert_docs.length > 0 ? (
    <div class="mt-4 overflow-x-auto">
      <table class="w-full border rounded-md shadow-sm bg-white">
        <thead class="bg-gray-100 text-gray-700 uppercase text-sm">
          <tr>
            <th class="px-4 py-3 text-left">Version #</th>
            <th class="px-4 py-3 text-left">File</th>
            <th class="px-4 py-3 text-left">Date Created</th>
            <th class="px-4 py-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200">
          {completion_cert_docs.map((completion_cert_doc, index) => (
            <tr key={index} class="border-b hover:bg-gray-50">
              <td class="px-4 py-3 text-sm font-medium text-gray-700">V{index + 1}</td>
              <td class="px-4 py-3 text-sm font-medium text-gray-700">{completion_cert_doc.file_name}</td>
              <td class="px-4 py-3 text-xs text-gray-500">{dayjs(completion_cert_doc.created_at).format("LLL")}</td>
              <td class="px-4 py-3 text-right">
                <button 
                  onClick={() => deleteFile(completion_cert_doc.id)}
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
    <div class="bg-white p-4 shadow-lg rounded-lg border border-gray-200 text-center">
      <div class="flex justify-center items-center">
        <svg class="h-16 w-16 text-gray-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 4V6H7V4H5v16h14V4h-2z"></path>
        </svg>
      </div>
      <h3 class="text-lg font-semibold text-gray-800 mt-3">No documents uploaded yet</h3>
      <p class="text-gray-500 text-sm mt-1">Start by uploading a new document.</p>
    </div>
  )}

          </div>
        </>

     }
    </>
  )
}
