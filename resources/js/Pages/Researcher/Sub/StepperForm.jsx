import Pagination from "@/Components/Pagination";
import { Link, useForm, usePage, router } from '@inertiajs/react';
import { useRef, useState } from 'react';
import EmptyFile from '../File/EmptyFile';
import Step1 from "../Forms/Step1";
import Step2 from "../Forms/Step2";
import Step3 from "../Forms/Step3";
import Step4 from "../Forms/Step4";
import Step5 from "../Forms/Step5";
import Step6 from "../Forms/Step6";
import Step8 from "../Forms/Step8";

export default function StepperForm({research, files, user, panels, technical_docs, revised_docs, ethics_docs, budget_docs, moa_docs, feedbacks_step1, feedbacks_step1_notif, feedbacks_step3, feedbacks_step3_notif, feedbacks_step4, feedbacks_step4_notif, endorsement_status, tech_doc}) {

  const getCurrentIndex = (user.user_type != "tpl" ? 1 : 3);
    
    const openLinkFile = (url) => {
      alert(url);
     }

    return (
      <>
    <div data-stepper={(user.user_type != "tpl" ? '{ "currentIndex": 1 }' : '{ "currentIndex": 3 }')} class="w-full">
                        
  
  {
    (user.user_type != "tpl") ?
      <div data-stepper-content-item='{ "index": 1 }' class="vertical-scrollbar card rounded-scrollbar max-h-auto p-3">
      <div>
        <div class="px-4 sm:px-0">
          <h3 class="text-2xl font-semibold text-base-content">Requirements for Application </h3>
          <p class="mt-1 max-w-full text-base-content/80">The requirements for application for research funding under the FRP as follows: </p>
        </div>
        <Step1 research={research} files={files} user={user} feedbacks_step1={feedbacks_step1} feedbacks_step1_notif={feedbacks_step1_notif}/>
      </div>
    </div>
    :
    <></>
  }

  {/* end of step1 */}

   {
    (user.user_type != "tpl") ?
    <div data-stepper-content-item='{ "index": 2 }' class="vertical-scrollbar card rounded-scrollbar max-h-auto p-3">
      <div>
        <Step2 user={user} research={research} panels={panels}/>
      </div>
   </div>
   :
   <></>
   }


   <div data-stepper-content-item='{ "index": 3 }'  class="vertical-scrollbar card rounded-scrollbar max-h-auto p-3">
     <div>
     <div class="px-4 sm:px-0 mb-6">
          <h3 class="text-2xl font-semibold text-base-content">Technical Review Report</h3>
          <p class="mt-1 max-w-full text-base-content/80">Fill up fields to upload document</p>
        </div>
        <Step3 user={user} research={research} technical_docs={technical_docs} feedbacks_step3={feedbacks_step3} feedbacks_step3_notif={feedbacks_step3_notif}/>
     </div>
   </div>

    <div data-stepper-content-item='{ "index": 4 }' class="vertical-scrollbar card rounded-scrollbar max-h-auto p-3">
      <div>
      <div class="px-4 sm:px-0 mb-6">
          <h3 class="text-2xl font-semibold text-base-content">Uploading Revised Documents </h3>
          <p class="mt-1 max-w-full text-base-content/80">Fill up fields to upload document</p>
        </div>
        <Step4 user={user} research={research} revised_docs={revised_docs}  feedbacks_step4={feedbacks_step4} feedbacks_step4_notif={feedbacks_step4_notif} endorsement_status={endorsement_status} tech_doc={tech_doc}/>
     </div>
   </div>

    {
      (user.user_type != "tpl") ?
      <div data-stepper-content-item='{ "index": 5 }' class="vertical-scrollbar card rounded-scrollbar max-h-auto p-3">
     <div>
     <div class="px-4 sm:px-0 mb-6">
          <h3 class="text-2xl font-semibold text-base-content">Ethics Clearance </h3>
          <p class="mt-1 max-w-full text-base-content/80">See details below</p>
        </div>
        <Step5 user={user} research={research} ethics_docs={ethics_docs}/>
     </div>
   </div>
   :
   <></>
    }

    {
      (user.user_type != "tpl") ?
      <div data-stepper-content-item='{ "index": 6 }' style={{"display" : "none"}}>
      <div>
        <Step6 user={user} research={research} budget_docs={budget_docs}/>
     </div>
   </div>
   :
   <></>
    }

    {
      (user.user_type != "tpl") ?
      <div data-stepper-content-item='{ "index": 7 }' style={{"display" : "none"}}>
      <div class="border-base-content/40 bg-base-200/50 flex h-48 items-center justify-center rounded-xl border border-dashed m-3" >
        <h3 class="text-base-content/50 text-2xl">Seventh content</h3>
      </div>
    </div>
    :
    <></>
    }

    {
      (user.user_type != "tpl") ?
      <div data-stepper-content-item='{ "index": 8 }' style={{"display" : "none"}}>
      <div>
        <Step8 user={user} research={research} moa_docs={moa_docs}/>
     </div>
   </div>
   :
   <></>
    }

   

 

  
   {/* <div data-stepper-content-item='{ "index": 4 }' style={{"display" : "none"}}>
     <div class="border-base-content/40 bg-base-200/50 flex h-48 items-center justify-center rounded-xl border border-dashed m-3" >
       <h3 class="text-base-content/50 text-2xl">Foruth content</h3>
     </div>
   </div> */}
  
 </div>
      </>
    );
}
