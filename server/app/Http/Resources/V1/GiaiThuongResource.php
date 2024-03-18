<?php

namespace App\Http\Resources\V1;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class GiaiThuongResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'name' => $this->tenGiai,
            'prizePrice' => $this->giaTriGiai,
            'dateCreated' => $this->ngayLap,
            'summary' => $this->moTa,
        ];
    }
}
