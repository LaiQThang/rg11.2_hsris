<?php

namespace App\Http\Requests\V1;

use Illuminate\Validation\ValidationException;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Http\JsonResponse;

class UpdateBienBanRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    protected $stopOnFirstFailure = true;

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
            'name' => ['sometimes'],
            'content' => ['sometimes', 'nullable'],
            'note' => ['sometimes', 'nullable'],
            'students' => ['sometimes'],
            'BB' => ['required']
        ];
    }

    public function prepareForValidation()
    {
        $field = [
            'name' => 'tenBB',
            'contents' => 'noiDung',
            'note' => 'ghiChu',
        ];

        foreach($field as $key => $output)
        {
            if($this->$key)
            {
                $this->merge([
                    $output => $this->$key
                ]);
            }
        }
    }

    public function failedValidation(Validator $validate)
    {
        $error = (new ValidationException($validate))->errors();
        throw new HttpResponseException(response()->json([
            'error' => $error,
            'status_code' => 422
        ], JsonResponse::HTTP_UNPROCESSABLE_ENTITY));
    }
}
