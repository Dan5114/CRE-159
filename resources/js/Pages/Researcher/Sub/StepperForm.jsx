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
import Step7 from "../Forms/Step7";
import Step8 from "../Forms/Step8";
import Step9 from "../Forms/Step9";
import Step10 from "../Forms/Step10";
import Step11 from "../Forms/Step11";
import Step12 from "../Forms/Step12";
import Step13 from "../Forms/Step13";

export default function StepperForm({research, files, user, panels, technical_docs, revised_docs, tpl_docs, ethics_docs, budget_docs, final_docs, completion_cert_docs, moa_docs, feedbacks_step1, feedbacks_step1_notif, feedbacks_step3, feedbacks_step3_notif, feedbacks_step4, feedbacks_step4_notif,feedbacks_step10, feedbacks_step10_notif, endorsement_status, tech_doc , urb_approval, progress_report, revisions_docs, turnitin_docs, user_panels, contents_mce, contents_mce_tech, contents_mce_terminal}) {

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
        <h1 class="text-3xl font-bold text-gray-900">Requirements for Application</h1>
        <p class="text-gray-600 mt-3">
        The requirements for application for research funding under the FRP as follows:
      </p>
        </div>
        <Step1 research={research} files={files} user={user} feedbacks_step1={feedbacks_step1} feedbacks_step1_notif={feedbacks_step1_notif} revisions_docs={revisions_docs}/>
      </div>
    </div>
    :
    <></>
  }

  {/* end of step1 */}

   {
    (user.user_type != "tpl") ?
    <div data-stepper-content-item='{ "index": 2 }' class="card rounded-scrollbar max-h-auto p-3">
      <div>
        <Step2 user={user} research={research} panels={panels} user_panels={user_panels}/>
      </div>
   </div>
   :
   <></>
   }


   <div data-stepper-content-item='{ "index": 3 }'  class="vertical-scrollbar card rounded-scrollbar max-h-auto p-3">
     <div>
    
        <div class="mb-4">
        <h1 class="text-3xl font-bold text-gray-900">Technical Review Report</h1>
        <p class="text-gray-600 mt-3">
        A detailed analysis of the technical aspects of the project, including design, implementation, and quality assurance.
      </p>
    </div>
        <Step3 user={user} research={research} panels={panels} contents_mce={contents_mce} contents_mce_tech={contents_mce_tech} technical_docs={technical_docs} feedbacks_step3={feedbacks_step3} feedbacks_step3_notif={feedbacks_step3_notif}/>
     </div>
   </div>

    <div data-stepper-content-item='{ "index": 4 }' class="vertical-scrollbar card rounded-scrollbar max-h-auto p-3">
      <div>
      <div class="mb-4">
        <h1 class="text-3xl font-bold text-gray-900">Uploading Revised Documents</h1>
        <p class="text-gray-600 mt-3">
        Formal approval for the revised versions of documents, ensuring they meet all required standards and revisions.
      </p>
    </div>
        <Step4 user={user} research={research} revised_docs={revised_docs}  feedbacks_step4={feedbacks_step4} feedbacks_step4_notif={feedbacks_step4_notif} endorsement_status={endorsement_status} tech_doc={tech_doc} panels={panels}/>
     </div>
   </div>

    {
      (user.user_type != "tpl") ?
      <div data-stepper-content-item='{ "index": 5 }' style={{"display" : "none"}}>
     <div>
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
      <div>
        <Step7 user={user} research={research} urb_approval={urb_approval}/>
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

{
      (user.user_type != "tpl") ?
      <div data-stepper-content-item='{ "index": 9 }' style={{"display" : "none"}}>
      <div>
        <Step9 user={user} research={research} progress_report={progress_report}/>
     </div>
   </div>
   :
   <></>
    }



      <div data-stepper-content-item='{ "index": 10 }' style={{"display" : "none"}} class="vertical-scrollbar card rounded-scrollbar max-h-auto p-3">
      <div>
      <div class="mb-4">
        <h1 class="text-3xl font-bold text-gray-900">Terminal Review Endorsement</h1>
        <p class="text-gray-600 mt-3">
  Endorsement from the technical panel to proceed with the proposed project, confirming adherence to technical standards, best practices, and project feasibility.
</p>

    </div>
        <Step10 user={user} research={research} tpl_docs={tpl_docs} feedbacks_step10={feedbacks_step10} feedbacks_step10_notif={feedbacks_step10_notif} contents_mce_terminal={contents_mce_terminal} />
     </div>
   </div>


{
      (user.user_type != "tpl") ?
      <div data-stepper-content-item='{ "index": 11 }' style={{"display" : "none"}}>
      <div>
        <Step11 user={user} research={research} turnitin_docs={turnitin_docs}/>
     </div>
   </div>
   :
   <></>
    }

{
      (user.user_type != "tpl") ?
      <div data-stepper-content-item='{ "index": 12 }' style={{"display" : "none"}}>
      <div>
        <Step12 user={user} research={research} final_docs={final_docs}/>
     </div>
   </div>
   :
   <></>
    }


{
      (user.user_type != "tpl") ?
      <div data-stepper-content-item='{ "index": 13 }' style={{"display" : "none"}}>
      <div>
        <Step13 user={user} research={research} completion_cert_docs={completion_cert_docs}/>
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
