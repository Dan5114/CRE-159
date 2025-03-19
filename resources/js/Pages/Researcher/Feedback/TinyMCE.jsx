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
          steps : "3",
          user_type : "cre"
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
    <h4 style="text-align: center;">FACULTY RESEARCH PROGRAM AY 2023-2024</h4>
    <h5 style="text-align: center;"><strong>FORM #3 CONSOLIDATED COMMENTS AND SUGGESTIONS FORM</strong></h5>
    <h5 style="text-align: center; color: red;"><strong>(FOR DOCUMENTER)</strong></h5>

    <table border="1" style="width: 100%; border-collapse: collapse;">
      <tbody>
        <tr>
          <td style="width: 80%; font-weight: bold;">DATE</td>
          <td style="width: 20%;">AY 2023-2024</td>
        </tr>
        <tr><td style="font-weight: bold;">COLLEGE/DEPARTMENT:</td><td></td></tr>
        <tr><td style="font-weight: bold;">RESEARCH AGENDA:</td><td></td></tr>
        <tr><td style="font-weight: bold;">RESEARCH PROPOSAL TITLE:</td><td></td></tr>
        <tr><td style="font-weight: bold;">PROPONENT(S):</td><td></td></tr>
        <tr><td style="font-weight: bold;">PANEL MEMBERS:</td><td></td></tr>
        <tr><td style="font-weight: bold;">EVALUATOR (Pls. write your name):</td><td></td></tr>
      </tbody>
    </table>

    <table border="1" style="width: 100%; border-collapse: collapse; margin-top: 10px;">
      <thead>
        <tr>
          <th style="width: 50%; background-color: #fff2cc; color: red; padding: 5px;">TO BE FILLED IN BY THE DOCUMENTER</th>
          <th colspan="3" style="width: 50%; background-color: #d9ead3; color: red; padding: 5px;">TO BE FILLED IN BY THE STUDY LEADER</th>
        </tr>
        <tr>
          <th>TITLE</th>
          <th>Comments and suggestions</th>
          <th>Action Taken</th>
          <th>Refer to page#</th>
        </tr>
      </thead>
      <tbody>
        <tr style="background-color: #d9d9d9;"><td style="font-weight: bold;">INTRODUCTION</td><td></td><td></td><td></td></tr>
        <tr><td>Background of the Study</td><td></td><td></td><td></td></tr>
        <tr><td>Statement of the Problem</td><td></td><td></td><td></td></tr>
        <tr><td>Hypothesis/Hypotheses</td><td></td><td></td><td></td></tr>
        <tr><td>Theoretical/Conceptual Framework</td><td></td><td></td><td></td></tr>
        <tr><td>Scope and Limitations</td><td></td><td></td><td></td></tr>
        <tr><td>Significance of the Study</td><td></td><td></td><td></td></tr>
        <tr><td>Definition of Terms</td><td></td><td></td><td></td></tr>
        <tr><td>Review of Related Literature</td><td></td><td></td><td></td></tr>
        <tr style="background-color: #d9d9d9;"><td style="font-weight: bold;">METHODS/MATERIALS AND METHODS</td><td></td><td></td><td></td></tr>
        <tr><td>Research Design</td><td></td><td></td><td></td></tr>
        <tr><td>Respondents/Participants/Subjects</td><td></td><td></td><td></td></tr>
        <tr><td>Instrument/Description of Product/Prototype</td><td></td><td></td><td></td></tr>
      </tbody>
    </table>

    <table border="1" style="width: 100%; border-collapse: collapse; margin-top: 10px;">
      <tr>
        <td style="width: 50%; background-color: #fff2cc; color: red; padding: 5px;">TO BE FILLED IN BY THE DOCUMENTER</td>
        <td style="width: 50%; background-color: #d9ead3; color: red; padding: 5px;">TO BE FILLED IN BY THE STUDY LEADER</td>
      </tr>
    </table>

    <p><strong style="color: red;">The Documenter is requested to email the consolidated form to both the Proponent(s) and CRE at 
    <a href="mailto:urc@usls.edu.ph" style="color: blue;">urc@usls.edu.ph</a> within 1-2 days after the deliberation. Thank you.</strong></p>
    <br/>
  <table border="1" width="100%" cellspacing="0" cellpadding="5">
    <thead>
      <tr>
        <th></th>
        <th>Comments and suggestions</th>
        <th>Action Taken</th>
        <th>Refer to page#</th>
      </tr>
    </thead>
    <tbody>
      <tr><td>Data Gathering Procedure/Quality Testing or Performance Evaluation</td><td></td><td></td><td></td></tr>
      <tr><td>Statistical Treatment</td><td></td><td></td><td></td></tr>
      <tr><td>Ethical Considerations (FPIC/Assent form)</td><td></td><td></td><td></td></tr>
      <tr><td><strong>REFERENCES</strong></td><td></td><td></td><td></td></tr>
      <tr><td><strong>WORK PLAN</strong></td><td></td><td></td><td></td></tr>
      <tr><td><strong>BUDGET REQUIREMENT</strong></td><td></td><td></td><td></td></tr>
      <tr><td><strong>OTHERS</strong></td><td></td><td></td><td></td></tr>
    </tbody>
  </table>
  <br/>
  <p><strong>Printed Name and Signature:</strong> __________________________ Date: __________</p>
  <p style="color:red;"><strong>PHOTO DOCUMENTATION</strong> (Pls. insert 1 or 2 group photos of the deliberation.)</p>
  <br/>
   <p><strong style="color: red;">The Documenter is requested to email the consolidated form to both the Proponent(s) and CRE at 
    <a href="mailto:urc@usls.edu.ph" style="color: blue;">urc@usls.edu.ph</a> within 1-2 days after the deliberation. Thank you.</strong></p>
    <br/>
  `;
};

export default MyEditor;
