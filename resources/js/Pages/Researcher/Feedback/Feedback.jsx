import React from 'react'
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';
import { Link, useForm, usePage, router } from '@inertiajs/react';
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime);
import localizedFormat from "dayjs/plugin/localizedFormat";
dayjs.extend(localizedFormat);

export default function Feedback({user, research, feedbacks_step1}) {
    const notyf = new Notyf();
    const { data, setData, post,  delete: destroy, errors, reset, formState, processing, progress, recentlySuccessful } =
    useForm({
        research_id : research.id,
        comment: "",
        steps: "1"
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
    <div class="mt-6 border-t border-base-content/25 mb-3"></div>
        <ul class="timeline timeline-vertical timeline-trimmed timeline-compact w-full">

            { feedbacks_step1.map((feedback_step1, index) => (
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
        <div class="mb-3 flex w-full flex-wrap items-center justify-between gap-2">
          <p>
            CRE commented on <span class="link link-primary link-hover font-medium">{research.research_title}</span> requirements
          </p>
          <span class="text-base-content/50 text-nowrap text-sm">{dayjs(feedback_step1.created_at).format("LLL")} (<time datetime="2023-01-23T13:23Z">{dayjs().from(dayjs(feedback_step1.created_at), true)} ago</time>)</span>
        </div>
        <div class="border-base-content/25 bg-base-200/50 rounded-lg border p-3 text-xs font-normal italic">
        {feedback_step1.remarks}
        </div>
      </div>
    </div>
    <hr />
  </li>
  </>
                            ))}
        </ul>

{
          (user.user_type == "cre") ?

<div class="mt-3">
<form onSubmit={submitFiles}>
  <div class=""><div class="w-full">
    <label class="label label-text" for="textareaLabel"> Comment </label>
    <textarea class="textarea" onChange={(e) => setData('comment', e.target.value)} placeholder="" id="textareaLabel"></textarea>
  </div>
  <div class="float-end mt-3">
  <button type="submit" class="btn btn-primary btn-sm">Post</button>
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
