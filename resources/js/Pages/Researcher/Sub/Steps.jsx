import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime);
import localizedFormat from "dayjs/plugin/localizedFormat";
dayjs.extend(localizedFormat);

export default function StepperForm({research_logs, step_status}) {

  const status_step1 = step_status.step1;

     return (
        <>
            <ul class="relative flex h-full flex-col gap-y-2">
            <li class="group flex flex-1 shrink basis-0 flex-col" data-stepper-nav-item='{ "index": 1 }'>
    <div class="flex items-center rounded text-sm">
    <span class="min-h-7.5 min-w-7.5 group inline-flex items-center align-middle text-sm">
        <span class="stepper-active:bg-primary stepper-active:text-primary-content stepper-success:bg-primary stepper-active:shadow stepper-success:shadow stepper-success:text-primary-content stepper-error:bg-error stepper-error:text-error-content stepper-completed:bg-success stepper-completed:group-focus:bg-success size-7.5 bg-neutral/20 text-base-content/90 group-focus:bg-base-content/20 flex flex-shrink-0 items-center justify-center rounded-full font-medium" >
          <span class="stepper-success:hidden stepper-completed:hidden">1</span>
          <span class="icon-[tabler--check] stepper-success:block hidden size-4 flex-shrink-0"></span>
        </span>
        <span class="text-base-content/90 ms-2 max-sm:hidden">Step 1</span>
        
      </span>

      <div class="ml-6">
       
       <div class="text-sm">
             <p class="font-bold font-serif italic">Submit Application</p>
             <div class="text-sm">
             <div class="text-xs flex items-center gap-1.5">Status :
   
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
        <li class="group flex flex-1 shrink basis-0 flex-col" data-stepper-nav-item='{ "index": 2 }'>
    <div class="flex items-center rounded text-sm">
    <span class="min-h-7.5 min-w-7.5 group inline-flex items-center align-middle text-sm">
        <span class="stepper-active:bg-primary stepper-active:text-primary-content stepper-success:bg-primary stepper-active:shadow stepper-success:shadow stepper-success:text-primary-content stepper-error:bg-error stepper-error:text-error-content stepper-completed:bg-success stepper-completed:group-focus:bg-success size-7.5 bg-neutral/20 text-base-content/90 group-focus:bg-base-content/20 flex flex-shrink-0 items-center justify-center rounded-full font-medium" >
          <span class="stepper-success:hidden stepper-completed:hidden">2</span>
          <span class="icon-[tabler--check] stepper-success:block hidden size-4 flex-shrink-0"></span>
        </span>
        <span class="text-base-content/90 ms-2 max-sm:hidden">Step 2</span>
        
      </span>

      <div class="ml-6">
       
       <div class="text-sm">
             <p class="font-bold font-serif italic">Technical Committee & Schedule</p>
             <div class="text-sm">
             <div class="text-xs flex items-center gap-1.5">Status :
   <span class="badge badge-warning size-2 p-0"></span>
   
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
  <hr/>
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
             <div class="text-xs flex items-center gap-1.5">Status :
   <span class="badge badge-warning size-2 p-0"></span>
   
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
             <div class="text-xs flex items-center gap-1.5">Status :
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
             <div class="text-xs flex items-center gap-1.5">Status :
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
             <div class="text-xs flex items-center gap-1.5">Status :
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
             <div class="text-xs flex items-center gap-1.5">Status :
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
             <div class="text-xs flex items-center gap-1.5">Status :
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

  </ul>
        </>
    );
}