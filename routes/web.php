<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ResearcherController;
use App\Http\Controllers\PanelController;
use App\Http\Controllers\RequirementsController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    // return Inertia::render('Welcome', [
    //     'canLogin' => Route::has('login'),
    //     'canRegister' => Route::has('register'),
    //     'laravelVersion' => Application::VERSION,
    //     'phpVersion' => PHP_VERSION,
    // ]);
    return redirect()->route('login');
});

Route::get('/dashboard', function () {

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

    return Inertia::render('Dashboard',[
        "requirements" => $requirements
    ]);
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::resources([
        'researcher' => ResearcherController::class,
        'requirements' => RequirementsController::class,
        'panels' => PanelController::class
    ]);

    Route::post('/researcher/file/upload', [ResearcherController::class, 'file_upload_store'])->name('researcher.upload.files');
    Route::get('/file/download/{id}', [ResearcherController::class, 'file_download'])->name('researcher.file.download');
    Route::post('/researcher/update/status', [ResearcherController::class, 'update_application_status'])->name('researcher.update.status');
    Route::post('/researcher/submit/application', [ResearcherController::class, 'submit_application'])->name('researcher.submit.application');
    Route::post('/researcher/submit/panels', [ResearcherController::class, 'submit_panels'])->name('researcher.submit.panels');
    Route::post('/researcher/scheduled/meeting', [ResearcherController::class, 'scheduled_meeting'])->name('researcher.scheduled.meeting');
    Route::post('/researcher/save/meeting', [ResearcherController::class, 'save_meeting'])->name('researcher.save.meeting');
    Route::delete('/researcher/delete/panel/{id}', [ResearcherController::class, 'delete_panel'])->name('researcher.delete.panel');
    Route::post('/researcher/technical/review/upload', [ResearcherController::class, 'technical_review_upload'])->name('researcher.technical.review.files');
    Route::get('/doc/download/{id}', [ResearcherController::class, 'doc_download'])->name('researcher.doc.download');
    Route::get('/requirements/download/{slug}', [ResearcherController::class, 'requirements_download'])->name('researcher.requirements.download');
    Route::get('/doc/download/result/{id}', [ResearcherController::class, 'doc_download_result'])->name('researcher.doc.download.result');
    Route::delete('/researcher/delete/doc/{id}', [ResearcherController::class, 'delete_doc'])->name('researcher.delete.doc');
    Route::post('/researcher/message/thread', [ResearcherController::class, 'send_message_thread'])->name('researcher.message.thread');
    Route::patch('/researcher/mark/read/{id}', [ResearcherController::class, 'mark_read'])->name('researcher.mark.read');
    Route::patch('/tpl/download/doc/status/{id}', [ResearcherController::class, 'download_doc_status'])->name('tpl.dowload.doc.status');
    Route::post('/tpl/endorse/application', [ResearcherController::class, 'tpl_endorse_application'])->name('tpl.endorse.application');
    Route::post('/tpl/lead/endorse/application', [ResearcherController::class, 'tpl_lead_endorse_application'])->name('tpl.lead.endorse.application');
    Route::post('/urb/approved/application', [ResearcherController::class, 'urb_approved_application'])->name('urb.approved.application');
    Route::post('/urb/disapproved/application', [ResearcherController::class, 'urb_disapproved_application'])->name('urb.disapproved.application');
    Route::post('/cre/progress/report/date', [ResearcherController::class, 'schedule_progress_report'])->name('cre.progress.report.date');
    Route::post('/researcher/progress/report/upload', [ResearcherController::class, 'researcher_progress_upload'])->name('researcher.progress.report.files');
    Route::patch('/researcher/unendorsed/panel/{id}', [ResearcherController::class, 'unendorsed_panel'])->name('researcher.unendorsed.panel');
    Route::post('/cre/turnitin/report/upload', [ResearcherController::class, 'turnitin_report_upload'])->name('turnitin.report.upload');
    Route::patch('/cre/progress/report/extension/{id}', [ResearcherController::class, 'progress_report_extension'])->name('progress.extension.date');
    Route::patch('/research/extension/date/{id}', [ResearcherController::class, 'research_extension_date'])->name('researcher.extension.date');
    Route::patch('/research/completion/date/{id}', [ResearcherController::class, 'research_completion_date'])->name('researcher.completion.date');
    Route::post('/cre/feedback/tinymce', [ResearcherController::class, 'update_tiny_mce'])->name('cre.tinymce.update');
});

require __DIR__.'/auth.php';
