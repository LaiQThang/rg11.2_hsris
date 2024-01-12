<?php

namespace App\Models;

use App\Http\Middleware\Authenticate;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Ramsey\Uuid\Uuid;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Tymon\JWTAuth\Contracts\JWTSubject;

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
        return $this->belongsToMany(huongnghiencuu::class,'ct_hncsv', 'idSV', 'idHNC');   
    }

}
