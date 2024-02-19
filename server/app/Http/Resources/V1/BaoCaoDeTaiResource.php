<?php

namespace App\Http\Resources\V1;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class BaoCaoDeTaiResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'name' => $this->tenBC,
            'dateCreated' => $this->ngayLap,
            'dateEnded' => $this->ngayKetThuc,
            'status' => $this->tinhTrang,
            'notes' => $this->ghiChu,
        ];
    }
}
