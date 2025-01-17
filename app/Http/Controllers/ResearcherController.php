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
use App\Models\ResearchLog;
use App\Models\CreMeeting;
use App\Models\CrePanelMember;
use App\Models\CreApplicationStatus;
use App\Models\ResearchDoc;
use Carbon\Carbon;

class ResearcherController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $user_type = auth()->user()->user_type;
        $search = $request->input('q');

        if($user_type == "researcher"){
            $researchs = Research::when($search, function ($query, $search) {
                return $query->where('research_title', 'LIKE', "%{$search}%");
            })->orderBy('created_at', 'desc')
            ->where('user_id', auth()->user()->id)
            ->paginate(5);
        }else{
            $researchs = Research::when($search, function ($query, $search) {
                return $query->where('research_title', 'LIKE', "%{$search}%");
            })->orderBy('created_at', 'desc')
            ->where('status', '!=', 'D')
            ->paginate(5);
        }

       

        return Inertia::render('Researcher/Index', [
            'researchs' => $researchs
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

        Research::create([
            'reference' => (string) Str::uuid(),
            'research_title' => $request->research_title,
            'dept_id' => $request->department,
            'user_id' => auth()->user()->id
        ]);

        return Redirect::route('researcher.index')->with('message', 'Research Successfully Added');
    }

    public function update_application_status(Request $request)
    {
        $current = Carbon::now();
        $ApplicationStat = CreApplicationStatus::where("research_id", $request->research_id)->where("steps", "1")->first();
        CreApplicationStatus::where("id", $ApplicationStat->id)->update(["end" => $current]);
        $this->cre_application_status($request->research_id, "2", "Technical Committee & Schedule Presentation", $current, $end = null, "On Process");

        Research::where('id', $request->research_id)->update(['status'=>'REC']);
        return redirect()->back()->with('message', 'Updated Status Successfully');
    }

    public function submit_application(Request $request)
    {
        $current = Carbon::now();
        Research::where('id', $request->research_id)->update(['status'=>'S']);
        $this->cre_application_status($request->research_id, "1", "Submit Application", $current, $end = null, "Submitted");
        return redirect()->back()->with('message', 'Submitted Successfully');
    }

    public function scheduled_meeting(Request $request)
    {
        $current = Carbon::now();
        CreMeeting::where('id', $request->meeting_id)->update(['status'=>'Success']);

        $ApplicationStat = CreApplicationStatus::where("research_id", $request->research_id)->where("steps", "2")->first();
        CreApplicationStatus::where("id", $ApplicationStat->id)->update(["end" => $current, "status" => "Scheduled"]);
        $this->cre_application_status($request->research_id, "3", "Technical Review Report", $current, $end = null, "On Process");

        return redirect()->back()->with('message', 'Submitted Successfully');
    }

    public function submit_panels(Request $request)
    {

        if($request->input('meeting_date') != null) {
            CreMeeting::create([
                "research_id" => $request->research_id,
                "meeting_date" => $request->meeting_date,
                "status" => "Pending"
               ]);
        }

        if($request->input('panels1') != null) {
            CrePanelMember::create([
            "research_id" => $request->research_id,
            "name" => $request->panels1,
            "role" => "member",
            ]);
        } 

        if($request->input('panels2') != null) {
            CrePanelMember::create([
            "research_id" => $request->research_id,
            "name" => $request->panels2,
            "role" => "member",
            ]);
        } 

        if($request->input('panels3') != null) {
            CrePanelMember::create([
            "research_id" => $request->research_id,
            "name" => $request->panels3,
            "role" => "member",
            ]);
        }

        if($request->input('panels4') != null) {
            CrePanelMember::create([
            "research_id" => $request->research_id,
            "name" => $request->panels4,
            "role" => "member",
            ]);
        }

        if($request->input('panels5') != null) {
            CrePanelMember::create([
            "research_id" => $request->research_id,
            "name" => $request->panels5,
            "role" => "member",
            ]);
        }

        if($request->input('panels6') != null) {
            CrePanelMember::create([
            "research_id" => $request->research_id,
            "name" => $request->panels6,
            "role" => "member",
            ]);
        }

        if($request->input('panels7') != null) {
            CrePanelMember::create([
            "research_id" => $request->research_id,
            "name" => $request->panels7,
            "role" => "member",
            ]);
        }

        if($request->input('panels8') != null) {
            CrePanelMember::create([
            "research_id" => $request->research_id,
            "name" => $request->panels8,
            "role" => "member",
            ]);
        }

       

       return redirect()->back()->with('message', 'Saved Successfully');
    }

    public function file_uplolad_store(Request $request)
    {
        try {

            if ($request->file('step1')){
                $file_step1 = $request->file('step1');
                $fileName_step1 =  $file_step1->getClientOriginalName(); 
                $filePath_step1 = 'uploads/' . $file_step1->getClientOriginalName();

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
                $fileName_step2 =  $file_step2->getClientOriginalName(); 
                $filePath_step2 = 'uploads/' . $file_step2->getClientOriginalName();
    
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
                $fileName_step3 =  $file_step3->getClientOriginalName(); 
                $filePath_step3 = 'uploads/' . $file_step3->getClientOriginalName();
    
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
                $fileName_step4 =  $file_step4->getClientOriginalName(); 
                $filePath_step4 = 'uploads/' . $file_step4->getClientOriginalName();
    
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
                $fileName_step5 =  $file_step5->getClientOriginalName(); 
                $filePath_step5 = 'uploads/' . $file_step5->getClientOriginalName();
    
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
                $fileName_step6 =   $file_step6->getClientOriginalName(); 
                $filePath_step6 = 'uploads/' . $file_step6->getClientOriginalName();
    
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
                $fileName_step7 = $file_step7->getClientOriginalName(); 
                $filePath_step7 = 'uploads/'   . $file_step7->getClientOriginalName();
    
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
        $value = Research::where('reference', $ref)->with('department')->with('meeting')->first();
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
            $panels = CrePanelMember::where('research_id', $value->id)->get();
            $technical_docs = ResearchDoc::where('research_id', $value->id)->get();

            $step_status = [
                "step1" => $this->getStepStatus($value->id, "1"),
                "step2" => $this->getStepStatus($value->id, "2"),
                "step3" => $this->getStepStatus($value->id, "3")
            ];

            $author = explode(",", $value->members);
        }else{
            $technical_docs = null;
            $step_status = null;
            $rlogs = null;
            $panels = null;
            $files = null;
            $author = "N/A";
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
            'technical_docs' => $technical_docs,
            'author' => $author[0]
        ]);
    }

    public function file_download($file_id)
    {
       $file = File::where('id', $file_id)->first();
       return response()->download("storage/uploads/" . $file->file_name, $file->file_name);
    }

    public function technical_review_upload(Request $request)
    {
        if ($request->file('document_file')){
            $document_file = $request->file('document_file');
            $fileName_doc =   $document_file->getClientOriginalName(); 
            $filePath_doc = 'docs/' . $document_file->getClientOriginalName();

            $data = [
                "research_id"  => $request->research_id,
                "file_name"    => $fileName_doc,
                "file_path"    => $filePath_doc
            ];
            ResearchDoc::create($data);
            Storage::disk('public')->put($filePath_doc, file_get_contents($document_file));
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
        $research_data_log = [
            "research_id" => $research_id,
            "steps" => $steps,
            "remarks" => $remarks
        ];

        ResearchLog::create($research_data_log);
    }

    public function cre_application_status($research_id, $steps, $name, $start = null, $end = null, $status){
        $application_status_log = [
            "research_id" => $research_id,
            "steps" => $steps,
            "name" => $name,
            "start" => $start,
            "end" => $end,
            "status" => $status
        ];

        CreApplicationStatus::create($application_status_log);
    }

    public function delete_panel(string $id)
    {
       CrePanelMember::where('id', $id)->delete();
       return redirect()->back()->with('message', 'Successfully Deleted');
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
