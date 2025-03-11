import { Editor } from "@tinymce/tinymce-react";
import React, { useRef, useEffect, useState } from "react";
import { Link, useForm, usePage, router } from '@inertiajs/react';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';
 
const MyEditor = ({research, contents_mce}) => {
   const notyf = new Notyf();
  const editorRef = useRef(null);
  const [content, setContent] = useState("");
   const { data, setData, post, errors, reset, formState, processing, progress, recentlySuccessful } =
      useForm({
          research_id : research.id,
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
    if (editorRef.current) {
        const newContent = editorRef.current.getContent();
        setContent(newContent);
        post(route('cre.tinymce.update'),{
          onSuccess: (page) =>  {
            notyf.success(page.props.flash.message);
          },
          onFinish: () =>  {
              console.log("Finishing sending message");            
          },
      });
    }
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
          toolbar: false,
          table_toolbar: false,
          contextmenu: "link image",
          content_style:
            "table { border-collapse: collapse; width: 100%; } td, th { border: 1px solid black; padding: 5px; }",
          readonly: 0,
        }}
      />

<button type="button" onClick={saveContent} class="mt-3 float-end btn btn-primary"><span class="icon-[tabler--file] size-6 align-bottom"></span>Save Changes</button>
      
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
