import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, usePage, Link } from '@inertiajs/react';
import React, { useState, useEffect } from "react";
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';


export default function Create(props) {
    const notyf = new Notyf();
    const { page } = usePage().props;

    const { data, setData, post, errors, reset, processing, progress, recentlySuccessful } =
    useForm({
      research_title: "",
    });

    const [input, setInput] = useState(""); // Holds the current input value
    const [values, setValues] = useState([]); // Holds the multiple values
  
    // Handle the input change
    const handleInputChange = (e) => {
      setInput(e.target.value);
    };

    const handleButtonClick = (e) => {
      setValues((prevValues) => [
        ...prevValues,
        input.trim().replace(/,$/, ""), // Remove any trailing comma
      ]);
      setInput(""); // Clear the input field
      e.preventDefault(); // Prevent the default behavior (e.g., form submission)
    };
  
    // Remove a value
    const removeValue = (valueToRemove) => {
      setValues(values.filter((value) => value !== valueToRemove));
    };


    useEffect(() => {
      setData('members', values)
    }, [values]); 

    const submitProposal = (e) => {
      e.preventDefault();

      post(route('researcher.store'), {
          onSuccess: (page) =>  {
              reset();
              notyf.success(page.props.flash.message)
          },
          onFinish: () =>  {
            
          },
      });
  }


    return (
        <AuthenticatedLayout
            header={
              <div class='flex text-white'>
                 <h2 className="text-xl text-white font-extrabold leading-none tracking-tight">
                    Create Application Proposal
                  </h2>
                </div>
            }
        >
          <Head title="Proposal Submission" />
          <div className="py-4">
  <div className="mx-auto max-w-8xl sm:px-6 lg:px-8">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Left Column - Form */}
      <form onSubmit={submitProposal} className="bg-white p-6 rounded-xl shadow-md">
        {/* Header */}
        <div className="mb-6">
          <h3 className="text-2xl font-bold text-gray-900">Proposal Information</h3>
          <p className="text-sm text-gray-600">
            Please fill up the required fields marked with an asterisk (<span className="text-red-500">*</span>).
          </p>
        </div>

        {/* Research Title */}
        <div className="mb-5">
          <label className="block font-medium text-gray-800">
            Research Title <span className="text-red-500">*</span>
          </label>
          <textarea
            value={data.research_title}
            onChange={(e) => setData("research_title", e.target.value)}
            className="w-full border rounded-md p-3 focus:ring-2 focus:ring-blue-500"
            placeholder="Enter research title..."
            maxLength={200}
          ></textarea>
          {/* Character Counter */}
          <p className={`text-xs mt-1 ${data.research_title.length >= 200 ? "text-red-500" : "text-gray-500"}`}>
            {data.research_title.length}/200 characters
          </p>
          {errors.research_title && (
            <p className="text-red-500 text-sm mt-1 flex items-center">⚠ {errors.research_title}</p>
          )}
        </div>

        {/* College Selection */}
        <div className="mb-5">
          <label className="block font-medium text-gray-800">
            College <span className="text-red-500">*</span>
          </label>
          <select      
          data-select='{
          "placeholder": "Select your College",
          "toggleTag": "<button type=\"button\" aria-expanded=\"false\"></button>",
          "toggleClasses": "rounded-md advance-select-toggle",
          "hasSearch": true,
          "dropdownClasses": "advance-select-menu max-h-52 pt-0 vertical-scrollbar rounded-scrollbar",
          "optionClasses": "advance-select-option selected:active",
          "optionTemplate": "<div class=\"flex justify-between items-center w-full\"><span data-title></span><span class=\"icon-[tabler--check] flex-shrink-0 size-4 text-primary hidden selected:block \"></span></div>",
          "extraMarkup": "<span class=\"icon-[tabler--caret-up-down] flex-shrink-0 size-4 text-base-content/90 absolute top-1/2 end-3 -translate-y-1/2 \"></span>"
          }'
          class="hidden" id="favorite-simpson" onChange={(e) => setData('department', e.target.value)}>
                          <option value="">Please Choose:</option>
                          { props.departments.map((department, index) => (
                             <option key={index} value={department.dept_id}>{department.name}</option>
                          ))}
                       </select>
          {errors.department && (
            <p className="text-red-500 text-sm mt-1 flex items-center">⚠ {errors.department}</p>
          )}
        </div>

        {/* Type Selection */}
        <div className="mb-5">
          <label className="block font-medium text-gray-800">
            Type <span className="text-red-500">*</span>
          </label>
          <select
            className="w-full border rounded-md p-3 focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setData("type", e.target.value)}
          >
            <option value="">Please Choose</option>
            <option value="MD">Multi Disciplinary</option>
            <option value="C">Collaboration</option>
          </select>
        </div>

        {/* Members Input */}
        <div className="mb-5">
          <label className="block font-medium text-gray-800">
            Members <span className="text-red-500">*</span>
          </label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={handleInputChange}
              className="w-full border rounded-md p-3 focus:ring-2 focus:ring-blue-500"
              placeholder="Add a member..."
            />
            <button
              onClick={handleButtonClick}
              className="p-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
            >
              ➕
            </button>
          </div>
          {errors.members && (
            <p className="text-red-500 text-sm mt-1 flex items-center">⚠ {errors.members}</p>
          )}

          {/* List of Members */}
          {values.length > 0 && (
            <div className="mt-3">
              <p className="text-sm font-medium text-gray-700">List of Members:</p>
              <div className="flex flex-wrap gap-2">
                {values.map((value, index) => (
                  <span
                    key={index}
                    className="bg-green-500 text-white px-4 py-1 rounded-full text-sm flex items-center"
                  >
                    {value}
                    <button
                      type="button"
                      onClick={() => removeValue(value)}
                      className="ml-2 text-white hover:text-red-500"
                    >
                      &times;
                    </button>
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Submit Button */}
        <div className="flex justify-end mt-12">
          <button
            type="submit"
            disabled={processing}
           className="hover:cursor-pointer flex items-center gap-2 bg-blue-600 text-white px-4 py-2 text-sm font-medium rounded-lg hover:bg-blue-700 shadow-md transition-all duration-300"
          >
            {processing ? <span className="loading loading-spinner loading-md"></span> : "Submit"}
          </button>
        </div>
      </form>

      {/* Right Column - Help Section */}
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 rounded-xl shadow-lg">
  {/* Header */}
  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
    📌 First-Time Application Guide
  </h3>

  {/* Guidelines */}
  <ul className="list-disc list-inside text-gray-800 text-sm space-y-2">
    <li>Ensure your <span className="font-medium text-green-800">research title</span> is **clear and concise** (Max: <span className="font-bold">200 characters</span>).</li>
    <li>Select the <span className="font-medium text-green-800">correct college</span> that aligns with your proposal.</li>
    <li>Choose the <span className="font-medium text-green-800">right type</span> (Multi Disciplinary or Collaboration).</li>
    <li>Add <span className="font-medium text-green-800">all team members</span> who are part of the research.</li>
    <li>Review your details before <span className="font-medium text-green-800">submitting the proposal</span>.</li>
  </ul>

  {/* Important Notes Section */}
  <div className="mt-6 p-4 bg-white border-l-4 border-green-500 shadow-sm rounded-md">
    <h4 className="text-sm font-semibold text-green-900">⚠ Important Notes:</h4>
    <ul className="list-disc list-inside text-xs text-gray-700 mt-2 space-y-1">
      <li>Your <span className="font-medium">proposal will be reviewed</span> within 3-5 business days.</li>
      <li>If you need help, contact the <span className="font-medium">research department</span>.</li>
    </ul>
  </div>

  {/* Link to Requirements Page */}
  <div className="mt-8">
    <Link
      href={route("requirements.index")}
      className="text-green-600 font-medium hover:underline transition duration-200 hover:text-green-800"
    >
      📄 View Full Application Requirements →
    </Link>
  </div>
</div>

    </div>
  </div>
</div>


        </AuthenticatedLayout>
    );
}
