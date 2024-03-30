<?php

namespace App\Http\Resources\V1;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class DeTaiResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->idDT,
            'name' => $this->tenDT,
            'summary' => $this->tomTat,
            'target' => $this->mucTieu,
            'limit' => $this->phamVi,
            'comment' => $this->nhanXet,
            'dateCreate' => $this->ngayLap,
            'status' => $this->trangThaiGV,
            'idHNC' => $this->idHNC,
            'idBB' => $this->idBB,
            'idHD' => $this->idHD,
            'hnc' => new HuongNghienCuuResource($this->whenLoaded('HNC')),
            
            'cup' => new GiaiThuongResource($this->whenLoaded('giaiThuong')),
            'teacher' => new GiangVienClientResource($this->whenLoaded('giangVien')),

            // 'ngayLap' => $this->dateCreated,
            // 'ngayHoanThanh' => $this->dateEnded,
            // 'idGV' => $this->id,
            // 'idHNC' => $this->id,
            // 'idHD' => $this->id,
            // 'idGT' => $this->id,
            // 'diemF' => $this->id,
            // 'trangThaiGV' => $this->id,
            // 'trangThaiQT' => $this->id,
        ];
    }
}
