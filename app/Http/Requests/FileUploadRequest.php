<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class FileUploadRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'step1' => 'required|file|mimes:jpg,png,pdf|max:2048',
            'step2' => 'required|file|mimes:jpg,png,pdf|max:2048',
            'step3' => 'required|file|mimes:jpg,png,pdf|max:2048',
            'step4' => 'required|file|mimes:jpg,png,pdf|max:2048',
            'step5' => 'required|file|mimes:jpg,png,pdf|max:2048',
            'step6' => 'required|file|mimes:jpg,png,pdf|max:2048',
            'step7' => 'required|file|mimes:jpg,png,pdf|max:2048',
        ];
    }
}
