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
import InstructionEditor from './InstructionEditor';

export default function StepperForm({research, files, user, panels, technical_docs, revised_docs, tpl_docs, ethics_docs, budget_docs, final_docs, completion_cert_docs, moa_docs, feedbacks_step1, feedbacks_step1_notif, feedbacks_step3, feedbacks_step3_notif, feedbacks_step4, feedbacks_step4_notif,feedbacks_step9, feedbacks_step9_notif, feedbacks_step10, feedbacks_step10_notif, endorsement_status, tech_doc , urb_approval, progress_report, revisions_docs, turnitin_docs, user_panels, contents_mce, contents_mce_tech, contents_mce_terminal, instruction_content}) {
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

       {
        (user.user_type == "researcher") ?
          <>
  <div class="accordion divide-neutral/20 divide-y bg-gray-50 rounded-lg shadow-sm">

  <div class="accordion-item bg-white border-b">
    <button class="accordion-toggle inline-flex items-center justify-between w-full px-5 py-3 text-left font-semibold text-gray-800 bg-gray-100 rounded-lg transition-all duration-300 ease-in-out" aria-controls="payment-basic-collapse" aria-expanded="true">
      <span class="icon-[tabler--plus] accordion-item-active:hidden text-gray-500 block"></span>
      <span class="icon-[tabler--minus] accordion-item-active:block text-gray-500 hidden"></span>
      <span>Step 1: Instructions & Guidelines</span>
    </button>
    
    <div id="payment-basic-collapse" class="accordion-content w-full overflow-hidden transition-all duration-300 ease-in-out" aria-labelledby="payment-basic" role="region">
      <div class="px-5 py-4 bg-gray-50 rounded-b-lg">
        {/* <JoditEditor
           value={findCardByStep(instruction_content, 1)?.content || 'No Instructions Added Yet'}
          config={{
            height: 300,
            resizable: false, // Disable resizing
            allowResizeX: false, // Disable horizontal resize
            allowResizeY: false, // Disable vertical resize
            toolbarSticky: false, // Prevents toolbar from sticking
            readonly: true,
            buttons: ["print"], // Toolbar with print button
            toolbarAdaptive: false, // Prevents adaptive toolbar changes
          }}
        /> */}
         <InstructionEditor instruction_content={instruction_content} step={1} />
      </div>
    </div>
  </div>
</div>

<br />
          </>
          :
          <></>
       } 

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
      {
        (user.user_type == "researcher") ?
          <>
  <div class="accordion divide-neutral/20 divide-y bg-gray-50 rounded-lg shadow-sm">

  <div class="accordion-item bg-white border-b">
    <button class="accordion-toggle inline-flex items-center justify-between w-full px-5 py-3 text-left font-semibold text-gray-800 bg-gray-100 rounded-lg transition-all duration-300 ease-in-out" aria-controls="payment-basic-collapse" aria-expanded="true">
      <span class="icon-[tabler--plus] accordion-item-active:hidden text-gray-500 block"></span>
      <span class="icon-[tabler--minus] accordion-item-active:block text-gray-500 hidden"></span>
      <span>Step 2: Instructions & Guidelines</span>
    </button>
    
    <div id="payment-basic-collapse" class="accordion-content w-full overflow-hidden transition-all duration-300 ease-in-out" aria-labelledby="payment-basic" role="region">
      <div class="px-5 py-4 bg-gray-50 rounded-b-lg">
      <InstructionEditor instruction_content={instruction_content} step={2} />
      </div>
    </div>
  </div>
</div>

<br />
          </>
          :
          <></>
       } 
        <Step2 user={user} research={research} panels={panels} user_panels={user_panels}/>
      </div>
   </div>
   :
   <></>
   }


   <div data-stepper-content-item='{ "index": 3 }'  class="vertical-scrollbar card rounded-scrollbar max-h-auto p-3">
  
    <div>
    {
        (user.user_type == "researcher") ?
          <>
  <div class="accordion divide-neutral/20 divide-y bg-gray-50 rounded-lg shadow-sm">

  <div class="accordion-item bg-white border-b">
    <button class="accordion-toggle inline-flex items-center justify-between w-full px-5 py-3 text-left font-semibold text-gray-800 bg-gray-100 rounded-lg transition-all duration-300 ease-in-out" aria-controls="payment-basic-collapse" aria-expanded="true">
      <span class="icon-[tabler--plus] accordion-item-active:hidden text-gray-500 block"></span>
      <span class="icon-[tabler--minus] accordion-item-active:block text-gray-500 hidden"></span>
      <span>Step 3: Instructions & Guidelines</span>
    </button>
    
    <div id="payment-basic-collapse" class="accordion-content w-full overflow-hidden transition-all duration-300 ease-in-out" aria-labelledby="payment-basic" role="region">
      <div class="px-5 py-4 bg-gray-50 rounded-b-lg">
      <InstructionEditor instruction_content={instruction_content} step={3} />
      </div>
    </div>
  </div>
</div>

<br />
          </>
          :
          <></>
       } 
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
      {
        (user.user_type == "researcher") ?
          <>
  <div class="accordion divide-neutral/20 divide-y bg-gray-50 rounded-lg shadow-sm">

  <div class="accordion-item bg-white border-b">
    <button class="accordion-toggle inline-flex items-center justify-between w-full px-5 py-3 text-left font-semibold text-gray-800 bg-gray-100 rounded-lg transition-all duration-300 ease-in-out" aria-controls="payment-basic-collapse" aria-expanded="true">
      <span class="icon-[tabler--plus] accordion-item-active:hidden text-gray-500 block"></span>
      <span class="icon-[tabler--minus] accordion-item-active:block text-gray-500 hidden"></span>
      <span>Step 4: Instructions & Guidelines</span>
    </button>
    
    <div id="payment-basic-collapse" class="accordion-content w-full overflow-hidden transition-all duration-300 ease-in-out" aria-labelledby="payment-basic" role="region">
      <div class="px-5 py-4 bg-gray-50 rounded-b-lg">
      <InstructionEditor instruction_content={instruction_content} step={4} />
      </div>
    </div>
  </div>
</div>

<br />
          </>
          :
          <></>
       } 
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
      <div data-stepper-content-item='{ "index": 5 }' style={{"display" : "none"}} class="vertical-scrollbar card rounded-scrollbar max-h-auto p-3">
     <div>
     {
        (user.user_type == "researcher") ?
          <>
  <div class="accordion divide-neutral/20 divide-y bg-gray-50 rounded-lg shadow-sm">

  <div class="accordion-item bg-white border-b">
    <button class="accordion-toggle inline-flex items-center justify-between w-full px-5 py-3 text-left font-semibold text-gray-800 bg-gray-100 rounded-lg transition-all duration-300 ease-in-out" aria-controls="payment-basic-collapse" aria-expanded="true">
      <span class="icon-[tabler--plus] accordion-item-active:hidden text-gray-500 block"></span>
      <span class="icon-[tabler--minus] accordion-item-active:block text-gray-500 hidden"></span>
      <span>Step 5: Instructions & Guidelines</span>
    </button>
    
    <div id="payment-basic-collapse" class="accordion-content w-full overflow-hidden transition-all duration-300 ease-in-out" aria-labelledby="payment-basic" role="region">
      <div class="px-5 py-4 bg-gray-50 rounded-b-lg">
      <InstructionEditor instruction_content={instruction_content} step={5} />
      </div>
    </div>
  </div>
</div>

<br />
          </>
          :
          <></>
       } 
        <Step5 user={user} research={research} ethics_docs={ethics_docs}/>
     </div>
   </div>
   :
   <></>
    }

    {
      (user.user_type != "tpl") ?
      <div data-stepper-content-item='{ "index": 6 }' style={{"display" : "none"}} class="vertical-scrollbar card rounded-scrollbar max-h-auto p-3">
      <div>
      {
        (user.user_type == "researcher") ?
          <>
  <div class="accordion divide-neutral/20 divide-y bg-gray-50 rounded-lg shadow-sm">

  <div class="accordion-item bg-white border-b">
    <button class="accordion-toggle inline-flex items-center justify-between w-full px-5 py-3 text-left font-semibold text-gray-800 bg-gray-100 rounded-lg transition-all duration-300 ease-in-out" aria-controls="payment-basic-collapse" aria-expanded="true">
      <span class="icon-[tabler--plus] accordion-item-active:hidden text-gray-500 block"></span>
      <span class="icon-[tabler--minus] accordion-item-active:block text-gray-500 hidden"></span>
      <span>Step 6: Instructions & Guidelines</span>
    </button>
    
    <div id="payment-basic-collapse" class="accordion-content w-full overflow-hidden transition-all duration-300 ease-in-out" aria-labelledby="payment-basic" role="region">
      <div class="px-5 py-4 bg-gray-50 rounded-b-lg">
      <InstructionEditor instruction_content={instruction_content} step={6} />
      </div>
    </div>
  </div>
</div>

<br />
          </>
          :
          <></>
       } 
        <Step6 user={user} research={research} budget_docs={budget_docs}/>
     </div>
   </div>
   :
   <></>
    }

    {
      (user.user_type != "tpl") ?
      <div data-stepper-content-item='{ "index": 7 }' style={{"display" : "none"}} class="vertical-scrollbar card rounded-scrollbar max-h-auto p-3">
      <div>
      {
        (user.user_type == "researcher") ?
          <>
  <div class="accordion divide-neutral/20 divide-y bg-gray-50 rounded-lg shadow-sm">

  <div class="accordion-item bg-white border-b">
    <button class="accordion-toggle inline-flex items-center justify-between w-full px-5 py-3 text-left font-semibold text-gray-800 bg-gray-100 rounded-lg transition-all duration-300 ease-in-out" aria-controls="payment-basic-collapse" aria-expanded="true">
      <span class="icon-[tabler--plus] accordion-item-active:hidden text-gray-500 block"></span>
      <span class="icon-[tabler--minus] accordion-item-active:block text-gray-500 hidden"></span>
      <span>Step 7: Instructions & Guidelines</span>
    </button>
    
    <div id="payment-basic-collapse" class="accordion-content w-full overflow-hidden transition-all duration-300 ease-in-out" aria-labelledby="payment-basic" role="region">
      <div class="px-5 py-4 bg-gray-50 rounded-b-lg">
      <InstructionEditor instruction_content={instruction_content} step={7} />
      </div>
    </div>
  </div>
</div>

<br />
          </>
          :
          <></>
       } 
        <Step7 user={user} research={research} urb_approval={urb_approval}/>
     </div>
    </div>
    :
    <></>
    }

    {
      (user.user_type != "tpl") ?
      <div data-stepper-content-item='{ "index": 8 }' style={{"display" : "none"}} class="vertical-scrollbar card rounded-scrollbar max-h-auto p-3">
      <div>
      {
        (user.user_type == "researcher") ?
          <>
  <div class="accordion divide-neutral/20 divide-y bg-gray-50 rounded-lg shadow-sm">

  <div class="accordion-item bg-white border-b">
    <button class="accordion-toggle inline-flex items-center justify-between w-full px-5 py-3 text-left font-semibold text-gray-800 bg-gray-100 rounded-lg transition-all duration-300 ease-in-out" aria-controls="payment-basic-collapse" aria-expanded="true">
      <span class="icon-[tabler--plus] accordion-item-active:hidden text-gray-500 block"></span>
      <span class="icon-[tabler--minus] accordion-item-active:block text-gray-500 hidden"></span>
      <span>Step 8: Instructions & Guidelines</span>
    </button>
    
    <div id="payment-basic-collapse" class="accordion-content w-full overflow-hidden transition-all duration-300 ease-in-out" aria-labelledby="payment-basic" role="region">
      <div class="px-5 py-4 bg-gray-50 rounded-b-lg">
      <InstructionEditor instruction_content={instruction_content} step={8} />
      </div>
    </div>
  </div>
</div>

<br />
          </>
          :
          <></>
       } 
        <Step8 user={user} research={research} moa_docs={moa_docs}/>
     </div>
   </div>
   :
   <></>
    }

{
      (user.user_type != "tpl") ?
      <div data-stepper-content-item='{ "index": 9 }' style={{"display" : "none"}} class="vertical-scrollbar card rounded-scrollbar max-h-auto p-3">
      <div>
      {
        (user.user_type == "researcher") ?
          <>
  <div class="accordion divide-neutral/20 divide-y bg-gray-50 rounded-lg shadow-sm">

  <div class="accordion-item bg-white border-b">
    <button class="accordion-toggle inline-flex items-center justify-between w-full px-5 py-3 text-left font-semibold text-gray-800 bg-gray-100 rounded-lg transition-all duration-300 ease-in-out" aria-controls="payment-basic-collapse" aria-expanded="true">
      <span class="icon-[tabler--plus] accordion-item-active:hidden text-gray-500 block"></span>
      <span class="icon-[tabler--minus] accordion-item-active:block text-gray-500 hidden"></span>
      <span>Step 9: Instructions & Guidelines</span>
    </button>
    
    <div id="payment-basic-collapse" class="accordion-content w-full overflow-hidden transition-all duration-300 ease-in-out" aria-labelledby="payment-basic" role="region">
      <div class="px-5 py-4 bg-gray-50 rounded-b-lg">
      <InstructionEditor instruction_content={instruction_content} step={9} />
      </div>
    </div>
  </div>
</div>

<br />
          </>
          :
          <></>
       } 
      <div class="mb-4">
        <h1 class="text-3xl font-bold text-gray-900">Schedule Progress Report</h1>
        <p class="text-gray-600 mt-3">
        An overview of the ongoing research and key progress milestones.
</p>

    </div>
        <Step9 user={user} research={research} progress_report={progress_report} feedbacks_step9={feedbacks_step9} feedbacks_step9_notif={feedbacks_step9_notif}/>
     </div>
   </div>
   :
   <></>
    }



      <div data-stepper-content-item='{ "index": 10 }' style={{"display" : "none"}} class="vertical-scrollbar card rounded-scrollbar max-h-auto p-3">
      <div>
      {
        (user.user_type == "researcher") ?
          <>
  <div class="accordion divide-neutral/20 divide-y bg-gray-50 rounded-lg shadow-sm">

  <div class="accordion-item bg-white border-b">
    <button class="accordion-toggle inline-flex items-center justify-between w-full px-5 py-3 text-left font-semibold text-gray-800 bg-gray-100 rounded-lg transition-all duration-300 ease-in-out" aria-controls="payment-basic-collapse" aria-expanded="true">
      <span class="icon-[tabler--plus] accordion-item-active:hidden text-gray-500 block"></span>
      <span class="icon-[tabler--minus] accordion-item-active:block text-gray-500 hidden"></span>
      <span>Step 10: Instructions & Guidelines</span>
    </button>
    
    <div id="payment-basic-collapse" class="accordion-content w-full overflow-hidden transition-all duration-300 ease-in-out" aria-labelledby="payment-basic" role="region">
      <div class="px-5 py-4 bg-gray-50 rounded-b-lg">
      <InstructionEditor instruction_content={instruction_content} step={10} />
      </div>
    </div>
  </div>
</div>

<br />
          </>
          :
          <></>
       } 
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
      <div data-stepper-content-item='{ "index": 11 }' style={{"display" : "none"}} class="vertical-scrollbar card rounded-scrollbar max-h-auto p-3">
      <div>
      {
        (user.user_type == "researcher") ?
          <>
  <div class="accordion divide-neutral/20 divide-y bg-gray-50 rounded-lg shadow-sm">

  <div class="accordion-item bg-white border-b">
    <button class="accordion-toggle inline-flex items-center justify-between w-full px-5 py-3 text-left font-semibold text-gray-800 bg-gray-100 rounded-lg transition-all duration-300 ease-in-out" aria-controls="payment-basic-collapse" aria-expanded="true">
      <span class="icon-[tabler--plus] accordion-item-active:hidden text-gray-500 block"></span>
      <span class="icon-[tabler--minus] accordion-item-active:block text-gray-500 hidden"></span>
      <span>Step 11: Instructions & Guidelines</span>
    </button>
    
    <div id="payment-basic-collapse" class="accordion-content w-full overflow-hidden transition-all duration-300 ease-in-out" aria-labelledby="payment-basic" role="region">
      <div class="px-5 py-4 bg-gray-50 rounded-b-lg">
      <InstructionEditor instruction_content={instruction_content} step={11} />
      </div>
    </div>
  </div>
</div>

<br />
          </>
          :
          <></>
       } 
        <Step11 user={user} research={research} turnitin_docs={turnitin_docs}/>
     </div>
   </div>
   :
   <></>
    }

{
      (user.user_type != "tpl") ?
      <div data-stepper-content-item='{ "index": 12 }' style={{"display" : "none"}} class="vertical-scrollbar card rounded-scrollbar max-h-auto p-3">
      <div>
      {
        (user.user_type == "researcher") ?
          <>
  <div class="accordion divide-neutral/20 divide-y bg-gray-50 rounded-lg shadow-sm">

  <div class="accordion-item bg-white border-b">
    <button class="accordion-toggle inline-flex items-center justify-between w-full px-5 py-3 text-left font-semibold text-gray-800 bg-gray-100 rounded-lg transition-all duration-300 ease-in-out" aria-controls="payment-basic-collapse" aria-expanded="true">
      <span class="icon-[tabler--plus] accordion-item-active:hidden text-gray-500 block"></span>
      <span class="icon-[tabler--minus] accordion-item-active:block text-gray-500 hidden"></span>
      <span>Step 12: Instructions & Guidelines</span>
    </button>
    
    <div id="payment-basic-collapse" class="accordion-content w-full overflow-hidden transition-all duration-300 ease-in-out" aria-labelledby="payment-basic" role="region">
      <div class="px-5 py-4 bg-gray-50 rounded-b-lg">
      <InstructionEditor instruction_content={instruction_content} step={12} />
      </div>
    </div>
  </div>
</div>

<br />
          </>
          :
          <></>
       } 
        <Step12 user={user} research={research} final_docs={final_docs}/>
     </div>
   </div>
   :
   <></>
    }


{
      (user.user_type != "tpl") ?
      <div data-stepper-content-item='{ "index": 13 }' style={{"display" : "none"}} class="vertical-scrollbar card rounded-scrollbar max-h-auto p-3">
      <div>
      {
        (user.user_type == "researcher") ?
          <>
  <div class="accordion divide-neutral/20 divide-y bg-gray-50 rounded-lg shadow-sm">

  <div class="accordion-item bg-white border-b">
    <button class="accordion-toggle inline-flex items-center justify-between w-full px-5 py-3 text-left font-semibold text-gray-800 bg-gray-100 rounded-lg transition-all duration-300 ease-in-out" aria-controls="payment-basic-collapse" aria-expanded="true">
      <span class="icon-[tabler--plus] accordion-item-active:hidden text-gray-500 block"></span>
      <span class="icon-[tabler--minus] accordion-item-active:block text-gray-500 hidden"></span>
      <span>Step 13: Instructions & Guidelines</span>
    </button>
    
    <div id="payment-basic-collapse" class="accordion-content w-full overflow-hidden transition-all duration-300 ease-in-out" aria-labelledby="payment-basic" role="region">
      <div class="px-5 py-4 bg-gray-50 rounded-b-lg">
      <InstructionEditor instruction_content={instruction_content} step={13} />
      </div>
    </div>
  </div>
</div>

<br />
          </>
          :
          <></>
       } 
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
