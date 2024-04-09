<?php

namespace App\Http\Resources\V1;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PermissionResource extends JsonResource
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
            'namePermission' => $this->tenQuyen,
            'note' => $this->ghiChu,
            'permissionDetail' => new PermissionListCollection($this->whenLoaded('permissionList'))
        ];
    }
}
