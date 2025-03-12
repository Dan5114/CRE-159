import React from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router, useForm, usePage } from '@inertiajs/react';

export default function Index(props) {

  const downloadDoc = (file) => {
    fetch(route('researcher.requirements.download', file.file_name))
     .then((response) => response.blob())
     .then((blob) => {
       const url = window.URL.createObjectURL(new Blob([blob]));
       const link = document.createElement("a");
       link.href = url;
       link.download = file.file_name || "downloaded-file";
       document.body.appendChild(link);

       link.click();

       document.body.removeChild(link);
       window.URL.revokeObjectURL(url);
     })
     .catch((error) => {
       console.error("Error fetching the file:", error);
     });
  }

  return (
     <AuthenticatedLayout
                    header={
                        <div class='flex text-white'>
                         <h2 className="text-xl text-white font-extrabold leading-none tracking-tight">
                            List of Requirements
                          </h2>
                        </div>
                    }
                >
            <Head title="Application Requirements" />
    
            <div className="mt-3">
  <div className="max-w-8xl mx-auto px-6 sm:px-8 lg:px-10">
    <div className="bg-white shadow-xl rounded-2xl p-3 border border-gray-300">
      
      {/* HEADER TITLE */}
     {/* HEADER SECTION */}
<div className="bg-gray-100 p-2 rounded-xl mb-8">
  <h2 className="text-2xl md:text-2xl font-extrabold text-gray-900 flex items-center mb-2">
    📌 <span className="ml-4 tracking-wide">Research Requirements Template</span>
  </h2>
  
  {/* Description */}
  <p className="text-gray-700 text-sm md:text-base leading-relaxed">
    Below is a list of essential documents required for research proposals. You can download 
    each file by clicking the "Download" button. Ensure you have all necessary forms before submission.
  </p>
</div>

      {/* GRID LAYOUT */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {props.requirements.map((item, index) => (
          <div
            key={index}
            className="bg-gray-50 p-5 rounded-2xl shadow-sm border hover:bg-gray-100 hover:shadow-lg transition-all duration-300"
          >
            {/* Title & Download Button */}
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold text-gray-900 tracking-wide leading-tight">
                {item.title}
              </span>
              <a
                onClick={() => downloadDoc(item)}
                className="hover:cursor-pointer flex items-center gap-2 bg-blue-600 text-white px-4 py-2 text-sm font-medium rounded-lg hover:bg-blue-700 shadow-md transition-all duration-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  className="fill-current"
                >
                  <path d="m12 16l-5-5l1.4-1.45l2.6 2.6V4h2v8.15l2.6-2.6L17 11zm-6 4q-.825 0-1.412-.587T4 18v-3h2v3h12v-3h2v3q0 .825-.587 1.413T18 20z" />
                </svg>
                Download
              </a>
            </div>

            {/* Additional Info */}
            <div className="mt-4 text-sm text-gray-700 space-y-1">
              <p>📄 <strong>File Type:</strong> {item.type}</p>
              <p>🏷 <strong>Category:</strong> <span class="text-red-500 text-xs">{item.category || "Uncategorized"}</span></p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
</div>



    </AuthenticatedLayout>
  )
}
