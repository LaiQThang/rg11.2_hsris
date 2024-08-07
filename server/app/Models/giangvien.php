<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Ramsey\Uuid\Uuid;
use Tymon\JWTAuth\Contracts\JWTSubject;
use Illuminate\Foundation\Auth\User as Authenticatable;

class giangvien extends Authenticatable implements JWTSubject
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

    protected $casts = [
        'matKhau' => 'hashed',
    ];

    protected static function boot()
    {
        parent::boot();
        self::creating(function($model){
            $model->{$model->getKeyName()} = Uuid::uuid4()->toString();
        });
    }

    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    /**
     * Return a key value array, containing any custom claims to be added to the JWT.
     *
     * @return array
     */
    public function getJWTCustomClaims()
    {
        return [];
    }

    // public function getAuthUsername()
    // {
    //     return  $this->attributes['maGV'];
    // }

    public function getAuthPassword()
    {
        return $this->attributes['matKhau'];
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

    // public function giangVien_CTHNC() : HasMany
    // {
    //     return $this->hasMany(ct_hnc::class, 'idGV', 'idGV');
    // }
    public function giangVien_CTHNC() : BelongsToMany
    {
        return $this->belongsToMany(huongnghiencuu::class, 'ct_hnc', 'idGV', 'idHNC');
    }

    public function giangVien_CTHNCGV() : BelongsToMany
    {
        return $this->belongsToMany(huongnghiencuu::class, 'ct_hncgv', 'idGV', 'idHNC');
    }

    public function giangVien_BienBan() :HasMany
    {
        return $this->hasMany(bienbanphancong::class, 'idGV', 'idGV');
    }

    public function hoidong() : BelongsToMany
    {
        return $this->belongsToMany(hoidong::class, 'ct_hoidonggv', 'idGV', 'idHD');
    }

    public function permissionId() : BelongsTo
    {
        return $this->belongsTo(permission::class, 'permissionId', 'id');
    }

}
