import React from 'react';
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime);
import localizedFormat from "dayjs/plugin/localizedFormat";
dayjs.extend(localizedFormat);

const HeaderData = ({research_data, author}) => {

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

  return (
    //bg-no-repeat bg-cover style={{"background-image" : "url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwbVHHEULBHjawgCxawIX1C8NmqhT-SzFa4w&s)"}}
    <>
            <div class="p-3 mt-3 shadow-lg w-full h-auto card bg-gray-100 rounded-xl overflow-hidden mb-1" >
            <div class="grid grid-cols-5 gap-3">
      <div class="col-span-2">
      <h2 class="mb-3 text-xl text-pretty px-2 border-l-4 font-sans font-extrabold border-teal-600 text-neutral-700  dark:text-gray-200">
                    {research_data.research_title.toUpperCase()}
                  </h2>

                  <p class="p-1 text-sm flex"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><circle cx="12" cy="6" r="4" fill="#868585"/><path fill="#868585" d="M20 17.5c0 2.485 0 4.5-8 4.5s-8-2.015-8-4.5S7.582 13 12 13s8 2.015 8 4.5"/></svg>&nbsp; {research_data.author.name}</p>

                  
                  <p class="p-1 text-sm flex"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 15 15">
	<path fill="gray" d="M7.5 1L0 4.5l2 .9v1.7c-.6.2-1 .8-1 1.4s.4 1.2 1 1.4v.1l-.9 2.1C.8 13 1 14 2.5 14s1.7-1 1.4-1.9L3 10c.6-.3 1-.8 1-1.5s-.4-1.2-1-1.4V5.9L7.5 8L15 4.5zm4.4 6.5l-4.5 2L5 8.4v.1c0 .7-.3 1.3-.8 1.8l.6 1.4v.1c.1.4.2.8.1 1.2c.7.3 1.5.5 2.5.5c3.3 0 4.5-2 4.5-3z" />
</svg>&nbsp; {research_data.department.name}</p>
      </div>

      <div class=" ms-2 m-3 w-full rounded-lg">
      

                
      </div>

      <div class=" justify-end">

      <p class="p-1 text-xs text-gray font-bold flex"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
	<path fill="black" d="M19 19H5V8h14m-3-7v2H8V1H6v2H5c-1.11 0-2 .89-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2h-1V1m-1 11h-5v5h5z" />
</svg>&nbsp; {dayjs(research_data.created_at).format("LLLL")} (<time datetime="2023-01-23T13:23Z">{dayjs().from(dayjs(research_data.created_at), true)} ago</time>) </p>  <p class="p-1 text-xs flex"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 16 16"><path fill="#868585" fill-rule="evenodd" d="M7.999 1a.75.75 0 0 1 .715.521L12 11.79l1.286-4.018A.75.75 0 0 1 14 7.25h1.25a.75.75 0 0 1 0 1.5h-.703l-1.833 5.729a.75.75 0 0 1-1.428 0L8.005 4.226l-2.29 7.25a.75.75 0 0 1-1.42.03L3.031 8.03l-.07.208a.75.75 0 0 1-.711.513H.75a.75.75 0 0 1 0-1.5h.96l.578-1.737a.75.75 0 0 1 1.417-.02L4.95 8.919l2.335-7.394A.75.75 0 0 1 7.999 1" clip-rule="evenodd"/></svg>&nbsp; Status : &nbsp; {getResearchStatus(research_data.status)} </p>

 </div>

 <div>

       
     
<div class="avatar-group pull-up -space-x-5 float-end rtl:space-x-reverse">
<p class="p-1 text-xs flex mr-6">Members : </p>
  <div class="tooltip">
    <div class="tooltip-toggle avatar">
      <div class="w-13">
        <img src="https://cdn.flyonui.com/fy-assets/avatar/avatar-1.png" alt="avatar" />
      </div>
    </div>
    <span class="tooltip-content tooltip-shown:opacity-100 tooltip-shown:visible" role="tooltip">
      <span class="tooltip-body">Jhon Doe</span>
    </span>
  </div>
  <div class="tooltip">
    <div class="tooltip-toggle avatar">
      <div class="w-13">
        <img src="https://cdn.flyonui.com/fy-assets/avatar/avatar-10.png" alt="avatar" />
      </div>
    </div>
    <span class="tooltip-content tooltip-shown:opacity-100 tooltip-shown:visible" role="tooltip">
      <span class="tooltip-body">Elliot Chen</span>
    </span>
  </div>
  <div class="tooltip">
    <div class="tooltip-toggle avatar">
      <div class="w-13">
        <img src="https://cdn.flyonui.com/fy-assets/avatar/avatar-12.png" alt="avatar" />
      </div>
    </div>
    <span class="tooltip-content tooltip-shown:opacity-100 tooltip-shown:visible" role="tooltip">
      <span class="tooltip-body">Maya Singh</span>
    </span>
  </div>
  <div class="tooltip">
    <div class="tooltip-toggle avatar">
      <div class="w-13">
        <img src="https://cdn.flyonui.com/fy-assets/avatar/avatar-6.png" alt="avatar" />
      </div>
    </div>
    <span class="tooltip-content tooltip-shown:opacity-100 tooltip-shown:visible" role="tooltip">
      <span class="tooltip-body">Jasmine Rivera</span>
    </span>
  </div>
</div>
 </div>

      
    </div>
                   
                 

                  
                      </div>
    </>
  )
}

export default HeaderData

const styles = {
  bold:{
    fontWeight:"bold",
    color: "black"
  }
}