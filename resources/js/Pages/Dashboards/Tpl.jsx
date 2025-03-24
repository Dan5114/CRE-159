import React from 'react';
import { HelpCircle, FileText } from "lucide-react";

function TechnicalPanel() {
  return (
    <div className="mx-auto px-4 py-6">
      {/* TWO COLUMN LAYOUT */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* LEFT - INFO PANEL */}
        <div className="md:col-span-1 bg-gray-100 p-6 rounded-xl shadow-md border">
          <h2 className="text-2xl font-extrabold text-gray-900 mb-3">
            👋 Welcome, Technical Panel!
          </h2>
          <p className="text-gray-700 text-sm md:text-base leading-relaxed">
            As a member of the Technical Panel, your role is to evaluate research proposals based on
            institutional guidelines and technical feasibility. Ensure you review all submissions thoroughly.
          </p>

          <div className="mt-5">
            <h3 className="text-md font-bold text-gray-800 mb-3">📌 Key Responsibilities:</h3>
            <ul className="list-disc text-gray-700 pl-5 text-sm space-y-2">
              <li>Assess research proposals for technical soundness.</li>
              <li>Provide feedback and recommendations to researchers.</li>
              <li>Ensure compliance with institutional research policies.</li>
              <li>Attend scheduled panel meetings and discussions.</li>
            </ul>
          </div>
        </div>

        {/* RIGHT - TECH PANEL DETAILS */}
        <div className="md:col-span-2 bg-gray-100 p-6 rounded-xl shadow-md border">
          <h2 className="text-xl font-extrabold text-gray-900 mb-3">
            🔍 About the Technical Panel
          </h2>
          <p className="text-gray-700 text-sm md:text-base leading-relaxed">
            The Technical Panel plays a crucial role in maintaining research integrity and quality.
            Members are selected based on expertise and experience in their respective fields.
          </p>

          <div className="mt-5">
            <h3 className="text-md font-bold text-gray-800 mb-3">📑 Panel Guidelines:</h3>
            <ul className="list-disc text-gray-700 pl-5 text-sm space-y-2">
              <li>Reviews must be objective and based on factual analysis.</li>
              <li>Feedback should be constructive, clear, and actionable.</li>
              <li>Confidentiality of proposals must be maintained.</li>
              <li>Follow ethical standards and avoid conflicts of interest.</li>
            </ul>
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
            <span>Panel Guidelines</span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default TechnicalPanel;
