<?php

namespace App\Http\Resources\V1;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class HuongNghienCuuResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->idHNC,
            'name' => $this->tenHNC,
            'dateCreated' => $this->ngayTao,
            'quantity' => $this->soLuong,
            'summary' => $this->tomTat,
            'target' => $this->mucTieu,
            'limit' => $this->phamVi,
            'note' => $this->ghiChu,
            'hnc' => HNCGiangVienResource::collection($this->whenLoaded('hNCGiangVien'))
        ];
    }
}
