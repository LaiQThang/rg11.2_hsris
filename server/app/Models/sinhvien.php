<?php

namespace App\Models;

use Ramsey\Uuid\Uuid;
use App\Http\Middleware\Authenticate;
use Illuminate\Database\Eloquent\Model;
use Tymon\JWTAuth\Contracts\JWTSubject;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class sinhvien extends Authenticatable implements JWTSubject
{
    use HasFactory;

    protected $keyType = 'string';

    public $incrementing = false; // Bật/tắt tự động tăng giá trị của khoá chính

    protected $table = 'sinhviens';

    protected $primaryKey = 'idSV';

    protected $casts = [
        'matKhau' => 'hashed',
    ];

    protected $fillable = [
        'idSV',
        'maSV',
        'tenSV',
        'anhDD',
        'lopHC',
        'tinhTrang',
        'soThich',
        'ngaySinh',
        'soCCCD',
        'soDT',
        'email',
        'gioiTinh',
        'diaChi',
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

    public function getAuthPassword()
    {
        return $this->attributes['matKhau'];
    }

    public function historyResearchStudent() : BelongsToMany 
    {
        return $this->belongsToMany(huongnghiencuu::class,'ct_hncsv', 'idSV', 'idHNC')->withPivot('id');   
    }

    public function detailsDeTai() : BelongsToMany
    {
        return $this->belongsToMany(detai::class, 'ct_detai', 'idSV', 'idDT');
    }
    public function permissionId() : BelongsTo
    {
        return $this->belongsTo(permission::class, 'permissionId', 'id');
    }
 
}
