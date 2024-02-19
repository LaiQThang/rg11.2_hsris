<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Ramsey\Uuid\Uuid;

class huongnghiencuu extends Model
{
    use HasFactory;

    protected $keyType = 'string';

    public $incrementing = false;

    protected $table = 'huongnghiencuus';

    protected $primaryKey = 'idHNC';

    protected $fillable = [
        'idHNC',
        'tenHNC',
        'ngayTao',
        'soLuong',
        'tomTat',
        'mucTieu',
        'phamVi',
        'delete',
        'ghiChu',
    ];

    protected static function boot()
    {
        parent::boot();
        self::creating(function($model){
            $model->{$model->getKeyName()} = Uuid::uuid4()->toString();
        });
    }

    public function deTai() : HasMany 
    {
        return $this->hasMany(detai::class, 'idHNC', 'idHNC');
    }

    public function hNCGiangVien() : HasMany 
    {
        return $this->hasMany(ct_hncgv::class, 'idHNC', 'idHNC');
    }

    public function hNCSinhVien() : BelongsToMany
    {
        return $this->belongsToMany(sinhvien::class, 'ct_hnc', 'idHNC', 'idSV')->withPivot('idGV', 'tinhTrangSV');
    }

}
