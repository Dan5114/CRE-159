import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Pagination from "@/Components/Pagination";
import { Head, Link, router } from '@inertiajs/react';
import debounce from "lodash/debounce";
import { useMemo, useState, useCallback } from "react";
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css'; 
import EmptyData from './Sub/EmptyData';
import DataListings from './Sub/DataListings';

export default function Index(props) {
    const notyf = new Notyf();
    const {data: researchs, links, meta} = props.researchs;
    const [query, setQuery] = useState("initial");

    const sendRequest = useCallback((value) => {
        console.log("Changed value:", value);
        router.get(
            route(route().current()),
            { q: value },
            { preserveState: true, replace: true }
        );
    }, []);

    const debouncedSendRequest = useMemo(() => {
        return debounce(sendRequest, 500);
    }, [sendRequest]);

    const onChange = (e) => {
        const query = e.target.value;
        setQuery(query);
        debouncedSendRequest(query);
    };

    return (
        <AuthenticatedLayout
            header={
                <div class='flex text-white'>
                 <h2 className="text-xl text-white font-extrabold leading-none tracking-tight">
                    List of Application Proposal
                  </h2>
                </div>
            }
        >
            <Head title="Application Tracking" />

            <div className="py-2">
                <div className="mx-auto sm:px-6 lg:px-8">

                    <div class="w-full">
                      <div class="flex flex-col">
                        <div class="-m-1.5 overflow-x-auto card p-3 mt-1 shadow-lg">
                          <div class="p-1 min-w-full inline-block align-middle">
                            <div class="divide-gray-200 dark:border-neutral-700 dark:divide-neutral-700">
                              <div class="py-3">

                              <div class="grid grid-cols-2 gap-3">
  <div class="">
  <div class="relative max-w-xs">
                                  <label for="hs-table-search" class="sr-only">Search</label>
                                  <input type="search" onChange={onChange} name="hs-table-search" id="hs-table-search" class="py-2 px-3 ps-9 block w-full border-gray-200 shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" placeholder="Search Research" />
                                  <div class="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-3">
                                    <svg class="size-4 text-gray-400 dark:text-neutral-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                      <circle cx="11" cy="11" r="8"></circle>
                                      <path d="m21 21-4.3-4.3"></path>
                                    </svg>
                                  </div>
                                </div>
  </div>
</div>

                               
                              </div>
                              <div class="overflow-hidden">
                                <DataListings researchs={researchs} departments={props.departments}  />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {researchs.length === 0 ? (
                        <>
                          <div class="bg-white p-6 shadow-lg border border-gray-200">
  <div class="flex justify-center items-center">
    <svg class="h-16 w-16 text-gray-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 4V6H7V4H5v16h14V4h-2z"></path>
    </svg>
  </div>
  
  <div class="text-center mt-4">
    <h3 class="text-xl font-semibold text-gray-800">Oops, no items found!</h3>
    
    <p class="mt-2 text-gray-500">It seems like the list is empty. Would you like to add new data or try again later?</p>
  </div>
</div>
                        </>               
                      )
                        :                               
                        <Pagination data={props.researchs} />                        
                      }
                    </div> 
                
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
