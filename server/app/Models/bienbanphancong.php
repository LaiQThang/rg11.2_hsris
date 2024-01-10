<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Ramsey\Uuid\Uuid;

class bienbanphancong extends Model
{
    use HasFactory;

    protected $keyType = 'string';

    public $incrementing = false;

    protected $table = 'bienbanphancongs';

    protected $fillable = [
        'idBB',
        'tenBB',
        'ngayLap',
        'noiDung',
        'ghiChu',
        'idGV',
    ];

    protected static function boot()
    {
        parent::creating(function($model){
            $model->{$model->getKeyName()} = Uuid::uuid4()->toString();
        });
    }
}
