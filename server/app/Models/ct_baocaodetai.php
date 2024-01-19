<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Ramsey\Uuid\Uuid;

class ct_baocaodetai extends Model
{
    use HasFactory;
    
    protected $keyType = 'string';

    public $incrementing = false;

    protected $table = 'ct_baocaodetai';

    protected $primaryKey = 'id';

    protected $fillable = [
        'id',
        'idDT',
        'idBC',
    ];

    protected static function boot()
    {
        parent::boot();
        self::creating(function($model){
            $model->{$model->getKeyName()} = Uuid::uuid4()->toString();
        });
    }
}
