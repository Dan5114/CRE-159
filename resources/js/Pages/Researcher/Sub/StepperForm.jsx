import Pagination from "@/Components/Pagination";
import { Link, useForm, usePage, router } from '@inertiajs/react';
import { useRef, useState } from 'react';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';
import EmptyFile from '../File/EmptyFile';
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime);
import localizedFormat from "dayjs/plugin/localizedFormat";
dayjs.extend(localizedFormat);
import Step1 from "../Forms/Step1";

export default function StepperForm({research, files, user, panels}) {
    const notyf = new Notyf();

    
    const { data, setData, post, errors, reset, processing, progress, recentlySuccessful } =
    useForm({
      research_id : research.id,
      meeting_date: "",
      panels1: "",
      panels2: "",
      panels3: "",
      meeting_id: research.meeting.id,
    });

 

    const submitPanels = (e) => {
      e.preventDefault();
      post(route('researcher.submit.panels'), {
        onSuccess: (page) =>  {
          notyf.success(page.props.flash.message);
          router.get(route('researcher.show', research.reference));
        },
        onFinish: () =>  {
            console.log("Finishing inserting panels");
        },
      });
    }

   

    const openLinkFile = (url) => {
      alert(url);
     }

     const creApproveApplication = () => {
      post(route('researcher.update.status'), {
        onSuccess: (page) =>  {
          notyf.success(page.props.flash.message)
        },
        onFinish: () =>  {
            console.log("Finishing update status");
        },
      });
     }

   

     const scheduledMeeting = () => {
      post(route('researcher.scheduled.meeting'), {
        onSuccess: (page) =>  {
          notyf.success(page.props.flash.message);
        },
        onFinish: () =>  {
            console.log("Finishing update status");
        },
      });
     }
    
    return (
      <>
    <div>
                        
  
    <div data-stepper-content-item='{ "index": 1 }' class="vertical-scrollbar rounded-scrollbar  max-h-300 p-3">
      <div>
        <div class="px-4 sm:px-0">
          <h3 class="text-2xl font-semibold text-base-content">Requirements for Application </h3>
          <p class="mt-1 max-w-full text-base-content/80">The requirements for application for research funding under the FRP as follows: </p>
        </div>
        <Step1 research={research} files={files} user={user}/>
      </div>
    </div>

  {/* end of step1 */}

   <div data-stepper-content-item='{ "index": 2 }' class="vertical-scrollbar rounded-scrollbar max-h-screen p-3">
   <div class="border-base-content/40 bg-base-200/50 rounded-xl border border-dashed p-4" >
   
      {
        (user.user_type == "cre") ? 
        <div id="account-details-validation" class="space-y-5" data-stepper-content-item='{ "index": 2 }'>
 <form onSubmit={submitPanels}>
<div class="grid grid-cols-1 gap-6 md:grid-cols-2 mb-3">
        <div>
            <label class="label label-text" for="firstName">Meeting Date </label>
            <input type="date" placeholder="" onChange={(e) => setData('meeting_date', e.target.value)} class="input" id="firstName" />
          </div>
         
         
        </div>

        <h4 class="text-2xl font-eight-bold">List of Panel Members</h4>
        <div class="grid grid-cols-2 gap-6 md:grid-cols-2">
        <div>
            <label class="label label-text" for="firstName">Panel Member 1 </label>
            <input type="text" placeholder="" class="input" onChange={(e) => setData('panels1', e.target.value )} id="firstName"  />
          </div>
          <div>
            <label class="label label-text" for="firstName">Panel Member 2 </label>
            <input type="text" placeholder="" class="input" onChange={(e) => setData('panels2', e.target.value)} id="firstName"  />
          </div>
         
        </div>
        <div class="grid grid-cols-2 gap-6 md:grid-cols-2">
        <div>
            <label class="label label-text" for="firstName">Panel Member 3 </label>
            <input type="text" placeholder="" class="input" onChange={(e) => setData('panels3', e.target.value)} id="firstName"  />
          </div>

          <div>
            <label class="label label-text" for="firstName">Panel Member 4 </label>
            <input type="text" placeholder="" class="input" id="firstName"  />
          </div>

          <div>
            <label class="label label-text" for="firstName">Panel Member 5 </label>
            <input type="text" placeholder="" class="input" id="firstName"  />
          </div>

          <div>
            <label class="label label-text" for="firstName">Panel Member 6 </label>
            <input type="text" placeholder="" class="input" id="firstName"  />
          </div>

          <div>
            <label class="label label-text" for="firstName">Panel Member 7 </label>
            <input type="text" placeholder="" class="input" id="firstName"  />
          </div>

          <div>
            <label class="label label-text" for="firstName">Panel Member 8 </label>
            <input type="text" placeholder="" class="input" id="firstName"  />
          </div>

        
       
          </div>
        <div class="flex justify-end gap-y-2 mt-3">
        <button type="submit" class="btn btn-info rounded-full">
            Save Draft
       </button>
       &nbsp;
        <button type="button" onClick={() => scheduledMeeting()} class="btn btn-success rounded-full">
            Schedule Appointment
       </button>
        </div>
        </form>
      </div>
      :
      <>
       
        {
          (research.meeting.status == "Success") ?
          
         <>
           <h5 class="text-base-content text-lg mb-3">Meeting Date</h5>
         <div>{ dayjs(research.meeting.meeting_date).format("LLL")}</div>
         <br/>
         <h5 class="text-base-content text-lg mb-3">List of Panels</h5>
<ul class="list-inside list-disc">
{ panels.map((panel, index) => (
              <>
          <li class="mb-2">{panel.name}</li>
              </>
            ))}
  
</ul>
         </>
          :
          "No Scheduled yet"
        }
      </>
      }

     </div>
   </div>
   <div data-stepper-content-item='{ "index": 3 }' style={{"display" : "none"}}>
     <div class="border-base-content/40 bg-base-200/50  rounded-xl border border-dashed m-3" >
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

    <div data-stepper-content-item='{ "index": 4 }' style={{"display" : "none"}}>
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
