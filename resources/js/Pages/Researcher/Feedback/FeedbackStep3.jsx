import React, {useRef} from 'react'
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';
import { Link, useForm, usePage, router } from '@inertiajs/react';
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime);
import localizedFormat from "dayjs/plugin/localizedFormat";
dayjs.extend(localizedFormat);
import TinyMCEEditor from './TinyMCE';

export default function Feedback({user, research, feedbacks_step3}) {
    const notyf = new Notyf();
    const { data, setData, post,  delete: destroy, patch, errors, reset, formState, processing, progress, recentlySuccessful } =
    useForm({
        research_id : research.id,
        comment: "",
        seen_by: user.name,
        steps: "3"
    });  

    const submitFiles = (e) => {
        e.preventDefault();
        post(route('researcher.message.thread'), {
            onSuccess: (page) =>  {
                notyf.success(page.props.flash.message);
            },
            onFinish: () =>  {
                console.log("Finishing sending message");
                reset()
            },
        });
        reset();
    }

  return (
    <>
    {
          (user.user_type == "cre") ?

<div class="mt-1">
<form onSubmit={submitFiles}>
  <div class=""><div class="w-full">
    <label class="label label-text" for="textareaLabel"> </label>
    <textarea class="textarea" onChange={(e) => setData('comment', e.target.value)} placeholder="" id="textareaLabel"></textarea>
  </div>
  <div class="float-end mt-3 ">
  <button type="submit" class="btn btn-primary"><span class="icon-[tabler--send] size-6 align-bottom"></span>Post Comment</button>
  </div>
  </div>     
</form> 


<TinyMCEEditor />
</div>
:
<></>

}
        <ul class="timeline timeline-vertical timeline-trimmed timeline-compact w-full mt-3">

            { feedbacks_step3.map((feedback_step3, index) => (
                              <>
                              
                        
        <li>
    <hr />
    <div class="timeline-middle bg-base-100 row-start-1 h-12">
      <div class="avatar">
        <div class="size-8 rounded-full">
          <img src="https://cdn.flyonui.com/fy-assets/avatar/avatar-2.png" alt="User Avatar" />
        </div>
      </div>
    </div>
    <div class="timeline-end mt-6 w-full">
      <div class="border-base-content/25 rounded-lg border p-3">
      <span class="text-base-content/50 text-nowrap text-sm float-end m-2">{dayjs(feedback_step3.created_at).format("LLL")} (<time datetime="2023-01-23T13:23Z">{dayjs().from(dayjs(feedback_step3.created_at), true)} ago</time>) &nbsp;
         
          </span>
        <div class="mb-3 flex w-full flex-wrap items-center justify-between gap-2">
          <p>
            CRE commented on <span class="link link-primary link-hover font-medium">{research.research_title}</span>&nbsp;<span class="badge badge-soft badge-secondary badge-sm rounded-full">Technical Review Report</span>
          </p>
          

         
        </div>
        <div class="border-base-content/25 bg-base-200/50 rounded-lg border p-3 font-normal italic">
        {feedback_step3.remarks}
        </div>
        <div class="chat-footer float-end text-base-content/50">
    <div>Delivered</div>
  </div>


                {
                    (feedback_step3.read_status == 1) ?
                    <>
                           
        <div class="flex gap-2 m-2">
        <p class="mb-2 text-xs mt-3">Seen by:  <span class="icon-[tabler--checks] text-success align-bottom"></span></p>
            <div class="avatar">
            <div class="size-8 rounded-full">
                <img src="https://cdn.flyonui.com/fy-assets/avatar/avatar-1.png" alt="User Avatar" />
            </div>
            </div>
            <div class="text-sm">
            <p class="text-sm">{feedback_step3.seen_by}</p>
            <p class="text-xs font-bold">Researcher</p>
            <p class="text-xs">{dayjs(feedback_step3.updated_at).format("LLL")} (<time datetime="2023-01-23T13:23Z">{dayjs().from(dayjs(feedback_step3.updated_at), true)} ago</time>)</p>
            </div>
        </div>
                    </>
                    :
                    <>
                    </>
                }
    
      </div>
    </div>
    <hr />
  </li>
  </>
                            ))}
        </ul>

        {feedbacks_step3.length === 0 ? (
                       <>
                         <div class="flex justify-center items-center min-h-[300px] bg-gray-100 rounded-lg shadow-md">
  <div class="text-center">
    <div class="mb-4">
      <svg xmlns="http://www.w3.org/2000/svg" class="w-12 h-12 text-gray-400 mx-auto" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path fill-rule="evenodd" d="M10 18a8 8 0 110-16 8 8 0 010 16zM9 7a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 11-2 0V8H9a1 1 0 01-1-1z" clip-rule="evenodd" />
      </svg>
    </div>
    <p class="text-xl text-gray-700 font-semibold">Oops! No comments here yet.</p>
    <p class="text-sm text-gray-500 mt-2">Be the first to share your thoughts and start the conversation!</p>
  </div>
</div>
                       </>                 
                      )
                        :                               
                       <></>                       
                      }


    </>
  )
}
