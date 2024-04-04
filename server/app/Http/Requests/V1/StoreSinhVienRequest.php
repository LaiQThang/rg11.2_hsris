<?php

namespace App\Http\Requests\V1;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;

class StoreSinhVienRequest extends FormRequest
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
            'className' => ['required'],
            'status' => ['required', Rule::in(['0', '1', '2', '3'])],
            'favorite' => ['nullable'],
            'birthday' => ['nullable', 'date_format:Y-m-d'],
            'idCard' => ['nullable'],
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
            'maSV' => $this->code,
            'tenSV' => $this->name,
            'anhDD' => $this->avatar,
            'lopHC' => $this->class,
            'tinhTrang' => $this->status,
            'soThich' => $this->favorite,
            'ngaySinh' => $this->birthday,
            'soCCCD' => $this->idCard,
            'soDT' => $this->phone,
            'gioiTinh' => $this->sex,
            'diaChi' => $this->address,
            'matKhau' => Hash::make($this->passWord),
        ]);
    }
}
