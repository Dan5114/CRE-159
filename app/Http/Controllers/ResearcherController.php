<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Storage;
use App\Models\Research;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Log;
use Exception;
use App\Models\Department;
use App\Models\File;
use App\Models\User;
use App\Models\ResearchLog;
use App\Models\CreMeeting;
use App\Models\CrePanelMember;
use App\Models\CreApplicationStatus;
use App\Models\ResearchDoc;
use App\Models\ResearchMessageThread;
use App\Models\TplEndorsementPaper;
use App\Models\ResearchMember;
use App\Models\UrbApproval;
use App\Models\CreProgressReportHeader;
use App\Models\ProgressReportDetail;
use App\Models\ConsolidatedFeedbacks;
use Carbon\Carbon;
use Illuminate\Validation\ValidationException;
use App\Http\Requests\FileUploadRequest;

class ResearcherController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $user_type = auth()->user()->user_type;
        $search = $request->input('q');
        $r_type = $request->r_type;
        $r_status = $request->r_status;
        $r_steps = $request->r_steps;

        $filters = [
            "r_type" => $r_type,
            "r_status" => $r_status,
            "r_steps" => $r_steps
        ];

        if($user_type == "researcher"){
            $researchs = Research::with(['department', 'author'])
            ->with(['app_status' => function($query) {
                return $query->orderBy('tbl_cre_application_status.start', 'ASC');
            }])
            ->when($r_type, function ($query) use ($r_type, $r_steps, $r_status) {
                return $query->where('status', $r_type);
            })
            ->when($r_steps && $r_status, function ($query) use ($r_steps, $r_status) {
                return $query->whereHas('app_status', function ($query) use ($r_steps, $r_status) {
                    $query->where('tbl_cre_application_status.steps', $r_steps)->where('tbl_cre_application_status.status', $r_status);
                });
            })
            ->when($search, function ($query, $search) {
                return $query->where('research_title', 'LIKE', "%{$search}%");
            })
            ->orderBy('created_at', 'DESC')
            ->where('user_id', auth()->user()->id)
            ->paginate(10);
            

        }else if($user_type == "tpl"){
            $sessionId = auth()->user()->id;
            $researchs = Research::with(['department', 'faculty', 'author'])
            ->whereHas('faculty', function ($query) use ($sessionId) {
                $query->where('user_id', $sessionId);
            })
            ->when($search, function ($query, $search) {
                return $query->where('research_title', 'LIKE', "%{$search}%");
            })
            ->with(['app_status' => function($query) {
                return $query->orderBy('tbl_cre_application_status.start', 'ASC');
             }]) 
            ->when($r_type, function ($query, $r_type) {
                return $query->where('status', $r_type);
            })
            ->when(isset($r_steps, $r_status), function ($query) use ($r_steps, $r_status) {
                return $query->when(!empty($r_steps) && !empty($r_status), function ($query) use ($r_steps, $r_status) {
                    return $query->whereHas('app_status', function ($q) use ($r_steps, $r_status) {
                        $q->where('tbl_cre_application_status.steps', $r_steps)
                          ->where('tbl_cre_application_status.status', $r_status);
                    });
                })->orderBy('created_at', 'DESC');    
            })
            ->orderBy('created_at', 'DESC')
            ->where('status', '!=', 'D')
            ->paginate(8);
        }
        else{
            $researchs = Research::with(['department', 'author', 'app_status' => function ($query) {
                $query->orderBy('tbl_cre_application_status.start', 'ASC');
            }])
            ->when($search, function ($query, $search) {
                return $query->where('research_title', 'LIKE', "%{$search}%");
            })
            ->when($r_type, function ($query, $r_type) {
                return $query->where('status', $r_type);
            })
            ->when(isset($r_steps, $r_status), function ($query) use ($r_steps, $r_status) {
                return $query->whereHas('app_status', function ($q) use ($r_steps, $r_status) {
                    $q->where('tbl_cre_application_status.steps', $r_steps)
                      ->where('tbl_cre_application_status.status', $r_status);
                });
            })
            ->when(request()->has('status'), function ($query) {
                $status = request()->input('status');
        
                if ($status === "Completed") {
                    // Only include research that is completed at step 13
                    $query->whereHas('app_status', function ($q) {
                        $q->where('tbl_cre_application_status.steps', 13)
                          ->where('tbl_cre_application_status.status', 'Completed');
                    });
                } elseif ($status === "Ongoing") {
                    // Include only research that is still ongoing and hasn't reached step 13
                    $query->whereHas('app_status', function ($q) {
                        $q->where('tbl_cre_application_status.status', 'On Process');
                    })->whereDoesntHave('app_status', function ($q) {
                        $q->where('tbl_cre_application_status.steps', 13)
                          ->where('tbl_cre_application_status.status', 'Completed');
                    });
                }
            })
            ->when(request()->filled('step'), function ($query) {
                $step = request()->input('step');
                return $query->whereHas('app_status', function ($q) use ($step) {
                    $q->where('tbl_cre_application_status.steps', $step)
                      ->where('tbl_cre_application_status.status', 'On Process');
                });
            })
            ->where('status', '!=', 'D')
            ->orderBy('created_at', 'DESC')
            ->paginate(8);
        }
        $departments = Department::all();

        return Inertia::render('Researcher/Index', [
            'researchs' => $researchs,
            'departments' => $departments,
            'initialFilters' => $filters
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $departments = Department::all();
        
        return Inertia::render('Researcher/Create', [
            'departments' => $departments
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'research_title' => 'required|unique:tbl_research|max:250',
            'department' => 'required'
        ]);

        try {
            $research = Research::create([
                'reference' => (string) Str::uuid(),
                'research_title' => $request->research_title,
                'dept_id' => $request->department,
                'type' => $request->type,
                'user_id' => auth()->user()->id
            ]);

            foreach ($request->members as $value) {
                $data = [
                    "research_id" => $research->id,
                    "name" => $value
                ];
                ResearchMember::create($data);
            }
    
            return Redirect::route('researcher.index')->with('message', 'Research Successfully Added');
        } catch (Exception $e) {
            Log::debug($e->getMessage());   
        }
    }

    public function update_application_status(Request $request)
    {
        $validated = $request->validate([
            'date_completion' => 'required|date|after_or_equal:today',  // Ensure it is a valid date and not in the past
        ]);
    
        $current = Carbon::now();
        $ApplicationStat = CreApplicationStatus::where("research_id", $request->research_id)->where("steps", "1")->first();
        CreApplicationStatus::where("id", $ApplicationStat->id)->update(["end" => $current]);
        $this->cre_application_status($request->research_id, "2", "Technical Committee & Schedule Presentation", $current, $end = null, "On Process");

        Research::where('id', $request->research_id)->update(['status' => 'REC', 'date_completion' => $request->date_completion]);

        return redirect()->back()->with('message', 'Updated Status Successfully');
    }

    public function submit_application(Request $request)
    {
        try {
            $current = Carbon::now();
            Research::where('id', $request->research_id)->update(['status'=>'S']);
            $this->cre_application_status($request->research_id, "1", "Submit Application", $current, $end = null, "Completed");
            return redirect()->back()->with('message', 'Submitted Successfully');
        } catch (Exception $e) {
            Log::debug($e->getMessage());
        }
    }

    public function schedule_progress_report(Request $request){
        try {
            $data = [
                "research_id" => $request->research_id,
                "date_scheduled" => $request->date_scheduled,
                "steps" => $request->steps
            ];
            CreProgressReportHeader::create($data);
            return redirect()->back()->with('message', 'Submitted Successfully');
        } catch (Exception $e) {
            Log::debug($e->getMessage());
        }
    }

    public function update_tiny_mce(Request $request){
        try {
            ConsolidatedFeedbacks::updateOrCreate(
                [
                    'research_id' => $request->research_id,
                    'user_type' => $request->user_type,
                ],
                [
                    'content' => $request->content,
                    'added_by' => auth()->id(),
                    'steps' => $request->steps
                ]
            );
            return redirect()->back()->with('message', 'Successfully Saved Changes');
        } catch (Exception $e) {
            Log::debug($e->getMessage());
        }
    }

    public function researcher_progress_upload(Request $request){

        try {
            if ($request->file('document_file') && $request->steps == '9'){
                $document_file = $request->file('document_file');
                $fileName_doc =   $document_file->getClientOriginalName(); 
                $filePath_doc = 'docs/' . $document_file->getClientOriginalName();
    
                $data = [
                    "research_id"  => $request->research_id,
                    "steps" => $request->steps,
                    "file_name"    => $fileName_doc,
                    "file_path"    => $filePath_doc
                ];
    
                $doc = ResearchDoc::create($data);
                Storage::disk('public')->put($filePath_doc, file_get_contents($document_file));

                $current = Carbon::now();
                $ApplicationStat = CreApplicationStatus::where("research_id", $request->research_id)->where("steps", "9")->first();
                CreApplicationStatus::where("id", $ApplicationStat->id)->update(["end" => $current, "status" => "Completed"]);
                $this->cre_application_status($request->research_id, "10", "Technical Panel Endorsement", $current, $end = null, "On Process");
            }
    
            $progressdata = [
                "type" => $request->type,
                "progress_report_head_id" => $request->id,
                "file_id" => $doc->id,
            ];
            ProgressReportDetail::create($progressdata);

            return redirect()->back()->with('message', 'Submitted Successfully');
        } catch (Exception $e) {
            Log::debug($e->getMessage());
        }
    }

    public function scheduled_meeting(Request $request)
    {
        try {
            $current = Carbon::now();
            CreMeeting::where('id', $request->meeting_id)->update(['status'=>'Success']);

            $ApplicationStat = CreApplicationStatus::where("research_id", $request->research_id)->where("steps", "2")->first();
            CreApplicationStatus::where("id", $ApplicationStat->id)->update(["end" => $current, "status" => "Completed"]);
            $this->cre_application_status($request->research_id, "3", "Technical Review Report", $current, $end = null, "On Process");

            return redirect()->back()->with('message', 'Submitted Successfully');
        } catch (Exception $e) {
            Log::debug($e->getMessage());
        }
    }

    public function save_meeting(Request $request)
    {
        try {
            CreMeeting::create([
                "research_id" => $request->research_id,
                "meeting_date" => $request->meeting_date,
                "status" => "Pending"
            ]);

            return redirect()->back()->with('message', 'Submitted Successfully');
        } catch (Exception $e) {
            Log::debug($e->getMessage());
        }
    }

    public function submit_panels(Request $request)
    {
        CrePanelMember::create([
            "research_id" => $request->research_id,
            "user_id" => $request->panels,
            "role" => $request->role,
        ]);
       return redirect()->back()->with('message', 'Saved Successfully');
    }

    public function file_upload_store(FileUploadRequest $request)
    {
        try {

            if ($request->file('step1')){
                $file_step1 = $request->file('step1');
                $fileName_step1 =  date('ymdhis') . $request->research_id . $file_step1->getClientOriginalName(); 
                $filePath_step1 = 'uploads/' . date('ymdhis') . $request->research_id . $file_step1->getClientOriginalName();

                $data = [
                    "research_id"  => $request->research_id,
                    "file_name"    => $fileName_step1,
                    "file_path"    => $filePath_step1,
                    "file_url"    => $request->step1_url,
                    "document_for" => "FRP"
                ];
                File::create($data);
                Storage::disk('public')->put($filePath_step1, file_get_contents($file_step1));

                $sub_docs_remarks = "Submitted Research Proposal Docs";
                $this->research_data_log($request->research_id, "1", $sub_docs_remarks);
            }
    
            if ($request->file('step2')){
                $file_step2 = $request->file('step2');
                $fileName_step2 =  date('ymdhis') . $request->research_id . $file_step2->getClientOriginalName(); 
                $filePath_step2 = 'uploads/' . date('ymdhis') . $request->research_id . $file_step2->getClientOriginalName();
    
                $data = [
                    "research_id"  => $request->research_id,
                    "file_name"    => $fileName_step2,
                    "file_path"    => $filePath_step2,
                    "file_url"    => $request->step2_url,
                    "document_for" => "CP"
                ];
                File::create($data);
                Storage::disk('public')->put($filePath_step2, file_get_contents($file_step2));

                $sub_docs_remarks = "Uploaded a Checklist for Proposal";
                $this->research_data_log($request->research_id, "1", $sub_docs_remarks);
            }

            if ($request->file('step3')){
                $file_step3 = $request->file('step3');
                $fileName_step3 =  date('ymdhis') . $request->research_id . $file_step3->getClientOriginalName(); 
                $filePath_step3 = 'uploads/' . date('ymdhis') . $request->research_id . $file_step3->getClientOriginalName();
    
                $data = [
                    "research_id"  => $request->research_id,
                    "file_name"    => $fileName_step3,
                    "file_path"    => $filePath_step3,
                    "file_url"    => $request->step3_url,
                    "document_for" => "EL"
                ];
                File::create($data);
                Storage::disk('public')->put($filePath_step3, file_get_contents($file_step3));

                $sub_docs_remarks = "Submitted Endorsement Letter";
                $this->research_data_log($request->research_id, "1", $sub_docs_remarks);
            }

            if ($request->file('step4')){
                $file_step4 = $request->file('step4');
                $fileName_step4 =  date('ymdhis') . $request->research_id . $file_step4->getClientOriginalName(); 
                $filePath_step4 = 'uploads/' . date('ymdhis') . $request->research_id . $file_step4->getClientOriginalName();
    
                $data = [
                    "research_id"  => $request->research_id,
                    "file_name"    => $fileName_step4,
                    "file_path"    => $filePath_step4,
                    "file_url"    => $request->step4_url,
                    "document_for" => "WPGC"
                ];
                File::create($data);
                Storage::disk('public')->put($filePath_step4, file_get_contents($file_step4));

                $sub_docs_remarks = "Uploaded a Work Plan/GANTT Chart";
                $this->research_data_log($request->research_id, "1", $sub_docs_remarks);
            }

            if ($request->file('step5')){
                $file_step5 = $request->file('step5');
                $fileName_step5 =  date('ymdhis') . $request->research_id . $file_step5->getClientOriginalName(); 
                $filePath_step5 = 'uploads/' . date('ymdhis') . $request->research_id . $file_step5->getClientOriginalName();
    
                $data = [
                    "research_id"  => $request->research_id,
                    "file_name"    => $fileName_step5,
                    "file_path"    => $filePath_step5,
                    "file_url"    => $request->step5_url,
                    "document_for" => "BRBP"
                ];
                File::create($data);
                Storage::disk('public')->put($filePath_step5, file_get_contents($file_step5));

                $sub_docs_remarks = "Submitted Budget Requiremnt/Budget Proposal";
                $this->research_data_log($request->research_id, "1", $sub_docs_remarks);
            }

            if ($request->file('step6')){
                $file_step6 = $request->file('step6');
                $fileName_step6 =   date('ymdhis') . $request->research_id . $file_step6->getClientOriginalName(); 
                $filePath_step6 = 'uploads/' . date('ymdhis') . $request->research_id . $file_step6->getClientOriginalName();
    
                $data = [
                    "research_id"  => $request->research_id,
                    "file_name"    => $fileName_step6,
                    "file_path"    => $filePath_step6,
                    "file_url"    => $request->step6_url,
                    "document_for" => "VGII"
                ];
                File::create($data);
                Storage::disk('public')->put($filePath_step6, file_get_contents($file_step6));

                $sub_docs_remarks = "Uploaded a Government ID";
                $this->research_data_log($request->research_id, "1", $sub_docs_remarks);
            }

            if ($request->file('step7')){
                $file_step7 = $request->file('step7');
                $fileName_step7 = date('ymdhis') . $request->research_id . $file_step7->getClientOriginalName(); 
                $filePath_step7 = 'uploads/'   . date('ymdhis') . $request->research_id . $file_step7->getClientOriginalName();
    
                $data = [
                    "research_id"  => $request->research_id,
                    "file_name"    => $fileName_step7,
                    "file_path"    => $filePath_step7,
                    "file_url"    => $request->step7_url,
                    "document_for" => "CVR"
                ];
                File::create($data);
                Storage::disk('public')->put($filePath_step7, file_get_contents($file_step7));

                $sub_docs_remarks = "Submitted CV for Researchers";
                $this->research_data_log($request->research_id, "1", $sub_docs_remarks);
            }
  
        } catch (Exception $e) {
            Log::debug($e->getMessage());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $ref)
    {   
        $value = Research::where('reference', $ref)->with(['author','department','meeting'])->first();
        $research = ($value) ? $value : null;

        if($value){
            $file_FRP = collect(File::where('research_id', $value->id)->where('document_for', "FRP")->orderBy('created_at', 'desc')->first(['id','file_name','file_path','document_for','created_at']));
            $file_CP = collect(File::where('research_id', $value->id)->where('document_for', "CP")->orderBy('created_at', 'desc')->first(['id','file_name','file_path','document_for','created_at']));
            $file_EL = collect(File::where('research_id', $value->id)->where('document_for', "EL")->orderBy('created_at', 'desc')->first(['id','file_name','file_path','document_for','created_at']));
            $file_WPGC = collect(File::where('research_id', $value->id)->where('document_for', "WPGC")->orderBy('created_at', 'desc')->first(['id','file_name','file_path','document_for','created_at']));
            $file_BRBP = collect(File::where('research_id', $value->id)->where('document_for', "BRBP")->orderBy('created_at', 'desc')->first(['id','file_name','file_path','document_for','created_at']));
            $file_VGII = collect(File::where('research_id', $value->id)->where('document_for', "VGII")->orderBy('created_at', 'desc')->first(['id','file_name','file_path','document_for','created_at']));
            $file_CVR = collect(File::where('research_id', $value->id)->where('document_for', "CVR")->orderBy('created_at', 'desc')->first(['id','file_name','file_path','document_for','created_at']));
            
            $rlogs = ResearchLog::where('research_id', $value->id)->where('steps', 1)->orderBy('created_at', 'ASC')->get();
            $panels = CrePanelMember::with(['user_profile', 'feedback_form' => function ($query) use ($value) {
                $query->where('research_id', $value->id)->where('user_type', "tech");
            }])->where('research_id', $value->id)->get();

            $user_panels = User::where('user_type', 'tpl')->get();
            $technical_docs = ResearchDoc::where('research_id', $value->id)->where('steps', '3')->get();
            $revised_docs = ResearchDoc::where('research_id', $value->id)->where('steps', '4')->get();
            $ethics_docs = ResearchDoc::where('research_id', $value->id)->where('steps', '5')->get();
            $budget_docs = ResearchDoc::where('research_id', $value->id)->where('steps', '6')->get();
            $moa_docs = ResearchDoc::where('research_id', $value->id)->where('steps', '8')->get();
            $tpl_docs = ResearchDoc::where('research_id', $value->id)->where('steps', '10')->get();
            $final_docs = ResearchDoc::where('research_id', $value->id)->where('steps', '12')->get();
            $completion_cert_docs = ResearchDoc::where('research_id', $value->id)->where('steps', '13')->get();
        

            $feedbacks_step1 = ResearchMessageThread::where('research_id', $value->id)->where('steps', '1')->orderBy('created_at', 'desc')->get();
            $feedbacks_step1_notif =ResearchMessageThread::where('research_id', $value->id)->where('steps', '1')->where('read_status', '0')->count();

            $feedbacks_step3 = ResearchMessageThread::where('research_id', $value->id)->where('steps', '3')->orderBy('created_at', 'desc')->get();
            $feedbacks_step3_notif =ResearchMessageThread::where('research_id', $value->id)->where('steps', '3')->where('read_status', '0')->count();

            $feedbacks_step4 = ResearchMessageThread::where('research_id', $value->id)->where('steps', '4')->orderBy('created_at', 'desc')->get();
            $feedbacks_step4_notif =ResearchMessageThread::where('research_id', $value->id)->where('steps', '4')->where('read_status', '0')->count();

            $feedbacks_step9 = ResearchMessageThread::where('research_id', $value->id)->where('steps', '9')->orderBy('created_at', 'desc')->get();
            $feedbacks_step9_notif =ResearchMessageThread::where('research_id', $value->id)->where('steps', '9')->where('read_status', '0')->count();

            $feedbacks_step10 = ResearchMessageThread::where('research_id', $value->id)->where('steps', '10')->orderBy('created_at', 'desc')->get();
            $feedbacks_step10_notif =ResearchMessageThread::where('research_id', $value->id)->where('steps', '10')->where('read_status', '0')->count();

            $endorsement_status = TplEndorsementPaper::where('research_id', $value->id)->where('steps', '4')->first();
            $tech_doc = ResearchDoc::where('research_id', $value->id)->where('steps', 'tech')->first();
            $revisions_docs = ResearchDoc::where('research_id', $value->id)->where('steps', 'revisions')->get();
            $turnitin_docs = ResearchDoc::where('research_id', $value->id)->where('steps', 'turnitin')->get();
            $urb_approval = UrbApproval::where('research_id', $value->id)->where('steps', '7')->first();

            $progress_report = CreProgressReportHeader::where('research_id', $value->id)->where('steps', '9')->with('details')->with('details.files')->get();
            $contents_mce = ConsolidatedFeedbacks::where('research_id', $value->id)->where('steps', '3')->where('user_type', 'cre')->first();

            $contents_mce_tech = ConsolidatedFeedbacks::where('research_id', $value->id)->where('steps', '2')->where('user_type', 'tech')->where('added_by', auth()->id())->first();

            $contents_mce_terminal = ConsolidatedFeedbacks::where('research_id', $value->id)->where('steps', '10')->where('user_type', 'tpl_lead')->first();

            $step_status = [
                "step1" => $this->getStepStatus($value->id, "1"),
                "step2" => $this->getStepStatus($value->id, "2"),
                "step3" => $this->getStepStatus($value->id, "3"),
                "step4" => $this->getStepStatus($value->id, "4"),
                "step5" => $this->getStepStatus($value->id, "5"),
                "step6" => $this->getStepStatus($value->id, "6"),
                "step7" => $this->getStepStatus($value->id, "7"),
                "step8" => $this->getStepStatus($value->id, "8"),
                "step9" => $this->getStepStatus($value->id, "9"),
                "step10" => $this->getStepStatus($value->id, "10"),
                "step11" => $this->getStepStatus($value->id, "11"),
                "step12" => $this->getStepStatus($value->id, "12"),
                "step13" => $this->getStepStatus($value->id, "13")
            ];

            $author = ResearchMember::where('research_id', $value->id)->get();
        }else{
            $revisions_docs = null;
            $turnitin_docs = null;
            $technical_docs = null;
            $revised_docs = null;
            $tpl_docs = null;
            $ethics_docs = null;
            $budget_docs = null;
            $final_docs = null;
            $completion_cert_docs = null;
            $moa_docs = null;
            $feedbacks_step1 = null;
            $feedbacks_step1_notif = null;
            $feedbacks_step3 = null;
            $feedbacks_step3_notif = null;
            $feedbacks_step4 = null;
            $feedbacks_step4_notif = null;
            $feedbacks_step9 = null;
            $feedbacks_step9_notif = null;
            $feedbacks_step10 = null;
            $feedbacks_step10_notif = null;
            $endorsement_status = null;
            $urb_approval = null;
            $progress_report = null;
            $tech_doc = null;
            $step_status = null;
            $rlogs = null;
            $panels = null;
            $user_panels = null;
            $files = null;
            $author = null;
            $contents_mce = null;
            $contents_mce_tech = null;
            $contents_mce_terminal = null;
        }

        $doc_file = [
            "doc_frp" => $file_FRP,
            "doc_cp" => $file_CP,
            "doc_el" => $file_EL,
            "doc_wpgc" => $file_WPGC,
            "doc_brbp" => $file_BRBP,
            "doc_vgii" => $file_VGII,
            "doc_cvr" => $file_CVR
        ];
        

        return Inertia::render('Researcher/View', [
            'step_status' => $step_status,
            'research' => $research,
            'frp' => $doc_file,
            'research_logs' => $rlogs,
            'panels' => $panels,
            'user_panels' => $user_panels,
            'technical_docs' => $technical_docs,
            'revised_docs' => $revised_docs,
            'tpl_docs' => $tpl_docs,
            'ethics_docs' => $ethics_docs,
            'budget_docs' => $budget_docs,
            'final_docs' => $final_docs,
            'completion_cert_docs' => $completion_cert_docs,
            'moa_docs' => $moa_docs,
            'feedbacks_step1' => $feedbacks_step1,
            'feedbacks_step1_notif' => $feedbacks_step1_notif,
            'feedbacks_step3' => $feedbacks_step3,
            'feedbacks_step3_notif' => $feedbacks_step3_notif,
            'feedbacks_step4' => $feedbacks_step4,
            'feedbacks_step4_notif' => $feedbacks_step4_notif,
            'feedbacks_step9' => $feedbacks_step9,
            'feedbacks_step9_notif' => $feedbacks_step9_notif,
            'feedbacks_step10' => $feedbacks_step10,
            'feedbacks_step10_notif' => $feedbacks_step10_notif,
            'endorsement_status' => $endorsement_status,
            'urb_approval' => $urb_approval,
            'progress_report' => $progress_report,
            'tech_doc' => $tech_doc,
            'revisions_docs' => $revisions_docs,
            'turnitin_docs' => $turnitin_docs,
            'authors' => $author,
            'contents_mce' => $contents_mce,
            'contents_mce_tech' => $contents_mce_tech,
            'contents_mce_terminal' => $contents_mce_terminal
        ]);
    }

    public function file_download($file_id)
    {
       $file = File::where('id', $file_id)->first();
       return response()->download("storage/uploads/" . $file->file_name, $file->file_name);
    }

    public function doc_download($file_id)
    {
       $file = ResearchDoc::where('id', $file_id)->first();
       return response()->download("storage/docs/" . $file->file_name, $file->file_name);
    }

    public function requirements_download($filename)
    {
       return response()->download("storage/requirements/" . $filename, $filename);
    }

    public function doc_download_result($file_id)
    {
       $file = ResearchDoc::where('id', $file_id)->first();
       return response()->download("storage/uploads/" . $file->turnitin_file, $file->turnitin_file);
    }

    public function download_doc_status($file_id)
    {
       $file = ResearchDoc::where('id', $file_id)->first();
       if($file->steps == 4 && auth()->user()->user_type == "tpl"){
            $data = [
                "seen_status" => 1,
                "seen_date" => Carbon::now()
            ];
            ResearchDoc::where('id', $file_id)->update($data);
       }

       return redirect()->back()->with('message', 'Successfully downloaded');
    }

    public function tpl_endorse_application(Request $request)
    {
        try {
            $current = Carbon::now();
            $session_id = (auth()->user()->user_type == "cre" ? $request->panel_id : auth()->user()->id);
            $date_endorse = (auth()->user()->user_type == "cre" ? $current : $request->date_endorsement);
    
            $check_role = CrePanelMember::where('user_id', $session_id)->where('role', 'lead')->where('research_id', $request->research_id)->first();
            CrePanelMember::where('user_id', $session_id)->update(['endorsement_status' => 'yes']);

            if($check_role){
                $data = [
                    "date_endorse" =>  $date_endorse,
                    "research_id" => $request->research_id,
                    "user_id" => $session_id,
                    "steps" => $request->steps
                ];
                TplEndorsementPaper::create($data);
            }
            
            return redirect()->back()->with('message', 'Success');
        } catch (Exception $e) {
            Log::debug($e->getMessage());
        }
    }

    public function tpl_lead_endorse_application(Request $request)
    {
        try {
            $current = Carbon::now();
            $data = [
                "date_endorse" =>  $current,
                "research_id" => $request->research_id,
                "user_id" => $request->panel_id,
                "steps" => $request->steps
            ];
            TplEndorsementPaper::create($data);
            return redirect()->back()->with('message', 'Success');
        } catch (Exception $e) {
            Log::debug($e->getMessage());
        }
    }

    public function urb_approved_application(Request $request){
        $data = [
            "research_id" => $request->research_id,
            "date_approved" => $request->date_approved,
            "approved_by" => $request->approved_by,
            "remarks" => $request->remarks_approved,
            "steps" => $request->steps
        ];

        UrbApproval::create($data);

        $current = Carbon::now();
        $ApplicationStat = CreApplicationStatus::where("research_id", $request->research_id)->where("steps", "7")->first();
        CreApplicationStatus::where("id", $ApplicationStat->id)->update(["end" => $current, "status" => "Completed"]);
        $this->cre_application_status($request->research_id, "8", "MOA Signing", $current, $end = null, "On Process");
        return redirect()->back()->with('message', 'Success');
    }

    public function urb_disapproved_application(Request $request){
        $data = [
            "research_id" => $request->research_id,
            "date_approved" => $request->date_approved,
            "approved_by" => $request->approved_by,
            "remarks" => $request->remarks_disapproved,
            "steps" => $request->steps
        ];

        UrbApproval::create($data);
        $current = Carbon::now();
        $ApplicationStat = CreApplicationStatus::where("research_id", $request->research_id)->where("steps", "7")->first();
        CreApplicationStatus::where("id", $ApplicationStat->id)->update(["end" => $current, "status" => "Completed"]);
        $this->cre_application_status($request->research_id, "8", "MOA Signing", $current, $end = null, "On Process");
        return redirect()->back()->with('message', 'Success');
    }

    public function technical_review_upload(Request $request)
    {
        if ($request->file('document_file') && $request->steps == '3'){
            $document_file = $request->file('document_file');
            $fileName_doc =   $document_file->getClientOriginalName(); 
            $filePath_doc = 'docs/' . $document_file->getClientOriginalName();

            $data = [
                "research_id"  => $request->research_id,
                "report_date" => $request->report_date,
                "steps" => $request->steps,
                "file_name"    => $fileName_doc,
                "file_path"    => $filePath_doc
            ];

            ResearchDoc::create($data);
            Storage::disk('public')->put($filePath_doc, file_get_contents($document_file));

            $current = Carbon::now();
            $ApplicationStat = CreApplicationStatus::where("research_id", $request->research_id)->where("steps", "3")->first();
            CreApplicationStatus::where("id", $ApplicationStat->id)->update(["end" => $current, "status" => "Completed"]);
            $this->cre_application_status($request->research_id, "4", "Approval of Revised Docs", $current, $end = null, "On Process");
        }

        if ($request->file('tech_file') && $request->t_steps == 'tech'){
            $document_file = $request->file('tech_file');
            $fileName_doc =   $document_file->getClientOriginalName(); 
            $filePath_doc = 'docs/' . $document_file->getClientOriginalName();

            $data = [
                "research_id"  => $request->research_id,
                "steps" => $request->t_steps,
                "file_name"    => $fileName_doc,
                "file_path"    => $filePath_doc
            ];

            ResearchDoc::create($data);
            Storage::disk('public')->put($filePath_doc, file_get_contents($document_file));
        }

        if ($request->file('document_file') && $request->steps == 'turnitin'){
            $document_file = $request->file('document_file');
            $fileName_doc =   $document_file->getClientOriginalName(); 
            $filePath_doc = 'docs/' . $document_file->getClientOriginalName();

            $data = [
                "research_id"  => $request->research_id,
                "steps" => $request->steps,
                "file_name"    => $fileName_doc,
                "file_path"    => $filePath_doc
            ];

            ResearchDoc::create($data);
            Storage::disk('public')->put($filePath_doc, file_get_contents($document_file));
        }

        if ($request->file('document_file') && $request->steps == 'revisions'){
            $document_file = $request->file('document_file');
            $fileName_doc =   $document_file->getClientOriginalName(); 
            $filePath_doc = 'docs/' . $document_file->getClientOriginalName();

            $data = [
                "research_id"  => $request->research_id,
                "steps" => $request->steps,
                "file_name"    => $fileName_doc,
                "file_path"    => $filePath_doc
            ];

            ResearchDoc::create($data);
            Storage::disk('public')->put($filePath_doc, file_get_contents($document_file));
        }

        if ($request->file('document_file') && $request->steps == '4'){
            $document_file = $request->file('document_file');
            $fileName_doc =   $document_file->getClientOriginalName(); 
            $filePath_doc = 'docs/' . $document_file->getClientOriginalName();

            $data = [
                "research_id"  => $request->research_id,
                "steps" => $request->steps,
                "file_name"    => $fileName_doc,
                "file_path"    => $filePath_doc
            ];

            ResearchDoc::create($data);
            Storage::disk('public')->put($filePath_doc, file_get_contents($document_file));

            $current = Carbon::now();
            $ApplicationStat = CreApplicationStatus::where("research_id", $request->research_id)->where("steps", "4")->first();
            CreApplicationStatus::where("id", $ApplicationStat->id)->update(["end" => $current, "status" => "Completed"]);
            $this->cre_application_status($request->research_id, "5", "Ethics Clearance", $current, $end = null, "On Process");
        }

        if ($request->file('document_file') && $request->steps == '5'){
            $document_file = $request->file('document_file');
            $fileName_doc =   $document_file->getClientOriginalName(); 
            $filePath_doc = 'docs/' . $document_file->getClientOriginalName();

            $data = [
                "research_id"  => $request->research_id,
                "steps" => $request->steps,
                "file_name"    => $fileName_doc,
                "file_path"    => $filePath_doc
            ];

            ResearchDoc::create($data);
            Storage::disk('public')->put($filePath_doc, file_get_contents($document_file));

            $current = Carbon::now();
            $ApplicationStat = CreApplicationStatus::where("research_id", $request->research_id)->where("steps", "5")->first();
            CreApplicationStatus::where("id", $ApplicationStat->id)->update(["end" => $current, "status" => "Completed"]);
            $this->cre_application_status($request->research_id, "6", "Budget Proposal", $current, $end = null, "On Process");
        }

        if ($request->file('document_file') && $request->steps == '6'){
            $document_file = $request->file('document_file');
            $fileName_doc =   $document_file->getClientOriginalName(); 
            $filePath_doc = 'docs/' . $document_file->getClientOriginalName();

            $data = [
                "research_id"  => $request->research_id,
                "steps" => $request->steps,
                "file_name"    => $fileName_doc,
                "file_path"    => $filePath_doc
            ];

            ResearchDoc::create($data);
            Storage::disk('public')->put($filePath_doc, file_get_contents($document_file));
            $current = Carbon::now();
            $ApplicationStat = CreApplicationStatus::where("research_id", $request->research_id)->where("steps", "6")->first();
            CreApplicationStatus::where("id", $ApplicationStat->id)->update(["end" => $current, "status" => "Completed"]);
            $this->cre_application_status($request->research_id, "7", "URB Approval", $current, $end = null, "On Process");
        }

        if ($request->file('document_file') && $request->steps == '8'){
            $document_file = $request->file('document_file');
            $fileName_doc =   $document_file->getClientOriginalName(); 
            $filePath_doc = 'docs/' . $document_file->getClientOriginalName();

            $data = [
                "research_id"  => $request->research_id,
                "steps" => $request->steps,
                "file_name"    => $fileName_doc,
                "file_path"    => $filePath_doc
            ];

            ResearchDoc::create($data);
            Storage::disk('public')->put($filePath_doc, file_get_contents($document_file));

            $current = Carbon::now();
            $ApplicationStat = CreApplicationStatus::where("research_id", $request->research_id)->where("steps", "8")->first();
            CreApplicationStatus::where("id", $ApplicationStat->id)->update(["end" => $current, "status" => "Completed"]);
            $this->cre_application_status($request->research_id, "9", "Progress Report", $current, $end = null, "On Process");
        }

        if ($request->file('document_file') && $request->steps == '10'){
            $document_file = $request->file('document_file');
            $fileName_doc =   $document_file->getClientOriginalName(); 
            $filePath_doc = 'docs/' . $document_file->getClientOriginalName();

            $data = [
                "research_id"  => $request->research_id,
                "steps" => $request->steps,
                "file_name"    => $fileName_doc,
                "file_path"    => $filePath_doc
            ];

            ResearchDoc::create($data);
            Storage::disk('public')->put($filePath_doc, file_get_contents($document_file));

            $current = Carbon::now();
            $ApplicationStat = CreApplicationStatus::where("research_id", $request->research_id)->where("steps", "10")->first();
            CreApplicationStatus::where("id", $ApplicationStat->id)->update(["end" => $current, "status" => "Completed"]);
            $this->cre_application_status($request->research_id, "11", "Turnitin", $current, $end = null, "On Process");
        }

        if ($request->file('document_file') && $request->steps == '12'){
            $document_file = $request->file('document_file');
            $fileName_doc =   $document_file->getClientOriginalName(); 
            $filePath_doc = 'docs/' . $document_file->getClientOriginalName();

            $data = [
                "research_id"  => $request->research_id,
                "steps" => $request->steps,
                "file_name"    => $fileName_doc,
                "file_path"    => $filePath_doc
            ];

            ResearchDoc::create($data);
            Storage::disk('public')->put($filePath_doc, file_get_contents($document_file));
            $current = Carbon::now();
            $ApplicationStat = CreApplicationStatus::where("research_id", $request->research_id)->where("steps", "12")->first();
            CreApplicationStatus::where("id", $ApplicationStat->id)->update(["end" => $current, "status" => "Completed"]);
            $this->cre_application_status($request->research_id, "13", "Completion Certificate", $current, $end = null, "On Process");
        }

        if ($request->file('document_file') && $request->steps == '13'){
            $document_file = $request->file('document_file');
            $fileName_doc =   $document_file->getClientOriginalName(); 
            $filePath_doc = 'docs/' . $document_file->getClientOriginalName();

            Research::where('id', $request->research_id)->update(['academic_year' => $request->academic_year, 'date_completed' => $request->date_completed, 'date_issued' => $request->date_certificate_issued]);

            $data = [
                "research_id"  => $request->research_id,
                "steps" => $request->steps,
                "file_name"    => $fileName_doc,
                "file_path"    => $filePath_doc
            ];

            ResearchDoc::create($data);
            Storage::disk('public')->put($filePath_doc, file_get_contents($document_file));
            $current = Carbon::now();
            $ApplicationStat = CreApplicationStatus::where("research_id", $request->research_id)->where("steps", "13")->first();
            CreApplicationStatus::where("id", $ApplicationStat->id)->update(["end" => $current, "status" => "Completed"]);
        }

        return redirect()->back()->with('message', 'Successfully uploaded');
    }

    public function getStepStatus($research_id, $steps){
       $application_status = CreApplicationStatus::where('research_id', $research_id)->where('steps', $steps)->first();

        if($application_status){
            $value = $application_status;
        }else{
            $value = null;
        }

        return $value;
    }

    public function research_data_log($research_id, $steps, $remarks){
        ResearchLog::updateOrCreate(
            [
                'research_id' => $research_id, 
                'steps' => $steps
            ],
            [
                'remarks' => $remarks
            ]);
    }

    public function cre_application_status($research_id, $steps, $name, $start = null, $end = null, $status){
        CreApplicationStatus::updateOrCreate(
            [
                'research_id' => $research_id,
                'steps' => $steps,
                'name' => $name
            ],
            [
                'start' => $start,
                'end' => $end,
                'status' => $status
            ]
        );
    }

    public function delete_panel(string $id)
    {
        try {
            CrePanelMember::where('id', $id)->delete();
            return redirect()->back()->with('message', 'Successfully Deleted');
        } catch (Exception $e) {
            Log::debug($e->getMessage());
        }
    }

    public function unendorsed_panel(string $id)
    {
        try {
            CrePanelMember::where('id', $id)->update(['endorsement_status' => null]);
            return redirect()->back()->with('message', 'Successfully Unendorsed');
        } catch (Exception $e) {
            Log::debug($e->getMessage());
        }
    }

    public function progress_report_extension(Request $request, string $id)
    {
        try {
            CreProgressReportHeader::where('id', $id)->update(['date_due' => $request->date_extension]);
            return redirect()->back()->with('message', 'Successfully Set Extension Date');
        } catch (Exception $e) {
            Log::debug($e->getMessage());
        }
    }

    public function progress_report_accept(Request $request, string $id)
    {
        try {
            CreProgressReportHeader::where('id', $id)->update(['status' => 'accepted']);
            return redirect()->back()->with('message', 'Successfully update status');
        } catch (Exception $e) {
            Log::debug($e->getMessage());
        }
    }

    public function submit_consolidated_report(Request $request, string $id)
    {
        try {
            ConsolidatedFeedbacks::where('id', $id)->update(['status' => 'A']);
            return redirect()->back()->with('message', 'Successfully update status');
        } catch (Exception $e) {
            Log::debug($e->getMessage());
        }
    }

    public function research_extension_date(Request $request, string $id)
    {
        try {
            Research::where('id', $id)->update(['date_extension' => $request->date_extension]);
            return redirect()->back()->with('message', 'Successfully Set Extension Date');
        } catch (Exception $e) {
            Log::debug($e->getMessage());
        }
    }

    public function research_completion_date(Request $request, string $id)
    {
        try {
            Research::where('id', $id)->update(['date_completion' => $request->date_completion]);
            return redirect()->back()->with('message', 'Successfully Set Completion Date');
        } catch (Exception $e) {
            Log::debug($e->getMessage());
        }
    }

    public function turnitin_report_upload(Request $request)
    {
        try {
            if ($request->file('document_file')){
                $turnitin_file = $request->file('document_file');
                $fileName_turnitin =  $turnitin_file->getClientOriginalName(); 
                $filePath_turnitin = 'uploads/' . $turnitin_file->getClientOriginalName();

                $data = [
                    "turnitin_score" => $request->score,
                    "turnitin_status" => $request->status,
                    "turnitin_file" => $fileName_turnitin,
                    "turnitin_path" => $filePath_turnitin
                ];
                $research = ResearchDoc::where('id', $request->file_id)->first();
                $research->update($data);
                Storage::disk('public')->put($filePath_turnitin, file_get_contents($turnitin_file));

                $current = Carbon::now();
                $ApplicationStat = CreApplicationStatus::where("research_id", $request->research_id)->where("steps", "11")->first();
                CreApplicationStatus::where("id", $ApplicationStat->id)->update(["end" => $current, "status" => "Completed"]);

                $this->cre_application_status($request->research_id, "12", "Final Document", $current, $end = null, "On Process");

            }
            return redirect()->back()->with('message', 'Successfully Uploaded');
        } catch (Exception $e) {
            Log::debug($e->getMessage());
        }
    }

    public function delete_doc(string $id)
    {
        try {
            $file = ResearchDoc::where('id', $id)->first();
            Storage::disk('public')->delete($file->file_path);
            $file->delete();
            
            return redirect()->back()->with('message', 'Successfully deleted');
        } catch (Exception $e) {
            Log::debug($e->getMessage());
        }
    }

    public function send_message_thread(Request $request)
    {
        try {
            $data = [
                "research_id" => $request->research_id,
                "remarks" => $request->comment,
                "read_status" => 0,
                "steps" => $request->steps
            ];
            ResearchMessageThread::create($data);

            return redirect()->back()->with('message', 'Successfully posted');
        } catch (Exception $e) {
            Log::debug($e->getMessage());
            throw ValidationException::withMessages([
                'message' => 'Ops, something went wrong. Try again marking feedback.'
            ]);            
        }
    }

    public function mark_read(Request $request, string $id)
    {
        try {
            $data = [
                "seen_by" => $request->seen_by,
                "read_status" => 1,
                "updated_at" => Carbon::now()
            ];
            ResearchMessageThread::where('research_id', $id)->where('read_status', '!=', '1')->update($data);

            return redirect()->back()->with('message', 'Successfully updated');
        } catch (Exception $e) {
            Log::debug($e->getMessage());
            throw ValidationException::withMessages([
                'message' => 'Ops, something went wrong. Try again marking feedback.'
            ]);            
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
