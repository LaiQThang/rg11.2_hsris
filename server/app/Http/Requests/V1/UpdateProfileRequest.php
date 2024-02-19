<?php

namespace App\Http\Requests\V1;

use Illuminate\Validation\Rule;
use Illuminate\Foundation\Http\FormRequest;

class UpdateProfileRequest extends FormRequest
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
        $email = $this->email;
        $role = explode('@', $email)[1];
        if($role == 'students.hou.edu.vn')
        {
            return [
                'name' => [ 'sometimes', 'required'],
                'avatar' => [ 'sometimes', 'nullable'],
                'class' => [ 'sometimes', 'required'],
                'favorite' => [ 'sometimes', 'nullable'],
                'birthday' => [ 'sometimes', 'required', 'date_format:Y-m-d'],
                'idCard' => [ 'sometimes', 'nullable'],
                'phone' => [ 'sometimes', 'nullable'],
                'email' => [ 'required'],
                'sex' => [ 'sometimes', 'required'],
                'address' => [ 'sometimes', 'nullable'],
                'passWord' => [ 'sometimes', 'required'],
            ];
        }
        else if($role == 'hou.edu.vn'){
            return [
                'name' => [ 'sometimes', 'required'],
                'avatar' => [ 'sometimes', 'nullable'],
                'birthday' => [ 'sometimes', 'required', 'date_format:Y-m-d'],
                'email' => [ 'required'],
                'phone' => [ 'sometimes', 'nullable'],
                'address' => [ 'sometimes', 'nullable'],
                'sex' => [ 'sometimes', 'required'],
                'level' => [ 'sometimes', 'nullable'],
                'specialize' => [ 'sometimes', 'nullable'],
                'passWord' => [ 'sometimes', 'required'],
            ];
        }
    }

    protected function prepareForValidation() 
    {
        $fieldMiddle = [];

        $fieldStudent = [
            'name' => 'tenSV',
            // 'avatar' => 'anhDD',
            'class' => 'lopHC',
            'favorite' => 'soThich',
            'birthday' => 'ngaySinh',
            'idCard' => 'soCCCD',
            'phone' => 'soDT',
            'email' => 'email',
            'sex' => 'gioiTinh',
            'address' => 'diaChi',
            'passWord' => 'matKhau',
        ];

        $fieldTeacher = [
            'name' => 'tenGV',
            // 'avatar' => 'anhDD',
            'birthday' => 'ngaySinh' ,
            'email' => 'email',
            'phone' => 'soDT',
            'address' => 'diaChi',
            'sex' => 'gioiTinh',
            'level' => 'trinhDo',
            'specialize' => 'chuyenNganh',
            'passWord' => 'matKhau',
        ];

        $email = $this->email;
        $role = explode('@', $email)[1];
        if($role == 'students.hou.edu.vn'){
            $fieldMiddle = $fieldStudent;
        }
        else if($role == 'hou.edu.vn'){
            $fieldMiddle = $fieldTeacher;
        }
        
        foreach($fieldMiddle as $fieldInput => $fieldOutput){
            if($this->$fieldInput){
                $this->merge([
                    $fieldOutput => $this->$fieldInput
                ]);
            }
        }

        // dd($this->toArray());
    }
}
