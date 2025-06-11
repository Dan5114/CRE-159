import{r as i,G as y,j as e}from"./app-CfsFC_sX.js";import{J as T}from"./jodit-react-CtE3-kLk.js";import{N as R}from"./notyf.es-ZvlfbKa9.js";/* empty css                  */import{u as l,w as S}from"./xlsx-5rFX-EW9.js";const L=({research:n,contents_mce_tech:a})=>{const c=new R,s=i.useRef(null),[h,p]=i.useState(""),{setData:u,post:f}=y({research_id:n.id,steps:"2",user_type:"tech"});i.useEffect(()=>{const t=a?a.content:null;if(t)p(t);else{const d=N();p(d)}},[]);const E=()=>{if(!s.current)return;const t=s.current.getEditorValue;window.confirm("📂 Are you sure you want to save changes?")&&(u("content",t),f(route("cre.tinymce.update"),{onSuccess:d=>{c.success(d.props.flash.message||"Content saved successfully!")},onError:d=>{c.error("Failed to save content. Please try again.")},onFinish:()=>{console.log("Finished sending message")}}))},m=()=>{if(!s.current||!window.confirm("🚀 Do you want to download the Excel file?"))return;const r=x(h),o=l.book_new();l.book_append_sheet(o,r,n.research_title),S(o,n.research_title+".xlsx"),alert("Your Excel file has been downloaded!")},x=t=>{const d=document.createElement("div");d.innerHTML=t;const r=[];return d.childNodes.forEach(o=>{o.nodeName==="TABLE"?(o.querySelectorAll("tr").forEach(b=>{const g=[];b.querySelectorAll("td, th").forEach(w=>{g.push(w.innerText.trim())}),r.push(g)}),r.push([])):(o.nodeName==="P"||o.nodeName.startsWith("H"))&&(r.push([o.innerText.trim()]),r.push([]))}),l.aoa_to_sheet(r)};return e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"overflow-hidden mb-6",children:e.jsx(T,{ref:s,value:h,onBlur:t=>u("content",t),config:{height:600,maxHeight:600,resizable:!1,allowResizeX:!1,allowResizeY:!1,toolbarSticky:!1,toolbar:!0,buttons:"bold,italic,underline,|,ul,ol,|,align,|,undo,redo,|,eraser,print",toolbarAdaptive:!1,showCharsCounter:!1,showWordsCounter:!1,showXPathInStatusbar:!1,readonly:!1}})}),e.jsxs("div",{className:"flex justify-end gap-3 mt-3",children:[e.jsxs("button",{type:"button",onClick:E,className:"btn btn-primary flex items-center gap-2",children:[e.jsx("span",{className:"icon-[tabler--file] size-6 align-bottom"}),"Save Changes"]}),e.jsxs("button",{onClick:m,className:"px-4 py-2 bg-green-500 text-white rounded flex items-center",children:[e.jsx("span",{className:"icon-[tabler--file-spreadsheet] size-6 align-bottom"}),"Export to Excel"]})]})]})},N=()=>`
      <h3 style="text-align: center;">UNIVERSITY OF ST. LA SALLE</h3>
<h4 style="text-align: center;">CENTER FOR RESEARCH AND ENGAGEMENT</h4>
<h5 style="text-align: center;">FACULTY RESEARCH PROGRAM</h5>
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
<br />

    `;export{L as default};
