<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Ramsey\Uuid\Uuid;

class quantrivien extends Model
{
    use HasFactory;

    protected $keyType = 'string';

    public $incrementing = false;

    protected $table = 'quantriviens';

    protected $fillable = [
        'idQTV',
        'tenQTV',
        'ngaySinh',
        'email',
        'soDienThoai',
        'diaChi',
        'gioiTinh',
        'password',
        'permissionId',
    ];

    protected static function boot()
    {
        parent::creating(function($model){
            $model->{$model->getKeyName()} = Uuid::uuid4()->toString();
        });
    }
}
