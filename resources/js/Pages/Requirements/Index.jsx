import React from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router, useForm, usePage } from '@inertiajs/react';

export default function Index() {

  const requirements = [
    { title: "Checklist for Full Proposal", file: "/files/checklist-full-proposal.pdf" },
    { title: "Endorsement Letter (DC to Dean)", file: "/files/endorsement-dc-to-dean.pdf" },
    { title: "Endorsement Letter (Dean to AVCRE)", file: "/files/endorsement-dean-to-avcre.pdf" },
    { title: "Work Plan/Gantt Chart", file: "/files/work-plan-gantt-chart.pdf" },
    { title: "Budget Requirement/Budget Proposal", file: "/files/budget-requirement.pdf" },
  ];

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
    
            <div className="py-6">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              📌 Research Requirements Downloadable Template
            </h2>
            <ul className="space-y-4">
              {requirements.map((item, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center bg-gray-50 p-4 rounded-lg shadow-sm border hover:bg-gray-100 transition duration-200"
                >
                  <span className="text-sm font-medium text-gray-700">{item.title}</span>
                  <a
                    href={item.file}
                    download
                    className="flex items-center bg-blue-500 text-white px-3 py-2 text-xs rounded-lg hover:bg-blue-600 transition duration-200"
                  >
                   
                    Download
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  )
}
