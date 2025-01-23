import React from 'react'
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';
import { Link, useForm, usePage, router } from '@inertiajs/react';
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime);
import localizedFormat from "dayjs/plugin/localizedFormat";
dayjs.extend(localizedFormat);
import FeedbackStep1 from '../Feedback/FeedbackStep1';

export default function Step1({research, files, user, feedbacks_step1, feedbacks_step1_notif}) {
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

  return (
    <>

<nav class="tabs tabs-lifted bg-zinc-100 mt-3 p-2" aria-label="Tabs" role="tablist" aria-orientation="horizontal">
  <button type="button" class="tab active-tab:tab-active active" id="tabs-lifted-item-1" data-tab="#tabs-lifted-1" aria-controls="tabs-lifted-1" role="tab" aria-selected="true">
    Submission
  </button>
  <button type="button" class="tab active-tab:tab-active" id="tabs-lifted-item-2" data-tab="#tabs-lifted-2" aria-controls="tabs-lifted-2" role="tab" aria-selected="false">
    Feedback
    {
      (feedbacks_step1_notif == 0) ? 
      ""
      :
      <span class="badge bg-[#FF0000] text-white badge-sm ms-2 rounded-full">+{feedbacks_step1_notif}</span>
    }
    
  </button>
</nav>

<div class="mt-3">
  <div id="tabs-lifted-1" role="tabpanel" aria-labelledby="tabs-lifted-item-1">
  <form onSubmit={submitFiles}>
      <div class="mt-6 border-t border-base-content/25">
          <div class="grid grid-cols-1 gap-6 md:grid-cols-2 m-3">
            <div>
              <label class="text-base-content text-lg font-semibold" for="firstName"> 1. Research Proposal </label>
           
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
                      <span class="flex-shrink-0 text-xs text-base-content/50">{dayjs(files.doc_frp.created_at).format("LLL")} (<time datetime="2023-01-23T13:23Z">{dayjs().from(dayjs(files.doc_frp.created_at), true)} ago</time>)</span>
                    </div>
                  </div>
                  <div class="ms-4 flex-shrink-0">
                  <span class="hover:cursor-pointer" onClick={() => downloadFile(files.doc_frp)}> <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path fill="currentColor" d="m12 16l-5-5l1.4-1.45l2.6 2.6V4h2v8.15l2.6-2.6L17 11zm-6 4q-.825 0-1.412-.587T4 18v-3h2v3h12v-3h2v3q0 .825-.587 1.413T18 20z"/></svg></span>
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
                      <span class="flex-shrink-0 text-xs text-base-content/50">{dayjs(files.doc_el.created_at).format("LLL")} (<time datetime="2023-01-23T13:23Z">{dayjs().from(dayjs(files.doc_el.created_at), true)} ago</time>)</span>
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
                      <span class="flex-shrink-0 text-xs text-base-content/50">{dayjs(files.doc_wpgc.created_at).format("LLL")} (<time datetime="2023-01-23T13:23Z">{dayjs().from(dayjs(files.doc_wpgc.created_at), true)} ago</time>)</span>
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
                      <span class="flex-shrink-0 text-xs text-base-content/50">{dayjs(files.doc_brbp.created_at).format("LLL")} (<time datetime="2023-01-23T13:23Z">{dayjs().from(dayjs(files.doc_brbp.created_at), true)} ago</time>)</span>
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
                      <span class="flex-shrink-0 text-xs text-base-content/50">{dayjs(files.doc_vgii.created_at).format("LLL")} (<time datetime="2023-01-23T13:23Z">{dayjs().from(dayjs(files.doc_vgii.created_at), true)} ago</time>)</span>
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
                      <span class="flex-shrink-0 text-xs text-base-content/50">{dayjs(files.doc_cvr.created_at).format("LLL")} (<time datetime="2023-01-23T13:23Z">{dayjs().from(dayjs(files.doc_cvr.created_at), true)} ago</time>)</span>
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
     <div class="alert alert-soft alert-success flex items-start gap-4">
  <span class="icon-[tabler--check] size-6"></span>
  <div class="flex flex-col gap-1">
    <h5 class="text-lg font-semibold">Application Accepted</h5>
    <p>Application was accepted by CRE.
    </p>
  </div>
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
      <div class="alert alert-soft alert-success flex items-start gap-4">
  <span class="icon-[tabler--check] size-6"></span>
  <div class="flex flex-col gap-1">
    <h5 class="text-lg font-semibold">Application Submitted</h5>
    <p>Waiting for approval of CRE and we appreciate your patience.
    </p>
  </div>
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
  </div>
  <div id="tabs-lifted-2" class="hidden" role="tabpanel" aria-labelledby="tabs-lifted-item-2">
  <div class="vertical-scrollbar rounded-scrollbar max-h-screen w-full p-4">
       <FeedbackStep1 user={user} research={research} feedbacks_step1={feedbacks_step1} />
  </div>
  </div>
</div>


    </>
  )
}
