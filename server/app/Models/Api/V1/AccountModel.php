<?php

namespace App\Models\Api\V1;

use App\Models\Api\ApiModel;
use App\Models\giangvien;
use App\Models\sinhvien;
use App\Helpers\GoogleDrive;
use Exception;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class AccountModel extends ApiModel
{
    use HasFactory;


    private $user;
    public function updateInfoStudent($request)
    {
        try{
            $email = $request->email;
            $role = explode('@', $email)[1];
            if($role == 'students.hou.edu.vn')
            {
                $this->user = sinhvien::find($this->getidSV());
            }
            else if($role == 'hou.edu.vn')
            {
                $this->user = giangvien::find($this->getidGV());
            }
    
            if($request->hasFile('avatar'))
            {
                if($this->user->anhDD != null)
                {
                    GoogleDrive::DELETE(($this->user->anhDD));
                }
                $anhDD = GoogleDrive::POST($request->file('avatar'));
                $this->user->update(['anhDD' => $anhDD] + $request->except('email'));
            }
            else{
                $this->user->update($request->all());
            }
            return true;
        }
        catch(Exception $e){
            return false;
        }

    }
}
