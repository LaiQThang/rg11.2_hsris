<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Ramsey\Uuid\Uuid;

class giangvien extends Model
{
    use HasFactory;

    protected $keyType = 'string';

    public $incrementing = false;

    protected $table = 'giangviens';

    protected $primaryKey = 'idGV';

    protected $fillable = [
        'idGV',
        'maGV',
        'tenGV',
        'anhDD',
        'ngaySinh',
        'email',
        'soDT',
        'diaChi',
        'gioiTinh',
        'trinhDo',
        'chuyenNganh',
        'delete',
        'matKhau',
        'permissionId',
    ];

    protected static function boot()
    {
        parent::boot();
        self::creating(function($model){
            $model->{$model->getKeyName()} = Uuid::uuid4()->toString();
        });
    }

    public function bienBanPhanCong() : HasMany 
    {
        return $this->hasMany(bienbanphancong::class, 'idGV', 'idGV');
    }

    public function baoCaoDeTai() : HasMany
    {
        return $this->hasMany(baocaodetai::class, 'idGV', 'idGV');
    }

    public function nhanXetBaoCao() : HasMany
    {
        return $this->hasMany(nhanxetbaocao::class, 'idGV', 'idGV');
    }

    public function deTai() : HasMany 
    {
        return $this->hasMany(detai::class, 'idGV', 'idGV');
    }

    public function phieuDiem() : HasMany 
    {
        return $this->hasMany(phieudiem::class, 'idGV', 'idGV');   
    }
}
