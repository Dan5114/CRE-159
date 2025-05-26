import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime);
import localizedFormat from "dayjs/plugin/localizedFormat";
dayjs.extend(localizedFormat);
import DurationDays from "./DurationDays";

export default function StepperForm({research_logs, step_status, user, tech_doc, get_rerc_date_submitted}) {

  const status_step1 = step_status.step1;
  const status_step2 = step_status.step2;
  const status_step3 = step_status.step3;
  const status_step4 = step_status.step4;
  const status_step5 = step_status.step5;
  const status_step6 = step_status.step6;
  const status_step7 = step_status.step7;
  const status_step8 = step_status.step8;
  const status_step9 = step_status.step9;
  const status_step10 = step_status.step10;
  const status_step11 = step_status.step11;
  const status_step12 = step_status.step12;
  const status_step13 = step_status.step13;
  
     return (
        <>
        <div>
            <ul class="relative flex h-full flex-col gap-y-2">

            {
              (user.user_type != "tpl") ?
                <>
                <li class="group flex flex-1 shrink basis-0 flex-col" data-stepper-nav-item='{ "index": 1 }'>
                <div class="flex items-center rounded text-sm">
                <span class="min-h-7.5 min-w-7.5 group inline-flex items-center align-middle text-sm">
                    <span class={(status_step1 && status_step1.status == "Completed") ? "stepper-active:bg-primary stepper-active:text-primary-content stepper-success bg-success stepper-active:shadow stepper-success:shadow stepper-success:text-primary-content stepper-error:bg-error stepper-error:text-error-content stepper-completed:bg-success stepper-completed:group-focus:bg-success size-7.5 bg-neutral/20 text-base-content/90 group-focus:bg-base-content/20 flex flex-shrink-0 items-center justify-center rounded-full font-medium" : "stepper-active:bg-primary stepper-active:text-primary-content stepper-success:bg-success stepper-active:shadow stepper-success:shadow stepper-success:text-primary-content stepper-error:bg-error stepper-error:text-error-content stepper-completed:bg-success stepper-completed:group-focus:bg-success size-7.5 bg-neutral/20 text-base-content/90 group-focus:bg-base-content/20 flex flex-shrink-0 items-center justify-center rounded-full font-medium"} >
                      <span class="stepper-success:hidden stepper-completed:hidden">{(status_step1 && status_step1.status == "Completed") ? "" : "1"}</span>
                      <span class={(status_step1 && status_step1.status == "Completed") ? 'icon-[tabler--check] stepper-success:block size-4 flex-shrink-0' : 'icon-[tabler--check] stepper-success:block hidden size-5 flex-shrink-0'}></span>
                    </span>
                    <span class="text-base-content/90 ms-2 max-sm:hidden">Step 1</span>
                    
                  </span>

                  <div class="ml-6">
                  
                  <div class="text-sm">
                        <p class="font-sans font-bold text-lg">Submit Application</p>
                        <div class="text-sm">
                        <div class="text-xs flex items-center gap-1.5 mb-3">Status :
              
              {(status_step1 ? 
                <>
                  <span class="badge badge-success size-2 p-0"></span>
                  {status_step1.status} 
                </>
                : 
                <>
                <span class="badge badge-warning size-2 p-0"></span>
                Pending
                </>
                )}
            </div>
            <div class="text-xs flex items-center gap-1.5">Start Date :
            &nbsp; {(status_step1) ? dayjs(status_step1.start).format("LLL") : ""}
            </div>
            <div class="text-xs flex items-center gap-1.5">End Date :
            &nbsp; {(status_step1) ? dayjs(status_step1.end).format("LLL") : ""}
            </div>

            <DurationDays start_date={status_step1?.start} end_date={status_step1?.end} />
                        </div>
                        </div>
                </div>
                  
                </div>
                <div class="bg-neutral/20 ms-3.5 mt-2 h-full w-px justify-self-start group-last:hidden"></div>
            </li>

<hr/>
</>
            :
            <></>
          }

       
          {
            (user.user_type != "tpl") ?
            <>
            <li class="group flex flex-1 shrink basis-0 flex-col" data-stepper-nav-item='{ "index": 2 }'>
        <div class="flex items-center rounded text-sm">
        <span class="min-h-7.5 min-w-7.5 group inline-flex items-center align-middle text-sm">
            <span class={(status_step2 && status_step2.status == "Completed") ? "stepper-active:bg-primary stepper-active:text-primary-content stepper-success bg-success stepper-active:shadow stepper-success:shadow stepper-success:text-primary-content stepper-error:bg-error stepper-error:text-error-content stepper-completed:bg-success stepper-completed:group-focus:bg-success size-7.5 bg-neutral/20 text-base-content/90 group-focus:bg-base-content/20 flex flex-shrink-0 items-center justify-center rounded-full font-medium" : "stepper-active:bg-primary stepper-active:text-primary-content stepper-success:bg-success stepper-active:shadow stepper-success:shadow stepper-success:text-primary-content stepper-error:bg-error stepper-error:text-error-content stepper-completed:bg-success stepper-completed:group-focus:bg-success size-7.5 bg-neutral/20 text-base-content/90 group-focus:bg-base-content/20 flex flex-shrink-0 items-center justify-center rounded-full font-medium"} >
            <span class="stepper-success:hidden stepper-completed:hidden">{(status_step2 && status_step2.status == "Completed") ? "" : "2"}</span>
            <span class={(status_step2 && status_step2.status == "Completed") ? 'icon-[tabler--check] stepper-success:block  size-4 flex-shrink-0' : 'icon-[tabler--check] stepper-success:block hidden size-5 flex-shrink-0'}></span>
            </span>
            <span class="text-base-content/90 ms-2 max-sm:hidden">Step 2</span>
            
          </span>
    
          <div class="ml-6">
           
           <div class="text-sm">
                 <p class="font-sans font-bold text-lg">Technical Committee & Schedule</p>
                 <div class="text-sm">
                 <div class="text-xs flex items-center gap-1.5 mb-3">Status :
                 {(status_step2 ? 
        <>
          <span class="badge badge-success size-2 p-0"></span>
          {status_step2.status} 
        </>
        : 
        <>
        <span class="badge badge-warning size-2 p-0"></span>
        Pending
        </>
        )}
       
     </div>
     <div class="text-xs flex items-center gap-1.5">Start Date :
     &nbsp; {(status_step2) ? dayjs(status_step2.start).format("LLL") : ""}
     </div>
     <div class="text-xs flex items-center gap-1.5">End Date :
     &nbsp; {(status_step2) ? dayjs(status_step2.end).format("LLL") : ""}
     </div>
     <DurationDays start_date={status_step2?.start} end_date={status_step2?.end} />
                 </div>
                 </div>
        </div>
          
        </div>
        <div class="bg-neutral/20 ms-3.5 mt-2 h-full w-px justify-self-start group-last:hidden"></div>
      </li>

  <hr/>
      </>
      :
      <></>
          }


  <li class="group flex flex-1 shrink basis-0 flex-col" data-stepper-nav-item='{ "index": 3 }'>
    <div class="flex items-center rounded text-sm">
    <span class="min-h-7.5 min-w-7.5 group inline-flex items-center align-middle text-sm">
            <span class={(status_step3 && status_step3.status == "Completed") ? "stepper-active:bg-primary stepper-active:text-primary-content stepper-success bg-success stepper-active:shadow stepper-success:shadow stepper-success:text-primary-content stepper-error:bg-error stepper-error:text-error-content stepper-completed:bg-success stepper-completed:group-focus:bg-success size-7.5 bg-neutral/20 text-base-content/90 group-focus:bg-base-content/20 flex flex-shrink-0 items-center justify-center rounded-full font-medium" : "stepper-active:bg-primary stepper-active:text-primary-content stepper-success:bg-success stepper-active:shadow stepper-success:shadow stepper-success:text-primary-content stepper-error:bg-error stepper-error:text-error-content stepper-completed:bg-success stepper-completed:group-focus:bg-success size-7.5 bg-neutral/20 text-base-content/90 group-focus:bg-base-content/20 flex flex-shrink-0 items-center justify-center rounded-full font-medium"} >
            <span class="stepper-success:hidden stepper-completed:hidden">{(status_step3 && status_step3.status == "Completed") ? "" : "3"}</span>
            <span class={(status_step3 && status_step3.status == "Completed") ? 'icon-[tabler--check] stepper-success:block  size-4 flex-shrink-0' : 'icon-[tabler--check] stepper-success:block hidden size-5 flex-shrink-0'}></span>
            </span>
            <span class="text-base-content/90 ms-2 max-sm:hidden">Step 3</span>
            
          </span>

      <div class="ml-6">
       
       <div class="text-sm">
             <p class="font-sans font-bold text-lg">Techinical Review Report</p>
             <div class="text-sm">
             <div class="text-xs flex items-center gap-1.5 mb-3">Status :
             {(status_step3 ? 
    <>
      {
        (status_step3.status == "Completed") ?
        <>
            <span class="badge badge-success size-2 p-0"></span>
            {status_step3.status} 
        </>
        :
        <>
          <span class="badge badge-info size-2 p-0"></span>
          {status_step3.status} 
        </>
      }
    </>
    : 
    <>
    <span class="badge badge-warning size-2 p-0"></span>
    Pending
    </>
    )}
   
 </div>
 <div class="text-xs flex items-center gap-1.5">Start Date :
 &nbsp; {(status_step3) ? dayjs(status_step3.start).format("LLL") : ""}
 </div>
 <div class="text-xs flex items-center gap-1.5">End Date :
 &nbsp; {(status_step3) ? dayjs(status_step3.end).format("LLL") : ""}
 </div>

 <DurationDays start_date={status_step3?.start} end_date={status_step3?.end} />
             </div>
             </div>
    </div>
      
    </div>
    <div class="bg-neutral/20 ms-3.5 mt-2 h-full w-px justify-self-start group-last:hidden"></div>
  </li>
  <hr/>
  <li class="group flex flex-1 shrink basis-0 flex-col" data-stepper-nav-item='{ "index": 4 }'>
    <div class="flex items-center rounded text-sm">
    <span class="min-h-7.5 min-w-7.5 group inline-flex items-center align-middle text-sm">
            <span class={(status_step4 && status_step4.status == "Completed") ? "stepper-active:bg-primary stepper-active:text-primary-content stepper-success bg-success stepper-active:shadow stepper-success:shadow stepper-success:text-primary-content stepper-error:bg-error stepper-error:text-error-content stepper-completed:bg-success stepper-completed:group-focus:bg-success size-7.5 bg-neutral/20 text-base-content/90 group-focus:bg-base-content/20 flex flex-shrink-0 items-center justify-center rounded-full font-medium" : "stepper-active:bg-primary stepper-active:text-primary-content stepper-success:bg-success stepper-active:shadow stepper-success:shadow stepper-success:text-primary-content stepper-error:bg-error stepper-error:text-error-content stepper-completed:bg-success stepper-completed:group-focus:bg-success size-7.5 bg-neutral/20 text-base-content/90 group-focus:bg-base-content/20 flex flex-shrink-0 items-center justify-center rounded-full font-medium"} >
            <span class="stepper-success:hidden stepper-completed:hidden">{(status_step4 && status_step4.status == "Completed") ? "" : "4"}</span>
            <span class={(status_step4 && status_step4.status == "Completed") ? 'icon-[tabler--check] stepper-success:block  size-4 flex-shrink-0' : 'icon-[tabler--check] stepper-success:block hidden size-5 flex-shrink-0'}></span>
            </span>
            <span class="text-base-content/90 ms-2 max-sm:hidden">Step 4</span>
            
          </span>

      <div class="ml-6">
       
       <div class="text-sm">
             <p class="font-sans font-bold text-lg">Approval of Revised Docs</p>
             <div class="text-sm">
             <div class="text-xs flex items-center gap-1.5 mb-3">Status :
             {(status_step4 ? 
    <>
      {
        (status_step4.status == "Completed") ?
        <>
            <span class="badge badge-success size-2 p-0"></span>
            {status_step4.status} 
        </>
        :
        <>
          <span class="badge badge-info size-2 p-0"></span>
          {status_step4.status} 
        </>
      }
    </>
    : 
    <>
    <span class="badge badge-warning size-2 p-0"></span>
    Pending
    </>
    )}
<span>|</span>
   <div class="text-xs flex items-center gap-1.5">Tech Cert : {(tech_doc != null) ? 
<>
<span class="badge badge-success size-2 p-0"></span> Uploaded
</> 
:
<>
<span class="badge badge-warning size-2 p-0"></span> Pending
</>
}

 </div>
 </div>
 <div class="text-xs flex items-center gap-1.5">Start Date :
 &nbsp; {(status_step4) ? dayjs(status_step4.start).format("LLL") : ""}
 </div>
 <div class="text-xs flex items-center gap-1.5">End Date :
 &nbsp; {(status_step4) ? dayjs(status_step4.end).format("LLL") : ""}
 </div>

 <DurationDays start_date={status_step4?.start} end_date={status_step4?.end} />

<hr className="mt-2 mb-2"/>
 <span>RERC Date Submitted : {(get_rerc_date_submitted) ? dayjs(get_rerc_date_submitted.date_submitted).format("LLL") : <span className="text-xs text-red-500">Not Yet</span>}</span>
             </div>
             </div>
    </div>
      
    </div>
    <div class="bg-neutral/20 ms-3.5 mt-2 h-full w-px justify-self-start group-last:hidden"></div>
  </li>

  {
    (user.user_type != "tpl") ?
<>
<hr/>
    <li class="group flex flex-1 shrink basis-0 flex-col" data-stepper-nav-item='{ "index": 5 }'>
      <div class="flex items-center rounded text-sm">
      <span class="min-h-7.5 min-w-7.5 group inline-flex items-center align-middle text-sm">
            <span class={(status_step5 && status_step5.status == "Completed") ? "stepper-active:bg-primary stepper-active:text-primary-content stepper-success bg-success stepper-active:shadow stepper-success:shadow stepper-success:text-primary-content stepper-error:bg-error stepper-error:text-error-content stepper-completed:bg-success stepper-completed:group-focus:bg-success size-7.5 bg-neutral/20 text-base-content/90 group-focus:bg-base-content/20 flex flex-shrink-0 items-center justify-center rounded-full font-medium" : "stepper-active:bg-primary stepper-active:text-primary-content stepper-success:bg-success stepper-active:shadow stepper-success:shadow stepper-success:text-primary-content stepper-error:bg-error stepper-error:text-error-content stepper-completed:bg-success stepper-completed:group-focus:bg-success size-7.5 bg-neutral/20 text-base-content/90 group-focus:bg-base-content/20 flex flex-shrink-0 items-center justify-center rounded-full font-medium"} >
            <span class="stepper-success:hidden stepper-completed:hidden">{(status_step5 && status_step5.status == "Completed") ? "" : "5"}</span>
            <span class={(status_step5 && status_step5.status == "Completed") ? 'icon-[tabler--check] stepper-success:block  size-4 flex-shrink-0' : 'icon-[tabler--check] stepper-success:block hidden size-5 flex-shrink-0'}></span>
            </span>
            <span class="text-base-content/90 ms-2 max-sm:hidden">Step 5</span>
            
          </span>
  
        <div class="ml-6">
         
         <div class="text-sm">
               <p class="font-sans font-bold text-lg">Ethics Clearance</p>
               <div class="text-sm">
               <div class="text-xs flex items-center gap-1.5 mb-3">Status :
               {(status_step5 ? 
    <>
       {
        (status_step5.status == "Completed") ?
        <>
            <span class="badge badge-success size-2 p-0"></span>
            {status_step5.status} 
        </>
        :
        <>
          <span class="badge badge-info size-2 p-0"></span>
          {status_step5.status} 
        </>
      }
    </>
    : 
    <>
    <span class="badge badge-warning size-2 p-0"></span>
    Pending
    </>
    )}
   </div>
   <div class="text-xs flex items-center gap-1.5">Start Date :
 &nbsp; {(status_step5) ? dayjs(status_step5.start).format("LLL") : ""}
 </div>
 <div class="text-xs flex items-center gap-1.5">End Date :
 &nbsp; {(status_step5) ? dayjs(status_step5.end).format("LLL") : ""}
 </div>
 <DurationDays start_date={status_step5?.start} end_date={status_step5?.end} />
               </div>
               </div>
      </div>
        
      </div>
      <div class="bg-neutral/20 ms-3.5 mt-2 h-full w-px justify-self-start group-last:hidden"></div>
    </li>
</>
    :
    <></>
  }

  {
    (user.user_type != "tpl") ?
    <>
    
  <hr/>
  <li class="group flex flex-1 shrink basis-0 flex-col" data-stepper-nav-item='{ "index": 6 }'>
    <div class="flex items-center rounded text-sm">
    <span class="min-h-7.5 min-w-7.5 group inline-flex items-center align-middle text-sm">
            <span class={(status_step6 && status_step6.status == "Completed") ? "stepper-active:bg-primary stepper-active:text-primary-content stepper-success bg-success stepper-active:shadow stepper-success:shadow stepper-success:text-primary-content stepper-error:bg-error stepper-error:text-error-content stepper-completed:bg-success stepper-completed:group-focus:bg-success size-7.5 bg-neutral/20 text-base-content/90 group-focus:bg-base-content/20 flex flex-shrink-0 items-center justify-center rounded-full font-medium" : "stepper-active:bg-primary stepper-active:text-primary-content stepper-success:bg-success stepper-active:shadow stepper-success:shadow stepper-success:text-primary-content stepper-error:bg-error stepper-error:text-error-content stepper-completed:bg-success stepper-completed:group-focus:bg-success size-7.5 bg-neutral/20 text-base-content/90 group-focus:bg-base-content/20 flex flex-shrink-0 items-center justify-center rounded-full font-medium"} >
            <span class="stepper-success:hidden stepper-completed:hidden">{(status_step6 && status_step6.status == "Completed") ? "" : "6"}</span>
            <span class={(status_step6 && status_step6.status == "Completed") ? 'icon-[tabler--check] stepper-success:block  size-4 flex-shrink-0' : 'icon-[tabler--check] stepper-success:block hidden size-5 flex-shrink-0'}></span>
            </span>
            <span class="text-base-content/90 ms-2 max-sm:hidden">Step 6</span>
            
          </span>

      <div class="ml-6">
       
       <div class="text-sm">
             <p class="font-sans font-bold text-lg">Budget Proposal</p>
             <div class="text-sm">
             <div class="text-xs flex items-center gap-1.5 mb-3">Status :
  {(status_step6 ? 
    <>
     {
        (status_step6.status == "Completed") ?
        <>
            <span class="badge badge-success size-2 p-0"></span>
            {status_step6.status} 
        </>
        :
        <>
          <span class="badge badge-info size-2 p-0"></span>
          {status_step6.status} 
        </>
      }
    </>
    : 
    <>
    <span class="badge badge-warning size-2 p-0"></span>
    Pending
    </>
    )}
 </div>
 <div class="text-xs flex items-center gap-1.5">Start Date :
 &nbsp; {(status_step6) ? dayjs(status_step6.start).format("LLL") : ""}
 </div>
 <div class="text-xs flex items-center gap-1.5">End Date :
 &nbsp; {(status_step6) ? dayjs(status_step6.end).format("LLL") : ""}
 </div>
 <DurationDays start_date={status_step6?.start} end_date={status_step6?.end} />
             </div>
             </div>
    </div>
      
    </div>
    <div class="bg-neutral/20 ms-3.5 mt-2 h-full w-px justify-self-start group-last:hidden"></div>
  </li>
    </>
    :
    <></>
  }

  {
    (user.user_type != "tpl") ?

    <>
        <hr/>
  <li class="group flex flex-1 shrink basis-0 flex-col" data-stepper-nav-item='{ "index": 7 }'>
    <div class="flex items-center rounded text-sm">
    <span class="min-h-7.5 min-w-7.5 group inline-flex items-center align-middle text-sm">
            <span class={(status_step7 && status_step7.status == "Completed") ? "stepper-active:bg-primary stepper-active:text-primary-content stepper-success bg-success stepper-active:shadow stepper-success:shadow stepper-success:text-primary-content stepper-error:bg-error stepper-error:text-error-content stepper-completed:bg-success stepper-completed:group-focus:bg-success size-7.5 bg-neutral/20 text-base-content/90 group-focus:bg-base-content/20 flex flex-shrink-0 items-center justify-center rounded-full font-medium" : "stepper-active:bg-primary stepper-active:text-primary-content stepper-success:bg-success stepper-active:shadow stepper-success:shadow stepper-success:text-primary-content stepper-error:bg-error stepper-error:text-error-content stepper-completed:bg-success stepper-completed:group-focus:bg-success size-7.5 bg-neutral/20 text-base-content/90 group-focus:bg-base-content/20 flex flex-shrink-0 items-center justify-center rounded-full font-medium"} >
            <span class="stepper-success:hidden stepper-completed:hidden">{(status_step7 && status_step7.status == "Completed") ? "" : "7"}</span>
            <span class={(status_step7 && status_step7.status == "Completed") ? 'icon-[tabler--check] stepper-success:block  size-4 flex-shrink-0' : 'icon-[tabler--check] stepper-success:block hidden size-5 flex-shrink-0'}></span>
            </span>
            <span class="text-base-content/90 ms-2 max-sm:hidden">Step 7</span>
            
          </span>

      <div class="ml-6">
       
       <div class="text-sm">
             <p class="font-sans font-bold text-lg">URB Approval</p>
             <div class="text-sm">
             <div class="text-xs flex items-center gap-1.5 mb-3">Status :
             {(status_step7 ? 
    <>
    {
        (status_step7.status == "Completed") ?
        <>
            <span class="badge badge-success size-2 p-0"></span>
            {status_step7.status} 
        </>
        :
        <>
          <span class="badge badge-info size-2 p-0"></span>
          {status_step7.status} 
        </>
      }
    </>
    : 
    <>
    <span class="badge badge-warning size-2 p-0"></span>
    Pending
    </>
    )}
 </div>
 <div class="text-xs flex items-center gap-1.5">Start Date :
 &nbsp; {(status_step7) ? dayjs(status_step7.start).format("LLL") : ""}
 </div>
 <div class="text-xs flex items-center gap-1.5">End Date :
 &nbsp; {(status_step7) ? dayjs(status_step7.end).format("LLL") : ""}
 </div>
 <DurationDays start_date={status_step7?.start} end_date={status_step7?.end} />
             </div>
             </div>
    </div>
      
    </div>
    <div class="bg-neutral/20 ms-3.5 mt-2 h-full w-px justify-self-start group-last:hidden"></div>
  </li>
    </>
    :
    <></>
  }

  {
    (user.user_type != "tpl") ?
    <>

  <hr />
  <li class="group flex flex-1 shrink basis-0 flex-col" data-stepper-nav-item='{ "index": 8 }'>
    <div class="flex items-center rounded text-sm">
    <span class="min-h-7.5 min-w-7.5 group inline-flex items-center align-middle text-sm">
            <span class={(status_step8 && status_step8.status == "Completed") ? "stepper-active:bg-primary stepper-active:text-primary-content stepper-success bg-success stepper-active:shadow stepper-success:shadow stepper-success:text-primary-content stepper-error:bg-error stepper-error:text-error-content stepper-completed:bg-success stepper-completed:group-focus:bg-success size-7.5 bg-neutral/20 text-base-content/90 group-focus:bg-base-content/20 flex flex-shrink-0 items-center justify-center rounded-full font-medium" : "stepper-active:bg-primary stepper-active:text-primary-content stepper-success:bg-success stepper-active:shadow stepper-success:shadow stepper-success:text-primary-content stepper-error:bg-error stepper-error:text-error-content stepper-completed:bg-success stepper-completed:group-focus:bg-success size-7.5 bg-neutral/20 text-base-content/90 group-focus:bg-base-content/20 flex flex-shrink-0 items-center justify-center rounded-full font-medium"} >
            <span class="stepper-success:hidden stepper-completed:hidden">{(status_step8 && status_step8.status == "Completed") ? "" : "8"}</span>
            <span class={(status_step8 && status_step8.status == "Completed") ? 'icon-[tabler--check] stepper-success:block  size-4 flex-shrink-0' : 'icon-[tabler--check] stepper-success:block hidden size-5 flex-shrink-0'}></span>
            </span>
            <span class="text-base-content/90 ms-2 max-sm:hidden">Step 8</span>
            
          </span>

      <div class="ml-6">
       
       <div class="text-sm">
             <p class="font-sans font-bold text-lg">MOA Signing</p>
             <div class="text-sm">
             <div class="text-xs flex items-center gap-1.5 mb-3">Status :
             {(status_step8 ? 
    <>
     {
        (status_step8.status == "Completed") ?
        <>
            <span class="badge badge-success size-2 p-0"></span>
            {status_step8.status} 
        </>
        :
        <>
          <span class="badge badge-info size-2 p-0"></span>
          {status_step8.status} 
        </>
      }
    </>
    : 
    <>
    <span class="badge badge-warning size-2 p-0"></span>
    Pending
    </>
    )}
 </div>
 <div class="text-xs flex items-center gap-1.5">Start Date :
 &nbsp; {(status_step8) ? dayjs(status_step8.start).format("LLL") : ""}
 </div>
 <div class="text-xs flex items-center gap-1.5">End Date :
 &nbsp; {(status_step8) ? dayjs(status_step8.end).format("LLL") : ""}
 </div>
 <DurationDays start_date={status_step8?.start} end_date={status_step8?.end} />
             </div>
             </div>
    </div>
      
    </div>
    <div class="bg-neutral/20 ms-3.5 mt-2 h-full w-px justify-self-start group-last:hidden"></div>
  </li>
    </>
    :
    <></>
  }

{
    (user.user_type != "tpl") ?
    <>

  <hr />
  <li class="group flex flex-1 shrink basis-0 flex-col" data-stepper-nav-item='{ "index": 9 }'>
    <div class="flex items-center rounded text-sm">
    <span class="min-h-7.5 min-w-7.5 group inline-flex items-center align-middle text-sm">
            <span class={(status_step9 && status_step9.status == "Completed") ? "stepper-active:bg-primary stepper-active:text-primary-content stepper-success bg-success stepper-active:shadow stepper-success:shadow stepper-success:text-primary-content stepper-error:bg-error stepper-error:text-error-content stepper-completed:bg-success stepper-completed:group-focus:bg-success size-7.5 bg-neutral/20 text-base-content/90 group-focus:bg-base-content/20 flex flex-shrink-0 items-center justify-center rounded-full font-medium" : "stepper-active:bg-primary stepper-active:text-primary-content stepper-success:bg-success stepper-active:shadow stepper-success:shadow stepper-success:text-primary-content stepper-error:bg-error stepper-error:text-error-content stepper-completed:bg-success stepper-completed:group-focus:bg-success size-7.5 bg-neutral/20 text-base-content/90 group-focus:bg-base-content/20 flex flex-shrink-0 items-center justify-center rounded-full font-medium"} >
            <span class="stepper-success:hidden stepper-completed:hidden">{(status_step9 && status_step9.status == "Completed") ? "" : "9"}</span>
            <span class={(status_step9 && status_step9.status == "Completed") ? 'icon-[tabler--check] stepper-success:block  size-4 flex-shrink-0' : 'icon-[tabler--check] stepper-success:block hidden size-5 flex-shrink-0'}></span>
            </span>
            <span class="text-base-content/90 ms-2 max-sm:hidden">Step 9</span>
            
          </span>

      <div class="ml-6">
       
       <div class="text-sm">
             <p class="font-sans font-bold text-lg">Progress Report</p>
             <div class="text-sm">
             <div class="text-xs flex items-center gap-1.5 mb-3">Status :
             {(status_step9 ? 
    <>
     {
        (status_step9.status == "Completed") ?
        <>
            <span class="badge badge-success size-2 p-0"></span>
            {status_step9.status} 
        </>
        :
        <>
          <span class="badge badge-info size-2 p-0"></span>
          {status_step9.status} 
        </>
      }
    </>
    : 
    <>
    <span class="badge badge-warning size-2 p-0"></span>
    Pending
    </>
    )}
 </div>
 <div class="text-xs flex items-center gap-1.5">Start Date :
 &nbsp; {(status_step9) ? dayjs(status_step9.start).format("LLL") : ""}
 </div>
 <div class="text-xs flex items-center gap-1.5">End Date :
 &nbsp; {(status_step9) ? dayjs(status_step9.end).format("LLL") : ""}
 </div>
 <DurationDays start_date={status_step9?.start} end_date={status_step9?.end} />
             </div>
             </div>
    </div>
      
    </div>
    <div class="bg-neutral/20 ms-3.5 mt-2 h-full w-px justify-self-start group-last:hidden"></div>
  </li>
    </>
    :
    <></>
  }



  <hr />
  <li class="group flex flex-1 shrink basis-0 flex-col" data-stepper-nav-item='{ "index": 10 }'>
    <div class="flex items-center rounded text-sm">
    <span class="min-h-7.5 min-w-7.5 group inline-flex items-center align-middle text-sm">
            <span class={(status_step10 && status_step10.status == "Completed") ? "stepper-active:bg-primary stepper-active:text-primary-content stepper-success bg-success stepper-active:shadow stepper-success:shadow stepper-success:text-primary-content stepper-error:bg-error stepper-error:text-error-content stepper-completed:bg-success stepper-completed:group-focus:bg-success size-7.5 bg-neutral/20 text-base-content/90 group-focus:bg-base-content/20 flex flex-shrink-0 items-center justify-center rounded-full font-medium" : "stepper-active:bg-primary stepper-active:text-primary-content stepper-success:bg-success stepper-active:shadow stepper-success:shadow stepper-success:text-primary-content stepper-error:bg-error stepper-error:text-error-content stepper-completed:bg-success stepper-completed:group-focus:bg-success size-7.5 bg-neutral/20 text-base-content/90 group-focus:bg-base-content/20 flex flex-shrink-0 items-center justify-center rounded-full font-medium"} >
            <span class="stepper-success:hidden stepper-completed:hidden">{(status_step10 && status_step10.status == "Completed") ? "" : "10"}</span>
            <span class={(status_step10 && status_step10.status == "Completed") ? 'icon-[tabler--check] stepper-success:block  size-4 flex-shrink-0' : 'icon-[tabler--check] stepper-success:block hidden size-5 flex-shrink-0'}></span>
            </span>
            <span class="text-base-content/90 ms-2 max-sm:hidden">Step 10</span>
            
          </span>

      <div class="ml-6">
       
       <div class="text-sm">
             <p class="font-sans font-bold text-lg">Terminal Review Endorsement</p>
             <div class="text-sm">
             <div class="text-xs flex items-center gap-1.5 mb-3">Status :
             {(status_step10 ? 
    <>
     {
        (status_step10.status == "Completed") ?
        <>
            <span class="badge badge-success size-2 p-0"></span>
            {status_step10.status} 
        </>
        :
        <>
          <span class="badge badge-info size-2 p-0"></span>
          {status_step10.status} 
        </>
      }
    </>
    : 
    <>
    <span class="badge badge-warning size-2 p-0"></span>
    Pending
    </>
    )}
 </div>
 <div class="text-xs flex items-center gap-1.5">Start Date :
 &nbsp; {(status_step10) ? dayjs(status_step10.start).format("LLL") : ""}
 </div>
 <div class="text-xs flex items-center gap-1.5">End Date :
 &nbsp; {(status_step10) ? dayjs(status_step10.end).format("LLL") : ""}
 </div>
 <DurationDays start_date={status_step10?.start} end_date={status_step10?.end} />
             </div>
             </div>
    </div>
      
    </div>
    <div class="bg-neutral/20 ms-3.5 mt-2 h-full w-px justify-self-start group-last:hidden"></div>
  </li>


{
    (user.user_type != "tpl") ?
    <>

  <hr />
  <li class="group flex flex-1 shrink basis-0 flex-col" data-stepper-nav-item='{ "index": 11 }'>
    <div class="flex items-center rounded text-sm">
    <span class="min-h-7.5 min-w-7.5 group inline-flex items-center align-middle text-sm">
            <span class={(status_step11 && status_step11.status == "Completed") ? "stepper-active:bg-primary stepper-active:text-primary-content stepper-success bg-success stepper-active:shadow stepper-success:shadow stepper-success:text-primary-content stepper-error:bg-error stepper-error:text-error-content stepper-completed:bg-success stepper-completed:group-focus:bg-success size-7.5 bg-neutral/20 text-base-content/90 group-focus:bg-base-content/20 flex flex-shrink-0 items-center justify-center rounded-full font-medium" : "stepper-active:bg-primary stepper-active:text-primary-content stepper-success:bg-success stepper-active:shadow stepper-success:shadow stepper-success:text-primary-content stepper-error:bg-error stepper-error:text-error-content stepper-completed:bg-success stepper-completed:group-focus:bg-success size-7.5 bg-neutral/20 text-base-content/90 group-focus:bg-base-content/20 flex flex-shrink-0 items-center justify-center rounded-full font-medium"} >
            <span class="stepper-success:hidden stepper-completed:hidden">{(status_step11 && status_step11.status == "Completed") ? "" : "11"}</span>
            <span class={(status_step11 && status_step11.status == "Completed") ? 'icon-[tabler--check] stepper-success:block  size-4 flex-shrink-0' : 'icon-[tabler--check] stepper-success:block hidden size-5 flex-shrink-0'}></span>
            </span>
            <span class="text-base-content/90 ms-2 max-sm:hidden">Step 11</span>
            
          </span>

      <div class="ml-6">
       
       <div class="text-sm">
             <p class="font-sans font-bold text-lg">Turnitin</p>
             <div class="text-sm">
             <div class="text-xs flex items-center gap-1.5 mb-3">Status :
             {(status_step11 ? 
    <>
     {
        (status_step11.status == "Completed") ?
        <>
            <span class="badge badge-success size-2 p-0"></span>
            {status_step11.status} 
        </>
        :
        <>
          <span class="badge badge-info size-2 p-0"></span>
          {status_step11.status} 
        </>
      }
    </>
    : 
    <>
    <span class="badge badge-warning size-2 p-0"></span>
    Pending
    </>
    )}
 </div>
 <div class="text-xs flex items-center gap-1.5">Start Date :
 &nbsp; {(status_step11) ? dayjs(status_step11.start).format("LLL") : ""}
 </div>
 <div class="text-xs flex items-center gap-1.5">End Date :
 &nbsp; {(status_step11) ? dayjs(status_step11.end).format("LLL") : ""}
 </div>
 <DurationDays start_date={status_step11?.start} end_date={status_step11?.end} />
             </div>
             </div>
    </div>
      
    </div>
    <div class="bg-neutral/20 ms-3.5 mt-2 h-full w-px justify-self-start group-last:hidden"></div>
  </li>
    </>
    :
    <></>
  }

{
    (user.user_type != "tpl") ?
    <>

  <hr />
  <li class="group flex flex-1 shrink basis-0 flex-col" data-stepper-nav-item='{ "index": 12 }'>
    <div class="flex items-center rounded text-sm">
    <span class="min-h-7.5 min-w-7.5 group inline-flex items-center align-middle text-sm">
            <span class={(status_step12 && status_step12.status == "Completed") ? "stepper-active:bg-primary stepper-active:text-primary-content stepper-success bg-success stepper-active:shadow stepper-success:shadow stepper-success:text-primary-content stepper-error:bg-error stepper-error:text-error-content stepper-completed:bg-success stepper-completed:group-focus:bg-success size-7.5 bg-neutral/20 text-base-content/90 group-focus:bg-base-content/20 flex flex-shrink-0 items-center justify-center rounded-full font-medium" : "stepper-active:bg-primary stepper-active:text-primary-content stepper-success:bg-success stepper-active:shadow stepper-success:shadow stepper-success:text-primary-content stepper-error:bg-error stepper-error:text-error-content stepper-completed:bg-success stepper-completed:group-focus:bg-success size-7.5 bg-neutral/20 text-base-content/90 group-focus:bg-base-content/20 flex flex-shrink-0 items-center justify-center rounded-full font-medium"} >
            <span class="stepper-success:hidden stepper-completed:hidden">{(status_step12 && status_step12.status == "Completed") ? "" : "12"}</span>
            <span class={(status_step12 && status_step12.status == "Completed") ? 'icon-[tabler--check] stepper-success:block  size-4 flex-shrink-0' : 'icon-[tabler--check] stepper-success:block hidden size-5 flex-shrink-0'}></span>
            </span>
            <span class="text-base-content/90 ms-2 max-sm:hidden">Step 12</span>
            
          </span>

      <div class="ml-6">
       
       <div class="text-sm">
             <p class="font-sans font-bold text-lg">Final Document/Manuscript</p>
             <div class="text-sm">
             <div class="text-xs flex items-center gap-1.5 mb-3">Status :
             {(status_step12 ? 
    <>
     {
        (status_step12.status == "Completed") ?
        <>
            <span class="badge badge-success size-2 p-0"></span>
            {status_step12.status} 
        </>
        :
        <>
          <span class="badge badge-info size-2 p-0"></span>
          {status_step12.status} 
        </>
      }
    </>
    : 
    <>
    <span class="badge badge-warning size-2 p-0"></span>
    Pending
    </>
    )}
 </div>
 <div class="text-xs flex items-center gap-1.5">Start Date :
 &nbsp; {(status_step12) ? dayjs(status_step12.start).format("LLL") : ""}
 </div>
 <div class="text-xs flex items-center gap-1.5">End Date :
 &nbsp; {(status_step12) ? dayjs(status_step12.end).format("LLL") : ""}
 </div>
 <DurationDays start_date={status_step12?.start} end_date={status_step12?.end} />
             </div>
             </div>
    </div>
      
    </div>
    <div class="bg-neutral/20 ms-3.5 mt-2 h-full w-px justify-self-start group-last:hidden"></div>
  </li>
    </>
    :
    <></>
  }

{
    (user.user_type != "tpl") ?
    <>

  <hr />
  <li class="group flex flex-1 shrink basis-0 flex-col" data-stepper-nav-item='{ "index": 13 }'>
    <div class="flex items-center rounded text-sm">
    <span class="min-h-7.5 min-w-7.5 group inline-flex items-center align-middle text-sm">
            <span class={(status_step13 && status_step13.status == "Completed") ? "stepper-active:bg-primary stepper-active:text-primary-content stepper-success bg-success stepper-active:shadow stepper-success:shadow stepper-success:text-primary-content stepper-error:bg-error stepper-error:text-error-content stepper-completed:bg-success stepper-completed:group-focus:bg-success size-7.5 bg-neutral/20 text-base-content/90 group-focus:bg-base-content/20 flex flex-shrink-0 items-center justify-center rounded-full font-medium" : "stepper-active:bg-primary stepper-active:text-primary-content stepper-success:bg-success stepper-active:shadow stepper-success:shadow stepper-success:text-primary-content stepper-error:bg-error stepper-error:text-error-content stepper-completed:bg-success stepper-completed:group-focus:bg-success size-7.5 bg-neutral/20 text-base-content/90 group-focus:bg-base-content/20 flex flex-shrink-0 items-center justify-center rounded-full font-medium"} >
            <span class="stepper-success:hidden stepper-completed:hidden">{(status_step13 && status_step13.status == "Completed") ? "" : "13"}</span>
            <span class={(status_step13 && status_step13.status == "Completed") ? 'icon-[tabler--check] stepper-success:block  size-4 flex-shrink-0' : 'icon-[tabler--check] stepper-success:block hidden size-5 flex-shrink-0'}></span>
            </span>
            <span class="text-base-content/90 ms-2 max-sm:hidden">Step 13</span>
            
          </span>

      <div class="ml-6">
       
       <div class="text-sm">
             <p class="font-sans font-bold text-lg">Completion Certificate</p>
             <div class="text-sm">
             <div class="text-xs flex items-center gap-1.5 mb-3">Status :
             {(status_step13 ? 
    <>
     {
        (status_step13.status == "Completed") ?
        <>
            <span class="badge badge-success size-2 p-0"></span>
            {status_step13.status} 
        </>
        :
        <>
          <span class="badge badge-info size-2 p-0"></span>
          {status_step13.status} 
        </>
      }
    </>
    : 
    <>
    <span class="badge badge-warning size-2 p-0"></span>
    Pending
    </>
    )}
 </div>
 <div class="text-xs flex items-center gap-1.5">Start Date :
 &nbsp; {(status_step13) ? dayjs(status_step13.start).format("LLL") : ""}
 </div>
 <div class="text-xs flex items-center gap-1.5">End Date :
 &nbsp; {(status_step13) ? dayjs(status_step13.end).format("LLL") : ""}
 </div>
 <DurationDays start_date={status_step13?.start} end_date={status_step13?.end} />
             </div>
             </div>
    </div>
      
    </div>
    <div class="bg-neutral/20 ms-3.5 mt-2 h-full w-px justify-self-start group-last:hidden"></div>
  </li>
    </>
    :
    <></>
  }

  </ul>
  </div>
        </>
    );
}