import debounce from "lodash/debounce";
import { useMemo, useState, useCallback } from "react";
import { Link, router } from '@inertiajs/react';
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime);
import localizedFormat from "dayjs/plugin/localizedFormat";
dayjs.extend(localizedFormat);
import _ from 'lodash';

const getResearchStatus = (status) => {
  switch (status) {
      case "D":
          return <div class="flex items-center justify-center gap-1.5 text-base font-bold">
           <span class="text-neutral">Draft</span>
        </div>;
      case "S":
        return  <div class="flex items-center justify-center gap-1.5 text-base font-bold">
       <span class="text-accent">Submitted</span>
      </div>;
        case "REC":
        return <div class="flex items-center justify-center gap-1.5 text-base font-bold">
        <span class="text-lime-600">Received</span>
      </div>;

      
  }
};

const DataListings = ({researchs, user, initialFilters}) => {
  const [filters, setFilters] = useState(initialFilters);
  const totalRecords = _.size(researchs);
  
      const sendRequest = useCallback((filters) => {
          console.log("Changed value:", filters);
          router.get(
              route(route().current()),{ 
                 r_type: filters.r_type,
                 r_status: filters.r_status,
                 r_steps: filters.r_steps
               },{
                preserveState: true,
                replace: true,
              }
          );
      }, []);
  
      const debouncedSendRequest = useMemo(() => {
          return debounce(sendRequest, 500);
      }, [sendRequest]);

      const handleChange = (e) => {
        const { name, value } = e.target;
        setFilters((prevFilters) => {
          // Update the filters object dynamically
          const updatedFilters = { ...prevFilters, [name]: value };
          
          // Call the debounced function with updated filters
          debouncedSendRequest(updatedFilters);
          
          return updatedFilters; // Update the state
      });
    };

 
  
  return (
    <>
<div class="grid grid-cols-3">
  <div class="flex justify-between gap-2">
  <div class="">
  <select
  name="r_type" value={filters.r_type} onChange={handleChange}
  class="select w-60 rounded-md" id="favorite-simpson">
    <option value="0" selected>All Types</option>
    <option disabled={user.user_type === 'cre'} value="D">Draft</option>
    <option value="S">For Acceptance</option>
    <option value="REC">On Progress</option>
  </select>
</div>  

{
  filters.r_type == "S" || filters.r_type == 0 || filters.r_type == null ?
  <>
  </>
  :
  <>
    <div class="">
      <select
      name="r_steps" value={filters.r_steps} onChange={handleChange}
      class="select w-60 rounded-md" id="favorite-simpson">
        <option value="0" selected>All Steps</option>
        {/* <option value="1">Submit Application</option> */}
        <option value="2">Technical Committee & Schedule</option>
        <option value="3">Technical Review Report</option>
        <option value="4">Approval of Revised Docs</option>
        <option value="5">Ethics Clearance</option>
        <option value="6">Budget Proposal</option>
        <option value="7">URB Approval</option>
        <option value="8">MOA Signing</option>
        <option value="9">Progress Report</option>
        <option value="10">Tech Panel Endorsement</option>
        <option value="11">Turnitin</option>
      </select>
    </div> 

    <div class="">
      <select
      name="r_status" value={filters.r_status} onChange={handleChange}
        class="select w-60 rounded-md" id="favorite-simpson">
        <option value="0" selected>All Status</option>
        <option value="Completed">Completed</option>
        <option value="On Process">On Process</option>
      </select>
    </div> 
  </>
}  
  </div>
</div>
   
    <div class="flex justify-end space-x-4 mb-3">
    
   

     
    </div>
    <div class="overflow-x-auto">
    <table class="min-w-full table-auto border divide-y divide-gray-200 dark:divide-neutral-700">
  <thead class="bg-gray-400 dark:bg-neutral-700">
    <tr>
      <th scope="col" class="px-2 py-2 text-start text-xs font-bolder text-white uppercase dark:text-neutral-500">Research Title</th>
      <th scope="col" class="px-2 py-2 text-start text-xs font-bolder text-white uppercase dark:text-neutral-500">College</th>
      <th scope="col" class="px-2 py-2 text-start text-xs font-bolder text-white uppercase dark:text-neutral-500">Research Status</th>
      <th scope="col" class="px-2 py-2 text-start text-xs font-bolder text-white uppercase dark:text-neutral-500">Date Created</th>
      <th scope="col" class="px-2 py-2 text-center text-xs font-bolder text-white uppercase dark:text-neutral-500">Type</th>
      <th scope="col" class="px-2 py-2"></th>
    </tr>
  </thead>
  <tbody class="divide-y divide-gray-200 dark:divide-neutral-700">
    {researchs.map((research, index) => (
      <tr class={index % 2 !== 0 ? "bg-gray-50 dark:bg-gray-800 dark:border-gray-700" : "bg-gray-200 dark:bg-gray-800 dark:border-gray-700"}>
        <td class="px-2 py-2 truncate max-w-xs whitespace-nowrap text-sm font-medium text-gray-700 dark:text-neutral-200">{research.research_title}</td>
        <td class="px-2 py-2 whitespace-nowrap text-sm font-medium text-gray-700 dark:text-neutral-200">{research.department.name}</td>
        <td class="px-2 py-2">
          <span class="text-gray-600 text-sm font-bold">
            {research && research.app_status && research.app_status.name !== null && research.app_status.name !== undefined ? (
              research.app_status.name == "Pending" ? (
                <div class="flex items-center justify-start gap-1.5 text-xs font-bold text-warning">
                  <span class="badge badge-warning size-1.5 p-0"></span>
                  Pending
                </div>
              ) : (
                <div>
                  Step {research.app_status.steps}: {research.app_status.name}
                  <div class="w-60">
                    {(research.app_status.status == "Submitted" || research.app_status.status == "Completed" || research.app_status.status == "Scheduled") ? (
                      <div class="flex items-center justify-start gap-1.5 text-base font-bold">
                        <span class="badge badge-success size-1.5 p-0"></span>
                        {research.app_status.status}
                      </div>
                    ) : (
                      <div class="flex items-center justify-start gap-1.5 text-base font-bold">
                        <span class="badge badge-info size-1.5 p-0"></span>
                        {research.app_status.status}
                      </div>
                    )}
                  </div>
                </div>
              )
            ) : (
              <></>
            )}
          </span>
        </td>
        <td class="px-2 py-2 whitespace-nowrap truncate text-xs/5 text-gray-500">{dayjs(research.created_at).format("LL")}</td>
        <td class="px-2 py-2 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200"><span class="text-xs text-gray-500">{getResearchStatus(research.status)}</span></td>
        <td class="px-2 py-2 whitespace-nowrap text-sm font-medium">
          <Link href={route('researcher.show', research.reference)}>
            <button class="btn btn-xs btn-accent text-white rounded-md text-xs">
              <span class="icon-[tabler--files]"></span>
            </button>
          </Link>
        </td>
      </tr>
    ))}
  </tbody>
  <tfoot>
    <tr class="bg-gray-100">
      <td colspan="6" class="border-t text-left">
        <div class="p-3 rounded-lg shadow-md">
          <span class="text-sm text-gray-600">Total Records:</span>
          <span id="total-records" class="text-sm font-semibold text-blue-600">&nbsp;{totalRecords}</span>
          <p class="mt-2 text-xs text-gray-500">We have successfully fetched the total number of records for you.</p>
        </div>
      </td>
    </tr>
  </tfoot>
</table>

          </div>
    </>
  )
}

export default DataListings