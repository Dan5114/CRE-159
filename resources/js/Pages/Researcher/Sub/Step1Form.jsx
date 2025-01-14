import React from 'react'

export default function Step1Form() {
  return (
    <div>
        
   <div class="m-2">



<div class="accordion-item accordion-item-active:border active transition-transform ease-in duration-300 delay-[1ms] mb-3" id="payment-popout">
<h5 class="p-2 rounded-md bg-[#198754] text-xl font-extrabold leading-none tracking-tight text-white md:text-xl dark:text-white">Requirements for Application </h5>
  <div id="payment-popout-collapse" class="accordion-content w-full overflow-hidden transition-[height] duration-300 border" aria-labelledby="payment-popout" role="region">
    <div class="px-5 pb-4">
    <form onSubmit={submitFiles}>
 <ol class=" rounded-none  *:p-3 first:*:rounded-t-md last:*:rounded-b-md odd:*: w-full">
<li>
<label class="form-control">
 <div class="label">
     <span class="text-sm label-text">1. Full Research Proposal</span>
 </div>
 <input type="file" onChange={(e) => setData('step1', e.target.files[0])} class="input max-w-full input-xs" />
 </label>


 <div class="mt-3">
<input type="text" onChange={(e) => setData('step1_url', e.target.value)} placeholder="File Link" class="input max-w-full input-xs"  id="defaultInput" />
</div>

<div class="flex items-center mt-3">

<div class="grid grid-cols-2 gap-4 justify-between">
<div class="card p-2">

{
                                      (files.doc_frp.file_name) ?
                                      <div class="text-xs">
                                         
                                        <span class="font-xs text-blue-600 dark:text-white ">{files.doc_frp.file_name}</span>
                                        <p class="text-xs">{dayjs(files.doc_frp.created_at).format("LLL")} (<time datetime="2023-01-23T13:23Z">{dayjs().from(dayjs(files.doc_frp.created_at), true)} ago</time>) </p>
                                      
                                        <button type="button" onClick={() => downloadFile(files.doc_frp)} class="btn btn-circle btn-text btn-sm" aria-label="Action button"><span class="icon-[tabler--download]"></span></button>
                                        {/* <button class="btn btn-circle btn-text btn-sm" aria-label="Action button"><span class="icon-[tabler--trash]"></span></button> */}
                                        
                                    </div>
                                    :
                                    <>
                                    <h6 class="text-sm"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
  <mask id="lineMdFileOff0">
      <g fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
          <path stroke-dasharray="64" stroke-dashoffset="64" d="M13.5 3l5.5 5.5v11.5c0 0.55 -0.45 1 -1 1h-12c-0.55 0 -1 -0.45 -1 -1v-16c0 -0.55 0.45 -1 1 -1Z">
              <animate fill="freeze" attributeName="stroke-dashoffset" dur="0.6s" values="64;0" />
          </path>
          <path d="M14.5 3.5l2.25 2.25l2.25 2.25z" opacity="0">
              <animate fill="freeze" attributeName="d" begin="0.6s" dur="0.2s" values="M14.5 3.5l2.25 2.25l2.25 2.25z;M14.5 3.5l0 4.5l4.5 0z" />
              <set fill="freeze" attributeName="opacity" begin="0.6s" to="1" />
          </path>
          <path stroke="#000" stroke-dasharray="28" stroke-dashoffset="28" d="M-1 11h26" transform="rotate(45 12 12)">
              <animate fill="freeze" attributeName="stroke-dashoffset" begin="0.8s" dur="0.4s" values="28;0" />
          </path>
          <path stroke-dasharray="28" stroke-dashoffset="28" d="M-1 13h26" transform="rotate(45 12 12)">
              <animate fill="freeze" attributeName="stroke-dashoffset" begin="0.8s" dur="0.4s" values="28;0" />
          </path>
      </g>
  </mask>
  <rect width="24" height="24" fill="#454a4b" mask="url(#lineMdFileOff0)" />
</svg></h6>
                                    <EmptyFile />
                                    </>
                                    }

</div>
<div class="card p-2">
{
                                      (files.doc_frp.file_url) ?
                                      <div class="text-xs">
                                      
                                        <span class="font-sm text-blue-600 dark:text-white ">{files.doc_frp.file_url}</span>
                                        <p class="text-xs">{dayjs(files.doc_frp.created_at).format("LLL")} (<time datetime="2023-01-23T13:23Z">{dayjs().from(dayjs(files.doc_frp.created_at), true)} ago</time>) </p>
                                       
                                        <button type="button" onClick={() => openLinkFile(files.doc_frp.file_url)} class="btn btn-circle btn-text btn-sm" ><span class="icon-[tabler--link]"></span></button>
                                        {/* <button class="btn btn-circle btn-text btn-sm" aria-label="Action button"><span class="icon-[tabler--trash]"></span></button> */}
                                        
                                    </div>
                                    :
                                    <>
                                    <h6 class="text-sm"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
  <path fill="#454a4b" fill-rule="evenodd" d="M19.892 4.09a3.75 3.75 0 0 0-5.303 0l-4.5 4.5q-.111.11-.21.229l4.965 4.966a3.75 3.75 0 0 0-1.986-4.428a.75.75 0 0 1 .646-1.353a5.253 5.253 0 0 1 2.502 6.944l5.515 5.515a.75.75 0 0 1-1.061 1.06l-18-18.001A.75.75 0 0 1 3.521 2.46l5.294 5.295a5 5 0 0 1 .213-.227l4.5-4.5a5.25 5.25 0 1 1 7.425 7.425l-1.757 1.757a.75.75 0 1 1-1.06-1.06l1.756-1.757a3.75 3.75 0 0 0 0-5.304M5.846 11.773a.75.75 0 0 1 0 1.06l-1.757 1.758a3.75 3.75 0 0 0 5.303 5.304l3.129-3.13a.75.75 0 1 1 1.06 1.061l-3.128 3.13a5.25 5.25 0 1 1-7.425-7.426l1.757-1.757a.75.75 0 0 1 1.061 0m2.401.26a.75.75 0 0 1 .957.458c.18.512.474.992.885 1.403c.31.311.661.555 1.035.733a.75.75 0 0 1-.647 1.354a5.2 5.2 0 0 1-1.449-1.026a5.2 5.2 0 0 1-1.24-1.965a.75.75 0 0 1 .46-.957" clip-rule="evenodd" />
</svg></h6>
                                    <EmptyFile />
                                    </>
                                    }
</div>
</div>
                                   
                                    
                                   

                                    
                                </div>
</li>
<div class="divider"></div>
<li>
<label class="form-control">
             <div class="label">
                 <span class="label-text">2. Checklist for Proposal</span>
             </div>
             <input type="file" onChange={(e) => setData('step2', e.target.files[0])} class="input max-w-full input-xs" />
             </label>
             <div class="mt-3">
<input type="text" onChange={(e) => setData('step2_url', e.target.value)} placeholder="File Link" class="input max-w-full input-xs"  id="defaultInput" />
</div>
<div class="flex items-center mt-3">

<div class="grid grid-cols-2 gap-4 justify-between">
<div class="card p-2">

{
                                      (files.doc_cp.file_name) ?
                                      <div class="text-xs">
                                         
                                        <span class="font-xs text-blue-600 dark:text-white ">{files.doc_cp.file_name}</span>
                                        <p class="text-xs">{dayjs(files.doc_cp.created_at).format("LLL")} (<time datetime="2023-01-23T13:23Z">{dayjs().from(dayjs(files.doc_cp.created_at), true)} ago</time>) </p>
                                      
                                        <button type="button" onClick={() => downloadFile(files.doc_cp)} class="btn btn-circle btn-text btn-sm" aria-label="Action button"><span class="icon-[tabler--download]"></span></button>
                                        {/* <button class="btn btn-circle btn-text btn-sm" aria-label="Action button"><span class="icon-[tabler--trash]"></span></button> */}
                                        
                                    </div>
                                    :
                                    <>
                                     <h6 class="text-sm"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
  <mask id="lineMdFileOff0">
      <g fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
          <path stroke-dasharray="64" stroke-dashoffset="64" d="M13.5 3l5.5 5.5v11.5c0 0.55 -0.45 1 -1 1h-12c-0.55 0 -1 -0.45 -1 -1v-16c0 -0.55 0.45 -1 1 -1Z">
              <animate fill="freeze" attributeName="stroke-dashoffset" dur="0.6s" values="64;0" />
          </path>
          <path d="M14.5 3.5l2.25 2.25l2.25 2.25z" opacity="0">
              <animate fill="freeze" attributeName="d" begin="0.6s" dur="0.2s" values="M14.5 3.5l2.25 2.25l2.25 2.25z;M14.5 3.5l0 4.5l4.5 0z" />
              <set fill="freeze" attributeName="opacity" begin="0.6s" to="1" />
          </path>
          <path stroke="#000" stroke-dasharray="28" stroke-dashoffset="28" d="M-1 11h26" transform="rotate(45 12 12)">
              <animate fill="freeze" attributeName="stroke-dashoffset" begin="0.8s" dur="0.4s" values="28;0" />
          </path>
          <path stroke-dasharray="28" stroke-dashoffset="28" d="M-1 13h26" transform="rotate(45 12 12)">
              <animate fill="freeze" attributeName="stroke-dashoffset" begin="0.8s" dur="0.4s" values="28;0" />
          </path>
      </g>
  </mask>
  <rect width="24" height="24" fill="#454a4b" mask="url(#lineMdFileOff0)" />
</svg></h6>
                                    <EmptyFile />
                                    </>
                                    }

</div>
<div class="card p-2">
{
                                      (files.doc_cp.file_url) ?
                                      <div class="text-xs">
                                      
                                        <span class="font-sm text-blue-600 dark:text-white ">{files.doc_cp.file_url}</span>
                                        <p class="text-xs">{dayjs(files.doc_cp.created_at).format("LLL")} (<time datetime="2023-01-23T13:23Z">{dayjs().from(dayjs(files.doc_cp.created_at), true)} ago</time>) </p>
                                       
                                        <button type="button" onClick={() => openLinkFile(files.doc_cp.file_url)} class="btn btn-circle btn-text btn-sm" ><span class="icon-[tabler--link]"></span></button>
                                        {/* <button class="btn btn-circle btn-text btn-sm" aria-label="Action button"><span class="icon-[tabler--trash]"></span></button> */}
                                        
                                    </div>
                                    :
                                    <>
                                    <h6 class="text-sm"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
  <path fill="#454a4b" fill-rule="evenodd" d="M19.892 4.09a3.75 3.75 0 0 0-5.303 0l-4.5 4.5q-.111.11-.21.229l4.965 4.966a3.75 3.75 0 0 0-1.986-4.428a.75.75 0 0 1 .646-1.353a5.253 5.253 0 0 1 2.502 6.944l5.515 5.515a.75.75 0 0 1-1.061 1.06l-18-18.001A.75.75 0 0 1 3.521 2.46l5.294 5.295a5 5 0 0 1 .213-.227l4.5-4.5a5.25 5.25 0 1 1 7.425 7.425l-1.757 1.757a.75.75 0 1 1-1.06-1.06l1.756-1.757a3.75 3.75 0 0 0 0-5.304M5.846 11.773a.75.75 0 0 1 0 1.06l-1.757 1.758a3.75 3.75 0 0 0 5.303 5.304l3.129-3.13a.75.75 0 1 1 1.06 1.061l-3.128 3.13a5.25 5.25 0 1 1-7.425-7.426l1.757-1.757a.75.75 0 0 1 1.061 0m2.401.26a.75.75 0 0 1 .957.458c.18.512.474.992.885 1.403c.31.311.661.555 1.035.733a.75.75 0 0 1-.647 1.354a5.2 5.2 0 0 1-1.449-1.026a5.2 5.2 0 0 1-1.24-1.965a.75.75 0 0 1 .46-.957" clip-rule="evenodd" />
</svg></h6>
                                    <EmptyFile />
                                    </>
                                    }
</div>
</div>
                                   
                                    
                                   

                                    
                                </div>

</li>

<div class="divider"></div>
<li>
  
<div class="label">
         <span class="label-text">3. Endorsement Letters</span>
        
       </div>
       <div class="">
      
         <label class="form-control">
             
             <input type="file" onChange={(e) => setData('step3', e.target.files[0])} class="input max-w-full input-xs" />
             <div class="mt-3">
<input type="text" onChange={(e) => setData('step3_url', e.target.value)} placeholder="File Link" class="input max-w-full input-xs"  id="defaultInput" />
</div>
             <div class="flex items-start text-lead mt-2 gap-4">
<span class="icon-[tabler--info-circle] size-4"></span>
<div class="flex flex-col gap-1 text-xs">
 <h5 class="text-xs font-semibold">Please ensure that meets the following requirements:</h5>
 <ul class="mt-1.5 list-inside list-disc">
 <li class="">
                 Endorsement from DC to Dean (2 templates are available: use which is applicable)
             </li>
             <li>
                 Endorsement letter from Dean to AVCRE
             </li>
  
 </ul>
</div>
</div>
             </label>

             <div class="flex items-center mt-3">

<div class="grid grid-cols-2 gap-4 justify-between">
<div class="card p-2">

{
                                      (files.doc_el.file_name) ?
                                      <div class="text-xs">
                                         
                                        <span class="font-xs text-blue-600 dark:text-white ">{files.doc_el.file_name}</span>
                                        <p class="text-xs">{dayjs(files.doc_el.created_at).format("LLL")} (<time datetime="2023-01-23T13:23Z">{dayjs().from(dayjs(files.doc_el.created_at), true)} ago</time>) </p>
                                      
                                        <button type="button" onClick={() => downloadFile(files.doc_el)} class="btn btn-circle btn-text btn-sm" aria-label="Action button"><span class="icon-[tabler--download]"></span></button>
                                        {/* <button class="btn btn-circle btn-text btn-sm" aria-label="Action button"><span class="icon-[tabler--trash]"></span></button> */}
                                        
                                    </div>
                                    :
                                    <>
                                     <h6 class="text-sm"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
  <mask id="lineMdFileOff0">
      <g fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
          <path stroke-dasharray="64" stroke-dashoffset="64" d="M13.5 3l5.5 5.5v11.5c0 0.55 -0.45 1 -1 1h-12c-0.55 0 -1 -0.45 -1 -1v-16c0 -0.55 0.45 -1 1 -1Z">
              <animate fill="freeze" attributeName="stroke-dashoffset" dur="0.6s" values="64;0" />
          </path>
          <path d="M14.5 3.5l2.25 2.25l2.25 2.25z" opacity="0">
              <animate fill="freeze" attributeName="d" begin="0.6s" dur="0.2s" values="M14.5 3.5l2.25 2.25l2.25 2.25z;M14.5 3.5l0 4.5l4.5 0z" />
              <set fill="freeze" attributeName="opacity" begin="0.6s" to="1" />
          </path>
          <path stroke="#000" stroke-dasharray="28" stroke-dashoffset="28" d="M-1 11h26" transform="rotate(45 12 12)">
              <animate fill="freeze" attributeName="stroke-dashoffset" begin="0.8s" dur="0.4s" values="28;0" />
          </path>
          <path stroke-dasharray="28" stroke-dashoffset="28" d="M-1 13h26" transform="rotate(45 12 12)">
              <animate fill="freeze" attributeName="stroke-dashoffset" begin="0.8s" dur="0.4s" values="28;0" />
          </path>
      </g>
  </mask>
  <rect width="24" height="24" fill="#454a4b" mask="url(#lineMdFileOff0)" />
</svg></h6>
                                    <EmptyFile />
                                    </>
                                    }

</div>
<div class="card p-2">
{
                                      (files.doc_el.file_url) ?
                                      <div class="text-xs">
                                      
                                        <span class="font-sm text-blue-600 dark:text-white ">{files.doc_el.file_url}</span>
                                        <p class="text-xs">{dayjs(files.doc_el.created_at).format("LLL")} (<time datetime="2023-01-23T13:23Z">{dayjs().from(dayjs(files.doc_el.created_at), true)} ago</time>) </p>
                                       
                                        <button type="button" onClick={() => openLinkFile(files.doc_el.file_url)} class="btn btn-circle btn-text btn-sm" ><span class="icon-[tabler--link]"></span></button>
                                        {/* <button class="btn btn-circle btn-text btn-sm" aria-label="Action button"><span class="icon-[tabler--trash]"></span></button> */}
                                        
                                    </div>
                                    :
                                    <>
                                     <h6 class="text-sm"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
  <path fill="#454a4b" fill-rule="evenodd" d="M19.892 4.09a3.75 3.75 0 0 0-5.303 0l-4.5 4.5q-.111.11-.21.229l4.965 4.966a3.75 3.75 0 0 0-1.986-4.428a.75.75 0 0 1 .646-1.353a5.253 5.253 0 0 1 2.502 6.944l5.515 5.515a.75.75 0 0 1-1.061 1.06l-18-18.001A.75.75 0 0 1 3.521 2.46l5.294 5.295a5 5 0 0 1 .213-.227l4.5-4.5a5.25 5.25 0 1 1 7.425 7.425l-1.757 1.757a.75.75 0 1 1-1.06-1.06l1.756-1.757a3.75 3.75 0 0 0 0-5.304M5.846 11.773a.75.75 0 0 1 0 1.06l-1.757 1.758a3.75 3.75 0 0 0 5.303 5.304l3.129-3.13a.75.75 0 1 1 1.06 1.061l-3.128 3.13a5.25 5.25 0 1 1-7.425-7.426l1.757-1.757a.75.75 0 0 1 1.061 0m2.401.26a.75.75 0 0 1 .957.458c.18.512.474.992.885 1.403c.31.311.661.555 1.035.733a.75.75 0 0 1-.647 1.354a5.2 5.2 0 0 1-1.449-1.026a5.2 5.2 0 0 1-1.24-1.965a.75.75 0 0 1 .46-.957" clip-rule="evenodd" />
</svg></h6>
                                    <EmptyFile />
                                    </>
                                    }
</div>
</div>
                                   
                                    
                                   

                                    
                                </div>
            
             
       </div>
</li>
<div class="divider"></div>
<li>
<label class="form-control">
             <div class="label">
                 <span class="label-text">4. Work Plan/Gantt Chart</span>
             </div>
             <input type="file" onChange={(e) => setData('step4', e.target.files[0])} class="input max-w-full input-xs" />
             </label>
            
             <div class="mt-3">
<input type="text" onChange={(e) => setData('step4_url', e.target.value)} placeholder="File Link" class="input max-w-full input-xs"  id="defaultInput" />
</div>                        

<div class="flex items-center mt-3">

<div class="grid grid-cols-2 gap-4 justify-between">
<div class="card p-2">

{
                                      (files.doc_wpgc.file_name) ?
                                      <div class="text-xs">
                                         
                                        <span class="font-xs text-blue-600 dark:text-white ">{files.doc_wpgc.file_name}</span>
                                        <p class="text-xs">{dayjs(files.doc_wpgc.created_at).format("LLL")} (<time datetime="2023-01-23T13:23Z">{dayjs().from(dayjs(files.doc_wpgc.created_at), true)} ago</time>) </p>
                                      
                                        <button type="button" onClick={() => downloadFile(files.doc_wpgc)} class="btn btn-circle btn-text btn-sm" aria-label="Action button"><span class="icon-[tabler--download]"></span></button>
                                        {/* <button class="btn btn-circle btn-text btn-sm" aria-label="Action button"><span class="icon-[tabler--trash]"></span></button> */}
                                        
                                    </div>
                                    :
                                    <>
                                    <h6 class="text-sm"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
  <mask id="lineMdFileOff0">
      <g fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
          <path stroke-dasharray="64" stroke-dashoffset="64" d="M13.5 3l5.5 5.5v11.5c0 0.55 -0.45 1 -1 1h-12c-0.55 0 -1 -0.45 -1 -1v-16c0 -0.55 0.45 -1 1 -1Z">
              <animate fill="freeze" attributeName="stroke-dashoffset" dur="0.6s" values="64;0" />
          </path>
          <path d="M14.5 3.5l2.25 2.25l2.25 2.25z" opacity="0">
              <animate fill="freeze" attributeName="d" begin="0.6s" dur="0.2s" values="M14.5 3.5l2.25 2.25l2.25 2.25z;M14.5 3.5l0 4.5l4.5 0z" />
              <set fill="freeze" attributeName="opacity" begin="0.6s" to="1" />
          </path>
          <path stroke="#000" stroke-dasharray="28" stroke-dashoffset="28" d="M-1 11h26" transform="rotate(45 12 12)">
              <animate fill="freeze" attributeName="stroke-dashoffset" begin="0.8s" dur="0.4s" values="28;0" />
          </path>
          <path stroke-dasharray="28" stroke-dashoffset="28" d="M-1 13h26" transform="rotate(45 12 12)">
              <animate fill="freeze" attributeName="stroke-dashoffset" begin="0.8s" dur="0.4s" values="28;0" />
          </path>
      </g>
  </mask>
  <rect width="24" height="24" fill="#454a4b" mask="url(#lineMdFileOff0)" />
</svg></h6>
                                    <EmptyFile />
                                    </>
                                    }

</div>
<div class="card p-2">
{
                                      (files.doc_wpgc.file_url) ?
                                      <div class="text-xs">
                                      
                                        <span class="font-sm text-blue-600 dark:text-white ">{files.doc_wpgc.file_url}</span>
                                        <p class="text-xs">{dayjs(files.doc_wpgc.created_at).format("LLL")} (<time datetime="2023-01-23T13:23Z">{dayjs().from(dayjs(files.doc_wpgc.created_at), true)} ago</time>) </p>
                                       
                                        <button type="button" onClick={() => openLinkFile(files.doc_wpgc.file_url)} class="btn btn-circle btn-text btn-sm" ><span class="icon-[tabler--link]"></span></button>
                                        {/* <button class="btn btn-circle btn-text btn-sm" aria-label="Action button"><span class="icon-[tabler--trash]"></span></button> */}
                                        
                                    </div>
                                    :
                                    <>
                                    <h6 class="text-sm"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
  <path fill="#454a4b" fill-rule="evenodd" d="M19.892 4.09a3.75 3.75 0 0 0-5.303 0l-4.5 4.5q-.111.11-.21.229l4.965 4.966a3.75 3.75 0 0 0-1.986-4.428a.75.75 0 0 1 .646-1.353a5.253 5.253 0 0 1 2.502 6.944l5.515 5.515a.75.75 0 0 1-1.061 1.06l-18-18.001A.75.75 0 0 1 3.521 2.46l5.294 5.295a5 5 0 0 1 .213-.227l4.5-4.5a5.25 5.25 0 1 1 7.425 7.425l-1.757 1.757a.75.75 0 1 1-1.06-1.06l1.756-1.757a3.75 3.75 0 0 0 0-5.304M5.846 11.773a.75.75 0 0 1 0 1.06l-1.757 1.758a3.75 3.75 0 0 0 5.303 5.304l3.129-3.13a.75.75 0 1 1 1.06 1.061l-3.128 3.13a5.25 5.25 0 1 1-7.425-7.426l1.757-1.757a.75.75 0 0 1 1.061 0m2.401.26a.75.75 0 0 1 .957.458c.18.512.474.992.885 1.403c.31.311.661.555 1.035.733a.75.75 0 0 1-.647 1.354a5.2 5.2 0 0 1-1.449-1.026a5.2 5.2 0 0 1-1.24-1.965a.75.75 0 0 1 .46-.957" clip-rule="evenodd" />
</svg></h6>
                                    <EmptyFile />
                                    </>
                                    }
</div>
</div>
                                   
                                    
                                   

                                    
                                </div>
            
</li>

<div class="divider"></div>

<li>
<label class="form-control">
             <div class="label">
                 <span class="label-text">5. Budget Requirement/Budget Proposal</span>
             </div>
             <input type="file" onChange={(e) => setData('step5', e.target.files[0])} class="input max-w-full input-xs" />
             </label>
             <div class="mt-3">
<input type="text" onChange={(e) => setData('step5_url', e.target.value)} placeholder="File Link" class="input max-w-full input-xs"  id="defaultInput" />
</div>       

<div class="flex items-center mt-3">

<div class="grid grid-cols-2 gap-4 justify-between">
<div class="card p-2">

{
                                      (files.doc_brbp.file_name) ?
                                      <div class="text-xs">
                                         
                                        <span class="font-xs text-blue-600 dark:text-white ">{files.doc_brbp.file_name}</span>
                                        <p class="text-xs">{dayjs(files.doc_brbp.created_at).format("LLL")} (<time datetime="2023-01-23T13:23Z">{dayjs().from(dayjs(files.doc_brbp.created_at), true)} ago</time>) </p>
                                      
                                        <button type="button" onClick={() => downloadFile(files.doc_brbp)} class="btn btn-circle btn-text btn-sm" aria-label="Action button"><span class="icon-[tabler--download]"></span></button>
                                        {/* <button class="btn btn-circle btn-text btn-sm" aria-label="Action button"><span class="icon-[tabler--trash]"></span></button> */}
                                        
                                    </div>
                                    :
                                    <>
                                    <h6 class="text-sm"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
  <mask id="lineMdFileOff0">
      <g fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
          <path stroke-dasharray="64" stroke-dashoffset="64" d="M13.5 3l5.5 5.5v11.5c0 0.55 -0.45 1 -1 1h-12c-0.55 0 -1 -0.45 -1 -1v-16c0 -0.55 0.45 -1 1 -1Z">
              <animate fill="freeze" attributeName="stroke-dashoffset" dur="0.6s" values="64;0" />
          </path>
          <path d="M14.5 3.5l2.25 2.25l2.25 2.25z" opacity="0">
              <animate fill="freeze" attributeName="d" begin="0.6s" dur="0.2s" values="M14.5 3.5l2.25 2.25l2.25 2.25z;M14.5 3.5l0 4.5l4.5 0z" />
              <set fill="freeze" attributeName="opacity" begin="0.6s" to="1" />
          </path>
          <path stroke="#000" stroke-dasharray="28" stroke-dashoffset="28" d="M-1 11h26" transform="rotate(45 12 12)">
              <animate fill="freeze" attributeName="stroke-dashoffset" begin="0.8s" dur="0.4s" values="28;0" />
          </path>
          <path stroke-dasharray="28" stroke-dashoffset="28" d="M-1 13h26" transform="rotate(45 12 12)">
              <animate fill="freeze" attributeName="stroke-dashoffset" begin="0.8s" dur="0.4s" values="28;0" />
          </path>
      </g>
  </mask>
  <rect width="24" height="24" fill="#454a4b" mask="url(#lineMdFileOff0)" />
</svg></h6>
                                    <EmptyFile />
                                    </>
                                    }

</div>
<div class="card p-2">
{
                                      (files.doc_brbp.file_url) ?
                                      <div class="text-xs">
                                      
                                        <span class="font-sm text-blue-600 dark:text-white ">{files.doc_brbp.file_url}</span>
                                        <p class="text-xs">{dayjs(files.doc_brbp.created_at).format("LLL")} (<time datetime="2023-01-23T13:23Z">{dayjs().from(dayjs(files.doc_brbp.created_at), true)} ago</time>) </p>
                                       
                                        <button type="button" onClick={() => openLinkFile(files.doc_brbp.file_url)} class="btn btn-circle btn-text btn-sm" ><span class="icon-[tabler--link]"></span></button>
                                        {/* <button class="btn btn-circle btn-text btn-sm" aria-label="Action button"><span class="icon-[tabler--trash]"></span></button> */}
                                        
                                    </div>
                                    :
                                    <>
                                       <h6 class="text-sm"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
  <path fill="#454a4b" fill-rule="evenodd" d="M19.892 4.09a3.75 3.75 0 0 0-5.303 0l-4.5 4.5q-.111.11-.21.229l4.965 4.966a3.75 3.75 0 0 0-1.986-4.428a.75.75 0 0 1 .646-1.353a5.253 5.253 0 0 1 2.502 6.944l5.515 5.515a.75.75 0 0 1-1.061 1.06l-18-18.001A.75.75 0 0 1 3.521 2.46l5.294 5.295a5 5 0 0 1 .213-.227l4.5-4.5a5.25 5.25 0 1 1 7.425 7.425l-1.757 1.757a.75.75 0 1 1-1.06-1.06l1.756-1.757a3.75 3.75 0 0 0 0-5.304M5.846 11.773a.75.75 0 0 1 0 1.06l-1.757 1.758a3.75 3.75 0 0 0 5.303 5.304l3.129-3.13a.75.75 0 1 1 1.06 1.061l-3.128 3.13a5.25 5.25 0 1 1-7.425-7.426l1.757-1.757a.75.75 0 0 1 1.061 0m2.401.26a.75.75 0 0 1 .957.458c.18.512.474.992.885 1.403c.31.311.661.555 1.035.733a.75.75 0 0 1-.647 1.354a5.2 5.2 0 0 1-1.449-1.026a5.2 5.2 0 0 1-1.24-1.965a.75.75 0 0 1 .46-.957" clip-rule="evenodd" />
</svg></h6>
                                    <EmptyFile />
                                    </>
                                    }
</div>
</div>
                                   
                                    
                                   

                                    
                                </div>

</li>

<div class="divider"></div>
<li>
<label class="form-control">
             <div class="label">
                 <span class="label-text">6. Valid government issued ID </span>
             </div>
             <input type="file" onChange={(e) => setData('step6', e.target.files[0])} class="input max-w-full input-xs" />

             <div class="mt-3">
<input type="text" onChange={(e) => setData('step6_url', e.target.value)} placeholder="File Link" class="input max-w-full input-xs"  id="defaultInput" />
</div>       

             <div class="flex items-start text-lead mt-2 gap-4">
<span class="icon-[tabler--info-circle] size-4"></span>
<div class="flex flex-col gap-1 text-xs">
 <h5 class="text-xs font-semibold">Please ensure that meets the following requirements:</h5>
 <ul class="mt-1.5 list-inside list-disc">
 <li>
              (Preferably UMID or SSS)
             </li>
             <li>
             One with long expiry date
             </li>
  
 </ul>
</div>
</div>
             </label>

             <div class="flex items-center mt-3">

<div class="grid grid-cols-2 gap-4 justify-between">
<div class="card p-2">

{
                                      (files.doc_vgii.file_name) ?
                                      <div class="text-xs">
                                         
                                        <span class="font-xs text-blue-600 dark:text-white ">{files.doc_vgii.file_name}</span>
                                        <p class="text-xs">{dayjs(files.doc_vgii.created_at).format("LLL")} (<time datetime="2023-01-23T13:23Z">{dayjs().from(dayjs(files.doc_vgii.created_at), true)} ago</time>) </p>
                                      
                                        <button type="button" onClick={() => downloadFile(files.doc_vgii)} class="btn btn-circle btn-text btn-sm" aria-label="Action button"><span class="icon-[tabler--download]"></span></button>
                                        {/* <button class="btn btn-circle btn-text btn-sm" aria-label="Action button"><span class="icon-[tabler--trash]"></span></button> */}
                                        
                                    </div>
                                    :
                                    <>
                                     <h6 class="text-sm"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
  <mask id="lineMdFileOff0">
      <g fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
          <path stroke-dasharray="64" stroke-dashoffset="64" d="M13.5 3l5.5 5.5v11.5c0 0.55 -0.45 1 -1 1h-12c-0.55 0 -1 -0.45 -1 -1v-16c0 -0.55 0.45 -1 1 -1Z">
              <animate fill="freeze" attributeName="stroke-dashoffset" dur="0.6s" values="64;0" />
          </path>
          <path d="M14.5 3.5l2.25 2.25l2.25 2.25z" opacity="0">
              <animate fill="freeze" attributeName="d" begin="0.6s" dur="0.2s" values="M14.5 3.5l2.25 2.25l2.25 2.25z;M14.5 3.5l0 4.5l4.5 0z" />
              <set fill="freeze" attributeName="opacity" begin="0.6s" to="1" />
          </path>
          <path stroke="#000" stroke-dasharray="28" stroke-dashoffset="28" d="M-1 11h26" transform="rotate(45 12 12)">
              <animate fill="freeze" attributeName="stroke-dashoffset" begin="0.8s" dur="0.4s" values="28;0" />
          </path>
          <path stroke-dasharray="28" stroke-dashoffset="28" d="M-1 13h26" transform="rotate(45 12 12)">
              <animate fill="freeze" attributeName="stroke-dashoffset" begin="0.8s" dur="0.4s" values="28;0" />
          </path>
      </g>
  </mask>
  <rect width="24" height="24" fill="#454a4b" mask="url(#lineMdFileOff0)" />
</svg></h6>
                                    <EmptyFile />
                                    </>
                                    }

</div>
<div class="card p-2">
{
                                      (files.doc_vgii.file_url) ?
                                      <div class="text-xs">
                                      
                                        <span class="font-sm text-blue-600 dark:text-white ">{files.doc_vgii.file_url}</span>
                                        <p class="text-xs">{dayjs(files.doc_vgii.created_at).format("LLL")} (<time datetime="2023-01-23T13:23Z">{dayjs().from(dayjs(files.doc_vgii.created_at), true)} ago</time>) </p>
                                       
                                        <button type="button" onClick={() => openLinkFile(files.doc_vgii.file_url)} class="btn btn-circle btn-text btn-sm" ><span class="icon-[tabler--link]"></span></button>
                                        {/* <button class="btn btn-circle btn-text btn-sm" aria-label="Action button"><span class="icon-[tabler--trash]"></span></button> */}
                                        
                                    </div>
                                    :
                                    <>
                                       <h6 class="text-sm"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
  <path fill="#454a4b" fill-rule="evenodd" d="M19.892 4.09a3.75 3.75 0 0 0-5.303 0l-4.5 4.5q-.111.11-.21.229l4.965 4.966a3.75 3.75 0 0 0-1.986-4.428a.75.75 0 0 1 .646-1.353a5.253 5.253 0 0 1 2.502 6.944l5.515 5.515a.75.75 0 0 1-1.061 1.06l-18-18.001A.75.75 0 0 1 3.521 2.46l5.294 5.295a5 5 0 0 1 .213-.227l4.5-4.5a5.25 5.25 0 1 1 7.425 7.425l-1.757 1.757a.75.75 0 1 1-1.06-1.06l1.756-1.757a3.75 3.75 0 0 0 0-5.304M5.846 11.773a.75.75 0 0 1 0 1.06l-1.757 1.758a3.75 3.75 0 0 0 5.303 5.304l3.129-3.13a.75.75 0 1 1 1.06 1.061l-3.128 3.13a5.25 5.25 0 1 1-7.425-7.426l1.757-1.757a.75.75 0 0 1 1.061 0m2.401.26a.75.75 0 0 1 .957.458c.18.512.474.992.885 1.403c.31.311.661.555 1.035.733a.75.75 0 0 1-.647 1.354a5.2 5.2 0 0 1-1.449-1.026a5.2 5.2 0 0 1-1.24-1.965a.75.75 0 0 1 .46-.957" clip-rule="evenodd" />
</svg></h6>
                                    <EmptyFile />
                                    </>
                                    }
</div>
</div>
                                   
                                    
                                   

                                    
                                </div>

</li>

<div class="divider"></div>

<li>
<label class="form-control">
             <div class="label">
                 <span class="label-text">7. CV of the Researchers </span>
             </div>
             <input type="file" onChange={(e) => setData('step7', e.target.files[0])} class="input max-w-full input-xs" />
             </label>
             <div class="mt-3">
<input type="text" onChange={(e) => setData('step7_url', e.target.value)} placeholder="File Link" class="input max-w-full input-xs"  id="defaultInput" />
</div>       


           <div class="flex items-center mt-3">

<div class="grid grid-cols-2 gap-4 justify-between">
<div class="card p-2">

{
                                      (files.doc_cvr.file_name) ?
                                      <div class="text-xs">
                                         
                                        <span class="font-xs text-blue-600 dark:text-white ">{files.doc_cvr.file_name}</span>
                                        <p class="text-xs">{dayjs(files.doc_cvr.created_at).format("LLL")} (<time datetime="2023-01-23T13:23Z">{dayjs().from(dayjs(files.doc_cvr.created_at), true)} ago</time>) </p>
                                      
                                        <button type="button" onClick={() => downloadFile(files.doc_cvr)} class="btn btn-circle btn-text btn-sm" aria-label="Action button"><span class="icon-[tabler--download]"></span></button>
                                        {/* <button class="btn btn-circle btn-text btn-sm" aria-label="Action button"><span class="icon-[tabler--trash]"></span></button> */}
                                        
                                    </div>
                                    :
                                    <>
                                    <h6 class="text-sm"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
  <mask id="lineMdFileOff0">
      <g fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
          <path stroke-dasharray="64" stroke-dashoffset="64" d="M13.5 3l5.5 5.5v11.5c0 0.55 -0.45 1 -1 1h-12c-0.55 0 -1 -0.45 -1 -1v-16c0 -0.55 0.45 -1 1 -1Z">
              <animate fill="freeze" attributeName="stroke-dashoffset" dur="0.6s" values="64;0" />
          </path>
          <path d="M14.5 3.5l2.25 2.25l2.25 2.25z" opacity="0">
              <animate fill="freeze" attributeName="d" begin="0.6s" dur="0.2s" values="M14.5 3.5l2.25 2.25l2.25 2.25z;M14.5 3.5l0 4.5l4.5 0z" />
              <set fill="freeze" attributeName="opacity" begin="0.6s" to="1" />
          </path>
          <path stroke="#000" stroke-dasharray="28" stroke-dashoffset="28" d="M-1 11h26" transform="rotate(45 12 12)">
              <animate fill="freeze" attributeName="stroke-dashoffset" begin="0.8s" dur="0.4s" values="28;0" />
          </path>
          <path stroke-dasharray="28" stroke-dashoffset="28" d="M-1 13h26" transform="rotate(45 12 12)">
              <animate fill="freeze" attributeName="stroke-dashoffset" begin="0.8s" dur="0.4s" values="28;0" />
          </path>
      </g>
  </mask>
  <rect width="24" height="24" fill="#454a4b" mask="url(#lineMdFileOff0)" />
</svg></h6>
                                    <EmptyFile />
                                    </>
                                    }

</div>
<div class="card p-2">
{
                                      (files.doc_cvr.file_url) ?
                                      <div class="text-xs">
                                      
                                        <span class="font-sm text-blue-600 dark:text-white ">{files.doc_cvr.file_url}</span>
                                        <p class="text-xs">{dayjs(files.doc_cvr.created_at).format("LLL")} (<time datetime="2023-01-23T13:23Z">{dayjs().from(dayjs(files.doc_cvr.created_at), true)} ago</time>) </p>
                                       
                                        <button type="button" onClick={() => openLinkFile(files.doc_cvr.file_url)} class="btn btn-circle btn-text btn-sm" ><span class="icon-[tabler--link]"></span></button>
                                        {/* <button class="btn btn-circle btn-text btn-sm" aria-label="Action button"><span class="icon-[tabler--trash]"></span></button> */}
                                        
                                    </div>
                                    :
                                    <>
                                       <h6 class="text-sm"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
  <path fill="#454a4b" fill-rule="evenodd" d="M19.892 4.09a3.75 3.75 0 0 0-5.303 0l-4.5 4.5q-.111.11-.21.229l4.965 4.966a3.75 3.75 0 0 0-1.986-4.428a.75.75 0 0 1 .646-1.353a5.253 5.253 0 0 1 2.502 6.944l5.515 5.515a.75.75 0 0 1-1.061 1.06l-18-18.001A.75.75 0 0 1 3.521 2.46l5.294 5.295a5 5 0 0 1 .213-.227l4.5-4.5a5.25 5.25 0 1 1 7.425 7.425l-1.757 1.757a.75.75 0 1 1-1.06-1.06l1.756-1.757a3.75 3.75 0 0 0 0-5.304M5.846 11.773a.75.75 0 0 1 0 1.06l-1.757 1.758a3.75 3.75 0 0 0 5.303 5.304l3.129-3.13a.75.75 0 1 1 1.06 1.061l-3.128 3.13a5.25 5.25 0 1 1-7.425-7.426l1.757-1.757a.75.75 0 0 1 1.061 0m2.401.26a.75.75 0 0 1 .957.458c.18.512.474.992.885 1.403c.31.311.661.555 1.035.733a.75.75 0 0 1-.647 1.354a5.2 5.2 0 0 1-1.449-1.026a5.2 5.2 0 0 1-1.24-1.965a.75.75 0 0 1 .46-.957" clip-rule="evenodd" />
</svg></h6>
                                    <EmptyFile />
                                    </>
                                    }
</div>
</div>
                                   
                                    
                                   

                                    
                                </div>                                      

</li>

<div class="divider"></div>
</ol>
   <div class="flex justify-end gap-y-2 mt-3">
   {/* data-stepper-next-btn="" */}
  
   {
      (user.user_type == "cre") ?
    
      (research.status != "REC") ?
      <button type="button" onClick={() => creApproveApplication()} class="btn btn-success rounded-full">
      Accept Application
 </button>
 :
 "Application is Accepted"

   :
<>
{
(research.status == "D") ?
<button type="submit" disabled={processing} class="btn btn-primary rounded-full">{(processing) ?<span class="loading loading-spinner loading-md"></span> : "Upload Document"} 
     
     </button>
     :
     ""
}
&nbsp;
{
  (research.status != "D") ?
  "Already Submitted Application"
  :
  <button type="button" onClick={() => submitApplication()} class="btn btn-success rounded-full">
        Submit Application
   </button>
}
     
</>
   }

  
 </div>
 </form>
    </div>
  </div>
</div>

</div>
    </div>
  )
}
