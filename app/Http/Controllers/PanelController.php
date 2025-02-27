<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Carbon\Carbon;
use Illuminate\Validation\Rules\Password;

class PanelController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $techpanels = User::where('user_type', 'tpl')->paginate(5);

        return Inertia::render('Panel/Index', [
            "techpanels_data" => $techpanels
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|ends_with:usls.edu.ph|lowercase|email|max:50|unique:'.User::class,
            'password' => ['required', Password::min(9)->letters()->numbers()->mixedCase()->symbols()],
        ]);

        $data = [
            "name" => $request->first_name . " " . $request->last_name,
            "email" => $request->email,
            "user_type" => "tpl",
            "email_verified_at" => Carbon::now(),
            "password" => Hash::make($request->password),
        ];

        User::create($data);
        return redirect()->back()->with('message', 'Panel added Successfully');
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
        User::destroy($id);
        return redirect()->back()->with('message', 'Panel deleted Successfully');
    }
}
