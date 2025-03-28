import debounce from "lodash/debounce";
import { useMemo, useState, useCallback, useRef } from "react";
import { Link, router } from '@inertiajs/react';
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime);
import localizedFormat from "dayjs/plugin/localizedFormat";
dayjs.extend(localizedFormat);
import _ from 'lodash';
import * as XLSX from "xlsx";
import { FileSpreadsheet } from "lucide-react"; 

const getResearchStatus = (status) => {
  switch (status) {
      case "D":
          return <div class="flex items-center justify-center gap-1.5 text-xs font-bold">
           <span class="text-neutral">Draft</span>
        </div>;
      case "S":
        return  <div class="flex items-center justify-center gap-1.5 text-xs font-bold">
       <span class="text-accent">Submitted</span>
      </div>;
        case "REC":
        return <div class="flex items-center justify-center gap-1.5 text-xs font-bold">
        <span class="text-lime-600">Received</span>
      </div>;

      
  }
};

const DataListings = ({researchs, user, initialFilters}) => {
  const [filters, setFilters] = useState(initialFilters);
  const tableRef = useRef(null);
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

      // ✅ Function to Export Table Data to Excel
  const exportToExcel = () => {
    if (!tableRef.current) return;

    const table = tableRef.current;
    const worksheet = XLSX.utils.table_to_sheet(table);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Research Data");

    XLSX.writeFile(workbook, "Research_Data.xlsx");
  };


 
  
  return (
    <>
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
  {/* Research Type Dropdown */}
  <div className="flex flex-col">
    <label htmlFor="r_type" className="text-sm font-semibold text-gray-700 mb-1">Research Type</label>
    <select
      name="r_type"
      id="r_type"
      value={filters.r_type}
      onChange={handleChange}
      className="select w-full rounded-md border-gray-300 shadow-sm focus:ring focus:ring-blue-200"
    >
      <option value="0">All Types</option>
      <option disabled={user.user_type === 'cre' || user.user_type === 'tpl'} value="D">Draft</option>
      <option value="S">For Acceptance</option>
      <option value="REC">On Progress</option>
    </select>
  </div>

  {/* Conditional Display: Steps and Status */}
  {(filters.r_type !== "S" && filters.r_type !== "0" && filters.r_type !== null) && (
    <>
      {/* Research Steps Dropdown */}
      <div className="flex flex-col">
        <label htmlFor="r_steps" className="text-sm font-semibold text-gray-700 mb-1">Research Steps</label>
        <select
          name="r_steps"
          id="r_steps"
          value={filters.r_steps}
          onChange={handleChange}
          className="select w-full rounded-md border-gray-300 shadow-sm focus:ring focus:ring-blue-200"
        >
          <option value="0">All Steps</option>
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

      {/* Research Status Dropdown */}
      <div className="flex flex-col">
        <label htmlFor="r_status" className="text-sm font-semibold text-gray-700 mb-1">Research Status</label>
        <select
          name="r_status"
          id="r_status"
          value={filters.r_status}
          onChange={handleChange}
          className="select w-full rounded-md border-gray-300 shadow-sm focus:ring focus:ring-blue-200"
        >
          <option value="0">All Status</option>
          <option value="Completed">Completed</option>
          <option value="On Process">On Process</option>
        </select>
      </div>
    </>
  )}
</div>

{/* Export Button */}
<div className="flex justify-end mb-3 mt-3">
  <button 
    onClick={exportToExcel} 
    className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md shadow-md transition duration-300"
  >
    <FileSpreadsheet size={20} />
    <span>Export to Excel</span>
  </button>
</div>

     
    <div class="overflow-x-auto">
    <table ref={tableRef} class="min-w-full table-auto border divide-y divide-gray-200 dark:divide-neutral-700">
  <thead class="bg-gray-400 dark:bg-neutral-700">
  <tr class="bg-gray-800 text-white dark:bg-neutral-900">
  <th scope="col" class="px-4 py-3 text-left text-sm font-semibold uppercase">Research Title</th>
  <th scope="col" class="px-4 py-3 text-left text-sm font-semibold uppercase">Author</th>
  <th scope="col" class="px-4 py-3 text-left text-sm font-semibold uppercase">College</th>
  <th scope="col" class="px-4 py-3 text-left text-sm font-semibold uppercase">Current Research Status</th>
  <th scope="col" class="px-4 py-3 text-left text-sm font-semibold uppercase">Date Created</th>
  <th scope="col" class="px-4 py-3 text-center text-sm font-semibold uppercase">Type</th>
  <th scope="col" class="px-4 py-3 w-24"></th>
</tr>

  </thead>
  <tbody class="divide-y divide-gray-200 dark:divide-neutral-700">
    {researchs.map((research, index) => (
      <tr class={index % 2 !== 0 ? "bg-gray-50 dark:bg-gray-800 dark:border-gray-700" : "bg-gray-200 dark:bg-gray-800 dark:border-gray-700"}>
        <td class="px-2 py-2 truncate max-w-xs whitespace-nowrap text-sm font-medium text-gray-700 dark:text-neutral-200">{research.research_title}</td>
        <td class="px-2 py-2 truncate max-w-xs whitespace-nowrap text-sm font-medium text-gray-700 dark:text-neutral-200">{research.author?.name}</td>
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
                  {research && research.app_status && research.app_status.name !== null && research.app_status.name !== undefined ? 
                  <>Step {research.app_status.steps}: {research.app_status.name}</>
                  :
                  <></>
              }
                  <div class="w-60">
                    {(research.app_status.status == "Submitted" || research.app_status.status == "Completed" || research.app_status.status == "Scheduled") ? (
                      <div class="flex items-center justify-start gap-1.5 text-base font-bold">
                        <span class="badge badge-success badge-xs size-1.5 p-0"></span>
                       <span class="text-xs"> {research.app_status.status}</span>
                      </div>
                    ) : (
                      <div class="flex items-center justify-start gap-1.5 text-base font-bold">
                        <span class="badge badge-info badge-xs size-1.5 p-0"></span>
                        <span class="text-xs">{research.app_status.status}</span>
                      </div>
                    )}
                  </div>
                </div>
              )
            ) : (
              <><span class="text-xs ">N/A</span></>
            )}
          </span>
        </td>
        <td class="px-2 py-2 whitespace-nowrap truncate text-xs/5 text-gray-500">{dayjs(research.created_at).format("LL")}</td>
        <td class="px-2 py-2 whitespace-nowrap text-xs text-gray-800 dark:text-neutral-200"><span class="text-xs text-gray-500">{getResearchStatus(research.status)}</span></td>
        <td class="px-2 py-2 whitespace-nowrap text-sm font-medium">
          <Link href={route('researcher.show', research.reference)}>
            <button class="btn btn-xs bg-gray-500 text-white rounded-md text-xs">
              <span class="icon-[tabler--files]"></span>
            </button>
          </Link>
        </td>
      </tr>
    ))}
  </tbody>
  <tfoot>
    <tr class="bg-gray-100">
      <td colspan="7" class="border-t text-left">
        <div class="p-3 rounded-lg shadow-md">
          <span class="text-sm text-gray-600">Total Records:</span>
          <span id="total-records" class="text-sm font-semibold text-blue-600">&nbsp;{totalRecords}</span>
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