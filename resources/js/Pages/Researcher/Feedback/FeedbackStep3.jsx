import React from 'react'
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';
import { Link, useForm, usePage, router } from '@inertiajs/react';
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime);
import localizedFormat from "dayjs/plugin/localizedFormat";
dayjs.extend(localizedFormat);

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

    const markAsRead = (id) => {
        patch(route('researcher.mark.read', id), {
            onSuccess: (page) =>  {
            notyf.success(page.props.flash.message);
            },
            onFinish: () =>  {
                console.log("Finishing update status");
            },
        });
        }

  return (
    <>
    <div class="mt-6 border-t border-base-content/25 mb-3"></div>
        <ul class="timeline timeline-vertical timeline-trimmed timeline-compact w-full">

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
          

                {
                    (user.user_type == "researcher") ? 
                    <>
                    { (feedback_step3.read_status == 1) ?
                      <></>
                      :
                      <button type="button" class="btn btn-default btn-xs" onClick={() => markAsRead(feedback_step3.id)}>
                          <span class="text-xs">
                          Mark as read
                          </span>
                      </button>
                      }
                    </>
                    :
                    <></>
                }
         
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
                        <div class="flex justify-center border-2 border-dotted border-gray-300 p-3">
                        <div class="grid gap-4 w-80 justify-center">
                        <img style={{ "width" : "200px" }} src="https://www.achieversacademyalwar.in/assets/images/no-record-found.png" />
                      
<div class="flex justify-center">

</div>
</div>
                        </div>
                       </>                 
                      )
                        :                               
                       <></>                       
                      }

{
          (user.user_type == "cre") ?

<div class="mt-1">
<form onSubmit={submitFiles}>
  <div class=""><div class="w-full">
    <label class="label label-text" for="textareaLabel"> </label>
    <textarea class="textarea" onChange={(e) => setData('comment', e.target.value)} placeholder="" id="textareaLabel"></textarea>
  </div>
  <div class="float-end mt-3 ">
  <button type="submit" class="btn btn-primary"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><g fill="none"><path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"/><path fill="#fff" d="M16 4a3 3 0 0 1 2.995 2.824L19 7v2a3 3 0 0 1 2.995 2.824L22 12v4a3 3 0 0 1-2.824 2.995L19 19v.966c0 1.02-1.143 1.594-1.954 1.033l-.096-.072L14.638 19H11a3 3 0 0 1-1.998-.762l-.14-.134L7 19.5c-.791.593-1.906.075-1.994-.879L5 18.5V17a3 3 0 0 1-2.995-2.824L2 14V7a3 3 0 0 1 2.824-2.995L5 4zm3 7h-8a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h3.638a2 2 0 0 1 1.28.464l1.088.906A1.5 1.5 0 0 1 18.5 17h.5a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1m-3-5H5a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h.5A1.5 1.5 0 0 1 7 16.5v.5l1.01-.757A3 3 0 0 1 8 16v-4a3 3 0 0 1 3-3h6V7a1 1 0 0 0-1-1"/></g></svg>Post</button>
  </div>
  </div>     
</form> 
</div>
:
<></>

}
    </>
  )
}
