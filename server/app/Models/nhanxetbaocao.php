<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Ramsey\Uuid\Uuid;

class nhanxetbaocao extends Model
{
    use HasFactory;

    protected $keyType = 'string';

    public $incrementing = false;

    protected $table = 'nhanxetbaocaos';

    protected $primaryKey = 'idNX';

    protected $fillable = [
        'idNX',
        'tenNX',
        'ngayLap',
        'nhanXet',
        'ghiChu',
        'idGV',
        'idBC',
        'fileTaiNguyen',
    ];

    protected static function boot()
    {
        parent::boot();
        self::creating(function($model){
            $model->{$model->getKeyName()} = Uuid::uuid4()->toString();
        });
    }
}
