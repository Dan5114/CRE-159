<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Research;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function index()
    {
        return Inertia::render('Dashboard', [
            "requirements" => $this->requirements(),
            "cre_counter" => $this->cre_counters(),
            "research_counts" => $this->research_counts()
        ]);
    }

    public function research_counts()
    {
        $counts = Research::leftJoin('tbl_cre_application_status', 'tbl_research.id', '=', 'tbl_cre_application_status.research_id')
            ->selectRaw('
                tbl_research.id,
                MAX(CASE 
                    WHEN tbl_cre_application_status.status = "Completed" AND tbl_cre_application_status.steps = 13 
                    THEN "Completed"
                    WHEN tbl_cre_application_status.status = "On Process" 
                    THEN "Ongoing"
                    ELSE NULL 
                END) as research_status
            ')
            ->whereIn('tbl_cre_application_status.status', ['On Process', 'Completed'])
            ->groupBy('tbl_research.id')
            ->get();
    
        $ongoingCount = $counts->where('research_status', 'Ongoing')->count();
        $completedCount = $counts->where('research_status', 'Completed')->count();

        return [
            "ongoing" => [
                "count" => $ongoingCount,
                "link" => $ongoingCount > 0 ? route('researcher.index', ['status' => 'Ongoing']) : null
            ],
            "completed" => [
                "count" => $completedCount,
                "link" => $completedCount > 0 ? route('researcher.index', ['status' => 'Completed']) : null
            ],
        ];
    }
    
    public function cre_counters()
    {
        $steps = ["1", "2", "3", "6", "7", "8", "9", "11", "12", "13"];

        // Step counts (same as before)
$stepRows = DB::table('tbl_research')
    ->join('tbl_cre_application_status', 'tbl_research.id', '=', 'tbl_cre_application_status.research_id')
    ->where('tbl_cre_application_status.status', 'On Process')
    ->whereIn('tbl_cre_application_status.steps', $steps)
    ->selectRaw('tbl_cre_application_status.steps, COUNT(*) as total_count')
    ->groupBy('tbl_cre_application_status.steps')
    ->get()
    ->keyBy('steps');

// Releasing count (separate)
$releasingCount = DB::table('tbl_research_budget_tranche')
    ->where('status', 'For Releasing')
    ->distinct('research_id') // Count distinct research entries
    ->count('research_id');

// Format step data
$stepData = collect($steps)->mapWithKeys(function ($step) use ($stepRows) {
    $count = $stepRows[$step]->total_count ?? 0;
    return [
        "step$step" => [
            "count" => $count,
            "url"   => $count > 0 ? route('researcher.index', ['step' => $step]) : null,
        ]
    ];
});

// Add releasing count as separate entry
$stepData['releasing'] = [
    'count' => $releasingCount,
    'url'   => $releasingCount > 0 ? route('researcher.index', ['releasing' => true]) : null,
];

// Return final result
return $stepData->toArray();

    }

    public function requirements()
    {
       $requirements = [
            [
                "title" => "CHECK LIST FOR FULL RESEARCH PROPOSAL",
                "file_path" => "/requirements/CHECK LIST FOR FULL RESEARCH PROPOSAL May 2021.docx",
                "type" => "DOCX",
                "file_name" => "CHECK LIST FOR FULL RESEARCH PROPOSAL May 2021.docx",
                "category" => "Requirement"
            ],
            [
                "title" => "DC to Dean Request for Approval and Endorsement of RES Proposal to CRE",
                "file_path" => "/requirements/TEMPLATE_DC-to-Dean-Request-for-Approval-and-Endorsement-of-RES_PROPOSAL-to-CRE.docx",
                "type" => "DOCX",
                "file_name" => "TEMPLATE_DC-to-Dean-Request-for-Approval-and-Endorsement-of-RES_PROPOSAL-to-CRE.docx",
                "category" => "Requirement"
            ],
            [
                "title" => "Dean to AVCRE Endorsement for FRP PROPOSAL",
                "file_path" => "/requirements/TEMPLATE_Dean-to-AVCRE-Endorsement-of-RES_PROPOSAL.docx",
                "type" => "DOCX",
                "file_name" => "TEMPLATE_Dean-to-AVCRE-Endorsement-of-RES_PROPOSAL.docx",
                "category" => "Requirement"
            ],
            [
                "title" => "Dean to AVCRE Endorsement for FRP PROPOSAL (IF Proponent is DC)",
                "file_path" => "/requirements/TEMPLATE_Dean-to-AVCRE-Endorsement- (Proponent is DC).docx",
                "type" => "DOCX",
                "file_name" => "TEMPLATE_Dean-to-AVCRE-Endorsement- (Proponent is DC).docx",
                "category" => "Requirement"
            ],
            [
                "title" => "BUDGET GUIDELINES FOR QUALI & QUANTI RESEARCHES",
                "file_path" => "/requirements/BUDGET GUIDELINES FOR QUALI & QUANTI RESEARCHES.docx",
                "type" => "DOCX",
                "file_name" => "BUDGET GUIDELINES FOR QUALI & QUANTI RESEARCHES.docx",
                "category" => "Requirement"
            ],
            [
                "title" => "Sample Gantt Chart",
                "file_path" => "/requirements/Sample Gantt Chart.docx",
                "type" => "DOCX",
                "file_name" => "Sample Gantt Chart.docx",
                "category" => "Requirement"
            ]
        ];
        return $requirements;
    }
}
