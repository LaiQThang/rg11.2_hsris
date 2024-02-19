<?php

namespace App\Http\Requests\V1;

use Illuminate\Http\JsonResponse;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\ValidationException;
use Illuminate\Http\Exceptions\HttpResponseException;

class StoreBienBanPhanCongRequest extends FormRequest
{

    protected $stopOnFirstFailure = true;
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
            'contents' => ['sometimes','nullable'],
            'note' => ['sometimes', 'nullable'],
            'students' => ['required'],
            'HNC' => ['required']
        ];
    } 

     protected function prepareForValidation() 
    {

        $field = [
            'name' => 'tenBB',
            'contents' => 'noiDung',
            'note' => 'ghiChu'
        ];
        
        foreach($field as $keyField => $valField)
        {
            if($this->$keyField)
            {
                $this->merge([
                    $valField => $this->$keyField
                ]);
            }
        }

        $this->merge([
            'ngayLap' => now()->format('Y-m-d'),
        ]);
        // dd($this->all());
    }


    protected function failedValidation(Validator $validator) 
    {
        $errors = (new ValidationException($validator))->errors();
        throw new HttpResponseException(response()->json(
            [
                'error' => $errors,
                'status_code' => 422,
            ], JsonResponse::HTTP_UNPROCESSABLE_ENTITY)
        );
    }


}
