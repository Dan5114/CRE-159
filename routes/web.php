<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ResearcherController;
use App\Http\Controllers\PanelController;
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
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::resources([
        'researcher' => ResearcherController::class,
        'panels' => PanelController::class
    ]);

    Route::post('/researcher/file/upload', [ResearcherController::class, 'file_uplolad_store'])->name('researcher.upload.files');
    Route::get('/file/download/{id}', [ResearcherController::class, 'file_download'])->name('researcher.file.download');
    Route::post('/researcher/update/status', [ResearcherController::class, 'update_application_status'])->name('researcher.update.status');
    Route::post('/researcher/submit/application', [ResearcherController::class, 'submit_application'])->name('researcher.submit.application');
    Route::post('/researcher/submit/panels', [ResearcherController::class, 'submit_panels'])->name('researcher.submit.panels');
    Route::post('/researcher/scheduled/meeting', [ResearcherController::class, 'scheduled_meeting'])->name('researcher.scheduled.meeting');
    Route::post('/researcher/save/meeting', [ResearcherController::class, 'save_meeting'])->name('researcher.save.meeting');
    Route::delete('/researcher/delete/panel/{id}', [ResearcherController::class, 'delete_panel'])->name('researcher.delete.panel');
    Route::post('/researcher/technical/review/upload', [ResearcherController::class, 'technical_review_upload'])->name('researcher.technical.review.files');
    Route::get('/doc/download/{id}', [ResearcherController::class, 'doc_download'])->name('researcher.doc.download');
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
});

require __DIR__.'/auth.php';
