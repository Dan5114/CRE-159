import {React, useEffect} from 'react'
import { Link, useForm, usePage, router } from '@inertiajs/react';
import { useRef, useState } from 'react';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime);
import localizedFormat from "dayjs/plugin/localizedFormat";
dayjs.extend(localizedFormat);

export default function Step9({user, research, progress_report}) {
    const notyf = new Notyf();
    const [state, setState] = useState([]);
    const { data, setData, post,  delete: destroy, errors, reset, formState, processing, progress, recentlySuccessful } =
    useForm({
        research_id : research.id,
        date_scheduled: "",
        steps: "9",
        document_file: "",
        type: ""
    });

    useEffect(() => {
        setData("id", state)
      }, [data.type, data.document_file]);

    const submitFiles = (e) => {
        e.preventDefault();
        post(route('cre.progress.report.date'), {
            onSuccess: (page) =>  {
                notyf.success(page.props.flash.message);
            },
            onFinish: () =>  {
                console.log("Finishing scheduling progress date");
                reset()
            },
        });
    }

    const submitFiles2 = () => {
        post(route('researcher.progress.report.files'), {
            onSuccess: (page) =>  {
                notyf.success(page.props.flash.message);
            },
            onFinish: () =>  {
                console.log("Finishing scheduling progress date");
                reset()
            },
        });
    }

  return (
    <>
      {
        (user.user_type == "cre") ? 
        <>
                <div>
          
          <div class="card p-3">
  
            <div class="mb-4">
                <h1 class="text-3xl font-bold text-gray-900">Schedule Progress Report</h1>
                <p class="mt-2 text-gray-600 text-sm">See details below</p>
            </div>

            <div class="bg-blue-50 border-l-4 border-blue-500 p-6 shadow-md rounded-lg">
        <div class="flex items-start">
        
          <div class="flex-shrink-0">
            <svg class="h-6 w-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m6-6H6"></path>
            </svg>
          </div>
          <div class="ml-4">
            <h3 class="text-xl font-semibold text-gray-800">Set Progress Report Schedule</h3>
           
            
            <form onSubmit={submitFiles}>
            <div class="mt-6">
              <label for="followup-date" class="block text-sm font-medium text-gray-700">Scheduled Date</label>
              <input type="date" id="followup-date" onChange={(e) => setData('date_scheduled', e.target.value)} name="followup-date" class="mt-1 block w-60 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
            </div>

            <div class="mt-6 flex space-x-1">
              <button type="submit" class="inline-flex items-center btn btn-sm text-xs text-white bg-green-600 hover:bg-green-700 rounded-md shadow-md focus:outline-none">
                Scheduled
              </button>

            </div>
            </form>
          </div>
        </div>
      </div>

      <div class="space-y-4 mt-3">
        { progress_report.map((report, index) => (
            <div class="p-6 rounded-lg shadow-lg border border-gray-200">
                <div class="flex items-center justify-between">
                <div class="text-xl font-medium text-gray-700"> Progress Report {index+1} - { dayjs(report.date_scheduled).format("LL")}
                
                </div>
                </div>
            </div>
        ))}
        </div>

       
            
            </div>
            </div>
        </>
        :
        <>
              <div>
          
          <div class="card p-3">
  
            <div class="mb-4">
                <h1 class="text-3xl font-bold text-gray-900">Progress Report</h1>
                <p class="mt-2 text-gray-600 text-sm">See details below</p>
            </div>

            <div class="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-6 mt-3 rounded-md">
                <strong class="font-semibold">Important:</strong> 
                &nbsp;Please <span class="font-semibold">do not delete or remove any previously uploaded documents</span> as they are crucial for version tracking.
            </div>
            
            { progress_report.map((report, index) => (
                <div class="p-6 rounded-lg shadow-lg border border-gray-200">
                    <div class="flex items-center justify-between">
                    <div class="text-xl font-medium text-gray-700"> Progress Report {index+1} - { dayjs(report.date_scheduled).format("LL")}
                    
                    </div>
                    </div>

                    
        <form >
        <div class="grid grid-cols-3 gap-6 md:grid-cols-3 mt-3 mb-6">

        <div>
            <label class="label label-text" for="firstName">Type </label>
            <select onChange={(e) => {setData('type', e.target.value);
                 setState(report.id);
            }} class="select max-w-sm appearance-none" aria-label="select">
            <option disabled selected>Please select type</option>
            <option value="1">Progress Report</option>
            <option value="2">Liquidation</option>
            </select>
          </div>

           <div>
            <label class="label label-text" for="firstName">Document File </label>
            <input type="file" placeholder="" onChange={(e) => {
                setState(report.id);
                setData('document_file', e.target.files[0]);}} class="input" id="firstName" />
          </div>

          <div class="flex justify-end gap-y-2 mt-7">
          <button type="button" onClick={() => 
            submitFiles2()}
            class="btn btn-default rounded-full">
              <span class="icon-[tabler--upload] text-base-content/80 size-6"></span>Upload
              </button>
          </div>
        </div>
        </form>
                </div>
            ))}
       
                    
            </div>
            </div>
        </>
        }
    </>
  )
}
