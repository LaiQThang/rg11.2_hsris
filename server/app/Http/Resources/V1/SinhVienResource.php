<?php

namespace App\Http\Resources\V1;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SinhVienResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->idSV,
            'code' => $this->maSV,
            'name' => $this->tenSV,
            'avatar' => $this->anhDD,
            'class' => $this->lopHC,
            'status' => $this->tinhTrang,
            'favorite' => $this->soThich,
            'birthday' => $this->ngaySinh,
            'idCard' => $this->soCCCD,
            'phone' => $this->soDT,
            'email' => $this->email,
            'sex' => $this->gioiTinh,
            'address' => $this->diaChi,
            'passWord' => $this->matKhau,
            'permissionId' => $this->permissionId,
        ];
    }
}
