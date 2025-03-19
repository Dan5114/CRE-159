import { Editor } from "@tinymce/tinymce-react";
import React, { useRef, useEffect, useState } from "react";
import { Link, useForm, usePage, router } from '@inertiajs/react';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';
import * as XLSX from "xlsx";

const MyEditor = ({research, contents_mce}) => {
   const notyf = new Notyf();
  const editorRef = useRef(null);
  const [content, setContent] = useState("");
   const { data, setData, post, errors, reset, formState, processing, progress, recentlySuccessful } =
      useForm({
          research_id : research.id,
          steps : "2",
          user_type : "tech"
      });

  useEffect(() => {
    const savedContent = (contents_mce) ? contents_mce.content : null;
    if (savedContent) {
      setContent(savedContent);
    } else {
      const defaultContent = generateTable();
      setContent(defaultContent);
    }
  }, []); 

  const saveContent = () => {
    if (!editorRef.current) return;

    const newContent = editorRef.current.getContent();
    
    // Confirmation alert before saving
    if (!window.confirm("📂 Are you sure you want to save changes?")) {
        return;
    }

    setContent(newContent);

    post(route('cre.tinymce.update'), {
        onSuccess: (page) => {
            notyf.success(page.props.flash.message || "Content saved successfully!");
        },
        onError: (errors) => {
            notyf.error("Failed to save content. Please try again.");
        },
        onFinish: () => {
            console.log("Finishing sending message");
        },
    });
};


const exportToExcel = () => {
  if (!editorRef.current) return;

  // Native confirmation alert
  const isConfirmed = window.confirm("🚀 Do you want to download the Excel file?");
  if (!isConfirmed) return;

  const htmlContent = editorRef.current.getContent();

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

  return (
    <>
      <Editor
        apiKey="mbol3tcfo3wkegym6drelrc3e356aq0k7lc8gnrkdpp3x23w"
        onInit={(evt, editor) => {
          editorRef.current = editor;
          editor.setContent(content);
        }}
        value={content}
        onEditorChange={(newContent) => {
          setContent(newContent);
          setData('content', newContent)
        }}
        init={{
          height: 600,
          menubar: false,
          plugins: "advlist autolink lists link charmap preview anchor print",
          toolbar: "undo redo | bold italic underline | alignleft aligncenter alignright | bullist numlist outdent indent | removeformat | print",
          table_toolbar: false,
          contextmenu: "link image",
          content_style:
            "table { border-collapse: collapse; width: 100%; } td, th { border: 1px solid black; padding: 5px; }",
          readonly: 0,
        }}
      />
<div className="flex justify-end gap-3 mt-3">
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

    </>
  );
};


const generateTable = () => {
    return `
      <h3 style="text-align: center;">UNIVERSITY OF ST. LA SALLE</h3>
<h4 style="text-align: center;">CENTER FOR RESEARCH AND ENGAGEMENT</h4>
<h5 style="text-align: center;">FACULTY RESEARCH PROGRAM AY 2022-2023</h5>
<h5 style="text-align: center;">FORM #1: COMMENTS AND SUGGESTIONS FORM (FOR PANEL MEMBERS)</h5>

<table style="width: 100%; border-collapse: collapse;">
    <tr>
        <td style="border: 1px solid #ccc; padding: 10px; width: 50%; font-weight: bold;">DATE</td>
        <td style="border: 1px solid #ccc; padding: 10px; width: 50%;"></td>
    </tr>
    <tr>
        <td style="border: 1px solid #ccc; padding: 10px; width: 50%; font-weight: bold;">COLLEGE/DEPARTMENT:</td>
        <td style="border: 1px solid #ccc; padding: 10px; width: 50%;"></td>
    </tr>
    <tr>
        <td style="border: 1px solid #ccc; padding: 10px; width: 50%; font-weight: bold;">RESEARCH AGENDA:</td>
        <td style="border: 1px solid #ccc; padding: 10px; width: 50%;"></td>
    </tr>
    <tr>
        <td style="border: 1px solid #ccc; padding: 10px; width: 50%; font-weight: bold;">RESEARCH PROPOSAL TITLE:</td>
        <td style="border: 1px solid #ccc; padding: 10px; width: 50%;"></td>
    </tr>
    <tr>
        <td style="border: 1px solid #ccc; padding: 10px; width: 50%; font-weight: bold;">PROPONENT(S):</td>
        <td style="border: 1px solid #ccc; padding: 10px; width: 50%;"></td>
    </tr>
    <tr>
        <td style="border: 1px solid #ccc; padding: 10px; width: 50%; font-weight: bold;">PANEL MEMBERS:</td>
        <td style="border: 1px solid #ccc; padding: 10px; width: 50%;"></td>
    </tr>
    <tr>
        <td style="border: 1px solid #ccc; padding: 10px; width: 50%; font-weight: bold;">EVALUATOR (Pls. write your name):</td>
        <td style="border: 1px solid #ccc; padding: 10px; width: 50%;"></td>
    </tr>
</table>


<table border="1" width="100%" cellspacing="0" cellpadding="5" style="margin-top: 10px;">
  <tr style="background-color: #ddd; text-align: center;">
    <th colspan="2">TO BE FILLED IN BY THE EVALUATOR</th>
    <th colspan="2">TO BE FILLED IN BY THE STUDY LEADER</th>
  </tr>
   <tr>
  <th width="40%"></th>
    <th width="20%">Comments and Suggestions</th>
    <th width="20%">Action Taken</th>
    <th width="20%">Refer to page#</th>
  </tr>
 <tr>
    <td colspan="4" style="background-color: #ddd;"><strong>INTRODUCTION</strong></td>
  </tr>
  <tr>
    <td>Background of the Study</td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>Statement of the Problem</td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>Hypothesis/Hypotheses</td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>Theoretical/Conceptual Framework</td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>Scope and Limitations</td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>Significance of the Study</td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>Definition of Terms</td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>Review of Related Literature</td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td colspan="4" style="background-color: #ddd;"><strong>METHODS/MATERIALS AND METHODS</strong></td>
  </tr>
  <tr>
    <td>Research Design</td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>Respondents/Participants/Subjects</td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>Instrument/Description of Product/Prototype</td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
</table>

<p style="color: #eb6864; font-weight: bold; font-size: 14px;">
  NOTE: The evaluator is requested to email the accomplished form to the <span style="font-weight: bold;">DOCUMENTER</span> and cc 
  <a href="mailto:urc@usls.edu.ph" style="color: #4c69d3; text-decoration: underline;">urc@usls.edu.ph</a> 
  for consolidation purposes. Thank you.
</p>


<h5 style="text-align: right; font-style: italic;">FORM UPDATED: August 2019</h5>

<table border="1" width="100%" cellspacing="0" cellpadding="5">
  <tr style="background-color: #ddd; text-align: center;">
    <th colspan="2">TO BE FILLED IN BY THE EVALUATOR</th>
    <th colspan="2">TO BE FILLED IN BY THE STUDY LEADER</th>
  </tr>
  <tr>
  <th width="40%"></th>
    <th width="20%">Comments and Suggestions</th>
    <th width="20%">Action Taken</th>
    <th width="20%">Refer to page#</th>
  </tr>
  <tr>
    <td>Data Gathering Procedure/Quality Testing or Performance Evaluation</td>
     <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td><strong>Statistical Treatment / <em>Data Analysis</em></strong></td>
     <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>Ethical Considerations (FPIC/Assent form)</td>
     <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>REFERENCES</td>
     <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>WORK PLAN</td>
     <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>BUDGET REQUIREMENT</td>
     <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>OTHERS</td>
     <td></td>
    <td></td>
    <td></td>
  </tr>
</table>

<p style="margin-top: 15px;"><strong>Printed Name and Signature:</strong> _____________</p>
<p style="margin-top: -10px;"><strong>Date:</strong> _____________</p>

<p style="color: #eb6864; font-weight: bold; font-size: 14px;">
  NOTE: The evaluator is requested to email the accomplished form to the <span style="font-weight: bold;">DOCUMENTER</span> and cc 
  <a href="mailto:urc@usls.edu.ph" style="color: #4c69d3; text-decoration: underline;">urc@usls.edu.ph</a> 
  for consolidation purposes. Thank you.
</p>


    `;
  };


export default MyEditor;
