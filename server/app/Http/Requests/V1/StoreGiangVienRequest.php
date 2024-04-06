<?php

namespace App\Http\Requests\V1;

use Illuminate\Support\Facades\Hash;
use Illuminate\Foundation\Http\FormRequest;

class StoreGiangVienRequest extends FormRequest
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
            'code' => ['required'],
            'name' => ['required'],
            'avatar' => ['nullable'],
            'birthday' => ['nullable', 'date_format:Y-m-d'],
            'phone' => ['nullable'],
            'email' => ['nullable'],
            'sex' => ['required'],
            'address' => ['nullable'],
            'passWord' => ['required'],
            'permissionId' => ['nullable'],
        ];
    }
    
    protected function prepareForValidation() {
        $this->merge([
            'maGV' => $this->code,
            'tenGV' => $this->name,
            'anhDD' => $this->avatar,
            'ngaySinh' => $this->birthday,
            'soDT' => $this->phone,
            'gioiTinh' => $this->sex,
            'diaChi' => $this->address,
            'matKhau' => Hash::make($this->passWord)
        ]);
    }
}
