<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Ramsey\Uuid\Uuid;

class ct_nhanxet extends Model
{
    use HasFactory;
    
    protected $keyType = 'string';

    public $incrementing = false;

    protected $table = 'ct_nhanxet';

    protected $fillable = [
        'id',
        'idNX',
        'idSV',
    ];

    protected static function boot()
    {
        parent::creating(function($model){
            $model->{$model->getKeyName()} = Uuid::uuid4()->toString();
        });
    }
}
