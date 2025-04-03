import JoditEditor from "jodit-react";
import React, { useRef, useEffect, useState } from "react";
import { Link, useForm, usePage, router } from '@inertiajs/react';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';
import * as XLSX from "xlsx";

const MyEditor = ({research, contents_mce_terminal, user}) => {
   const notyf = new Notyf();
  const editorRef = useRef(null);
  const [content, setContent] = useState("");
   const { data, setData, post, errors, patch, reset, formState, processing, progress, recentlySuccessful } =
      useForm({
          research_id : research.id,
          steps : "10",
          user_type : "tpl_lead"
      });

  useEffect(() => {
    const savedContent = (contents_mce_terminal) ? contents_mce_terminal.content : null;
    if (savedContent) {
      setContent(savedContent);
    } else {
      const defaultContent = generateTable();
      setContent(defaultContent);
    }
  }, []); 

  const saveContent = () => {
    if (!editorRef.current) return;

    const newContent = editorRef.current.getEditorValue; // ✅ Correct way to get content

    // Confirmation alert before saving
    if (!window.confirm("📂 Are you sure you want to save changes?")) {
        return;
    }

    setData("content", newContent);

    post(route("cre.tinymce.update"), {
        onSuccess: (page) => {
            notyf.success(page.props.flash.message || "Content saved successfully!");
        },
        onError: (errors) => {
            notyf.error("Failed to save content. Please try again.");
        },
        onFinish: () => {
            console.log("Finished sending message");
        },
    });
};


const exportToExcel = () => {
  if (!editorRef.current) return;

  // Native confirmation alert
  const isConfirmed = window.confirm("🚀 Do you want to download the Excel file?");
  if (!isConfirmed) return;

  const htmlContent = content;

  // Convert HTML content to an Excel sheet
  const worksheet = htmlToExcelSheet(htmlContent);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, research.research_title);

  // Export the Excel file
  XLSX.writeFile(workbook, research.research_title + ".xlsx");

  alert("Your Excel file has been downloaded!");
};
  
  // Function to convert TinyMCE HTML into an Excel-compatible format
  const htmlToExcelSheet = (htmlString) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = htmlString;
  
    const rows = [];
  
    // Process all elements inside TinyMCE content
    tempDiv.childNodes.forEach((node) => {
      if (node.nodeName === "TABLE") {
        // Convert Tables Properly
        node.querySelectorAll("tr").forEach((row) => {
          const rowData = [];
          row.querySelectorAll("td, th").forEach((cell) => {
            rowData.push(cell.innerText.trim());
          });
          rows.push(rowData);
        });
        rows.push([]); // Empty row for spacing after tables
      } else if (node.nodeName === "P" || node.nodeName.startsWith("H")) {
        // Convert Headings and Paragraphs
        rows.push([node.innerText.trim()]);
        rows.push([]); // Add spacing
      }
    });
  
    return XLSX.utils.aoa_to_sheet(rows);
  };

  const submitEndorsement = (id) => {
    if (window.confirm("Are you sure you want to submit the consolidated report?")) {
        patch(route("submit.consolidated.report.cre", id), {
            preserveScroll: true,
            onSuccess: (page) => {
                notyf.success(page.props.flash.message);
            },
        });
    }
};

  return (
    <>
    <div className="overflow-hidden mb-6">

    {
      (contents_mce_terminal?.status == "P") ?
      <JoditEditor
    ref={editorRef}
    value={content}
    config={{
      height: 600,
      resizable: false, // Disable resizing
          allowResizeX: false, // Disable horizontal resize
          allowResizeY: false, // Disable vertical resize
          toolbarSticky: false, 
      toolbar: [
        "undo", "redo", "|",
        "bold", "italic", "underline", "|",
        "align", "ul", "ol"
      ],
      readonly: false,
      buttons: ["bold", "italic", "underline"], // Only show these buttons
      toolbarSticky: false, // Prevents toolbar from sticking
      toolbarAdaptive: false, // Prevents adaptive toolbar changes
    }}
  />
  :
  <>
  {
    (contents_mce_terminal?.status == "A") ? 
    <>
    <JoditEditor
    ref={editorRef}
    value={content}
    onBlur={(newContent) => setData("content", newContent)} // ✅ Updates state on blur
    config={{
      height: 600,
      maxHeight: 600,
      resizable: false, // Disable resizing
          allowResizeX: false, // Disable horizontal resize
          allowResizeY: false, // Disable vertical resize
          toolbarSticky: false, 
          toolbar: true,
    buttons: "bold,italic,underline,|,ul,ol,|,align,|,undo,redo,|,eraser,print",
    toolbarAdaptive: false,
    toolbarSticky: false,
      readonly: true,
    }}
  />
  <br />
  <div className="mt-6 text-center text-green-600 font-semibold">
  ✅ The Terminal Evaluation Report has already been endorsed.
</div>
</>
  :
(user.user_type == "tpl" && contents_mce_terminal?.status == null) ?
<JoditEditor
ref={editorRef}
value={content}
config={{
  height: 600,
  resizable: false, // Disable resizing
      allowResizeX: false, // Disable horizontal resize
      allowResizeY: false, // Disable vertical resize
      toolbarSticky: false, 
  toolbar: [
    "undo", "redo", "|",
    "bold", "italic", "underline", "|",
    "align", "ul", "ol"
  ],
  readonly: false,
  buttons: ["bold", "italic", "underline"], // Only show these buttons
  toolbarSticky: false, // Prevents toolbar from sticking
  toolbarAdaptive: false, // Prevents adaptive toolbar changes
}}
/>
:
<>
<div class="bg-yellow-50 border-l-4 border-yellow-500 p-6 shadow-md rounded-lg">
  <div class="flex items-start">
    <div class="flex-shrink-0">
      <svg class="h-6 w-6 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c1.657 0 3 1.343 3 3s-1.343 3-3 3-3-1.343-3-3 1.343-3 3-3zm0 0V3m0 5v3M9 12c-1.657 0-3 1.343-3 3s1.343 3 3 3s3-1.343 3-3-1.343-3-3-3zM12 8c1.657 0 3 1.343 3 3s-1.343 3-3 3zM12 8h-3"></path>
      </svg>
    </div>
    <div class="ml-4">
      <h3 class="text-xl font-semibold text-gray-800">Waiting for Tech Lead Panel Endorsement</h3>
      <p class="mt-2 text-gray-600">Your application is currently under review by the Tech Panel (Lead). We appreciate your patience as this process may take some time.</p>
      <div class="mt-4">
        <span class="inline-flex items-center px-3 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">
          Pending Endorsement
        </span>
      </div>


    </div>
  </div>
</div>
</>
  }

  </>
    }

 
  </div>
{
  (contents_mce_terminal?.status == "P") ?
  <>
  <div className="flex justify-end gap-3 mt-12">
  <button
    type="button"
    onClick={saveContent}
    className="btn btn-primary flex items-center gap-2"
  >
    <span className="icon-[tabler--file] size-6 align-bottom"></span>
    Save Changes
  </button>

  <button
    onClick={exportToExcel}
    className="px-4 py-2 bg-green-500 text-white rounded flex items-center"
  >
   <span className="icon-[tabler--file-spreadsheet] size-6 align-bottom"></span>
    Export to Excel
  </button>
</div>
<div className="mt-3">
        <button
        type="button"
        onClick={() => submitEndorsement(contents_mce_terminal.id)}
        className="px-4 py-2 mt-6 text-white bg-blue-600 hover:bg-blue-700 rounded-md shadow-md focus:outline-none"
      >
        Endorse Technical Report
      </button>
    </div>
  </>
  :
  <>
    {
      (contents_mce_terminal?.status == null && user.user_type == "tpl") ?
      <>
        <div className="flex justify-end gap-3 mt-12">
  <button
    type="button"
    onClick={saveContent}
    className="btn btn-primary flex items-center gap-2"
  >
    <span className="icon-[tabler--file] size-6 align-bottom"></span>
    Save Changes
  </button>

  <button
    onClick={exportToExcel}
    className="px-4 py-2 bg-green-500 text-white rounded flex items-center"
  >
   <span className="icon-[tabler--file-spreadsheet] size-6 align-bottom"></span>
    Export to Excel
  </button>
</div>
<div className="mt-3">
        <button
        type="button"
        onClick={() => submitEndorsement(contents_mce_terminal.id)}
        className="px-4 py-2 mt-6 text-white bg-blue-600 hover:bg-blue-700 rounded-md shadow-md focus:outline-none"
      >
        Endorse Technical Report
      </button>
    </div>
      </>
      :
      ""
    }
  </>
}

    </>
  );
};


const generateTable = () => {
    return `
    <table border="1" cellpadding="6" cellspacing="0" width="100%" style="border-collapse: collapse;">
  <thead>
    <tr>
      <th colspan="2" style="text-align: center; font-weight: bold;">
        CENTER FOR RESEARCH AND ENGAGEMENT <br>
        CHECKLIST FOR THE TERMINAL REPORT EVALUATION <br>
        <small>(Guide for the Technical Review Consultant)</small>
      </th>
    </tr>
    <tr>
      <td colspan="2"><strong>Title of the Research:</strong></td>
    </tr>
    <tr>
      <td colspan="2"><strong>Proponent(s):</strong></td>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="50%"><strong>1. Abstract/Summary</strong> - Has the author correctly summarized the study?</td>
      <td width="50%"><strong>Remarks:</strong></td>
    </tr>
    <tr>
      <td>1.1. Statement of topic and purpose</td>
      <td></td>
    </tr>
    <tr>
      <td>1.2. Description of the participants, materials, and procedures</td>
      <td></td>
    </tr>
    <tr>
      <td>1.3. Explanation of analytical methodology (statistical analysis...)</td>
      <td></td>
    </tr>
    <tr>
      <td>1.4. Summary of results and implications</td>
      <td></td>
    </tr>
    <tr>
      <td>1.5. Additional comments and suggestions</td>
      <td></td>
    </tr>
    <tr>
      <td><strong>2. Introduction</strong> - Is the framework for the study clear?</td>
      <td></td>
    </tr>
    <tr>
      <td><strong>3. Literature Review</strong> - Can you tell where the study fits in?</td>
      <td><strong>Remarks:</strong></td>
    </tr>
    <tr>
      <td>3.1. Is the background rationale provided?</td>
      <td></td>
    </tr>
    <tr>
      <td>3.2. Is the relationship to previous research clear?</td>
      <td></td>
    </tr>
    <tr>
      <td>3.3. Statement of purpose: Can you tell where the study is heading?</td>
      <td></td>
    </tr>
    <tr>
      <td>3.4. Are any of the following included?</td>
      <td></td>
    </tr>
    <tr>
      <td>&nbsp;&nbsp; 1. Purpose or aim of study</td>
      <td></td>
    </tr>
    <tr>
      <td>&nbsp;&nbsp; 2. Research questions</td>
      <td></td>
    </tr>
    <tr>
      <td>&nbsp;&nbsp; 3. Research hypotheses</td>
      <td></td>
    </tr>
    <tr>
      <td>&nbsp;&nbsp; 4. Additional comments and suggestions</td>
      <td></td>
    </tr>
    <tr>
      <td><strong>4. Method</strong> - Is the study replicable?</td>
      <td><strong>Remarks:</strong></td>
    </tr>
    <tr>
      <td>4.1. Subjects: Is the description of participants adequate? Is the method of selection clear?</td>
      <td></td>
    </tr>
    <tr>
      <td>4.2. Materials: Is there any description of tests, questionnaires, etc.? Is there any description of any equipment (when applicable)?</td>
      <td></td>
    </tr>
    <tr>
      <td>4.3. Procedures: Is there any description of the preparation of materials, administration, scoring, etc.? Is there any description of the conditions during the study?</td>
      <td></td>
    </tr>
    <tr>
      <td>4.4. Analyses: Is there any description of the arrangement and grouping of the data? Are the statistical data listed in order of use?</td>
      <td></td>
    </tr>
    <tr>
      <td>4.5. Additional comments and suggestions</td>
      <td></td>
    </tr>
    <tr>
      <td><strong>5. Results</strong> - Are the statistical tests previously listed represented as results? Is there an explanation?</td>
      <td><strong>Remarks:</strong></td>
    </tr>
    <tr>
      <td><strong>6. Discussion / Conclusion</strong></td>
      <td><strong>Remarks:</strong></td>
    </tr>
    <tr>
      <td>6.1. Is(are) the original research question(s) answered?</td>
      <td></td>
    </tr>
    <tr>
      <td>6.2. Are the hypotheses supported or rejected?</td>
      <td></td>
    </tr>
    <tr>
      <td>6.3. Is there an explanation of why the results were as they were?</td>
      <td></td>
    </tr>
    <tr>
      <td>6.4. Are the methodological limitations of the study mentioned?</td>
      <td></td>
    </tr>
    <tr>
      <td>6.5. Are there suggestions for further research?</td>
      <td></td>
    </tr>
    <tr>
      <td><strong>7. References, Notes, and Footnotes</strong></td>
      <td><strong>Remarks:</strong></td>
    </tr>
    <tr>
      <td>7.1. Are all references cited in the text included?</td>
      <td></td>
    </tr>
    <tr>
      <td>7.2. Are any pertinent references missing?</td>
      <td></td>
    </tr>
    <tr>
      <td>7.3. Additional Comments and Suggestions</td>
      <td></td>
    </tr>
    <tr>
      <td><strong>8. Appendices</strong> - Are they necessary? Are they complete?</td>
      <td><strong>Remarks:</strong></td>
    </tr>
    <tr>
      <td><strong>9. Format</strong> - Does the manuscript conform with the Institutional Research Format?</td>
      <td><strong>Remarks:</strong></td>
    </tr>
    <tr>
      <td colspan="">
        <strong>Name and Signature of Technical Consultant:</strong>
      </td>

       <td colspan="">
      </td>
    </tr>

     <tr>
      <td colspan="">
        <strong>Date:</strong>
      </td>

       <td colspan="">
      </td>
    </tr>
  </tbody>
</table>
<br />
    `;
  };


export default MyEditor;
