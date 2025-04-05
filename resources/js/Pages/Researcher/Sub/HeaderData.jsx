import React from 'react';
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime);
import localizedFormat from "dayjs/plugin/localizedFormat";
dayjs.extend(localizedFormat);

const HeaderData = ({research_data, authors}) => {

  function getFirstLetters(str) {
    return str
        .split(',')  // Split the string by spaces into an array of words
        .map(word => word.charAt(0).toUpperCase())  // Map each word to its first letter, converted to uppercase
        .join('');  // Join the letters into a single string
  }

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
            <div class="grid grid-cols-6 gap-3">
      <div class="col-span-3">
                  <h1 class="text-3xl mb-3 text-pretty px-2 border-l-4 text-neutral-700  font-sans font-extrabold border-teal-600">{research_data.research_title.toUpperCase()}</h1>

                  <p class="p-1 text-sm flex"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><circle cx="12" cy="6" r="4" fill="#868585"/><path fill="#868585" d="M20 17.5c0 2.485 0 4.5-8 4.5s-8-2.015-8-4.5S7.582 13 12 13s8 2.015 8 4.5"/></svg>&nbsp; {research_data.author.name}</p>

                  
                  <p class="p-1 text-sm flex"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 15 15">
	<path fill="gray" d="M7.5 1L0 4.5l2 .9v1.7c-.6.2-1 .8-1 1.4s.4 1.2 1 1.4v.1l-.9 2.1C.8 13 1 14 2.5 14s1.7-1 1.4-1.9L3 10c.6-.3 1-.8 1-1.5s-.4-1.2-1-1.4V5.9L7.5 8L15 4.5zm4.4 6.5l-4.5 2L5 8.4v.1c0 .7-.3 1.3-.8 1.8l.6 1.4v.1c.1.4.2.8.1 1.2c.7.3 1.5.5 2.5.5c3.3 0 4.5-2 4.5-3z" />
</svg>&nbsp; {research_data.department.name}</p>
<p class="p-1 text-sm flex"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
	<path fill="gray" d="M19 19H5V8h14m-3-7v2H8V1H6v2H5c-1.11 0-2 .89-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2h-1V1m-1 11h-5v5h5z" />
</svg>&nbsp; {dayjs(research_data.created_at).format("LLL")} (<time datetime="2023-01-23T13:23Z">{dayjs().from(dayjs(research_data.created_at), true)} ago</time>) </p>  <p class="p-1 text-sm flex"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 16 16"><path fill="#868585" fill-rule="evenodd" d="M7.999 1a.75.75 0 0 1 .715.521L12 11.79l1.286-4.018A.75.75 0 0 1 14 7.25h1.25a.75.75 0 0 1 0 1.5h-.703l-1.833 5.729a.75.75 0 0 1-1.428 0L8.005 4.226l-2.29 7.25a.75.75 0 0 1-1.42.03L3.031 8.03l-.07.208a.75.75 0 0 1-.711.513H.75a.75.75 0 0 1 0-1.5h.96l.578-1.737a.75.75 0 0 1 1.417-.02L4.95 8.919l2.335-7.394A.75.75 0 0 1 7.999 1" clip-rule="evenodd"/></svg>&nbsp; Status : &nbsp; {getResearchStatus(research_data.status)} </p>
      </div>

      <div class=" ms-2 m-3 w-full rounded-lg">
      

                
      </div>

      <div class="w-full justify-end">

      

 </div>

 <div>

       
     
<div class="avatar-group pull-up -space-x-5 float-end rtl:space-x-reverse">


{authors.length === 0 ? (
                        <>
                        <div class="flex">
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="24" viewBox="0 0 640 512"><path fill="#777" d="m132.65 212.32l-96.44-74.54A63.4 63.4 0 0 0 32 160a63.84 63.84 0 0 0 100.65 52.32m40.44 62.28A63.8 63.8 0 0 0 128 256H64a64.06 64.06 0 0 0-64 64v32a32 32 0 0 0 32 32h65.91a146.62 146.62 0 0 1 75.18-109.4M544 224a64 64 0 1 0-64-64a64.06 64.06 0 0 0 64 64m-43.44 131.11a114.24 114.24 0 0 0-84.47-65.28L361 247.23c41.46-16.3 71-55.92 71-103.23A111.93 111.93 0 0 0 320 32c-57.14 0-103.69 42.83-110.6 98.08L45.46 3.38A16 16 0 0 0 23 6.19L3.37 31.46a16 16 0 0 0 2.81 22.45l588.35 454.72a16 16 0 0 0 22.47-2.81l19.64-25.27a16 16 0 0 0-2.81-22.45ZM128 403.21V432a48 48 0 0 0 48 48h288a47.5 47.5 0 0 0 12.57-1.87L232 289.13c-58.26 5.7-104 54.29-104 114.08M576 256h-64a63.8 63.8 0 0 0-45.09 18.6A146.29 146.29 0 0 1 542 384h66a32 32 0 0 0 32-32v-32a64.06 64.06 0 0 0-64-64"/></svg>
                        <span class="m-2 text-xs text-gray font-bold flex text-[#FF0000]">No members</span>
                        </div>
                        </>                  
                      )
                        :                               
                        <>
                        <p class="p-1 text-xs flex mr-6">Members : </p>

{ authors.map((author, index) => (
  <div class="tooltip">
    <div class="tooltip-toggle avatar">
      <div class="w-13">
        <img src={`https://cdn.flyonui.com/fy-assets/avatar/avatar-${index+1}.png`} alt="avatar" />
      </div>
    </div>
    <span class="tooltip-content tooltip-shown:opacity-100 tooltip-shown:visible" role="tooltip">
      <span class="tooltip-body">{author.name}</span>
    </span>
  </div>

))}
                        </>              
                      }
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