import React from "react";
import { ClipboardList, CheckCircle, Clock, Info, HelpCircle, FileText } from "lucide-react";
import { Link, useForm, usePage, router } from '@inertiajs/react';

function Cre({counter, releasing, research_counter}) {

  console.log(research_counter);

  const widgets = [
    { title: "Application Acceptance", step: "Step 1", count: counter?.step1.count, description: "Initial review and acceptance of applications.", link: counter?.step1.url},
    { title: "Assignment of Panel and Schedule", step: "Step 2", count: counter?.step2.count, description: "Assigning review panel and setting timelines.", link: counter?.step2.url },
    { title: "Consolidation of Tech Review Report", step: "Step 3", count: counter?.step3.count, description: "Summarizing technical feedback from reviewers.", link: counter?.step3.url },
    { title: "Budget Proposal", step: "Step 6", count: counter?.step6.count, description: "Evaluating and finalizing the research budget.", link: counter?.step6.url },
    { title: "URB Approval", step: "Step 7", count: counter?.step7.count, description: "University Research Board's review and approval.", link: counter?.step7.url },
    { title: "MOA Upload", step: "Step 8", count: counter?.step8.count, description: "Uploading signed Memorandum of Agreement.", link: counter?.step8.url },
    { title: "Review of Progress Report", step: "Step 9", count: counter?.step9.count, description: "Assessing ongoing research progress.", link: counter?.step9.url },
    { title: "Turnitin", step: "Step 11", count: counter?.step11.count, description: "Checking for plagiarism and originality.", link: counter?.step11.url },
    { title: "Acceptance of Final Document", step: "Step 12", count: counter?.step12.count, description: "Final approval of completed research.", link: counter?.step13.url },
    { title: "Certificate of Completion", step: "Step 13", count: counter?.step13.count, description: "Issuing certification for completed research.", link: counter?.step13.url },
    { title: "Releasing of Second Tranche", step: "Budget Releasing", count: counter?.releasing.count, description: "Releasing of Budget", link: counter?.releasing.url },
  ];


  return (
    <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* LEFT - CRE Information Details */}
      <div className="bg-gray-100 p-6 rounded-xl shadow-md border md:col-span-1">
        <h2 className="text-2xl font-extrabold text-gray-900 mb-3">📘 CRE Information</h2>
        <p className="text-gray-700 text-sm md:text-base leading-relaxed">
          The Committee on Research Evaluation (CRE) oversees the research review process, ensuring
          compliance with institutional policies and research standards.
        </p>

        <div className="mt-5">
          <h3 className="text-md mb-3 font-bold text-gray-800">📌 Key Responsibilities:</h3>
          <ul className="list-disc text-gray-700 pl-5 text-sm space-y-2">
            <li>Review and evaluate research proposals.</li>
            <li>Ensure research meets ethical and technical standards.</li>
            <li>Monitor research progress and compliance.</li>
            <li>Provide feedback and recommendations.</li>
          </ul>
        </div>
      </div>

      {/* RIGHT - Research Stats and Steps */}
      <div className="space-y-4 md:col-span-2">
        {/* Research Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-blue-100 p-4 rounded-lg flex items-center space-x-3 border border-blue-300 shadow-md hover:shadow-lg transition">
            <Clock className="text-blue-600 w-10 h-10" />
            <div>
              <h3 className="text-md font-semibold text-blue-700">Ongoing Research</h3>
              <p className="text-3xl font-bold text-blue-900">
              {research_counter.ongoing.link ? (
          <Link href={research_counter.ongoing.link} className="font-bold text-xl hover:underline">
            Ongoing: {research_counter.ongoing.count}
          </Link>
        ) : (
          <span className="font-bold text-xl">Ongoing: {research_counter.ongoing.count}</span>
        )}
                
                </p>
              <p className="text-xs text-blue-700">Currently active projects under review.</p>
            </div>
          </div>
          <div className="bg-green-100 p-4 rounded-lg flex items-center space-x-3 border border-green-300 shadow-md hover:shadow-lg transition">
            <CheckCircle className="text-green-600 w-10 h-10" />
            <div>
              <h3 className="text-md font-semibold text-green-700">Completed Research</h3>
              <p className="text-3xl font-bold text-green-900">
              {research_counter.completed.link ? (
          <Link href={research_counter.completed.link} className="font-bold text-xl hover:underline">
            Completed: {research_counter.completed.count}
          </Link>
        ) : (
          <span className="font-bold text-xl">Completed: {research_counter.completed.count}</span>
        )}
              </p>
              <p className="text-xs text-green-700">Successfully finished and approved projects.</p>
            </div>
          </div>
        </div>

        {/* Research Steps with Counts */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {widgets.map((widget, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition flex flex-col space-y-2"
            >
              <div className="flex items-center space-x-3">
                <ClipboardList className="text-gray-600 w-8 h-8" />
                <div className="flex-1">
                  <h3 className="text-md font-semibold text-gray-700">{widget.title}</h3>
                  <p className="font-bold text-xs text-blue-500">{widget.step}</p>
                </div>
                <p className="text-2xl font-bold text-gray-800">
                {widget.link ? (
          <Link href={widget.link} className="font-bold text-xl hover:underline">
            {widget.count}
          </Link>
        ) : (
          <span className="font-bold text-xl">{widget.count}</span>
        )}

                </p>
              </div>
              <p className="text-xs text-gray-600 flex items-center">
                <Info className="w-3.5 h-3.5 text-gray-500 mr-1" />
                {widget.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
      <div className="mt-6 p-4 bg-gray-200 rounded-lg text-center text-sm text-gray-600 border border-gray-300">
            <p className="mb-2 font-medium text-gray-700">Need Help? Check these resources:</p>
            <div className="flex justify-center space-x-6 text-blue-600">
              <a href="#" className="flex items-center space-x-1 hover:underline">
                <HelpCircle className="w-4 h-4" />
                <span>Support Center</span>
              </a>
              <a href="#" className="flex items-center space-x-1 hover:underline">
                <FileText className="w-4 h-4" />
                <span>CRE Guidelines</span>
              </a>
            </div>
          </div>
    </>
  );
}

export default Cre;
