<?php

namespace App\Http\Resources\V1;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class GiangVienClientResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'name' => $this->tenGV,
            'avatar' => $this->anhDD,
            'dateOfBirth' => $this->ngaySinh,
            'email' => $this->email,
            'phone' => $this->soDT,
            'addres' => $this->diaChi,
            'sex' => $this->gioiTinh,
            'level' => $this->trinhDo,
            'special' => $this->chuyenNganh,
        ];
    }
}
