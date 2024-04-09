<?php

namespace App\Http\Requests\V1;

use Faker\Core\Uuid;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Hash;
use Illuminate\Foundation\Http\FormRequest;

class BulkStoreGiangVienRequest extends FormRequest
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
            '*.code' => ['required'],
            '*.name' => ['required'],
            '*.avatar' => ['nullable'],
            '*.birthday' => ['nullable', 'date_format:Y-m-d'],
            '*.phone' => ['nullable'],
            '*.email' => ['nullable'],
            '*.sex' => ['required'],
            '*.address' => ['nullable'],
            '*.passWord' => ['required'],
            '*.permissionId' => ['nullable'],
        ];
    }

    protected function prepareForValidation() {
        $data = [];
        // dd($this->toArray());

        foreach($this->toArray() as $obj){
            $obj['idGV'] = \Ramsey\Uuid\Uuid::uuid4()->toString();
            $obj['maGV'] = $obj['code'] ?? null;
            $obj['tenGV'] = $obj['name'] ?? null;
            $obj['anhDD'] = $obj['avatar'] ?? null;
            $obj['ngaySinh'] = $obj['birthday'] ?? null;
            $obj['soDT'] = $obj['phone'] ?? null;
            $obj['gioiTinh'] = $obj['sex'] ?? null;
            $obj['diaChi'] = $obj['address'] ?? null;
            $obj['matKhau'] = Hash::make($obj['passWord']) ?? null;

            $data[] = $obj;
        }


        $this->merge($data);
    }
}
