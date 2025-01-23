import React from 'react';
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime);
import localizedFormat from "dayjs/plugin/localizedFormat";
dayjs.extend(localizedFormat);

const HeaderData = ({research_data, author}) => {
  return (

    <>
            <div class="p-3 mt-3 shadow-lg w-full h-auto card bg-no-repeat bg-cover rounded-xl overflow-hidden mb-1" style={{"background-image" : "url(https://img.freepik.com/free-vector/emerald-green-curve-frame-template_53876-114598.jpg?semt=ais_hybrid)"}}>
                    <h2 class="mb-3 text-xl text-pretty px-2 border-l-4 font-sans font-extrabold border-teal-600 text-neutral-700  dark:text-gray-200">
                    {research_data.research_title.toUpperCase()}
                  </h2>

                  <p class="font-bold p-1 text-sm flex"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 15 15">
	<path fill="gray" d="M7.5 1L0 4.5l2 .9v1.7c-.6.2-1 .8-1 1.4s.4 1.2 1 1.4v.1l-.9 2.1C.8 13 1 14 2.5 14s1.7-1 1.4-1.9L3 10c.6-.3 1-.8 1-1.5s-.4-1.2-1-1.4V5.9L7.5 8L15 4.5zm4.4 6.5l-4.5 2L5 8.4v.1c0 .7-.3 1.3-.8 1.8l.6 1.4v.1c.1.4.2.8.1 1.2c.7.3 1.5.5 2.5.5c3.3 0 4.5-2 4.5-3z" />
</svg>&nbsp; {research_data.department.name}</p>

                  <p class="p-1 text-sm flex"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 20 20">
	<path fill="gray" d="M7 8a3 3 0 1 0 0-6a3 3 0 0 0 0 6m7.5 1a2.5 2.5 0 1 0 0-5a2.5 2.5 0 0 0 0 5M1.615 16.428a1.22 1.22 0 0 1-.569-1.175a6.002 6.002 0 0 1 11.908 0c.058.467-.172.92-.57 1.174A9.95 9.95 0 0 1 7 18a9.95 9.95 0 0 1-5.385-1.572M14.5 16h-.106c.07-.297.088-.611.048-.933a7.47 7.47 0 0 0-1.588-3.755a4.5 4.5 0 0 1 5.874 2.636a.82.82 0 0 1-.36.98A7.47 7.47 0 0 1 14.5 16" />
</svg>&nbsp; </p>

                  <p class="p-1 text-xs flex"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
	<path fill="gray" d="M19 19H5V8h14m-3-7v2H8V1H6v2H5c-1.11 0-2 .89-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2h-1V1m-1 11h-5v5h5z" />
</svg>&nbsp; {dayjs(research_data.created_at).format("LLLL")} (<time datetime="2023-01-23T13:23Z">{dayjs().from(dayjs(research_data.created_at), true)} ago</time>) </p>
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