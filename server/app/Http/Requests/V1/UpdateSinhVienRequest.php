<?php

namespace App\Http\Requests\V1;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;

class UpdateSinhVienRequest extends FormRequest
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
                'code' => ['required'],
                'name' => ['required'],
                'avatar' => ['nullable'],
                'class' => ['required'],
                'status' => ['required', Rule::in(['0', '1', '2', '3'])],
                'favorite' => ['nullable'],
                'birthday' => ['required', 'date_format:Y-m-d'],
                'idCard' => ['nullable'],
                'phone' => ['nullable'],
                'email' => ['nullable'],
                'sex' => ['required'],
                'address' => ['nullable'],
                'passWord' => ['required'],
                'permissionId' => ['nullable'],
            ];
        }
        else{
            return [
                'code' => [ 'sometimes', 'required'],
                'name' => [ 'sometimes', 'required'],
                'avatar' => [ 'sometimes', 'nullable'],
                'class' => [ 'sometimes', 'required'],
                'status' => [ 'sometimes', 'required', Rule::in([ 'sometimes', '0', '1', '2', '3'])],
                'favorite' => [ 'sometimes', 'nullable'],
                'birthday' => [ 'sometimes', 'required', 'date_format:Y-m-d'],
                'idCard' => [ 'sometimes', 'nullable'],
                'phone' => [ 'sometimes', 'nullable'],
                'email' => [ 'sometimes', 'nullable'],
                'sex' => [ 'sometimes', 'required'],
                'address' => [ 'sometimes', 'nullable'],
                'passWord' => [ 'sometimes', 'required'],
                'permissionId' => [ 'sometimes', 'nullable'],
            ];
        }
        
    }
    
    protected function prepareForValidation() {
        $field = [
            'code' => 'maSV',
            'name' => 'tenSV',
            'avatar' => 'anhDD',
            'class' => 'lopHC',
            'status' => 'tinhTrang',
            'favorite' => 'soThich',
            'birthday' => 'ngaySinh',
            'idCard' => 'soCCCD',
            'phone' => 'soDT',
            'email' => 'email',
            'sex' => 'gioiTinh',
            'address' => 'diaChi',
            'passWord' => 'matKhau',
            'permissionId' => 'maSV',
        ];
        
        foreach($field as $fieldInput => $fieldOutput){
            if($this->$fieldInput){
                $this->merge([
                    $fieldOutput => $this->$fieldInput
                ]);
            }
        }

        // dd($this->toArray());
    }
}
