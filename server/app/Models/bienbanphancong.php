<?php

namespace App\Models;

use Ramsey\Uuid\Uuid;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class bienbanphancong extends Model
{
    use HasFactory;

    protected $keyType = 'string';

    public $incrementing = false;

    protected $table = 'bienbanphancongs';

    protected $primaryKey = 'idBB';

    protected $fillable = [
        'idBB',
        'tenBB',
        'ngayLap',
        'noiDung',
        'ghiChu',
        'idGV',
    ];

    protected static function boot()
    {
        parent::boot();
        self::creating(function($model){
            $model->{$model->getKeyName()} = Uuid::uuid4()->toString();
        });
    }

    public function bienBan_SinhVien() : BelongsToMany
    {
        return $this->belongsToMany(sinhvien::class, 'ct_bienban', 'idBB', 'idSV');
    }

    public function bienBan_deTai() : BelongsTo
    {
        return $this->belongsTo(detai::class, 'idBB', 'idBB');
    }
}
