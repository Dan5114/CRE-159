import debounce from "lodash/debounce";
import { useMemo, useState, useCallback } from "react";
import { Link, router } from '@inertiajs/react';
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime);
import localizedFormat from "dayjs/plugin/localizedFormat";
dayjs.extend(localizedFormat);

const getResearchStatus = (status) => {
  switch (status) {
      case "D":
          return <div class="flex items-center justify-center gap-1.5 text-base font-bold text-xs">
          <span class="badge badge-neutral size-1.5 p-0"></span>
          Draft
        </div>;
      case "S":
        return  <div class="flex items-center justify-center gap-1.5 text-base font-bold text-xs">
        <span class="badge badge-info size-1.5 p-0"></span>
        Submitted
      </div>;
        case "REC":
        return <div class="flex items-center justify-center gap-1.5 text-base font-bold text-xs">
        <span class="badge badge-success size-1.5 p-0"></span>
        Received
      </div>;
  }
};

const DataListings = ({researchs, user, initialFilters}) => {

  const [filters, setFilters] = useState(initialFilters);
  
      const sendRequest = useCallback((filters) => {
          console.log("Changed value:", filters);
          router.get(
              route(route().current()),{ 
                 r_type: filters.r_type,
                 r_status: filters.r_status
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
{/* 
<div>
        <label for="roleFilter" class="mr-2 text-sm">By Department:</label>
        <select id="roleFilter" class="border rounded-md shadow-sm">
          <option value="">All</option>
            { departments.map((department, index) => (
                <option key={index} value={department.dept_id}>{department.name}</option>
            ))}
        </select>
      </div> */}

<div class="grid grid-cols-3 mt-3">
  <div class="flex justify-start gap-2">
  <div class="">
  <select
  name="r_type" value={filters.r_type} onChange={handleChange}
  class="select w-60 rounded-md" id="favorite-simpson">
    <option value="0" selected>All</option>
    <option disabled={user.user_type === 'cre'} value="D">Draft</option>
    <option value="S">Submitted</option>
    <option value="REC">Received</option>
  </select>
</div>  

<div class="">
  <select class="select w-60 rounded-md" id="favorite-simpson">
    <option selected>Up to Step</option>
    <option>Draft</option>
    <option>Submitted</option>
    <option>Received</option>
  </select>
</div> 

<div class="">
  <select
  name="r_status" value={filters.r_status} onChange={handleChange}
    class="select w-60 rounded-md" id="favorite-simpson">
    <option value="ALL" selected>All Status</option>
    <option value="9">9</option>
    <option value="10">10</option>
    <option value="8">8</option>
    <option value="7">step7</option>
    <option value="11">step11</option>
  </select>
</div> 
   
  
  </div>


  <div class="p-4">

  </div>

  <div class="p-4">

  </div>
</div>
   
    <div class="flex justify-end space-x-4 mb-3">
    
   

     
    </div>
    {filters.r_status}
         <table class="min-w-full border divide-y divide-gray-200 dark:divide-neutral-700">
            <thead class="bg-gray-400 dark:bg-neutral-700">
              <tr>
                <th scope="col" class="px-3 py-3  text-start text-xs font-bolder text-white uppercase dark:text-neutral-500">Research Title</th>
                <th scope="col" class="px-3 py-3  text-start text-xs font-bolder text-white uppercase dark:text-neutral-500">Department</th>
                <th scope="col" class="px-3 py-3  text-start text-xs font-bolder text-white uppercase dark:text-neutral-500">Date Created</th>
                <th scope="col" class="px-3 py-3  text-start text-xs font-bolder text-white uppercase dark:text-neutral-500">Status</th>
                <th scope="col" class="px-3 py-3  text-end text-xs font-bolder text-white uppercase dark:text-neutral-500"></th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 dark:divide-neutral-700">
                { researchs.map((research, index) => (
                <tr class={index % 2 !== 0 ? "bg-gray-50 dark:bg-gray-800 dark:border-gray-700" : "bg-gray-200 dark:bg-gray-800 dark:border-gray-700"}>
                    <td class="px-3 py-3 text-balance whitespace-nowrap text-sm font-medium text-gray-700 dark:text-neutral-200">{research.research_title}</td>
                    <td class="px-3 py-3 text-balance whitespace-nowrap text-sm font-medium text-gray-700 dark:text-neutral-200">{research.department.name}</td>
                    <td class="px-3 py-3 whitespace-nowrap truncate text-xs/5 text-gray-500">{dayjs(research.created_at).format("LL")}</td>
                    <td class="px-3 py-3 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200"><span class="text-xs  text-gray-500">{getResearchStatus(research.status)}</span></td>
                    <td class="px-3 py-3 whitespace-nowrap text-end text-sm font-medium">
                    <Link href={route('researcher.show', research.reference)}>
                    <button class="btn btn-xs btn-accent text-white rounded-md text-xs"><span class="icon-[tabler--files]"></span> View</button>
                    </Link> 



                    </td>
                </tr>
                ))}
            </tbody>
          </table>
    </>
  )
}

export default DataListings