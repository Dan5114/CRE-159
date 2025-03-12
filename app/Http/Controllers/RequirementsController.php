<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class RequirementsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
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

        return Inertia::render('Requirements/Index', [
            "requirements" => $requirements
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
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
