import React from 'react'
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';
import { Link, useForm, usePage, router } from '@inertiajs/react';
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime);
import localizedFormat from "dayjs/plugin/localizedFormat";
dayjs.extend(localizedFormat);

export default function Step1Form({id}) {
     const notyf = new Notyf();
     const { data, setData, post, errors, reset, processing, progress, recentlySuccessful } =
        useForm({
          research_id : id,
          date_completion: "",
          date_extension: ""
        });

    const creApproveApplication = () => {
        console.log(data); 
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
    <div class="mb-4">
        <h1 class="text-xl font-bold text-gray-900">CRE</h1>
    </div>
    <form class="mt-6">
        <div class="mt-6 flex space-x-3">
            <label for="comp-date" class="block text-sm font-medium text-gray-700">Completion Date<span class="text-red-500">*</span></label>
            <input type="date" onChange={(e) => setData('date_completion', e.target.value)} class="block w-60 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
            {errors.date_completion && <div class="text-[#FF0000] flex text-xs"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
	<path fill="red" d="M12 17q.425 0 .713-.288T13 16t-.288-.712T12 15t-.712.288T11 16t.288.713T12 17m-1-4h2V7h-2zm1 9q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22m0-2q3.35 0 5.675-2.325T20 12t-2.325-5.675T12 4T6.325 6.325T4 12t2.325 5.675T12 20m0-8" />
</svg>&nbsp;{errors.date_completion}</div>}

            <label for="ex-date" class="block text-sm font-medium text-gray-700">Extension Date<span class="text-red-500">*</span></label>
            <input type="date" onChange={(e) =>  setData('date_extension', e.target.value)} class="block w-60 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
         
            {errors.date_extension && <div class="text-[#FF0000] flex text-xs"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
	<path fill="red" d="M12 17q.425 0 .713-.288T13 16t-.288-.712T12 15t-.712.288T11 16t.288.713T12 17m-1-4h2V7h-2zm1 9q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22m0-2q3.35 0 5.675-2.325T20 12t-2.325-5.675T12 4T6.325 6.325T4 12t2.325 5.675T12 20m0-8" />
</svg>&nbsp;{errors.date_extension}</div>}
         
<button type="button" onClick={(e) => creApproveApplication()} class="btn btn-success rounded-full" disabled={processing}>
            Accept
            </button>
        </div>
        <div class="float-end m-6">
        
        </div>
    </form>
    </>
  )
}
