import React from "react";
import { ClipboardList, CheckCircle, Clock, Info } from "lucide-react";

function Cre() {
  const widgets = [
    { title: "Application Acceptance", step: "Step 1", count: 15, description: "Initial review and acceptance of applications." },
    { title: "Assignment of Panel and Schedule", step: "Step 2", count: 20, description: "Assigning review panel and setting timelines." },
    { title: "Consolidation of Tech Review Report", step: "Step 3", count: 10, description: "Summarizing technical feedback from reviewers." },
    { title: "Budget Proposal", step: "Step 6", count: 8, description: "Evaluating and finalizing the research budget." },
    { title: "URB Approval", step: "Step 7", count: 12, description: "University Research Board's review and approval." },
    { title: "MOA Upload", step: "Step 8", count: 18, description: "Uploading signed Memorandum of Agreement." },
    { title: "Review of Progress Report", step: "Step 9", count: 25, description: "Assessing ongoing research progress." },
    { title: "Turnitin", step: "Step 11", count: 5, description: "Checking for plagiarism and originality." },
    { title: "Acceptance of Final Document", step: "Step 12", count: 14, description: "Final approval of completed research." },
    { title: "Certificate of Completion", step: "Step 13", count: 9, description: "Issuing certification for completed research." },
  ];

  const ongoingResearch = 35;
  const completedResearch = 50;

  return (
    <div className="p-4 space-y-4">
      {/* Research Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-blue-100 p-4 rounded-lg flex items-center space-x-3 border border-blue-300 shadow-md hover:shadow-lg transition">
          <Clock className="text-blue-600 w-10 h-10" />
          <div>
            <h3 className="text-md font-semibold text-blue-700">Ongoing Research</h3>
            <p className="text-3xl font-bold text-blue-900">{ongoingResearch}</p>
            <p className="text-xs text-blue-700">Currently active projects under review.</p>
          </div>
        </div>
        <div className="bg-green-100 p-4 rounded-lg flex items-center space-x-3 border border-green-300 shadow-md hover:shadow-lg transition">
          <CheckCircle className="text-green-600 w-10 h-10" />
          <div>
            <h3 className="text-md font-semibold text-green-700">Completed Research</h3>
            <p className="text-3xl font-bold text-green-900">{completedResearch}</p>
            <p className="text-xs text-green-700">Successfully finished and approved projects.</p>
          </div>
        </div>
      </div>

      {/* Research Steps with Counts */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {widgets.map((widget, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition flex flex-col space-y-2"
          >
            <div className="flex items-center space-x-3">
              <ClipboardList className="text-gray-600 w-8 h-8" />
              <div className="flex-1">
                <h3 className="text-md font-semibold text-gray-700">{widget.title}</h3>
                <p className="text-xs text-gray-500">{widget.step}</p>
              </div>
              <p className="text-2xl font-bold text-gray-800">{widget.count}</p>
            </div>
            <p className="text-xs text-gray-600 flex items-center">
              <Info className="w-3.5 h-3.5 text-gray-500 mr-1" />
              {widget.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Cre;
