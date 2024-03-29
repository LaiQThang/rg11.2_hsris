<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Ramsey\Uuid\Uuid;

class permission extends Model
{
    use HasFactory;

    protected $keyType = 'string';

    public $incrementing = false;

    protected $table = 'permissions';

    protected $primaryKey = 'id';

    protected $fillable = [
        'id',
        'tenQuyen',
        'ghiChu',
    ];

    protected static function boot()
    {
        parent::boot();
        self::creating(function($model){
            $model->{$model->getKeyName()} = Uuid::uuid4()->toString();
        });
    }

    public function permissionDetail() : HasMany 
    {
        return $this->hasMany(permission_detail::class, 'permission_id', 'id');
    }

    public function permissionList() : BelongsToMany 
    {
        return $this->belongsToMany(permission_list::class, 'permission_details', 'permission_id', 'permission_list_id');
    }

    public function sinhVien() : HasMany
    {
        return $this->hasMany(sinhvien::class, 'permissionId', 'id');
    }

    public function giangVien() : HasMany
    {
        return $this->hasMany(giangvien::class, 'permissionId', 'id');
    }

    public function quanTriVien() : HasMany 
    {
        return $this->hasMany(quantrivien::class, 'permissionId', 'id');    
    }
}
