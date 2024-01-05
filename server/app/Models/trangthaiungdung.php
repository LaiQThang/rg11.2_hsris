<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Ramsey\Uuid\Uuid;

class trangthaiungdung extends Model
{
    use HasFactory;

    
    protected $keyType = 'string';

    public $incrementing = false;

    protected $table = 'trangthaiungdungs';

    protected $fillable = [
        'id',
        'tenTrangThai',
        'trangThai',
    ];

    protected static function boot()
    {
        parent::creating(function($model){
            $model->{$model->getKeyName()} = Uuid::uuid4()->toString();
        });
    }
}
