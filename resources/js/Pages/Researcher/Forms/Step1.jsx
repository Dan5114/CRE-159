import React from 'react'
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';
import { Link, useForm, usePage, router } from '@inertiajs/react';
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime);
import localizedFormat from "dayjs/plugin/localizedFormat";
dayjs.extend(localizedFormat);

export default function Step1({research, files, user}) {

    const notyf = new Notyf();
    const { data, setData, post, errors, reset, processing, progress, recentlySuccessful } =
    useForm({
      research_id : research.id,
      step1: "",
      step1_url: "",
      step2: "",
      step2_url: "",
      step3: "",
      step3_url: "",
      step4: "",
      step4_url: "",
      step5: "",
      step5_url: "",
      step6: "",
      step6_url: "",
      step7: "",
      step7_url: "",
    });

    const submitFiles = (e) => {
        e.preventDefault();
        post(route('researcher.upload.files'), {
            onSuccess: (page) =>  {
                router.get(route('researcher.show', research.reference))
                notyf.success("Success!");
            },
            onFinish: () =>  {
                console.log("Finishing uploading files");
            },
        });
    }

    const downloadFile = (file) => {
        fetch(route('researcher.file.download', file.id))
         .then((response) => response.blob())
         .then((blob) => {
           const url = window.URL.createObjectURL(new Blob([blob]));
           const link = document.createElement("a");
           link.href = url;
           link.download = file.file_name || "downloaded-file";
           document.body.appendChild(link);
   
           link.click();
   
           document.body.removeChild(link);
           window.URL.revokeObjectURL(url);
         })
         .catch((error) => {
           console.error("Error fetching the file:", error);
         });
    }

    const submitApplication = () => {
        post(route('researcher.submit.application'), {
          onSuccess: (page) =>  {
            notyf.success(page.props.flash.message)
          },
          onFinish: () =>  {
              console.log("Finishing update status");
          },
        });
       }

  return (
    <>

      <form onSubmit={submitFiles}>
      <div class="mt-6 border-t border-base-content/25">
          <div class="grid grid-cols-1 gap-6 md:grid-cols-2 m-3">
            <div>
              <label class="text-base-content text-lg font-semibold" for="firstName"> 1. Full Research Proposal </label>
           
            </div>
            <div>
            <dd class="mt-2 text-base-content sm:col-span-2 sm:mt-0">
              <input class="input mb-3" type="file" onChange={(e) => setData('step1', e.target.files[0])} />
              {
                                          (files.doc_frp.file_name) ?
              <ul role="list" class="divide-y text-sm divide-base-content/25 rounded-md border border-base-content/25">
              <li class="flex items-center justify-between py-2 ps-2 pe-2">
                  <div class="flex w-0 flex-1 items-center">
                    <span class="icon-[tabler--paperclip] size-5 flex-shrink-0"></span>
                    <div class="ms-4 flex min-w-0 flex-1 gap-2">
                      <span class="truncate font-medium">{files.doc_frp.file_name}</span>
                      <span class="flex-shrink-0 text-xs text-base-content/50">{dayjs(files.doc_frp.created_at).format("LLL")} (<time datetime="2023-01-23T13:23Z">{dayjs().from(dayjs(files.doc_cp.created_at), true)} ago</time>)</span>
                    </div>
                  </div>
                  <div class="ms-4 flex-shrink-0">
                    <a onClick={() => downloadFile(files.doc_frp)} class="link link-primary">Download</a>
                  </div>
                </li>
              </ul>
              :
                <></>
              }
    
            </dd>
            </div>
          </div>
    
          <hr/>
    
          <div class="grid grid-cols-1 gap-6 md:grid-cols-2 mt-3">
            <div class="">
              <label class="text-base-content text-lg font-semibold ml-3" for="firstName"> 2. Checklist for Proposal </label>
           
            </div>
            <div>
            <dd class="mt-2 text-base-content sm:col-span-2 sm:mt-0 mb-2">
            <input class="input mb-3" type="file" onChange={(e) => setData('step2', e.target.files[0])} />
              {
                                          (files.doc_cp.file_name) ?
              <ul role="list" class="divide-y text-sm divide-base-content/25 rounded-md border border-base-content/25">
              <li class="flex items-center justify-between py-2 ps-2 pe-2">
                  <div class="flex w-0 flex-1 items-center">
                    <span class="icon-[tabler--paperclip] size-5 flex-shrink-0"></span>
                    <div class="ms-4 flex min-w-0 flex-1 gap-2">
                      <span class="truncate font-medium">{files.doc_cp.file_name}</span>
                      <span class="flex-shrink-0 text-xs text-base-content/50">{dayjs(files.doc_cp.created_at).format("LLL")} (<time datetime="2023-01-23T13:23Z">{dayjs().from(dayjs(files.doc_cp.created_at), true)} ago</time>)</span>
                    </div>
                  </div>
                  <div class="ms-4 flex-shrink-0">
                    <a onClick={() => downloadFile(files.doc_cp)} class="link link-primary">Download</a>
                  </div>
                </li>
              </ul>
              :
                <></>
              }
            </dd>
            </div>
          </div>
    
          <hr/>
    
          <div class="grid grid-cols-1 gap-6 md:grid-cols-2 mt-3">
            <div class="">
              <label class="text-base-content text-lg font-semibold ml-3" for="firstName"> 3. Endorsement Letters </label>
           
            </div>
            <div>
            <dd class="mt-2 text-base-content sm:col-span-2 sm:mt-0 mb-2">
            <input class="input mb-3" type="file" onChange={(e) => setData('step3', e.target.files[0])} />
              {
                                          (files.doc_el.file_name) ?
              <ul role="list" class="divide-y text-sm divide-base-content/25 rounded-md border border-base-content/25">
              <li class="flex items-center justify-between py-2 ps-2 pe-2">
                  <div class="flex w-0 flex-1 items-center">
                    <span class="icon-[tabler--paperclip] size-5 flex-shrink-0"></span>
                    <div class="ms-4 flex min-w-0 flex-1 gap-2">
                      <span class="truncate font-medium">{files.doc_el.file_name}</span>
                      <span class="flex-shrink-0 text-xs text-base-content/50">{dayjs(files.doc_el.created_at).format("LLL")} (<time datetime="2023-01-23T13:23Z">{dayjs().from(dayjs(files.doc_cp.created_at), true)} ago</time>)</span>
                    </div>
                  </div>
                  <div class="ms-4 flex-shrink-0">
                    <a href="#" onClick={() => downloadFile(files.doc_el)} class="link link-primary">Download</a>
                  </div>
                </li>
              </ul>
              :
                <></>
              }
            </dd>
            </div>
          </div>
    
           <hr/>
    
          <div class="grid grid-cols-1 gap-6 md:grid-cols-2 mt-3">
            <div class="">
              <label class="text-base-content text-lg font-semibold ml-3" for="firstName"> 4. Work Plan/Gantt Chart </label>
           
            </div>
            <div>
            <dd class="mt-2 text-base-content sm:col-span-2 sm:mt-0 mb-2">
            <input class="input mb-3" type="file" onChange={(e) => setData('step4', e.target.files[0])} />
              {
                                          (files.doc_wpgc.file_name) ?
              <ul role="list" class="divide-y text-sm divide-base-content/25 rounded-md border border-base-content/25">
              <li class="flex items-center justify-between py-2 ps-2 pe-2">
                  <div class="flex w-0 flex-1 items-center">
                    <span class="icon-[tabler--paperclip] size-5 flex-shrink-0"></span>
                    <div class="ms-4 flex min-w-0 flex-1 gap-2">
                      <span class="truncate font-medium">{files.doc_wpgc.file_name}</span>
                      <span class="flex-shrink-0 text-xs text-base-content/50">{dayjs(files.doc_wpgc.created_at).format("LLL")} (<time datetime="2023-01-23T13:23Z">{dayjs().from(dayjs(files.doc_cp.created_at), true)} ago</time>)</span>
                    </div>
                  </div>
                  <div class="ms-4 flex-shrink-0">
                    <a href="#" onClick={() => downloadFile(files.doc_wpgc)} class="link link-primary">Download</a>
                  </div>
                </li>
              </ul>
              :
                <></>
              }
            </dd>
            </div>
          </div>
    
          <hr/>
    
        <div class="grid grid-cols-1 gap-6 md:grid-cols-2 mt-3">
          <div class="">
            <label class="text-base-content text-lg font-semibold ml-3" for="firstName"> 5. Budget Requirement/Budget Proposal </label>
        
          </div>
          <div>
          <dd class="mt-2 text-base-content sm:col-span-2 sm:mt-0 mb-2">
          <input class="input mb-3" type="file" onChange={(e) => setData('step5', e.target.files[0])} />
              {
                                          (files.doc_brbp.file_name) ?
              <ul role="list" class="divide-y text-sm divide-base-content/25 rounded-md border border-base-content/25">
              <li class="flex items-center justify-between py-2 ps-2 pe-2">
                  <div class="flex w-0 flex-1 items-center">
                    <span class="icon-[tabler--paperclip] size-5 flex-shrink-0"></span>
                    <div class="ms-4 flex min-w-0 flex-1 gap-2">
                      <span class="truncate font-medium">{files.doc_brbp.file_name}</span>
                      <span class="flex-shrink-0 text-xs text-base-content/50">{dayjs(files.doc_brbp.created_at).format("LLL")} (<time datetime="2023-01-23T13:23Z">{dayjs().from(dayjs(files.doc_cp.created_at), true)} ago</time>)</span>
                    </div>
                  </div>
                  <div class="ms-4 flex-shrink-0">
                    <a href="#" onClick={() => downloadFile(files.doc_brbp)} class="link link-primary">Download</a>
                  </div>
                </li>
              </ul>
              :
                <></>
              }
          </dd>
          </div>
        </div>  
    
        <hr/>
    
        <div class="grid grid-cols-1 gap-6 md:grid-cols-2 mt-3">
          <div class="">
            <label class="text-base-content text-lg font-semibold ml-3" for="firstName"> 6. Valid government issued ID</label>
    
          </div>
          <div>
          <dd class="mt-2 text-base-content sm:col-span-2 sm:mt-0 mb-2">
          <input class="input mb-3" type="file" onChange={(e) => setData('step6', e.target.files[0])} />
              {
                                          (files.doc_vgii.file_name) ?
              <ul role="list" class="divide-y text-sm divide-base-content/25 rounded-md border border-base-content/25">
              <li class="flex items-center justify-between py-2 ps-2 pe-2">
                  <div class="flex w-0 flex-1 items-center">
                    <span class="icon-[tabler--paperclip] size-5 flex-shrink-0"></span>
                    <div class="ms-4 flex min-w-0 flex-1 gap-2">
                      <span class="truncate font-medium">{files.doc_vgii.file_name}</span>
                      <span class="flex-shrink-0 text-xs text-base-content/50">{dayjs(files.doc_vgii.created_at).format("LLL")} (<time datetime="2023-01-23T13:23Z">{dayjs().from(dayjs(files.doc_cp.created_at), true)} ago</time>)</span>
                    </div>
                  </div>
                  <div class="ms-4 flex-shrink-0">
                    <a href="#" onClick={() => downloadFile(files.doc_vgii)} class="link link-primary">Download</a>
                  </div>
                </li>
              </ul>
              :
                <></>
              }
          </dd>
          </div>
        </div>  
    
        <hr/>
    
        <div class="grid grid-cols-1 gap-6 md:grid-cols-2 mt-3">
          <div class="">
            <label class="text-base-content text-lg font-semibold ml-3" for="firstName"> 7. CV of the Researchers </label>
    
          </div>
          <div>
          <dd class="mt-2 text-base-content sm:col-span-2 sm:mt-0 mb-2">
          <input class="input mb-3" type="file" onChange={(e) => setData('step7', e.target.files[0])} />
              {
                                          (files.doc_cvr.file_name) ?
              <ul role="list" class="divide-y text-sm divide-base-content/25 rounded-md border border-base-content/25">
              <li class="flex items-center justify-between py-2 ps-2 pe-2">
                  <div class="flex w-0 flex-1 items-center">
                    <span class="icon-[tabler--paperclip] size-5 flex-shrink-0"></span>
                    <div class="ms-4 flex min-w-0 flex-1 gap-2">
                      <span class="truncate font-medium">{files.doc_cvr.file_name}</span>
                      <span class="flex-shrink-0 text-xs text-base-content/50">{dayjs(files.doc_cvr.created_at).format("LLL")} (<time datetime="2023-01-23T13:23Z">{dayjs().from(dayjs(files.doc_cp.created_at), true)} ago</time>)</span>
                    </div>
                  </div>
                  <div class="ms-4 flex-shrink-0">
                    <a href="#" onClick={() => downloadFile(files.doc_cvr)} class="link link-primary">Download</a>
                  </div>
                </li>
              </ul>
              :
                <></>
              }
          </dd>
          </div>
        </div>  
    
        <div class="divider"></div>
        <div class="flex justify-end">
      
      
       {
          (user.user_type == "cre") ?
        
          (research.status != "REC") ?
          <button type="button" onClick={() => creApproveApplication()} class="btn btn-success rounded-full">
          Accept Application
     </button>
     :
    
     <>
     <div class="alert alert-success flex items-center gap-4" role="alert">
  <span class="icon-[tabler--circle-check] size-6"></span>
  <p><span class="text-lg font-semibold">Success alert:</span> Application is Accepted.
  </p>
</div>
     </>
    
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
      
      <>
      <div class="alert alert-info flex items-center gap-4" role="alert">
  <span class="icon-[tabler--circle-check] size-6"></span>
  <p><span class="text-lg font-semibold">Info:</span> Already Submitted Application.
  </p>
</div>
      </>
      
      :
      <button type="button" onClick={() => submitApplication()} class="btn btn-success rounded-full">
            Submit Application
       </button>
    }
         
    </>
       }
    
      
     </div>
    
          
    
          
    </div>
    </form>
    </>
  )
}
