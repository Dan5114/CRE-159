import Pagination from "@/Components/Pagination";
import { Link, useForm, usePage, router } from '@inertiajs/react';
import { useRef, useState } from 'react';
import EmptyFile from '../File/EmptyFile';
import Step1 from "../Forms/Step1";
import Step2 from "../Forms/Step2";
import Step3 from "../Forms/Step3";
import Step4 from "../Forms/Step4";

export default function StepperForm({research, files, user, panels, technical_docs, revised_docs}) {
    
    const openLinkFile = (url) => {
      alert(url);
     }

    return (
      <>
    <div>
                        
  
    <div data-stepper-content-item='{ "index": 1 }' class="vertical-scrollbar card rounded-scrollbar max-h-auto p-3">
      <div>
        <div class="px-4 sm:px-0">
          <h3 class="text-2xl font-semibold text-base-content">Requirements for Application </h3>
          <p class="mt-1 max-w-full text-base-content/80">The requirements for application for research funding under the FRP as follows: </p>
        </div>
        <Step1 research={research} files={files} user={user}/>
      </div>
    </div>

  {/* end of step1 */}

   <div data-stepper-content-item='{ "index": 2 }' class="vertical-scrollbar card rounded-scrollbar max-h-auto p-3">
      <div>
        <Step2 user={user} research={research} panels={panels}/>
      </div>
   </div>
   <div data-stepper-content-item='{ "index": 3 }' style={{"display" : "none"}}>
     <div>
        <Step3 user={user} research={research} technical_docs={technical_docs}/>
     </div>
   </div>

    <div data-stepper-content-item='{ "index": 4 }' style={{"display" : "none"}}>
      <div>
        <Step4 user={user} research={research} revised_docs={revised_docs}/>
     </div>
   </div>

   <div data-stepper-content-item='{ "index": 5 }' style={{"display" : "none"}}>
     <div class="border-base-content/40 bg-base-200/50 items-center justify-center rounded-xl border border-dashed m-3" >
     {
        (user.user_type == "researcher") ? 
        <>
        <div>
          
        <div class="m-3">

        <div class="grid grid-cols-2 gap-6 md:grid-cols-2 ">
           <div>
            <label class="label label-text" for="firstName">Document File </label>
            <input type="file" placeholder="" onChange={(e) => setData('meeting_date', e.target.value)} class="input" id="firstName" />
          </div>

          <div class="flex justify-end gap-y-2 mt-7">
     
        <button type="button" class="btn btn-primary rounded-full">
            Upload Document
       </button>

      

        </div>
        </div>

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
          <div>
            
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
     </div>
   </div>

   <div data-stepper-content-item='{ "index": 6 }' style={{"display" : "none"}}>
     <div class="border-base-content/40 bg-base-200/50 rounded-xl border border-dashed m-3" >
     {
        (user.user_type == "researcher") ? 
        <>
        <div>
          
        <div class="m-3">

        <div class="grid grid-cols-2 gap-6 md:grid-cols-2 ">
           <div>
            <label class="label label-text" for="firstName">Document File </label>
            <input type="file" placeholder="" onChange={(e) => setData('meeting_date', e.target.value)} class="input" id="firstName" />
          </div>

          <div class="flex justify-end gap-y-2 mt-7">
     
        <button type="button" class="btn btn-primary rounded-full">
            Upload Document
       </button>

      

        </div>
        </div>

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
          <div>
            
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
     </div>
   </div>

   <div data-stepper-content-item='{ "index": 7 }' style={{"display" : "none"}}>
     <div class="border-base-content/40 bg-base-200/50 flex h-48 items-center justify-center rounded-xl border border-dashed m-3" >
       <h3 class="text-base-content/50 text-2xl">Seventh content</h3>
     </div>
   </div>

   <div data-stepper-content-item='{ "index": 8 }' style={{"display" : "none"}}>
     <div class="border-base-content/40 bg-base-200/50 rounded-xl border border-dashed m-3" >
     {
        (user.user_type == "cre") ? 
        <>
        <div>
          
        <div class="m-3">

        <div class="grid grid-cols-2 gap-6 md:grid-cols-2 ">
           <div>
            <label class="label label-text" for="firstName">Document File </label>
            <input type="file" placeholder="" onChange={(e) => setData('meeting_date', e.target.value)} class="input" id="firstName" />
          </div>

          <div class="flex justify-end gap-y-2 mt-7">
     
        <button type="button" class="btn btn-primary rounded-full">
            Upload Document
       </button>

      

        </div>
        </div>

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
          <div>
            
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
     </div>
   </div>
   {/* <div data-stepper-content-item='{ "index": 4 }' style={{"display" : "none"}}>
     <div class="border-base-content/40 bg-base-200/50 flex h-48 items-center justify-center rounded-xl border border-dashed m-3" >
       <h3 class="text-base-content/50 text-2xl">Foruth content</h3>
     </div>
   </div> */}
  
 </div>
      </>
    );
}
