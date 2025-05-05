import React, { useRef, useEffect, useState } from "react";
import { Head, Link, useForm, usePage, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime';
import localizedFormat from "dayjs/plugin/localizedFormat";
import 'notyf/notyf.min.css';
import JoditEditor from "jodit-react";

dayjs.extend(relativeTime);
dayjs.extend(localizedFormat);

export default function View(props) {

  
  const stepNumber = parseInt(props.id, 10);
  const findCardByStep = (instruction_content, step) => {
    if (!Array.isArray(instruction_content) || instruction_content.length === 0) {
      console.warn('Invalid or empty instruction_content array.');
      return null; // Return null if instruction_content is not an array or is empty
    }
  
    if (typeof step !== 'number' || isNaN(step)) {
      console.warn('Invalid step parameter. It must be a number.');
      return null; // Return null if the step is not a valid number
    }
  
    const card = instruction_content.find(c => {
      if (!c.steps) {
        console.warn('Step data is missing for some entries.');
        return false; // Skip entries that don't have steps defined
      }
  
      const stepNumber = parseInt(c.steps.replace(/[^\d]/g, '')); // Remove non-numeric characters
      return stepNumber === step; // Compare with dynamic step parameter
    });
  
    if (!card) {
      console.warn(`No card found for Step ${step}.`);
    }
  
    return card || null; // Return the found card or null if no match
  };

     const editorRef = useRef(null);
      const [content, setContent] = useState("");
       const { data, setData, post, errors, reset, formState, processing, progress, recentlySuccessful } =
          useForm({
              steps : props.id,
          });
    
      useEffect(() => {
        const savedContent =  findCardByStep(props.instruction_content, stepNumber)?.content ?? null;
        if (savedContent) {
          setContent(savedContent);
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
    
        post(route("instructions.store"), {
            onSuccess: (page) => {
                console.log(page.props.flash.message || "Content saved successfully!");
            },
            onError: (errors) => {
                console.log("Failed to save content. Please try again.");
            },
            onFinish: () => {
                console.log("Finished sending message");
            },
        });
    };

  return (
    <AuthenticatedLayout
      header={
        <div className="flex text-white">
          <h2 className="text-xl text-white font-extrabold leading-none tracking-tight">
            View Instructions / Guidelines
          </h2>
        </div>
      }
    >
      <Head title="Application Tracking" />

      <div className="py-2">
        <div className="mx-auto sm:px-6 lg:px-8">
            <div className="overflow-x-auto card p-2">
                <h2 className="text-2xl lead p-3">Step {props.id} Instructions</h2>
            <JoditEditor
                ref={editorRef}
                value={content}
                onBlur={(newContent) => setData("content", newContent)} // ✅ Updates state on blur
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
                buttons: [
                    'source', '|',
                    'bold', 'italic', 'underline', 'strikethrough', '|',
                    'superscript', 'subscript', '|',
                    'ul', 'ol', 'indent', 'outdent', '|',
                    'font', 'fontsize', 'brush', 'paragraph', '|',
                    'table', 'link', '|',
                    'align', '|',
                    'undo', 'redo', '|',
                    'hr', 'eraser', 'copyformat', 'fullsize'
                  ],
                toolbarSticky: false, // Prevents toolbar from sticking
                toolbarAdaptive: false, // Prevents adaptive toolbar changes
                }}
                />

<button
       type="button"
       onClick={saveContent}
       className="btn btn-primary flex items-center gap-2 mt-2"
     >
       <span className="icon-[tabler--file] size-6 align-bottom"></span>
       Save Changes
     </button>
            </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
