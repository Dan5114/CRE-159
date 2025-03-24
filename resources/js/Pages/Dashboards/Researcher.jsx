import React from 'react';
import { ClipboardList, CheckCircle, Clock, Info,HelpCircle, FileText } from "lucide-react";

function Researcher({ requirements }) {

  const downloadDoc = async (file) => {
    if (!file?.file_name) {
      alert("❌ Error: File name is missing. Unable to download.");
      return;
    }

    const isConfirmed = confirm(`📂 Do you want to download "${file.file_name}"?`);
    if (!isConfirmed) return;

    try {
      console.log("⏳ Downloading...");

      const response = await fetch(route("researcher.requirements.download", file.file_name));

      if (!response.ok) {
        throw new Error(`⚠️ Download failed: ${response.statusText}`);
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement("a");

      link.href = url;
      link.download = file.file_name || "downloaded-file";
      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      alert(`✅ "${file.file_name}" has been downloaded successfully.`);
    } catch (error) {
      console.error("Download error:", error);
      alert("❌ Failed to download the file. Please check your internet connection and try again.");
    }
  };

  return (
    <div className=" mx-auto px-4 py-6">

      {/* TWO COLUMN LAYOUT */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* LEFT - INFO PANEL */}
        <div className="md:col-span-1 bg-gray-100 p-6 rounded-xl shadow-md border">
          <h2 className="text-2xl font-extrabold text-gray-900 mb-3">
            👋 Welcome, Researcher!
          </h2>
          <p className="text-gray-700 text-sm md:text-base leading-relaxed">
            Below, you'll find the required documents for your research proposal.
            Please ensure you download and complete all necessary files. 
            Visit our <a href="#" className="text-blue-600 hover:underline">Help Center</a> for assistance.
          </p>

          <div className="mt-5">
            <h3 className="text-md font-bold text-gray-800 mb-3">📌 Important Notes:</h3>
            <ul className="list-disc text-gray-700 pl-5 text-sm space-y-2">
              <li>Submit all documents before the deadline.</li>
              <li>Ensure all required signatures are included.</li>
              <li>Upload completed files in **PDF format**.</li>
              <li>For help, contact the research office.</li>
            </ul>
          </div>
        </div>

        {/* RIGHT - REQUIREMENTS LIST */}
        <div className="md:col-span-2">
          <div className="bg-gray-100 p-5 rounded-xl mb-5">
            <h2 className="text-xl font-extrabold text-gray-900 flex items-center gap-2">
              📄 Required Document Templates
            </h2>
            <p className="text-gray-700 text-sm">
              Click "Download" to get the document. Ensure all necessary forms are completed.
            </p>
          </div>

          {/* RESPONSIVE GRID */}
          <div className="">
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-gray-500 border-b">
            <th className="text-left px-6 py-3 text-white">TITLE</th>
            <th className="text-left px-6 py-3 text-white">FILE TYPE</th>
            <th className="text-left px-6 py-3 text-white">CATEGORY</th>
            <th className="text-center px-6 py-3 text-white">ACTION</th>
          </tr>
        </thead>
        <tbody>
          {requirements.map((item, index) => (
            <tr key={index} className="border-b hover:bg-gray-50 transition">
              <td className="px-6 py-4 text-sm break-words text-gray-900">{item.title.toUpperCase()}</td>
              <td className="px-6 py-4 text-sm text-gray-700">📄 {item.type}</td>
              <td className="px-6 py-4 text-sm text-red-500">{item.category || "Uncategorized"}</td>
              <td className="px-6 py-4 text-center">
                <button
                  onClick={() => downloadDoc(item)}
                  className="flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 text-sm font-medium rounded-lg hover:bg-blue-700 shadow-md transition-all duration-300"
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
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
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
            <span>Researcher Guidelines</span>
          </a>
        </div>
      </div>

    </div>
  );
}

export default Researcher;
