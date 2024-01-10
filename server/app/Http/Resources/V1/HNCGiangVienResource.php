<?php

namespace App\Http\Resources\V1;

use App\Models\huongnghiencuu;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class HNCGiangVienResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'idHNC' => $this->idHNC,
            'idGV' => $this->idGV,
        ];
    }
}
