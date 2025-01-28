import React from 'react';
import { Link } from '@inertiajs/react';
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime);
import localizedFormat from "dayjs/plugin/localizedFormat";
dayjs.extend(localizedFormat);

const getResearchStatus = (status) => {
  switch (status) {
      case "D":
          return <span>Draft</span>;
      case "S":
        return <span>Submitted</span>;
        case "REC":
        return <span>Received</span>;
  }
};

const DataListings = ({researchs}) => {
  return (
    <>
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
                    <button type="button" class="text-xs font-sans inline-flex items-center font-medium rounded-lg border border-transparent text-blue-600 hover:bg-blue-100 hover:text-blue-800 focus:outline-none focus:bg-blue-100 focus:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:bg-blue-800/30 dark:hover:text-blue-400 dark:focus:bg-blue-800/30 dark:focus:text-blue-400">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
	<path fill="none" stroke="#181dec" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 19V6a1 1 0 0 1 1-1h4.032a1 1 0 0 1 .768.36l1.9 2.28a1 1 0 0 0 .768.36H16a1 1 0 0 1 1 1v1M3 19l3-8h15l-3 8z" />
</svg>&nbsp;view
</button>
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