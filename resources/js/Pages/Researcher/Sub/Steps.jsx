import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime);
import localizedFormat from "dayjs/plugin/localizedFormat";
dayjs.extend(localizedFormat);

export default function StepperForm({research_logs, step_status, user, tech_doc}) {

  const status_step1 = step_status.step1;
  const status_step2 = step_status.step2;
  const status_step3 = step_status.step3;

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
                    <span class={(status_step1 && status_step1.status == "Submitted") ? "stepper-active:bg-primary stepper-active:text-primary-content stepper-success bg-success stepper-active:shadow stepper-success:shadow stepper-success:text-primary-content stepper-error:bg-error stepper-error:text-error-content stepper-completed:bg-success stepper-completed:group-focus:bg-success size-7.5 bg-neutral/20 text-base-content/90 group-focus:bg-base-content/20 flex flex-shrink-0 items-center justify-center rounded-full font-medium" : "stepper-active:bg-primary stepper-active:text-primary-content stepper-success:bg-success stepper-active:shadow stepper-success:shadow stepper-success:text-primary-content stepper-error:bg-error stepper-error:text-error-content stepper-completed:bg-success stepper-completed:group-focus:bg-success size-7.5 bg-neutral/20 text-base-content/90 group-focus:bg-base-content/20 flex flex-shrink-0 items-center justify-center rounded-full font-medium"} >
                      <span class="stepper-success:hidden stepper-completed:hidden">{(status_step1 && status_step1.status == "Submitted") ? "" : "1"}</span>
                      <span class={(status_step1 && status_step1.status == "Submitted") ? 'icon-[tabler--check] stepper-success:block size-4 flex-shrink-0' : 'icon-[tabler--check] stepper-success:block hidden size-5 flex-shrink-0'}></span>
                    </span>
                    <span class="text-base-content/90 ms-2 max-sm:hidden">Step 1</span>
                    
                  </span>

                  <div class="ml-6">
                  
                  <div class="text-sm">
                        <p class="font-bold font-serif italic">Submit Application</p>
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
            &nbsp; {(status_step1) ? status_step1.start : ""}
            </div>
            <div class="text-xs flex items-center gap-1.5">End Date :
            &nbsp; {(status_step1) ? status_step1.end : ""}
            </div>
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
            <span class={(status_step2 && status_step2.status == "Scheduled") ? "stepper-active:bg-primary stepper-active:text-primary-content stepper-success bg-success stepper-active:shadow stepper-success:shadow stepper-success:text-primary-content stepper-error:bg-error stepper-error:text-error-content stepper-completed:bg-success stepper-completed:group-focus:bg-success size-7.5 bg-neutral/20 text-base-content/90 group-focus:bg-base-content/20 flex flex-shrink-0 items-center justify-center rounded-full font-medium" : "stepper-active:bg-primary stepper-active:text-primary-content stepper-success:bg-success stepper-active:shadow stepper-success:shadow stepper-success:text-primary-content stepper-error:bg-error stepper-error:text-error-content stepper-completed:bg-success stepper-completed:group-focus:bg-success size-7.5 bg-neutral/20 text-base-content/90 group-focus:bg-base-content/20 flex flex-shrink-0 items-center justify-center rounded-full font-medium"} >
            <span class="stepper-success:hidden stepper-completed:hidden">{(status_step2 && status_step2.status == "Scheduled") ? "" : "2"}</span>
            <span class={(status_step2 && status_step2.status == "Scheduled") ? 'icon-[tabler--check] stepper-success:block  size-4 flex-shrink-0' : 'icon-[tabler--check] stepper-success:block hidden size-5 flex-shrink-0'}></span>
            </span>
            <span class="text-base-content/90 ms-2 max-sm:hidden">Step 2</span>
            
          </span>
    
          <div class="ml-6">
           
           <div class="text-sm">
                 <p class="font-bold font-serif italic">Technical Committee & Schedule</p>
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
     &nbsp; {(status_step2) ? status_step2.start : ""}
     </div>
     <div class="text-xs flex items-center gap-1.5">End Date :
     &nbsp; {(status_step2) ? status_step2.end : ""}
     </div>
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
        <span class="stepper-active:bg-primary stepper-active:text-primary-content stepper-success:bg-primary stepper-active:shadow stepper-success:shadow stepper-success:text-primary-content stepper-error:bg-error stepper-error:text-error-content stepper-completed:bg-success stepper-completed:group-focus:bg-success size-7.5 bg-neutral/20 text-base-content/90 group-focus:bg-base-content/20 flex flex-shrink-0 items-center justify-center rounded-full font-medium" >
          <span class="stepper-success:hidden stepper-completed:hidden">3</span>
          <span class="icon-[tabler--check] stepper-success:block hidden size-4 flex-shrink-0"></span>
        </span>
        <span class="text-base-content/90 ms-2 max-sm:hidden">Step 3</span>
        
      </span>

      <div class="ml-6">
       
       <div class="text-sm">
             <p class="font-bold font-serif italic">Techinical Review Report</p>
             <div class="text-sm">
             <div class="text-xs flex items-center gap-1.5 mb-3">Status :
             {(status_step3 ? 
    <>
      <span class="badge badge-info size-2 p-0"></span>
      {status_step3.status} 
    </>
    : 
    <>
    <span class="badge badge-warning size-2 p-0"></span>
    Pending
    </>
    )}
   
 </div>
 <div class="text-xs flex items-center gap-1.5">Start Date :
 &nbsp; {(status_step3) ? status_step3.start : ""}
 </div>
 <div class="text-xs flex items-center gap-1.5">End Date :
 &nbsp; {(status_step3) ? status_step3.end : ""}
 </div>
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
        <span class="stepper-active:bg-primary stepper-active:text-primary-content stepper-success:bg-primary stepper-active:shadow stepper-success:shadow stepper-success:text-primary-content stepper-error:bg-error stepper-error:text-error-content stepper-completed:bg-success stepper-completed:group-focus:bg-success size-7.5 bg-neutral/20 text-base-content/90 group-focus:bg-base-content/20 flex flex-shrink-0 items-center justify-center rounded-full font-medium" >
          <span class="stepper-success:hidden stepper-completed:hidden">4</span>
          <span class="icon-[tabler--check] stepper-success:block hidden size-4 flex-shrink-0"></span>
        </span>
        <span class="text-base-content/90 ms-2 max-sm:hidden">Step 4</span>
        
      </span>

      <div class="ml-6">
       
       <div class="text-sm">
             <p class="font-bold font-serif italic">Approval of Revised Docs</p>
             <div class="text-sm">
             <div class="text-xs flex items-center gap-1.5 mb-3 flex">Status :
   <span class="badge badge-warning size-2 p-0"></span>
   Pending
<span>|</span>
   <div class="text-xs flex items-center gap-1.5">Tech Cert Uploaded : {(tech_doc != null) ? 
<>
<span class="icon-[tabler--circle-check] text-success size-4 align-bottom"></span>
</> 
:
<>
<span class="icon-[tabler--progress-down] size-4 text-warning align-bottom"></span>
</>
}

 </div>
 </div>
 <div class="text-xs flex items-center gap-1.5">Start Date :

 </div>
 <div class="text-xs flex items-center gap-1.5">End Date :

 </div>


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
          <span class="stepper-active:bg-primary stepper-active:text-primary-content stepper-success:bg-primary stepper-active:shadow stepper-success:shadow stepper-success:text-primary-content stepper-error:bg-error stepper-error:text-error-content stepper-completed:bg-success stepper-completed:group-focus:bg-success size-7.5 bg-neutral/20 text-base-content/90 group-focus:bg-base-content/20 flex flex-shrink-0 items-center justify-center rounded-full font-medium" >
            <span class="stepper-success:hidden stepper-completed:hidden">5</span>
            <span class="icon-[tabler--check] stepper-success:block hidden size-4 flex-shrink-0"></span>
          </span>
          <span class="text-base-content/90 ms-2 max-sm:hidden">Step 5</span>
          
        </span>
  
        <div class="ml-6">
         
         <div class="text-sm">
               <p class="font-bold font-serif italic">Ethics Clearance</p>
               <div class="text-sm">
               <div class="text-xs flex items-center gap-1.5 mb-3">Status :
     <span class="badge badge-warning size-2 p-0"></span>
     Pending
   </div>
   <div class="text-xs flex items-center gap-1.5">Start Date :
  
   </div>
   <div class="text-xs flex items-center gap-1.5">End Date :
   
   </div>
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
        <span class="stepper-active:bg-primary stepper-active:text-primary-content stepper-success:bg-primary stepper-active:shadow stepper-success:shadow stepper-success:text-primary-content stepper-error:bg-error stepper-error:text-error-content stepper-completed:bg-success stepper-completed:group-focus:bg-success size-7.5 bg-neutral/20 text-base-content/90 group-focus:bg-base-content/20 flex flex-shrink-0 items-center justify-center rounded-full font-medium" >
          <span class="stepper-success:hidden stepper-completed:hidden">6</span>
          <span class="icon-[tabler--check] stepper-success:block hidden size-4 flex-shrink-0"></span>
        </span>
        <span class="text-base-content/90 ms-2 max-sm:hidden">Step 6</span>
        
      </span>

      <div class="ml-6">
       
       <div class="text-sm">
             <p class="font-bold font-serif italic">Budget Proposal</p>
             <div class="text-sm">
             <div class="text-xs flex items-center gap-1.5 mb-3">Status :
   <span class="badge badge-warning size-2 p-0"></span>
   Pending
 </div>
 <div class="text-xs flex items-center gap-1.5">Start Date :

 </div>
 <div class="text-xs flex items-center gap-1.5">End Date :
  
 </div>
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
        <span class="stepper-active:bg-primary stepper-active:text-primary-content stepper-success:bg-primary stepper-active:shadow stepper-success:shadow stepper-success:text-primary-content stepper-error:bg-error stepper-error:text-error-content stepper-completed:bg-success stepper-completed:group-focus:bg-success size-7.5 bg-neutral/20 text-base-content/90 group-focus:bg-base-content/20 flex flex-shrink-0 items-center justify-center rounded-full font-medium" >
          <span class="stepper-success:hidden stepper-completed:hidden">7</span>
          <span class="icon-[tabler--check] stepper-success:block hidden size-4 flex-shrink-0"></span>
        </span>
        <span class="text-base-content/90 ms-2 max-sm:hidden">Step 7</span>
        
      </span>

      <div class="ml-6">
       
       <div class="text-sm">
             <p class="font-bold font-serif italic">URB Approval</p>
             <div class="text-sm">
             <div class="text-xs flex items-center gap-1.5 mb-3">Status :
   <span class="badge badge-warning size-2 p-0"></span>
   Pending
 </div>
 <div class="text-xs flex items-center gap-1.5">Start Date :

 </div>
 <div class="text-xs flex items-center gap-1.5">End Date :

 </div>
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
        <span class="stepper-active:bg-primary stepper-active:text-primary-content stepper-success:bg-primary stepper-active:shadow stepper-success:shadow stepper-success:text-primary-content stepper-error:bg-error stepper-error:text-error-content stepper-completed:bg-success stepper-completed:group-focus:bg-success size-7.5 bg-neutral/20 text-base-content/90 group-focus:bg-base-content/20 flex flex-shrink-0 items-center justify-center rounded-full font-medium" >
          <span class="stepper-success:hidden stepper-completed:hidden">8</span>
          <span class="icon-[tabler--check] stepper-success:block hidden size-4 flex-shrink-0"></span>
        </span>
        <span class="text-base-content/90 ms-2 max-sm:hidden">Step 8</span>
        
      </span>

      <div class="ml-6">
       
       <div class="text-sm">
             <p class="font-bold font-serif italic">MOA Signing</p>
             <div class="text-sm">
             <div class="text-xs flex items-center gap-1.5 mb-3">Status :
   <span class="badge badge-warning size-2 p-0"></span>
   Pending
 </div>
 <div class="text-xs flex items-center gap-1.5">Start Date :
 
 </div>
 <div class="text-xs flex items-center gap-1.5">End Date :
 
 </div>
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
        <span class="stepper-active:bg-primary stepper-active:text-primary-content stepper-success:bg-primary stepper-active:shadow stepper-success:shadow stepper-success:text-primary-content stepper-error:bg-error stepper-error:text-error-content stepper-completed:bg-success stepper-completed:group-focus:bg-success size-7.5 bg-neutral/20 text-base-content/90 group-focus:bg-base-content/20 flex flex-shrink-0 items-center justify-center rounded-full font-medium" >
          <span class="stepper-success:hidden stepper-completed:hidden">9</span>
          <span class="icon-[tabler--check] stepper-success:block hidden size-4 flex-shrink-0"></span>
        </span>
        <span class="text-base-content/90 ms-2 max-sm:hidden">Step 9</span>
        
      </span>

      <div class="ml-6">
       
       <div class="text-sm">
             <p class="font-bold font-serif italic">Progress Report</p>
             <div class="text-sm">
             <div class="text-xs flex items-center gap-1.5 mb-3">Status :
   <span class="badge badge-warning size-2 p-0"></span>
   Pending
 </div>
 <div class="text-xs flex items-center gap-1.5">Start Date :
 
 </div>
 <div class="text-xs flex items-center gap-1.5">End Date :
 
 </div>
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