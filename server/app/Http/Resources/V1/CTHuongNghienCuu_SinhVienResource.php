<?php

namespace App\Http\Resources\V1;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CTHuongNghienCuu_SinhVienResource extends JsonResource
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
            'class' => $this->lopHC,
            'statusGroup' => $this->pivot->tinhTrangSV
        ];
    }
}
