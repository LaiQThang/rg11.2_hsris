<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Ramsey\Uuid\Uuid;

class ct_detai extends Model
{
    use HasFactory;
    
    protected $keyType = 'string';

    public $incrementing = false;

    protected $table = 'ct_detai';

    protected $primaryKey = 'id';

    protected $fillable = [
        'id',
        'idDT',
        'idSV',
    ];

    protected static function boot()
    {
        parent::boot();
        self::creating(function($model){
            $model->{$model->getKeyName()} = Uuid::uuid4()->toString();
        });
    }
}
