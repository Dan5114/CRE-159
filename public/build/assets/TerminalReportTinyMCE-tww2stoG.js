import{r as h,G as A,j as t}from"./app-DF_xequE.js";import{J as p}from"./jodit-react-CEci_RN8.js";import{N}from"./notyf.es-ZvlfbKa9.js";/* empty css                  */import{u as g,w as k}from"./xlsx-5rFX-EW9.js";const P=({research:l,contents_mce_terminal:e,user:i})=>{const c=new N,n=h.useRef(null),[a,f]=h.useState(""),{setData:u,post:w,patch:j}=A({research_id:l.id,steps:"10",user_type:"tpl_lead"});h.useEffect(()=>{const s=e?e.content:null;if(s)f(s);else{const r=C();f(r)}},[]);const b=()=>{if(!n.current)return;const s=n.current.getEditorValue;window.confirm("📂 Are you sure you want to save changes?")&&(u("content",s),w(route("cre.tinymce.update"),{onSuccess:r=>{c.success(r.props.flash.message||"Content saved successfully!")},onError:r=>{c.error("Failed to save content. Please try again.")},onFinish:()=>{console.log("Finished sending message")}}))},x=()=>{if(!n.current||!window.confirm("🚀 Do you want to download the Excel file?"))return;const d=v(a),o=g.book_new();g.book_append_sheet(o,d,l.research_title),k(o,l.research_title+".xlsx"),alert("Your Excel file has been downloaded!")},v=s=>{const r=document.createElement("div");r.innerHTML=s;const d=[];return r.childNodes.forEach(o=>{o.nodeName==="TABLE"?(o.querySelectorAll("tr").forEach(E=>{const y=[];E.querySelectorAll("td, th").forEach(R=>{y.push(R.innerText.trim())}),d.push(y)}),d.push([])):(o.nodeName==="P"||o.nodeName.startsWith("H"))&&(d.push([o.innerText.trim()]),d.push([]))}),g.aoa_to_sheet(d)},m=s=>{window.confirm("Are you sure you want to submit the consolidated report?")&&j(route("submit.consolidated.report.cre",s),{preserveScroll:!0,onSuccess:r=>{c.success(r.props.flash.message)}})};return t.jsxs(t.Fragment,{children:[t.jsx("div",{className:"overflow-hidden mb-6",children:(e==null?void 0:e.status)=="P"?t.jsx(p,{ref:n,value:a,onBlur:s=>u("content",s),config:{height:600,resizable:!1,allowResizeX:!1,allowResizeY:!1,toolbar:["undo","redo","|","bold","italic","underline","|","align","ul","ol"],readonly:!1,buttons:["bold","italic","underline"],toolbarSticky:!1,toolbarAdaptive:!1}}):t.jsx(t.Fragment,{children:(e==null?void 0:e.status)=="A"?t.jsxs(t.Fragment,{children:[t.jsx(p,{ref:n,value:a,config:{height:600,maxHeight:600,resizable:!1,allowResizeX:!1,allowResizeY:!1,toolbar:!0,buttons:"bold,italic,underline,|,ul,ol,|,align,|,undo,redo,|,eraser,print",toolbarAdaptive:!1,toolbarSticky:!1,readonly:!0}}),t.jsx("br",{}),t.jsx("div",{className:"mt-6 text-center text-green-600 font-semibold",children:"✅ The Terminal Evaluation Report has already been endorsed."})]}):i.user_type=="tpl"&&(e==null?void 0:e.status)==null?t.jsx(p,{ref:n,value:a,onBlur:s=>u("content",s),config:{height:600,resizable:!1,allowResizeX:!1,allowResizeY:!1,toolbar:["undo","redo","|","bold","italic","underline","|","align","ul","ol"],readonly:!1,buttons:["bold","italic","underline"],toolbarAdaptive:!1}}):t.jsx(t.Fragment,{children:t.jsx("div",{class:"bg-yellow-50 border-l-4 border-yellow-500 p-6 shadow-md rounded-lg",children:t.jsxs("div",{class:"flex items-start",children:[t.jsx("div",{class:"flex-shrink-0",children:t.jsx("svg",{class:"h-6 w-6 text-yellow-500",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg",children:t.jsx("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M12 8c1.657 0 3 1.343 3 3s-1.343 3-3 3-3-1.343-3-3 1.343-3 3-3zm0 0V3m0 5v3M9 12c-1.657 0-3 1.343-3 3s1.343 3 3 3s3-1.343 3-3-1.343-3-3-3zM12 8c1.657 0 3 1.343 3 3s-1.343 3-3 3zM12 8h-3"})})}),t.jsxs("div",{class:"ml-4",children:[t.jsx("h3",{class:"text-xl font-semibold text-gray-800",children:"Waiting for Tech Lead Panel Endorsement"}),t.jsx("p",{class:"mt-2 text-gray-600",children:"Your application is currently under review by the Tech Panel (Lead). We appreciate your patience as this process may take some time."}),t.jsx("div",{class:"mt-4",children:t.jsx("span",{class:"inline-flex items-center px-3 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800",children:"Pending Endorsement"})})]})]})})})})}),(e==null?void 0:e.status)=="P"&&i.user_type=="tpl"?t.jsxs(t.Fragment,{children:[t.jsxs("div",{className:"flex justify-end gap-3 mt-12",children:[t.jsxs("button",{type:"button",onClick:b,className:"btn btn-primary flex items-center gap-2",children:[t.jsx("span",{className:"icon-[tabler--file] size-6 align-bottom"}),"Save Changes"]}),t.jsxs("button",{onClick:x,className:"px-4 py-2 bg-green-500 text-white rounded flex items-center",children:[t.jsx("span",{className:"icon-[tabler--file-spreadsheet] size-6 align-bottom"}),"Export to Excel"]})]}),t.jsx("div",{className:"mt-3",children:t.jsx("button",{type:"button",onClick:()=>m(e.id),className:"px-4 py-2 mt-6 text-white bg-blue-600 hover:bg-blue-700 rounded-md shadow-md focus:outline-none",children:"Endorse Technical Report"})})]}):t.jsx(t.Fragment,{children:(e==null?void 0:e.status)==null&&i.user_type=="tpl"?t.jsxs(t.Fragment,{children:[t.jsxs("div",{className:"flex justify-end gap-3 mt-12",children:[t.jsxs("button",{type:"button",onClick:b,className:"btn btn-primary flex items-center gap-2",children:[t.jsx("span",{className:"icon-[tabler--file] size-6 align-bottom"}),"Save Changes"]}),t.jsxs("button",{onClick:x,className:"px-4 py-2 bg-green-500 text-white rounded flex items-center",children:[t.jsx("span",{className:"icon-[tabler--file-spreadsheet] size-6 align-bottom"}),"Export to Excel"]})]}),t.jsx("div",{className:"mt-3",children:t.jsx("button",{type:"button",onClick:()=>m(e.id),className:"px-4 py-2 mt-6 text-white bg-blue-600 hover:bg-blue-700 rounded-md shadow-md focus:outline-none",children:"Endorse Technical Report"})})]}):""})]})},C=()=>`
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
    `;export{P as default};
