<?php

namespace App\Http\Resources\V1;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class BienBanPhanCongResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->idBB,
            'name' => $this->tenBB,
            'contents' => $this->noiDung,
            'note' => $this->ghiChu,
            'students' => CompactSinhVienResource::collection($this->whenLoaded('bienBan_SinhVien'))
        ];
    }
}
