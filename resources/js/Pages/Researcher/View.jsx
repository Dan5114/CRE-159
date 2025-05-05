import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css'; 
import StepperForm from './Sub/StepperForm';
import Steps from './Sub/Steps';
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime);
import localizedFormat from "dayjs/plugin/localizedFormat";
import NotFound from './Sub/NotFound';
import HeaderData from './Sub/HeaderData';
dayjs.extend(localizedFormat);

export default function View(props) {

    const notyf = new Notyf();
    const step_status = props.step_status;
    const research_data = props.research;
    const files = props.frp;
    const research_logs = props.research_logs;
    const panels = props.panels;
    const user_panels = props.user_panels;
    const technical_docs = props.technical_docs;
    const revised_docs = props.revised_docs;
    const tpl_docs = props.tpl_docs;
    const ethics_docs = props.ethics_docs;
    const budget_docs = props.budget_docs;
    const final_docs = props.final_docs;
    const completion_cert_docs = props.completion_cert_docs;
    const moa_docs = props.moa_docs;
    const feedbacks_step1 = props.feedbacks_step1;
    const feedbacks_step1_notif = props.feedbacks_step1_notif;
    const feedbacks_step3 = props.feedbacks_step3;
    const feedbacks_step3_notif = props.feedbacks_step3_notif;
    const feedbacks_step4 = props.feedbacks_step4;
    const feedbacks_step4_notif = props.feedbacks_step4_notif;
    const feedbacks_step9 = props.feedbacks_step9;
    const feedbacks_step9_notif = props.feedbacks_step9_notif;
    const feedbacks_step10 = props.feedbacks_step10;
    const feedbacks_step10_notif = props.feedbacks_step10_notif;
    const endorsement_status = props.endorsement_status;
    const urb_approval = props.urb_approval;
    const progress_report = props.progress_report;
    const tech_doc = props.tech_doc;
    const revisions_docs = props.revisions_docs;
    const turnitin_docs = props.turnitin_docs;
    const authors = props.authors;
    const contents_mce = props.contents_mce;
    const contents_mce_tech = props.contents_mce_tech;
    const contents_mce_terminal = props.contents_mce_terminal;
    const instruction_content = props.instruction_content;
    const user = usePage().props.auth.user;

    return (
        <AuthenticatedLayout
            header={
                <div class='flex text-white'>
                 <h2 className="text-xl text-white font-extrabold leading-none tracking-tight">
                    Research Profile
                  </h2>
                </div>
            }
        >
            <Head title="View Application" />

            <div className="">
                <div className="mx-auto sm:px-6 lg:px-8">
              {
                (research_data != null) ?
                <div data-stepper='{ "mode": "non-linear" }' class="w-full" >

                      <HeaderData author={props.author} research_data={research_data} authors={authors} />  

                      <div data-stepper={(user.user_type != "tpl" ? '{ "currentIndex": 1 }' : '{ "currentIndex": 3 }')} class="mt-4 grid grid-cols-3 gap-4">
                          <div class="">
                          <h5 class="p-2 rounded-md bg-[#198754] text-xl text-white font-extrabold leading-none tracking-tight md:text-xl dark:text-white">Application and Review Process </h5>
                            <div class="flex items-center justify-between vertical-scrollbar rounded-none rounded-scrollbar card max-h-screen w-full mb-4 p-4">
                           
                            <Steps research_logs={research_logs} step_status={step_status} user={user} tech_doc={tech_doc} />
                            </div>
                            
                            </div>
                            <div class="col-span-2 max-h-auto mb-3">
                              <StepperForm files={files} research={research_data} user={user} panels={panels} technical_docs={technical_docs} revised_docs={revised_docs} tpl_docs={tpl_docs} ethics_docs={ethics_docs} budget_docs={budget_docs} completion_cert_docs={completion_cert_docs} final_docs={final_docs} moa_docs={moa_docs} feedbacks_step1={feedbacks_step1} feedbacks_step1_notif={feedbacks_step1_notif} feedbacks_step3={feedbacks_step3} feedbacks_step3_notif={feedbacks_step3_notif} feedbacks_step4={feedbacks_step4} feedbacks_step4_notif={feedbacks_step4_notif} feedbacks_step9={feedbacks_step9} feedbacks_step9_notif={feedbacks_step9_notif} feedbacks_step10={feedbacks_step10} feedbacks_step10_notif={feedbacks_step10_notif} endorsement_status={endorsement_status} tech_doc={tech_doc} urb_approval={urb_approval} progress_report={progress_report} revisions_docs={revisions_docs} turnitin_docs={turnitin_docs} user_panels={user_panels} contents_mce={contents_mce} contents_mce_tech={contents_mce_tech} contents_mce_terminal={contents_mce_terminal} instruction_content={instruction_content} />
                            </div>
                      </div>
                    </div>
                    :
                    <NotFound />
              }
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
