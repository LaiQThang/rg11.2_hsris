<?php

namespace App\Http\Requests\V1;

use Illuminate\Foundation\Http\FormRequest;

class StoreDeTaiSVRequest extends FormRequest
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
            'name' => ['required'],
            'summary' => ['required'],
            'target' => ['required'],
            'limit' => ['required'],
            'comment' => ['sometimes'],
        ];
    }

    // protected function prepareForValidation() 
    // {
    //     $this->merge([
    //         'tenDT' => $this->name,
    //         'tomTat' => $this->summary,
    //         'mucTieu' => $this->target,
    //         'phamVi' => $this->limit,
    //         'nhanXet' => $this->comment,
    //         'ngayLap' => now()->format('Y-m-d'),
    //         'trangThaiGV' => 0,

    //     ]);
    //     // dd($this->name);
    //     // 'idGV',
    //     // 'idHNC',
    // }
}
