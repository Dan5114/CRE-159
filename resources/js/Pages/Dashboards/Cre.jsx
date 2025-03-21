import React from 'react'

function Cre() {

  const widgets = [
    { title: "Application Acceptance", step: "Step 1" },
    { title: "Assignment of Panel and Schedule", step: "Step 2" },
    { title: "Consolidation of Tech Review Report", step: "Step 3" },
    { title: "Budget Proposal", step: "Step 6" },
    { title: "URB Approval", step: "Step 7" },
    { title: "MOA Upload", step: "Step 8" },
    { title: "Review of Progress Report", step: "Step 9" },
    { title: "Turnitin", step: "Step 11" },
    { title: "Acceptance of Final Document", step: "Step 12" },
    { title: "Certificate of Completion", step: "Step 13" },
    { title: "Ongoing Research", step: "Dashboard" },
    { title: "Completed Research", step: "Dashboard" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
    {widgets.map((widget, index) => (
      <div key={index} className="bg-white p-5 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-all">
        <h3 className="text-lg font-semibold text-gray-700">{widget.title}</h3>
        <p className="text-sm text-gray-500">{widget.step}</p>
        <p className="text-3xl font-bold text-gray-800 mt-2">{Math.floor(Math.random() * 100)}</p>
      </div>
    ))}
  </div>
  )
}

export default Cre
