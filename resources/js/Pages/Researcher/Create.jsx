import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, usePage } from '@inertiajs/react';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';


export default function Create(props) {
    const notyf = new Notyf();
    const { page } = usePage().props;

    const { data, setData, post, errors, reset, processing, progress, recentlySuccessful } =
    useForm({
      research_title: "",
    });

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
            <div className="py-2">
                <div className="mx-auto sm:px-6 lg:px-8">

                
                <form onSubmit={submitProposal}>
                <div class="card p-3">
                  <div class="px-4 sm:px-0">
                    <h3 class="text-2xl font-semibold text-base-content/90">Proposal Information</h3>
                    <p class="text-sm max-w-full text-base-content/80">Please fill up the required fields with mark asterisk(<span class="text-[#FF0000]">*</span>)</p>
                  </div>
                  <div class="mt-6 border-t border-base-content/25">
                    <dl class="mt-3">
                      <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 text-base">
                        <dt class="font-bold text-base-content/90">Research Title : <span class="text-[#FF0000]">*</span></dt>
                        <dd class="mt-1 text-base-content/80 sm:col-span-2 sm:mt-0">
                        <textarea value={data.research_title} onChange={(e) => setData('research_title', e.target.value)}  class="textarea" placeholder="" ></textarea>
                        <span class="label-text-alt text-xs">Max. 200 characters</span>
                        <div class="">
                          
                        {errors.research_title && <div class="text-[#FF0000] flex text-xs"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
	<path fill="red" d="M12 17q.425 0 .713-.288T13 16t-.288-.712T12 15t-.712.288T11 16t.288.713T12 17m-1-4h2V7h-2zm1 9q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22m0-2q3.35 0 5.675-2.325T20 12t-2.325-5.675T12 4T6.325 6.325T4 12t2.325 5.675T12 20m0-8" />
</svg>&nbsp;{errors.research_title}</div>}

                        </div>
                        </dd>
                      </div>
                      <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 text-base">
                        <dt class="font-bold text-base-content/90">Department : <span class="text-[#FF0000]">*</span></dt>
                        <dd class="mt-1 text-base-content/80 sm:col-span-2 sm:mt-0">
                        <select      data-select='{
    "placeholder": "Select your Department",
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
                       {errors.department && <div class="text-[#FF0000] flex text-xs"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
	<path fill="red" d="M12 17q.425 0 .713-.288T13 16t-.288-.712T12 15t-.712.288T11 16t.288.713T12 17m-1-4h2V7h-2zm1 9q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22m0-2q3.35 0 5.675-2.325T20 12t-2.325-5.675T12 4T6.325 6.325T4 12t2.325 5.675T12 20m0-8" />
</svg>&nbsp;{errors.department}</div>}
                        </dd>
                      </div>
                      
                      <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 text-base">
                        <dt class="font-bold text-base-content/90">Members : <span class="text-[#FF0000]">*</span></dt>
                        <dd class="mt-1 text-base-content/80 sm:col-span-2 sm:mt-0">
                        <input type="text" onChange={(e) => setData('members', e.target.value)} class="input rounded-md" aria-label="input" />
                        <div class="label">
    <span class="label-text-alt text-xs">Multiple members put a comma, Ex. (Test1, Test 2)</span>
  </div>
                        {errors.members && <div class="text-[#FF0000] flex text-xs"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
	<path fill="red" d="M12 17q.425 0 .713-.288T13 16t-.288-.712T12 15t-.712.288T11 16t.288.713T12 17m-1-4h2V7h-2zm1 9q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22m0-2q3.35 0 5.675-2.325T20 12t-2.325-5.675T12 4T6.325 6.325T4 12t2.325 5.675T12 20m0-8" />
</svg>&nbsp;{errors.members}</div>}
                        </dd>
                      </div>
                    </dl>
                  </div>
                  <div class="flex justify-end">  <button type="submit" disabled={processing} class="btn btn-primary rounded-full">{(processing) ?<span class="loading loading-spinner loading-md"></span> : "Submit"}</button></div>
                </div>
                </form>

                 </div>
            </div> 
        </AuthenticatedLayout>
    );
}
