<?php

namespace App\Http\Requests\V1;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateHuongNghienCuuRequest extends FormRequest
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
        $method = $this->method();
        if($method == 'PUT'){
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
        else{
            return [
                'name' => ['sometimes', 'required'],
                'dateCreated' => ['sometimes', 'required'],
                'quantity' => ['sometimes', 'required', Rule::in(['5', '6', '7', '8', '9'])],
                'summary' => ['sometimes'],
                'target' => ['sometimes'],
                'limit' => ['sometimes'],
                'note' => ['sometimes'],
            ];
        }
    }

    protected function prepareForValidation() {

        $field = [
            'name' => 'tenHNC',
            'dateCreated' => 'ngayTao',
            'quantity' => 'soLuong',
            'summary' => 'tomTat',
            'target' => 'mucTieu',
            'limit' => 'phamVi',
            'note' => 'ghiChu',
        ];
        foreach($field as $inputField => $outputField){ 
            if($this->$inputField){
                $this->merge([
                    $outputField => $this->$inputField
                ]);
            }
        }
    }
}
