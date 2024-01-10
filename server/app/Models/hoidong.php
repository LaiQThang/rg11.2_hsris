<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Ramsey\Uuid\Uuid;

class hoidong extends Model
{
    use HasFactory;

    protected $keyType = 'string';

    public $incrementing = false;

    protected $table = 'hoidongs';

    protected $fillable = [
        'idHD',
        'tenHD',
        'soLuong',
        'ngayTao',
        'ngayCham',
        'diaDiem',
        'delete',
        'ghiChu',
    ];

    protected static function boot()
    {
        parent::creating(function($model){
            $model->{$model->getKeyName()} = Uuid::uuid4()->toString();
        });
    }

    public function deTai() : HasMany 
    {
        return $this->hasMany(detai::class, 'idHD', 'idHD');   
    }

    public function phieuDiem() : HasMany 
    {
        return $this->hasMany(phieudiem::class, 'idHD', 'idHD');    
    }
}
