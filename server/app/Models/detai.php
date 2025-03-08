<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Ramsey\Uuid\Uuid;

class detai extends Model
{
    use HasFactory;

    protected $keyType = 'string';

    public $incrementing = false;

    protected $table = 'detais';

    protected $primaryKey = 'idDT';

    protected $fillable = [
        'idDT',
        'tenDT',
        'tomTat',
        'mucTieu',
        'phamVi',
        'nhanXet',
        'ngayLap',
        'ngayHoanThanh',
        'idGV',
        'idHNC',
        'idHD',
        'idGT',
        'idBB',
        'diemF',
        'trangThaiGV',
        'trangThaiQT',
        'delete',
    ];

    protected static function boot()
    {
        parent::boot();
        self::creating(function($model){
            $model->{$model->getKeyName()} = Uuid::uuid4()->toString();
        });
    }

    public function phieuDiem() : HasMany 
    {
        return $this->hasMany(phieudiem::class, 'idDT', 'idDT');    
    }

    public function detailsBaoCao() : BelongsToMany
    {
        return $this->belongsToMany(baocaodetai::class, 'ct_baocaodetai', 'idDT', 'idBC');
    }

    public function giaiThuong() : BelongsTo
    {
        return $this->belongsTo(giaithuong::class, 'idGT', 'idGT');
    }

    public function giangVien() : BelongsTo
    {
        return $this->belongsTo(giangvien::class, 'idGV', 'idGV');
    }

    public function HNC() : BelongsTo
    {
        return $this->belongsTo(huongnghiencuu::class, 'idHNC', 'idHNC');
    }

    public function deTai_baoCao() : BelongsTo
    {
        return $this->belongsTo(ct_baocaodetai::class, 'idDT', 'idDT');
    }
    
    public function bienban() : BelongsTo
    {
        return $this->belongsTo(bienbanphancong::class, 'idBB', 'idBB' );
    }

    public function sinhvien() : BelongsToMany
    {
        return $this->belongsToMany(sinhvien::class, 'ct_detai', 'idDT', 'idSV');
    }
}
