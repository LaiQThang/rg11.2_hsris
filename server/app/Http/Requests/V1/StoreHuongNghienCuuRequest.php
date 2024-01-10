<?php

namespace App\Http\Requests\V1;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreHuongNghienCuuRequest extends FormRequest
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
            'dateCreated' => ['required'],
            'quantity' => ['required', Rule::in(['5', '6', '7', '8', '9'])],
            'summary',
            'target',
            'limit',
            'note',
        ];
    }

    protected function prepareForValidation() {

        $this->merge([
            'tenHNC' => $this->name,
            'ngayTao' => $this->dateCreated,
            'soLuong' => $this->quantity,
            'tomTat' => $this->summary,
            'mucTieu' => $this->target,
            'phamVi' => $this->limit,
            'ghiChu' => $this->note,
        ]);
        dd($this->name);

    }
}
