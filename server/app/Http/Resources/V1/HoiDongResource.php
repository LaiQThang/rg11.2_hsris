<?php

namespace App\Http\Resources\V1;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class HoiDongResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            "id" => $this->idHD,
            "name" => $this->tenHD,
            "quantity" => $this->soLuong,
            "date" => $this->ngayCham,
            "address" => $this->diaDiem,
            "delete" => $this->delete,
            "note" => $this->ghiChu,
            "topicArr" => new DeTaiCollection($this->whenLoaded('detai_hoidong'))
        ];
    }
}
