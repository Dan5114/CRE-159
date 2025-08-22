import{r as h,G as C,j as e}from"./app-DF_xequE.js";import{N as A}from"./notyf.es-ZvlfbKa9.js";/* empty css                  */import{u,w as _}from"./xlsx-5rFX-EW9.js";import{J as f}from"./jodit-react-CEci_RN8.js";const L=({research:l,contents_mce:o,panels:c,user:p})=>{const g=new A,n=h.useRef(null),[a,b]=h.useState(""),{setData:i,post:E}=C({research_id:l.id,steps:"3",user_type:"cre"});h.useEffect(()=>{const t=o?o.content:null;if(t)b(t);else{const d=S(c);b(d)}},[]);const w=()=>{if(!n.current)return;const t=n.current.getEditorValue;window.confirm("📂 Are you sure you want to save changes?")&&(i("content",t),E(route("cre.tinymce.update"),{onSuccess:d=>{g.success(d.props.flash.message||"Content saved successfully!")},onError:d=>{g.error("Failed to save content. Please try again.")},onFinish:()=>{console.log("Finished sending message")}}))},x=()=>{if(!n.current||!window.confirm("🚀 Do you want to download the Excel file?"))return;const s=R(a),r=u.book_new();u.book_append_sheet(r,s,l.research_title),_(r,l.research_title+".xlsx"),alert("Your Excel file has been downloaded!")},R=t=>{const d=document.createElement("div");d.innerHTML=t;const s=[];return d.childNodes.forEach(r=>{r.nodeName==="TABLE"?(r.querySelectorAll("tr").forEach(T=>{const y=[];T.querySelectorAll("td, th").forEach(N=>{y.push(N.innerText.trim())}),s.push(y)}),s.push([])):(r.nodeName==="P"||r.nodeName.startsWith("H"))&&(s.push([r.innerText.trim()]),s.push([]))}),u.aoa_to_sheet(s)},m=()=>{if(!n.current)return;const t=document.createElement("iframe");document.body.appendChild(t),t.style.position="absolute",t.style.width="0px",t.style.height="0px",t.style.border="none";const d=t.contentWindow.document;d.open(),d.write(`<html><body>${a}</body></html>`),d.close(),t.contentWindow.focus(),t.contentWindow.print(),setTimeout(()=>{document.body.removeChild(t)},500)};return e.jsxs(e.Fragment,{children:[p.user_type=="tpl"?e.jsxs("div",{className:"overflow-hidden",children:[e.jsx(f,{ref:n,value:a,onBlur:t=>i("content",t),config:{height:600,resizable:!1,allowResizeX:!1,allowResizeY:!1,toolbar:["undo","redo","|","bold","italic","underline","|","align","ul","ol"],readonly:!0,buttons:["bold","italic","underline"],toolbarSticky:!1,toolbarAdaptive:!1}}),e.jsx("button",{onClick:m,className:"bg-gray-500 text-white px-4 mt-12 py-2 rounded",children:"Print Form"})]}):(o==null?void 0:o.status)!=="A"?e.jsx("div",{className:"overflow-hidden mb-6",children:e.jsx(f,{ref:n,value:a,onBlur:t=>i("content",t),config:{height:600,maxHeight:600,resizable:!1,allowResizeX:!1,allowResizeY:!1,toolbar:["undo","redo","|","bold","italic","underline","|","align","ul","ol","print"],readonly:!1}})}):e.jsxs("div",{className:"overflow-hidden",children:[e.jsx(f,{ref:n,value:a,onBlur:t=>i("content",t),config:{height:600,resizable:!1,allowResizeX:!1,allowResizeY:!1,toolbar:["undo","redo","|","bold","italic","underline","|","align","ul","ol"],readonly:!0,buttons:["bold","italic","underline"],toolbarAdaptive:!1}}),e.jsx("button",{onClick:m,className:"bg-gray-500 text-white px-4 mt-12 py-2 rounded",children:"Print Form"})]}),e.jsx("div",{className:"mt-6",children:p.user_type=="tpl"?e.jsx(e.Fragment,{}):e.jsx(e.Fragment,{children:(o==null?void 0:o.status)!=="A"?e.jsxs("div",{className:"flex justify-end gap-3 mt-3",children:[e.jsxs("button",{type:"button",onClick:w,className:"btn btn-primary flex items-center gap-2",children:[e.jsx("span",{className:"icon-[tabler--file] size-6 align-bottom"}),"Save Changes"]}),e.jsxs("button",{onClick:x,className:"px-4 py-2 bg-green-500 text-white rounded flex items-center",children:[e.jsx("span",{className:"icon-[tabler--file-spreadsheet] size-6 align-bottom"}),"Export to Excel"]})]}):e.jsx(e.Fragment,{})})})]})},S=l=>`
    <h3 style="text-align: center;">UNIVERSITY OF ST. LA SALLE</h3>
    <h4 style="text-align: center;">CENTER FOR RESEARCH AND ENGAGEMENT</h4>
    <h4 style="text-align: center;">FACULTY RESEARCH PROGRAM AY 2023-2024</h4>
    <h5 style="text-align: center;"><strong>FORM #3 CONSOLIDATED COMMENTS AND SUGGESTIONS FORM</strong></h5>
    <h5 style="text-align: center; color: red;"><strong>(FOR DOCUMENTER)</strong></h5>

    <table border="1" style="width: 100%; border-collapse: collapse;">
      <tbody>
        <tr>
          <td style="width: 80%; font-weight: bold;">DATE</td>
          <td style="width: 20%;"></td>
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
          <th>TITLE</th>
          <th>Comments and suggestions</th>
          <th>Action Taken</th>
          <th>Refer to page#</th>
        </tr>
      </thead>
      <tbody>
        <tr style="background-color: #d9d9d9;"><td style="font-weight: bold;">INTRODUCTION</td><td></td><td></td><td></td></tr>
        <tr><td>Background of the Study</td><td><ul>${l.map(c=>`<li>${c.user_profile.name}</li>`).join("")}</ul></td><td></td><td></td></tr>
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
  `;export{L as default};
