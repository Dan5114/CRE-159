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

export default function Step4({user, research, revised_docs}) {
  const notyf = new Notyf();
  const { data, setData, post,  delete: destroy, errors, reset, formState, processing, progress, recentlySuccessful } =
  useForm({
      research_id : research.id,
      document_file: "",
      steps: "4"
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

  return (
    <>
             {
        (user.user_type == "researcher") ? 
        <>
        <div>
          
        <div class="card p-3">

        <div class="px-4 sm:px-0 mb-6">
          <h3 class="text-2xl font-semibold text-base-content">Uploading Revised Documents </h3>
          <p class="mt-1 max-w-full text-base-content/80">Fill up fields to upload document</p>
        </div>

        <hr/>

        <form onSubmit={submitFiles}>
          <div class="grid grid-cols-2 gap-6 md:grid-cols-2 ">
           
          <div>
            <label class="label label-text" for="firstName">Document File </label>
            <input type="file" placeholder="" onChange={(e) => setData('document_file', e.target.files[0])} class="input" id="firstName" />
          </div>

            <div class="flex justify-end gap-y-2 mt-7">
        
              <button type="submit" class="btn btn-primary rounded-full">
                  Upload Document
              </button>
            </div>
          </div>
        </form>


        <table class="w-full border divide-y divide-gray-200 dark:divide-neutral-700 mt-3">
            <thead class="bg-[#198754] dark:bg-neutral-700">
              <tr>
              <th scope="col" class="px-3 py-3  text-start text-xs font-bolder text-white uppercase dark:text-neutral-500">Review</th>
                <th scope="col" class="px-3 py-3  text-start text-xs font-bolder text-white uppercase dark:text-neutral-500">File</th>
                <th scope="col" class="px-3 py-3  text-start text-xs font-bolder text-white uppercase dark:text-neutral-500">Date Created</th>
                <th scope="col" class="px-3 py-3  text-start text-xs font-bolder text-white uppercase dark:text-neutral-500">Status</th>
                <th scope="col" class="px-3 py-3  text-start text-xs font-bolder text-white uppercase dark:text-neutral-500">Actions</th>
                <th scope="col" class="px-3 py-3  text-end text-xs font-bolder text-white uppercase dark:text-neutral-500"></th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 dark:divide-neutral-700">
              </tbody>
              </table>
              <div class="flex justify-center border-2 border-dotted border-gray-300 p-3">
                        <div class="grid gap-4 w-80 justify-center">
                        no files
                      
<div class="flex justify-center">

</div>
</div>
                        </div>
         
         
        </div>
        </div>
        </>
        :
        <>
          <div class="card p-3">

          <div class="px-4 sm:px-0 mb-6">
          <h3 class="text-2xl font-semibold text-base-content">Revised Documents </h3>
          <p class="mt-1 max-w-full text-base-content/80">See details below</p>
        </div>

        <hr/>
            
          <table class="w-full border divide-y divide-gray-200 dark:divide-neutral-700">
            <thead class="bg-[#198754] dark:bg-neutral-700">
              <tr>
              <th scope="col" class="px-3 py-3  text-start text-xs font-bolder text-white uppercase dark:text-neutral-500">Review</th>
                <th scope="col" class="px-3 py-3  text-start text-xs font-bolder text-white uppercase dark:text-neutral-500">File</th>
                <th scope="col" class="px-3 py-3  text-start text-xs font-bolder text-white uppercase dark:text-neutral-500">Date Created</th>
                <th scope="col" class="px-3 py-3  text-start text-xs font-bolder text-white uppercase dark:text-neutral-500">Status</th>
                <th scope="col" class="px-3 py-3  text-start text-xs font-bolder text-white uppercase dark:text-neutral-500">Actions</th>
                <th scope="col" class="px-3 py-3  text-end text-xs font-bolder text-white uppercase dark:text-neutral-500"></th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 dark:divide-neutral-700">
              </tbody>
              </table>
              <div class="flex justify-center border-2 border-dotted border-gray-300 p-3">
                        <div class="grid gap-4 w-80 justify-center">
                        no files
                      
<div class="flex justify-center">

</div>
</div>
                        </div>

          </div>
        </>

     }
    </>
  )
}
